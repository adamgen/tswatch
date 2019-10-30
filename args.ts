import yargs from 'yargs';

export const args = yargs
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
        },
        webpack: {
            boolean: true,
        },
    })
    .argv;