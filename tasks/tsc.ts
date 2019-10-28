import { exec } from 'child_process';

// potentialy can run faster then gulp typescript - tho it didn't prove itself lets keep it here for now
export async function tsc(): Promise<any> {
    return new Promise(async function tscPromiseCallback(resolve, reject) {
        const tscProcess = await exec('tsc');

        tscProcess.on('data', (data) => {
        });
        tscProcess.on('error', (data) => {
            reject(data);
        });
        tscProcess.on('close', (data) => {
            resolve(data);
        });
        tscProcess.on('end', (data) => {
            resolve(data);
        });

    });
}
