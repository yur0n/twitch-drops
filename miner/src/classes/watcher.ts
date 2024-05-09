import { Bot } from '../interfaces/bot.interface';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { EventEmitter } from 'events';

export class Watcher extends EventEmitter {
	private static count = 0;
	private job: ChildProcessWithoutNullStreams | null;
	public logs: string[] = [];
	public errors: string[] = [];

	constructor(bot: Bot, streamers: string) {
		super();
		Watcher.count++;

		this.job = spawn('python3', ['run.py', bot.login, bot.password, bot.token, streamers ], {
			cwd: './src/watchTwitch',
		});

		this.job.stdout.on('data', (data) => {
			this.logs.push(data.toString());
			this.emit('log', data.toString());
		});

		this.job.stderr.on('data', (data) => {
			this.errors.push(data.toString());
			this.emit('error', data.toString());
		});

		this.job.on('close', (code) => {
			this.emit('close', code);
			Watcher.decrementCount();
			this.job = null;
		});

		this.job.on('error', (error) => {
			Watcher.decrementCount();
			this.emit('error', error);
		});

		process.on('SIGINT', () => {
			if (this.job) {
				this.job.kill('SIGTERM');
			}
		});
	}

	static getCount(): number {
		return Watcher.count;
	}

	static decrementCount(): void {
		Watcher.count--;
	}

	close(): void {
		if (this.job) this.job.kill('SIGTERM');
	}
	
}