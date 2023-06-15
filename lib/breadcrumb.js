const path = require('path');

const buildBreadcrumb = pathname => {
    const pathchunks = pathname.split('/').filter(element => element !== '');
    console.log(`pathChunks ${pathchunks}`);

    let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;

    let link = '/';
    pathchunks.forEach((item, index) => {
        if(index !== pathchunks.length - 1) {
            link = path.join(link, item);
            breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;

        }
        else{
            breadcrumb += `<li class="breadcrumb-item" aria-current = "page">${item}</li>`;
        }
    });
    return breadcrumb;
};

module.exports = buildBreadcrumb;