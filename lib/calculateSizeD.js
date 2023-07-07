const {execSync} = require('child_process');

const calculateSizeD = itemFullStaticPath => {
    //escape spaces, tabs, etc
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '/ '); // /s: space

    const cmdOutput = execSync(`du -c "${itemFullStaticPathCleaned}"`).toString();         // exexute any cmd that u pass to it which we usually write in CLI
    //console.log(cmdOutput);

    // remove spaces
    let filesize = cmdOutput.replace(/\s/g, '');

    //split file size using '/' seperator
    filesize = filesize.split(',');
    //console.log(filesize);
    //console.log(filesize.length);

    //human size is last second item of array
    filesize = filesize[11];
    //console.log(filesize);

    const units = "BKMGT";
    const index = Math.floor(Math.log10(filesize)/3);
    const filesizehuman = (filesize/Math.pow(1000, index)).toFixed(1);
    const unit = units[index];
    filesize = `${filesizehuman}${unit}`

    

    return [filesize];
};

module.exports = calculateSizeD;