/* Say you have a `pages` dir which holds all .html files. You want to create a local server, which has routes to all these different pages.
    - Example below:
 */


// pass-in HostName:Port to create server
async function makeServer(hostName, port){

    http.createServer(async (req, res) => {
        // create URL for server and define http://---------
        const myURl = new URL(req.url, `http://${hostName}:${port}`);
        //console.log(`myURL.pathname = ${myURl.pathname}`);
        //console.log(`__dirname = ${__dirname}`);

        // get current path to display page contents based on 'myURL.pathname'
        const filePath = path.join(__dirname, myURl.pathname === '/' ? 'index.html' : `/${myURl.pathname}`);
        //console.log(`filePath = ${filePath}`);

        try {
            // try to display home page by reading .html file data
            const data = await fs.readFile(filePath, 'utf-8');
            res.writeHead(200,{'Content-type':'text/html'});
            res.write(data);
            res.end();
        } catch (error) {
            // else display 404 page
            try {
                const erData = await fs.readFile('pages/404.html', 'utf-8');
                res.writeHead(404, {'Content-type':'text/html'});
                res.end(erData);
            }
            catch (error) {
                res.writeHead(500, {'Content-type': 'text/plain'});
                res.end('Internal Server Error');
                console.log("Error reading 404.html");
            }
        }

    }).listen(port, () => {
        console.log(`Server started at http://${hostName}:${port}`);
    });
}
await makeServer('localhost', 8080);