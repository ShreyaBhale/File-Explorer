const {execSync} = require('child_process');

try {
    const result = execSync(`du -u "C:/Users/Admin/Documents/File_explorer"`).toString();         // exexute any cmd that u pass to it which we usually write in CLI
    console.log(result);

} catch (error) {
    console.log(`Error: ${error}`);
}

