const https = require('https');


//link to a json file on github which contains all extension and their mime type
const mimeURL = 'https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json';

const getMimeTYpe = extension => {
    return new Promise((resolve, reject) => {
        https.get(mimeURL, res => {
            if(res.statusCode < 200 || reject.statusCode>299) {
                reject(`error: failed to load mime: ${res.statusCode}`);
                console.log(`error: failed to load mime: ${res.statusCode}`);
                return false
            }

        let data = '';

        //you receive data by chunks
        res.on('data', chunk => {
           data += chunk;
        });

        //once you receive all chunks of data
        res.on('end', () => {
            resolve(JSON.parse(data)[extension]);             //this will convert ur content to an array and then we'll use the extension
        })

        }).on('error', (e) => {
            console.error(e);
        }); 
    });
};

module.exports = getMimeTYpe;