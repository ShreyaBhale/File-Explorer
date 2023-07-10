const fs = require('fs');
const path = require('path');

//require files
const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require('./calculateSizeF.js');

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
    //hide any file
    if(pathname ==='/') {
        item = item.filter(element => element !== 'Project_files');
    }

    //get following ele for each item:
    item.forEach(item => {

        //storing item detials in an onj
        let itemDetails = {};            // gloal obj defining

        //name
        itemDetails.name = item;

        //link
        const link = path.join(pathname, item);      // get path of the current folder then add the current path
        
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

            [itemDetails.filesize] = calculateSizeD(itemFullStaticPath);
        }else if(itemDetails.stats.isFile()) {
            itemDetails.icon= '<ion-icon name="document"></ion-icon>';

            [itemDetails.filesize, itemDetails.filesizeBytes] = calculateSizeF(itemDetails.stats);
        }

        //when was the file last chnaged
        itemDetails.timestamp = parseInt(itemDetails.stats.mtimeMs);

        //conver timestamp to a data
        itemDetails.date = new Date(itemDetails.timestamp);
        itemDetails.date = itemDetails.date.toLocaleString();
        //console.log(itemDetails.date);

        mainContent += `
        <tr data-name = "${itemDetails.name}" data-size="${itemDetails.filesize}" data-time="${itemDetails.timestamp}">
            <td>${itemDetails.icon}<a href='${link}' target="${itemDetails.stats.isFile() ? "_blank" : ""}">${item}</a></td>
            <td>${itemDetails.filesize}</td>
            <td>${itemDetails.date}</td>
        
        </tr>`;
    });

    //link to the item, size, last modified, icon, name

    return mainContent;
};

module.exports = buildMainContent;



//hide any file
//items.items.filter(ele => ele !== 'name');

//_blank: yo