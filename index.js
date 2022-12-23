const fs = require('fs');
//const { fstat } = require('fs');
const http = require('http');
const url = require('url');

// // Blocking, Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the text update ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('file written');
// // Non-Blocking Asynchronous way
// fs.readFile('./txt/start.txt','utf-8',(err,data1) => {
// fs.readFile(`./txt/${data1},'utf-8',(err,data2) => {
// console.log(data2);
// });
// });
// console.log('will read file');
////////////////////////////////
// SERVER
 const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
 const tempOverview =  fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
 const tempProduct =  fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
 const tempCard =  fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
 const dataObj = JSON.parse(data);
 const replaceTemplate = (temp,product) => {
    let replacedTemp = temp;
    //replacedTemp = temp;
    //let prod = JSON.parse(product);pricep
    replacedTemp  = replacedTemp.replace(/{%productName%}/g,product.productName);
    replacedTemp  = replacedTemp.replace(/{%id%}/g,product.id);
    replacedTemp  = replacedTemp.replace(/{%image%}/g,product.image);
    replacedTemp  = replacedTemp.replace(/{%price%}/g,product.price);
    replacedTemp  = replacedTemp.replace(/{%from%}/g,product.from);
    replacedTemp  = replacedTemp.replace(/{%nutrients%}/g, product.nutrients);
    replacedTemp  = replacedTemp.replace(/{%description%}/g,product.description);
    replacedTemp  = replacedTemp.replace(/{%quantity%}/g,product.quantity);
    console.log(replacedTemp);
    return replacedTemp;

 }
const server = http.createServer((req,res) => {
    console.log(req.url);
    const pathName = req.url;
    // OverView
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{'content-type':'text/html'});
        const cardHtml = dataObj.map(e1 => replaceTemplate(tempCard,e1)).join('');
        const outputHtml = tempOverview.replace('{%productCards%}',cardHtml);
        res.end(outputHtml);        
    }else if(pathName === '/' || pathName === '/product'){
         res.writeHead(200,{'content-type':'text/html'});
        res.end(homePage);        
    }else if(pathName === '/api'){            
        res.writeHead(200,{'content-type':'application/json'});
        res.end(data);
        console.log('executing');
    }else{
        res.writeHead(404,{'content-type':'text/html',
        'my-own-header':'hello-world'
    });
        res.end('<h1>Page Not Found!</h1>'); 
    }
});
server.listen(3000,()=>{
console.log('Listeing to request on port 3000');
});

