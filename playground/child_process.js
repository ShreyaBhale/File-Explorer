const {execSync} = require('child_process');

try {
    const result = execSync(`du -sh `).toString();         // exexute any cmd that u pass to it which we usually write in CLI

} catch (error) {
    console.log(`Error: ${error}`);
}

