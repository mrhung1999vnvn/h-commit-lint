// eslint-disable-next-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
// eslint-disable-next-line import/no-extraneous-dependencies
const ora = require('ora');
const { exec, execSync } = require('child_process');
const isNil = require('lodash/isNil');

const OPTIONS_COMMIT = {
    commit: 'commit',
    log_work: 'log-work',
    summary_build: 'summary-build',
    summary_master: 'summary-master',
};

const QUESTION_1 = [
    {
        name: 'favorite',
        message: 'What do you want ?',
        type: 'list',
        choices: ['commit', 'log-work', 'summary-build', 'summary-master'],
        default: 'commit',
    },
];

const QUESTION_OPTION_1 = [
    {
        name: 'type',
        message: 'Type your commit ?',
        type: 'list',
        choices: ['feat', 'fix', 'chore', 'refactor', 'test'],
    },
    {
        name: 'message',
        message: 'Your message commit?',
        type: 'input',
    },
];

const QUESTION_OPTION_2 = [
    {
        name: 'type',
        message: 'Type your log-work commit?',
        type: 'list',
        choices: ['feat', 'fix', 'chore', 'refactor', 'test'],
    },
    {
        name: 'id',
        message: 'Your id card Jira log-work ?',
        type: 'input',
        default: 'CCQ-250',
        validate: async input => {
            if (/^([A-Z]+)-(\d{3,4})$/.test(input)) {
                return true;
            }
            return 'Wrong pattern Example: ABC-3xx';
        },
    },
    {
        name: 'message',
        message: 'Your message log-work?',
        type: 'input',
    },
    {
        name: 'time',
        message: 'Your log work time is:',
        type: 'input',
        default: 'Ex: 3h | 3m | 3d',
    },
];

const QUESTION_OPTION_3 = [
    {
        name: 'date',
        message: 'Your sprint date?',
        type: 'input',
    },
    {
        name: 'version',
        message: 'Your tag version?',
        type: 'input',
    },
];

const QUESTION_OPTION_4 = [
    {
        name: 'date',
        message: 'Your sprint date?',
        type: 'input',
    },
    {
        name: 'count',
        message: 'Your count sprint current?',
        type: 'input',
    },
];

const spinner = ora({
    color: 'blue',
    spinner: 'moon',
});

const handleOption1 = () =>
    inquirer.prompt(QUESTION_OPTION_1).then(answer2 => {
        spinner.start('Đang commit chờ tí nhé ...');
        if (!isNil(answer2) && !isNil(answer2.type) && !isNil(answer2.message)) {
            exec(`git commit -m "${answer2.type}: ${answer2.message}"`, (err, stdout, stderr) => {
                spinner.info(stdout);
                spinner.succeed('Xong rồi nhé!');
                if (stderr) {
                    spinner.fail(stderr);
                }
            });
            return;
        }
        spinner.fail('Có lỗi gì đó!');
    });

const handleOption2 = () =>
    inquirer.prompt(QUESTION_OPTION_2).then(answer2 => {
        spinner.start('Đang commit chờ tí nhé ...');
        if (
            !isNil(answer2) &&
            !isNil(answer2.type) &&
            !isNil(answer2.id) &&
            !isNil(answer2.message) &&
            !isNil(answer2.time)
        ) {
            exec(
                `git commit -m "${answer2.type}: ${answer2.id} ${answer2.message} #time ${answer2.time}"`,
                (err, stdout, stderr) => {
                    spinner.info(stdout);
                    spinner.succeed('Xong rồi nhé!');
                    if (stderr) {
                        spinner.fail(stderr);
                    }
                }
            );
            return;
        }
        spinner.fail('Có lỗi gì đó!');
    });

const handleOption3 = () =>
    inquirer.prompt(QUESTION_OPTION_3).then(answer3 => {
        spinner.start('Đang commit chờ tí nhé ...');
        if (!isNil(answer3)) {
            // execSync(`changelog -p -t ${answer3.commit}`);
            execSync(`git add .`);
            exec(`git commit -m "chore: update CHANGELOG - sprint ${answer3.date}"`, () => {
                exec(`git tag ${answer3.version}`, (err, stdout, stderr) => {
                    spinner.info(stdout);
                    spinner.succeed('Xong rồi nhé!');
                    if (stderr) {
                        spinner.fail(stderr);
                    }
                });
            });
            return;
        }
        spinner.fail('Có lỗi gì đó!');
    });

const handleOption4 = () =>
    inquirer.prompt(QUESTION_OPTION_4).then(answer4 => {
        spinner.start('Đang commit chờ tí nhé ...');
        if (!isNil(answer4)) {
            exec(
                `git commit -m "chore: sprint ${answer4.date} - ${answer4.count}"`,
                (err, stdout, stderr) => {
                    spinner.info(stdout);
                    spinner.succeed('Xong rồi nhé!');
                    if (stderr) {
                        spinner.fail(stderr);
                    }
                }
            );
            return;
        }
        spinner.fail('Có lỗi gì đó!');
    });

const main = () => {
    execSync(`git add .`);
    spinner.succeed('git add .');
    inquirer.prompt(QUESTION_1).then(answer => {
        if (answer.favorite === OPTIONS_COMMIT.log_work) {
            handleOption2();
        } else if (answer.favorite === OPTIONS_COMMIT.summary_build) {
            handleOption3();
        } else if (answer.favorite === OPTIONS_COMMIT.summary_master) {
            handleOption4();
        } else {
            handleOption1();
        }
    });
};
main();
