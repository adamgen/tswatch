import yargs from 'yargs';

export const args: {
    reload: boolean,
    nodemon: string,
    typescript: boolean,
} = yargs
    .options({
        reload: {
            boolean: true,
        },
        nodemon: {
            string: true,
        },
        typescript: {
            alias: 'ts',
            boolean: true,
        }
    })
        .argv;