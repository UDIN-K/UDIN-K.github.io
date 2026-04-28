const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        if (element === '.git' || element === 'node_modules' || element === 'package-lock.json') return;
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
            console.log('Copied ' + fromPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

copyFolderSync('./temp_repo', './');
console.log('done');
