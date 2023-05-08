const {rm, mkdir, copyFile, readdir, stat, readFile, writeFile} = require('fs').promises;
const {join, extname} = require('path');

const copyAssets = async (source, dist) => {
    const files = await readdir(source);

    for (const file of files) {
        const stats = await stat(join(source, file));
        if (stats.isDirectory()) {
            await mkdir(join(dist, file));
            await copyAssets(join(source, file), join(dist, file));
        } else {
            await copyFile(join(source, file), join(dist, file));
        }
    }
}

const mergeStyles = async (source, dist) => {
    const files = await readdir(source);
    const styles = (await Promise.all(files.map(async (file) => extname(file) === '.css'
        ? await readFile(join(source, file), 'utf8')
        : ''
    )));
    await writeFile(dist, styles.join('\n'), 'utf8');
}

const createHtml = async (template, source, dist) => {
    const files = await readdir(source);
    let index = await readFile(template, 'utf8');

    for (const file of files) {
        const fileExt = extname(file);

        if (fileExt === '.html') {
            const fileName = file.split('.')[0];
            const component = await readFile(join(source, file), 'utf8');
            index = index.replace(`{{${fileName}}}`, component);
        }
    }

    await writeFile(dist, index, 'utf8');
}

const buildPage = async () => {
    const distFolderPath = join(__dirname, 'project-dist');
    const distAssetsPath = join(distFolderPath, 'assets');
    const distStylesPath = join(distFolderPath, 'style.css');
    const distIndexPath = join(distFolderPath, 'index.html');

    const assetsPath = join(__dirname, 'assets');
    const stylesPath = join(__dirname, 'styles');
    const componentsPath = join(__dirname, 'components');

    const templateFilePath = join(__dirname, 'template.html');

    try {
        await rm(distFolderPath, {recursive: true});
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await mkdir(distFolderPath);
    await mkdir(distAssetsPath);

    await copyAssets(assetsPath, distAssetsPath);
    await mergeStyles(stylesPath, distStylesPath)
    await createHtml(templateFilePath, componentsPath, distIndexPath);
}

buildPage();
