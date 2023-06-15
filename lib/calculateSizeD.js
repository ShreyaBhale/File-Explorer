const {execSync} = require('child_process');


const calculateSizeD = itemFullStaticPath => {
    //escape spaces, tabs, etc
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');

    const cmdOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();         // exexute any cmd that u pass to it which we usually write in CLI
    console.log(cmdOutput);

    return ['110M', 110*1000*1000];
};

module.exports = calculateSizeD;