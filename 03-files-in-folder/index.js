const {readdir, stat} = require('fs').promises;
const {join} = require('path');

const folderPath = join(__dirname, 'secret-folder');

const readFolder = async () => {
    const files = await readdir(folderPath);
    const statFiles = await Promise.all(
        files.map(async (fileName) => {
            const filePath = join(folderPath, fileName);
            const fileStat = await stat(filePath);
            return {name: fileName, stat: fileStat};
        }));

    statFiles.forEach((file) => {
        if (file.stat.isFile()) {
            const [fileName, fileExt] = file.name.split('.');
            console.log(`${fileName} - ${fileExt} - ${file.stat.size / 1024}kb`);
        }
    });
};

readFolder();
