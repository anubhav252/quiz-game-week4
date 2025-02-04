const http = require('http');
const fs = require('fs');
const path = require('path');


function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveStaticFile(res, './public/index.html', 'text/html');
        } else if (req.url.match(/.css$/)) {
            serveStaticFile(res, `./public${req.url}`, 'text/css');
        } else if (req.url.match(/.js$/)) {
            serveStaticFile(res, `./public${req.url}`, 'application/javascript');
        } else if (req.url === '/questions') {
            fs.readFile('./questions.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading questions.json:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 - Internal Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Not Found');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('405 - Method Not Allowed');
    }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
