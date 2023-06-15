const fs = require('fs');
const path = require('path');

//require files
const calculateSizeD = require('./calculateSizeD.js');
//const calculateSizeF = require('./calculateSizeF.js');

const buildMainContent = (fullStaticPath, pathname)=> {
    let mainContent = '';
    let item;
    //loop thru elements unside folder
    try{
        item = fs.readdirSync(fullStaticPath);
        console.log(item);
    }catch(err) {
        console.log(`${err}`);
        return `<div class = "alert alert-danger">Internal Server error</div>`;
    }

    //get following ele for each item:
    item.forEach(item => {
        const link = path.join(pathname, item);      // get path of the current folder then add the current path

        //icon
        let itemDetails = {};            // gloal obj defining
        let icon, stats;
        //gets stats of the item
        const itemFullStaticPath = path.join(fullStaticPath, item);

        try {
            itemDetails.stats = fs.statSync(itemFullStaticPath);

        } catch (error) {
            console.log(`error: ${error}`);
            mainContent = `<div class = "alert alert-danger">Internal Server error</div>`;

            return false;
        }

        if(itemDetails.stats.isDirectory()) {
            itemDetails.icon= '<ion-icon name="folder"></ion-icon>';

            [itemDetails.filesize, itemDetails.filesizeBytes] = calculateSizeD(itemFullStaticPath);
        }else if(itemDetails.stats.isFile()) {
            itemDetails.icon= '<ion-icon name="document"></ion-icon>';

            //[itemDetails.filesize, itemDetails.filesizeBytes] = calculateSizeF();
        }

        mainContent += `
        <tr>
            <td>${itemDetails.icon}<a href="${link}">${item}</a></td>
            <td>${itemDetails.filesize}</td>
            <td>gyhjun</td>
        
        </tr>`;
    });

    //link to the item, size, last modified, icon, name

    return mainContent;
};

module.exports = buildMainContent;

