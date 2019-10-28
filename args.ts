import yargs from 'yargs';

export const args: {
    reload: boolean,
    nodemon: string,
} = yargs
    .options({
        reload: {
            boolean: true,
            default: true,
        },
        nodemon: {
            string: true,
        }
    })
        .argv;