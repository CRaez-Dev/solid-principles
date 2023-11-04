import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { simpleGit, SimpleGit } from 'simple-git'
import { PROJECTS } from "./constants";

const BASE_URL: string = 'git@github.com:CRaez-Dev/';
const APP_DIR: string = './apps';

(async (): Promise<void> => {
    try {
        console.log("🚀 Checking app's folders")
        if (!existsSync(APP_DIR)) mkdirSync(APP_DIR)
        const git: SimpleGit = simpleGit();
        const REPO_FOLDERS = readdirSync(APP_DIR)

        console.log("🚀 Cloning process -> started")
        await Promise.all(PROJECTS.map(async (item) => {
            if (!REPO_FOLDERS.some((repo) => repo === item)) {
                console.log(`🚀 Cloning -> ${item}`)
                await git.clone(`${BASE_URL}${item}.git`, `./apps/${item}`)
                console.log('🚀 Cloning -> succeded')
            }
        }))
        console.log("🚀 Cloning process -> ended")

    } catch (error) {
        console.log('🚀 Error on cloning process', error)
    }
})()
