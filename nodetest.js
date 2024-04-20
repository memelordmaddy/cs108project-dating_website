const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    let filePath;

    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Determine the file path based on the request URL
    if (pathname === '/' || pathname === '/login.html') {
        filePath = path.join(__dirname, 'login.html');
    } else if (pathname === '/match.html') {
        // Serve match.html file without appending index parameter
        filePath = path.join(__dirname, 'match.html');
    } else {
        // Handle requests for other resources (e.g., CSS, JavaScript)
        filePath = path.join(__dirname, req.url);
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        } 
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
