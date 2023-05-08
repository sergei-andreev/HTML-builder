const {readdir, readFile, writeFile} = require('fs').promises;
const {join, extname} = require('path');

const makeStyles = async (stylesDir, bundlePath) => {
    const files = await readdir(stylesDir);
    const styles = (await Promise.all(files.map(async (file) => extname(file) === '.css'
        ? await readFile(join(stylesDir, file), 'utf8')
        : ''
    )));
    await writeFile(bundlePath, styles.join('\n'), 'utf8');
}

const stylesDir = join(__dirname, 'styles');
const bundlePath = join(__dirname, 'project-dist', 'bundle.css');

makeStyles(stylesDir, bundlePath);
