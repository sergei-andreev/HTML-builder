const {readdir, mkdir, copyFile, rm} = require('fs').promises;
const {join} = require('path');

const copyDir = async (sourceFolder) => {
    const distFolder = join(__dirname, 'files-copy');

    try {
        await rm(distFolder, {recursive: true});
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw err;
        }
    }

    const files = await readdir(sourceFolder);

    await mkdir(distFolder, {recursive: true});

    for (const file of files) {
        const sourceFile = join(sourceFolder, file);
        const destFile = join(distFolder, file);
        await copyFile(sourceFile, destFile);
    }
}

const sourceFolder = join(__dirname, 'files');
copyDir(sourceFolder);
