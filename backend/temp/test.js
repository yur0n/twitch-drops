
async function viewerDropsDashboard() {

	const gqlQuery = [
		{
			operationName: "ViewerDropsDashboard",
			variables: {
				fetchRewardCampaigns: true
			},
			extensions: {
				persistedQuery: {
					version: 1,
					sha256Hash: "5a4da2ab3d5b47c9f9ce864e727b2cb346af1e3ea8b897fe8f704a97ff017619"
				}
			}
		}
	]

	const data = await fetch('https://gql.twitch.tv/gql', {
		method: 'POST',
		headers: {
			'Authorization': 'OAuth 3e4m0qwyaxl97ui0mrl3e6n50qkdg3',
			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
		},
		body: JSON.stringify(gqlQuery),
	})
	.then(response => response.json())
	.then(data => data[0].data.currentUser.dropCampaigns)
	.catch(error => console.error('Error:', error));

	const slugs = [];
	const forDetails = [];
	data.forEach(campaign => {
		if (campaign.status === 'ACTIVE') {
			console.log(campaign.game.displayName, ':' ,campaign.name, 'start:', campaign.startAt, 'end:', campaign.endAt);
			console.log(campaign.id)
			forDetails.push(campaign.id);
			slugs.push(campaign.game.displayName.toLowerCase().replace(/ /g, '-').replace(':', ''));
		}
	});
	console.log(slugs);
	directoryPage_Game(slugs[2]);
}

