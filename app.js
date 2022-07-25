const express = require('express');
const html_to_pdf = require('./utils/html2pdf');

// Initiate Server Instance
const port = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded());
app.use(express.json());

// Empty Index
app.get('/', async (req,res) => {
  res.send(`<!doctype html><html lang="en"><head><title>6d PDF Generator</title></head><body><h1>Thank you for coming, you should go somewhere else now 🚶</h1></body></html>`)
})

app.get('/url',async (req, res) => {
    console.log('before errors')
    let errors = [];


    // if URL is not provided
    // if filename is not provided

    if(typeof req.body.url == 'undefined'){
        errors.push("505051 Request is not structured properly");
    }

    if(typeof req.body.filename == 'undefined'){
        errors.push("505052 Request is not structured properly");
    }

    console.log('after push error')

    if(errors.length > 0){
        console.log('there is error')
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ message: errors });
        return false;
    }

    // No Errors, proceeding

    try{
        let options = { 
            format: 'A4',
            headless: true,
            args: ['--disable-dev-shm-usage', '--no-sandbox'],
            displayHeaderFooter: true,
            headerTemplate: `<h1 style="background:black; color:white; margin:0; padding:6px; font-size: 24px;">Testing Header</h1>`,
            footerTemplate: `<h1 style="background:black; color:white; margin:0; padding:6px; font-size: 24px;">Testing Footer</h1>`,
            
            margin: { 
                top: "100px", 
                bottom: "200px",
                right: "30px",
                left: "30px",
              }
        };

        let file = { url: req.body.url };

        const pdfBuffer = await html_to_pdf.generatePdf(file, options);

        res.set('Pragma', 'no-cache');
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
        res.set(`Content-disposition', 'attachment; filename=${req.body.filename}`);
        res.set('Content-Description', 'File Transfer');
        res.set('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Length', pdfBuffer.length);

        res.type('application/pdf');
        res.send(pdfBuffer)

        return true;
    }
    catch(error){
        console.error(error);
        return false;
    }

})

app.listen(port, () => console.log(`6D PDF Generator Listening On ${port}!`))