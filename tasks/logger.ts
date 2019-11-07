import ChalkConst, { Level as ChalkOutputLevel } from 'chalk';

const chalk = new ChalkConst.constructor({ level: ChalkOutputLevel.Ansi256 });
type ChalkMethod = (a: string) => string;

const chalkify = function chalkify(args: any[], method: ChalkMethod) {
    for (let index = 0; index < args.length; index++) {
        const arg = args[index];
        if (typeof arg === 'string') {
            args[index] = method(arg);
        }
        if (typeof arg === 'number') {
            args[index] = method(arg.toString());
        }
    }

    return args;
}

export function logger(...args: any[]) {
    console.log(...args);
};

logger.error = function loggerError(name: string, error?: Error) {
    if (error) {
        console.log(chalk.red(name) + '\n', error);
    } else {
        console.log(chalk.red(name),);
    }
};

logger.green = function loggerGreen(...args: any[]) {
    args = chalkify(args, chalk.green);
    console.log(...args);
};

logger.message = function loggerMessage(message: string) {
    console.log(message);
};
