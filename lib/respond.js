const url = require('url');
const path = require('path');
const fs = require('fs');

//filr imports
const buildBreadcrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');
const getMimeType = require('./getMimeType');
const { error } = require('console');


//static base path: location of static folder
const staticBasePath = path.join(__dirname, '..', 'static');


//Following is function passed to createServer used to creater the server
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
        let folderName = pathElements[0];
        if(folderName === undefined) {
            folderName = 'Home';
        }
        
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
        return res.end();
    }

    //is not a directory not a file
    //send 401: Access denied!
    if(!stats.isFile()) {
        res.statusCode = 401;
        res.write('401: Access denied');
        console.log('not a file');
        return res.end();
    }

    //getting file extension
    let fileDetails = {};
    fileDetails.extname = path.extname(fullStaticPath);
    //console.log(fileDetails.extname);

    //filesize
    let stat;
        try {
            stat = fs.statSync(fullStaticPath);
        } catch (err) {
                console.log(err);
        }
        fileDetails.size = stat.size;

    //getting file mime type and adding it to reponse header
    getMimeType(fileDetails.extname).then(mime => {
        //store headers
        let head = {};
        let options ={};

        //set res status code
        let statusCode = 200;

        //set "content-type" for all file types
        head['Content-Type' ] = mime;

        //pdf files
        if(fileDetails.extname === 'pdf') {
            head['content-desposition'] = 'inline';
            //head['content-desposition'] = 'attachment;filename=file.pdf';
        }

        //audio/vedio: stream in ranges
        if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
            head['Accept-Ranges'] = 'bytes';

            const range = req.headers.range;
            console.log(`range: ${range}`);

            if(range) {
                //range is in the form of bytes containing a start nd eng 
                //bytes = 56781102-end . range is header in audio nd video
                const start_end = range.replace(/byte=/, "").split('-');
                const start = parseInt(start_end[0]) || 0;
                const end = start_end[1]? parseInt(start_end[1]): fileDetails.size - 1;
                console.log(end)
                console.log(start)

                
                head['Content-Range'] = `bytes ${start}-${end}/${fileDetails.size}`;
                head['Content-Length'] = end - start + 1;
                //statusCode = 206;

                options = {start, end};
            }
        }

        
        //streaming method
        const fileStream = fs.createReadStream(fullStaticPath, options);

        //sream chunks to ur response objects
        res.writeHead(statusCode, head)
        fileStream.pipe(res);    //pipe take response obj as parameter


        //events: close and error
        fileStream.on('close', () => {
            return res.end();
        });
        fileStream.on('error', error => {
            console.log(erro.coder);
            res.statusCode = 404;
            res.write('404: file strean error');
            return res.end();
        });


    }).catch(err => {
        res.statusCode = 500;
        res.write('500: internal server error');
        console.log(err);
        return res.end();
    })

}


module.exports = respond;


//fs.readfile is a slow method as we have to wait for whole file to be read before displayed
//hence we used streaming method: it,ll stream the content to the user

//reding file
        // fs.promises.readFile(fullStaticPath, 'utf-8').then(
        //     (data) => {
        //             res.writeHead(statusCode, head);
        //             res.write(data);
        //             return res.end();
        //         })
        //     .catch(error => {
        //         console.log(error);
        //         res.statusCode = 404;
        //         res.write('404: file reading error');
        //         return res.end();
        //     });



// for audio video: we checked diff urls on postman and their headers