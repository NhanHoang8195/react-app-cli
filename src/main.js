import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import fse from 'fs-extra';
import { projectInstall, install } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

/**
 * The function that initiate project with execute command: `npx create-react-app projectName`
 * @param options Contains arguments was passed from cli.
 * @returns {Promise<Promise<never>|undefined>}
 */
async function initCreateReactApp(options) {
    const result = await execa.command(`npx create-react-app ${options.projectName} ${options.typeScript && '--typescript'}`);
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
}

/**
 * replace template from our project to `projectName/src`
 * @param options
 * @returns {Promise<*|never|Promise<any>|Promise<void>>}
 */
async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetTemplateDicrectory);
}

/**
 * Remove default src folder after create-react-app.
 * @param options
 * @returns {Promise<*>}
 */
async function removeSrcCreateReactApp(options) {
    return await fse.remove(path.join(options.targetTemplateDicrectory, '/src'));
}

async function installDependencies(options) {
    const packages = ['axios', 'immutable', 'node-sass', 'prop-types', 'react-redux',
        'react-router-dom', 'redux', 'redux-logger', 'redux-thunk', 'eslint-plugin-react', 'eslint-plugin-react-hooks'];
    return await install(packages, {
        cwd: options.targetTemplateDicrectory
    });
}
async function initialCommit() {
    execa.command(`git add .`);
    execa.command(`git commit -m "Init commit from cra-react-cli"`);
}
export async function createProject(options) {
    try {
        const templateDir = path.resolve(__dirname, '..', `${options.typeScript ? 'templates/typescript': 'templates/javascript'}`);
        await access(templateDir, fs.constants.R_OK);
        options.templateDirectory = templateDir;
        options.targetTemplateDicrectory = path.join(process.cwd(), `/${options.projectName}`);
    } catch(err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        console.error('%s', chalk.red.bold('ERROR'), err);
        process.exit(1);
    }
    const tasks = new Listr([
        {
            title: 'Init create-react-app. It can takes a few minutes!!!',
            task: () => initCreateReactApp(options)
        },
        {
            title: 'Installing dependencies. It can takes a few minutes!!!',
            task: () => installDependencies(options)
        },
        {
            title: 'Remove default src folder of create-react-app',
            task: () => removeSrcCreateReactApp(options),
        },
        {
            title: 'Copy template',
            task: () => copyTemplateFiles(options)
        },
        {
            title: 'Init commit',
            task: () => initialCommit()
        }
    ]);

    await tasks.run();
    console.log('%s Project ready.', chalk.green.bold('DONE'));
    console.log(`cd ${options.projectName}/`);
    console.log('npm start');
    return true;
}