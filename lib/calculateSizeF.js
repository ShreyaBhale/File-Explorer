
const calculateSizeF = stats => {
    const filesizeBytes = stats.size;      //bytes

    const units = "BKMGT";

    //1000     100000     100000000
    //3           6           9
    //LOG10(filesize) / 3
    //1           2             3

    const index = Math.floor(Math.log10(filesizeBytes)/3);

    //700 -> 700 ^0
    //10000 -> 10000/1000 ^1
    //1000000 -> 10000/1000^2

    const filesizehuman = (filesizeBytes/Math.pow(1000, index)).toFixed(1);

    const unit = units[index];

    filesize = `${filesizehuman}${unit}`

    return [filesize, filesizeBytes];
};

module.exports = calculateSizeF;