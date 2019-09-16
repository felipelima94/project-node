const http = require('http');
const fs = require('fs');


console.log('http://localhost:3001');

http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    
    
    if(url === '/' && method === 'POST') {
        let body = []

        req.on('data', chunk => {
            body.push(chunk);
        })
        req.on('end', () => {
            const bodyParsed = JSON.parse(Buffer.concat(body));
            const fileName = 'data.json'

            let oldData = fs.readFileSync(fileName, 'utf8') || null
            let dataLoaded = oldData != null ? JSON.parse(oldData) : []

            let newKeys = Object.keys(bodyParsed)

            newKeys.forEach(dt => dataLoaded[dt] = bodyParsed[dt])

            // dataLoaded.push(JSON.parse(bodyParsed))

            let dataToSave = JSON.stringify(dataLoaded)
            fs.writeFileSync(fileName, dataToSave, 'utf8')
            
            res.setHeader('Content-Type', 'application/json');        
            res.write(dataToSave)
            res.end()
        })
    }

    console.log(url, method)
}).listen(3001);