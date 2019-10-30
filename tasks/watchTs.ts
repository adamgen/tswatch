import { exec } from 'child_process';

export async function watchTs() {
    const tscProcess = await exec('tsc -w -p tsconfig.json --preserveWatchOutput');
    tscProcess.stdout.on('data', (data) => {
        console.log(data);
    });
};
 