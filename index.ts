// import ChalkLog from 'chalk';
const ChalkLog = require('chalk');

const Configuration = {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    ignores: [commit => commit === ''],
    parserPreset: {
        parserOpts: {
            headerPattern: new RegExp(
                /^(\w+)(?:\(([\w\s]+)\))?: (([A-Z]+)-\d{3,4})\s(.+)(#time \d{1,9}['s', 'h', 'm', 'd'])$/
            ),
        },
    },
    rules: {
        'subject-case': [0, 'always', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'type-empty': () => {
            console.log(
                ChalkLog.bgRed.bold('Wrong pattern commit:'),
                ChalkLog.bgCyanBright.bold('<type>') + ChalkLog.bgGreenBright.bold('[(<scope>)]:'),
                ChalkLog.bgCyanBright.bold('<issue key> <main message>'),
                ChalkLog.bgGreenBright.bold(
                    '[#time <duration> [<work log description>]] Ex: 3h, 3h 30m, 1d'
                )
            );
            // console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
            return [2, 'never'];
        },
        'subject-empty': [2, 'never'],
    },
};

module.exports = Configuration;
