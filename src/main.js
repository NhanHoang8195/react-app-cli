
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import fse from 'fs-extra';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

/**
 * The function that initiate project with execute command: `npx create-react-app projectName`
 * @param options Contains arguments was passed from cli.
 * @returns {Promise<Promise<never>|undefined>}
 */
async function initCreateReactApp(options) {
    const result = await execa.command(`npx create-react-app ${options.projectName}`);
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

/**
 * replace template from our project to `projectName/src`
 * @param options
 * @returns {Promise<*|never|Promise<any>|Promise<void>>}
 */
async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetTemplateDicrectory);
}
async function removeSrcCreateReactApp(options) {
    return await fse.remove(path.join(options.targetTemplateDicrectory, '/src'));
}
export async function createProject(options) {
    try {
        const templateDir = path.resolve(__dirname, '..', 'templates');
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
            title: 'Remove default src folder of create-react-app',
            task: () => removeSrcCreateReactApp(options),
        },
        {
            title: 'Copy template',
            task: () => copyTemplateFiles(options)
        },
        {
            title: 'Installing dependencies to start. It can takes a few minutes!!!',
            task: () => projectInstall({
                cwd: options.targetTemplateDicrectory
            }),
        }
    ]);

    await tasks.run();
    console.log('%s Project ready.', chalk.green.bold('DONE'));
    console.log(`cd ${options.projectName}/`);
    console.log('npm start');
    return true;
}