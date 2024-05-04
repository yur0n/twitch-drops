import { spawn } from 'child_process';

let jobs = 0;

export default async function job(login: string, password: string, streamers: string, token?: string) {
	jobs++;
	console.log('Running a job');
	const python = spawn('py', ['test.py', login, password, streamers, token || ''], {
		cwd: './src/test',
	});

	python.on('error', (err) => {
		console.error(err);
	});

	python.stdout.on('data', (data: string) => {
			console.log(`stdout: ${data}`);
	});

	python.stderr.on('data', (data: string) => {
			console.error(`stderr: ${data}`);
	});

	python.on('close', (code) => {
			jobs--;
			console.log(`python process exited with code ${code}`);
	});
}

