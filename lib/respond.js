const url = require('url');
const path = require('path');
const fs = require('fs');

//filr imports
const buildBreadcrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');


//static base path: location of static folder
//const staticBasePath = 
const staticBasePath = path.join(__dirname, '..', 'static');

const respond = (req, res) => {

    //to work with pathname, first decode it
    let pathname = url.parse(req.url, true).pathname;

    if(pathname === '/favicon.ico') {
        return false;
    }

    pathname = decodeURIComponent(pathname);

    //get the corresponding full static path located in static folder
    const fullStaticPath = path.join(staticBasePath, pathname);

    //
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        res.write('404 file not found');
        res.end();
        return false;
    }
    
    // 
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    }catch(err) {
        console.log(`lstatSync Error: ${err}`);
    }

    //to check if directory
    if(stats.isDirectory()){
        let data = fs.readFileSync(path.join(staticBasePath,'Project_files/index.html'), 'utf-8');

        //build page title
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(ele => ele !== '');
        const folderName = pathElements[0];
        
        //build breadcrumb
        const breadcrumb = buildBreadcrumb(pathname);

        //build table rows
        const mainContent = buildMainContent(fullStaticPath, pathname);

        data = data.replace('page_title', folderName);
        data = data.replace('pathname', breadcrumb);
        data = data.replace('mainContent', mainContent);

        //print data
        res.statusCode = 200;
        res.write(data);
        res.end();
    }

}


module.exports = respond;