async function directoryPage_Game(slug) {
	const gqlQuery = [
		{
			operationName: "DirectoryPage_Game",
			variables: {
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
			extensions: {
				persistedQuery: {
					version: 1,
					sha256Hash: "e303f59d4836d19e66cb0f5a1efe15fbe2a1c02d314ad4f09982e825950b293d"
				}
			}
		}
	];

	const data = await fetch('https://gql.twitch.tv/gql', {
		method: 'POST',
		headers: {
			'Authorization': 'OAuth b2bqn1w1qru7rwpr1ak0x9v1dlgv88',
			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
		},
		body: JSON.stringify(gqlQuery),
	})
	.then(response => response.json())
	.then(data => data[0].data.game.streams.edges)
	.catch(error => console.error('Error:', error));

	data.forEach(edge => {
		console.log(edge.node.broadcaster.displayName);
	});
}



async function inventory(token) {
	const gqlQuery = [
		{
			operationName: "Inventory",
			variables: {
				fetchRewardCampaigns: true
			},
			extensions: {
				persistedQuery: {
					version: 1,
					sha256Hash: "b4d44a31239607d86878edb6de93e569339b6723dd585b93a307325205611ee3"
				}
			}
		}
	]
	const data = await fetch('https://gql.twitch.tv/gql', {
		method: 'POST',
		headers: {
			'Authorization': 'OAuth br0o0brovenmivpif8oku6y5uaasoo', // b2bqn1w1qru7rwpr1ak0x9v1dlgv88 yuron //  3e4m0qwyaxl97ui0mrl3e6n50qkdg3 donald
			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
		},
		body: JSON.stringify(gqlQuery),
	})
	.then(response => response.json())
	.then(data  => {
		console.log(data[0].data.currentUser.inventory)
		return data
	})
	.then(data => data[0].data.currentUser.inventory.dropCampaignsInProgress)
	.catch(error => console.error('Error:', error));

	data.forEach(campaign => {
		console.log('-----------------------------')
		console.log(campaign.game.name)
		console.log('drop name:', campaign.name)
		campaign.timeBasedDrops.forEach(drop => {
			console.log();
			console.log(drop.name, ':', drop.self.currentMinutesWatched, 'of', drop.requiredMinutesWatched, 'minutes');
		});
	});
}

viewerDropsDashboard()
// inventory();
// directoryPage_Game();





// IMPOSSIBLE FOR NOW

// async function viewerDropsDashboard() {

// 	const gqlQuery = [
// 		{
// 			operationName: "CoreActionsCurrentUser",
// 			variables: {},
// 			extensions: {
// 				persistedQuery: {
// 					version: 1,
// 					sha256Hash: '6b5b63a013cf66a995d61f71a508ab5c8e4473350c5d4136f846ba65e8101e95'
// 				}
// 			}
// 		},
// 		{
// 			operationName: "ViewerDropsDashboard",
// 			variables: {
// 				fetchRewardCampaigns: true
// 			},
// 			extensions: {
// 				persistedQuery: {
// 					version: 1,
// 					sha256Hash: "5a4da2ab3d5b47c9f9ce864e727b2cb346af1e3ea8b897fe8f704a97ff017619"
// 				}
// 			}
// 		}
// 	]

// 	let loginId = '';

// 	const data = await fetch('https://gql.twitch.tv/gql', {
// 		method: 'POST',
// 		headers: {
// 			'Authorization': 'OAuth 3e4m0qwyaxl97ui0mrl3e6n50qkdg3',
// 			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
// 			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
// 		},
// 		body: JSON.stringify(gqlQuery),
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 		loginId = data[0].data.currentUser.id;
// 		return data[1].data.currentUser.dropCampaigns
// 	})
// 	.catch(error => console.error('Error:', error));

// 	const forDetails = [];
// 	data.forEach(campaign => {
// 		if (campaign.status === 'ACTIVE') {
// 			// console.log(campaign.game.displayName, ':' ,campaign.name, 'start:', campaign.startAt, 'end:', campaign.endAt);
// 			// console.log(campaign.id)
// 			forDetails.push(campaign.id);
// 		}
// 	});

// 	const { token } = await fetch('https://gql.twitch.tv/integrity', {
// 		method: 'POST',
// 		headers: {
// 			'Authorization': 'OAuth 3e4m0qwyaxl97ui0mrl3e6n50qkdg3',
// 			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
// 			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/
// 		},
// 	})
// 	.then(response => response.json())
// 	.catch(error => console.error('Error:', error));

// 	dropCampaignDetails(forDetails, loginId, token);
// }

// async function dropCampaignDetails(dropID, loginId, token) {
// 	const gqlQuery = [];
// 	let i = 0;
// 	dropID.forEach( id => {
// 		if (i>2) return;
// 		gqlQuery.push({
// 			operationName: "DropCampaignDetails",
// 			variables: {
// 				dropID: id,
// 				channelLogin: loginId
// 			},
// 			extensions: {
// 				persistedQuery: {
// 					version: 1,
// 					sha256Hash: 'e5916665a37150808f8ad053ed6394b225d5504d175c7c0b01b9a89634c57136'
// 				}
// 			}
// 		});
// 		i++
// 	})

// 	const data = await fetch('https://gql.twitch.tv/gql', {
// 		method: 'POST',
// 		headers: {
// 			'X-Kpsdk-Cd': '{"workTime":1714657984114,"id":"5b2863a6de1caba52e0e7cc769ce0126","answers":[3,8],"duration":1.9,"d":-77,"st":1714590298492,"rst":1714590298394}',
// 			'X-Kpsdk-Ct': '09JwyOvsiFVlSAkVFIQvva0ice8JgCCMYh6ESVOiBEw8hkRCFIDbKfDLTb0GCzCDlCMXtz7qit5ZKHHncYVgOu64Vql7ASiwAppTdEm70VIMprvyD4puDmF8UjIIRToocLyyFSNryeAT2DTxlRSl8ZyaOBI0DvB8q0yA8Oi',
// 			'X-Kpsdk-V': 'j-0.0.0',
// 			'Accept': "*/*",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Accept-Language": "en-US",
// 			Connection: "keep-alive",
//       "Content-Type": "text/plain; charset=UTF-8",
// 			"Device-ID": ''.concat(Math.random().toString(36).substring(2, 15), Math.random().toString(36).substring(2, 15)),
// 			Origin: "https://www.twitch.tv",
//       Referer: "https://www.twitch.tv/",
// 			"Sec-Fetch-Dest": "empty",
// 			"Sec-Fetch-Mode": "cors",
// 			"Sec-Fetch-Site": "same-site",
// 			"Sec-GPC": "1",
// 			'X-Device-Id': '6aaf0cdb764c38fc',
// 			'Client-Session-Id': '7cf3a90f0b5ab539',

// 			'Client-Integrity': token,
// 			'Authorization': 'OAuth 3e4m0qwyaxl97ui0mrl3e6n50qkdg3',
// 			'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
// 			'User-Agent': '' // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
// 		},
// 		body: JSON.stringify(gqlQuery),
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data[0].errors[0])
// 		console.log(data[0].data.user)
// 		console.log(data[1].extensions.challange)
// 		return data
// 	})
// 	.catch(error => console.error('Error:', error));

// 	data.forEach(campaign => {
// 		const drop = campaign.data.user.dropCampaign
// 		console.log('-----------------------------')
// 		console.log(drop.game.displayName, ':', drop.game.slug)
// 		console.log('drop name:', drop.name, 'start:', drop.startAt, 'end:', drop.endAt)
// 		drop.timeBasedDrops.forEach(benefit => {
// 			console.log();
// 			console.log(benefit.name, ':', benefit.requiredMinutesWatched, 'minutes to watch');
// 		});
	
// 	})
					
// }