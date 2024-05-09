
// @ts-nocheck

export class Twitch {

	constructor(
		private token: string,
		private clientId: string = 'kimne78kx3ncx6brgo4mv6wki5h1ko',
		private userAgent: string = ''
	) {}

	private generateGQLQuery(operationName: string, variables: {[key: string]: any}, sha256Hash: string): Query {
		return {
			operationName,
			variables,
			extensions: {
				persistedQuery: {
					version: 1,
					sha256Hash
				}
			}
		}
	}

	private async fetchGQL(queries: Query[]): Promise<{}[]> {
		return await fetch('https://gql.twitch.tv/gql', {
			method: 'POST',
			headers: {
				'Authorization': `OAuth ${this.token}`,
				'Client-Id': this.clientId,
				'User-Agent': this.userAgent
			},
			body: JSON.stringify(queries),
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.error(data.error);
				return [];
			}
			return data.map(d => {
				if (d.errors) {
					console.error(d.errors);
					return [];
				}
				return d;
			})
		})
		.catch(error => {
			console.error('Error:', error);
			return [];
		});
	}

	async getDropCampaigns() {
		const query = this.generateGQLQuery(
			"ViewerDropsDashboard",
			{ fetchRewardCampaigns: true },
			"5a4da2ab3d5b47c9f9ce864e727b2cb346af1e3ea8b897fe8f704a97ff017619"
		);
		const data = await this.fetchGQL([query]);
		const campaigns = data[0]?.data.currentUser.dropCampaigns || [];
		const result = campaigns
			.filter(campaign => campaign.status === 'ACTIVE')
			.reduce((groupedCampaigns, campaign) => {
        let gameName = campaign.game.displayName;

        if (!groupedCampaigns[gameName]) {
            groupedCampaigns[gameName] = { game: gameName, campaigns: [] };
        }

        groupedCampaigns[gameName].campaigns.push({
            name: campaign.name,
            start: campaign.startAt,
            end: campaign.endAt,
            id: campaign.id
        });

        return groupedCampaigns;
    }, {});

	return Object.values(result);
	}

	async getGameStreams(game: string) {
		const slug = game
									.toLowerCase()
									.trim()
									.replace(/[^\w\s-]/g, '')
									.replace(/[\s_-]+/g, '-')
									.replace(/^-+|-+$/g, '');

		const query = this.generateGQLQuery(
			"DirectoryPage_Game",
			{
				imageWidth: 50,
				includePreviewBlur: false,
				limit: 30,
				options: {
					broadcasterLanguages: [],
					freeformTags: null,
					includeRestricted: [],
					recommendationsContext: {platform: "web"},
					requestID: "JIRA-VXP-2397",
					sort: "RELEVANCE",
					systemFilters: ["DROPS_ENABLED"],
					tags: [],
				},
				slug: slug,
				sortTypeIsRecency: false
			},
			"e303f59d4836d19e66cb0f5a1efe15fbe2a1c02d314ad4f09982e825950b293d"
		);
		const data = await this.fetchGQL([query]);
		const streams = data[0]?.data.game.streams.edges || [];
		const result: string[] = streams.map((edge) => edge.node.broadcaster.displayName);
		return result;
	}

	async getUserDrops() {
		const query = this.generateGQLQuery(
			"Inventory",
			{ fetchRewardCampaigns: true },
			"b4d44a31239607d86878edb6de93e569339b6723dd585b93a307325205611ee3"
		);
		const data = await this.fetchGQL([query]);
		const campaigns = data[0]?.data.currentUser.inventory.dropCampaignsInProgress || [];
		const result = campaigns.map(campaign => {
			return {
				game: campaign.game.name,
				name: campaign.name,
				start: campaign.startAt,
				end: campaign.endAt,
				drops: campaign.timeBasedDrops.map(drop => ({
					name: drop.benefitEdges[0].benefit.name,
					watched: drop.self.currentMinutesWatched,
					required: drop.requiredMinutesWatched
				}))
			}
		});
		return result;
	}
}

interface Query {
	operationName: string;
	variables: { [key: string]: any; }; 
	extensions: { 
		persistedQuery: { 
			version: number; 
			sha256Hash: string; 
		}; 
	}; 
}