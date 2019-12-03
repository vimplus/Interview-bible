const fs = require('fs');
const path = require('path');


function copy(dir, files) {
    for (let i = 0; i < files.length; i++) {
        let tmpPath = path.join(dir, files[i]);
        if (fs.statSync(tmpPath).isFile()) {
            if (
                tmpPath.endsWith('decrypt.js') ||
                tmpPath.endsWith('.jpg') || tmpPath.endsWith('.png') || tmpPath.endsWith('.log')
            ) continue;
            
            if (tmpPath.endsWith('.docx') || tmpPath.endsWith('.xlsx')) {
                let content = fs.readFileSync(tmpPath, 'binary');
                fs.unlinkSync(tmpPath);
                fs.writeFileSync(tmpPath, content, 'binary');
            } else {
                let content = fs.readFileSync(tmpPath, 'utf8');
                fs.unlinkSync(tmpPath);
                fs.writeFileSync(tmpPath, content, 'utf8');
            }

            console.log(`decrypt:${tmpPath} success....`);
        }
        else if (fs.statSync(tmpPath).isDirectory()) {
            if (tmpPath.indexOf('node_modules') != -1 || tmpPath.indexOf('.git') != -1) continue;
            copy(tmpPath, fs.readdirSync(tmpPath));
        }
    }
}
copy(__dirname, fs.readdirSync(__dirname));
console.log('done.');
