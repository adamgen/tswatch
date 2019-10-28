import { exec } from 'child_process';

export async function watchTs() {
    const tscProcess = exec('tsc -w -p tsconfig.json');
};
