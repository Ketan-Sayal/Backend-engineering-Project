const { createServer } = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const PORT = 80;

const welomePage = fs.readFileSync(path.join(__dirname, 'html', 'welcome.html'), 'utf-8');
const loginPage = fs.readFileSync(path.join(__dirname, 'html', 'login.html'), 'utf-8');
const feeStucturePage = fs.readFileSync(path.join(__dirname, 'html', 'feestructure.html'), 'utf-8');
const preparePage = fs.readFileSync(path.join(__dirname, 'html', 'prepare.html'), 'utf-8');
const discoverPage = fs.readFileSync(path.join(__dirname, 'html', 'discover.html'), 'utf-8');
const coursesPage = fs.readFileSync(path.join(__dirname, 'html', 'courses.html'), 'utf-8');
const communityPage = fs.readFileSync(path.join(__dirname, 'html', 'community.html'), 'utf-8');
const homePage = fs.readFileSync(path.join(__dirname, 'html', 'home.html'), 'utf-8');
const signUpPage = fs.readFileSync(path.join(__dirname, 'html', 'signUp.html'), 'utf-8');
const rankingPage = fs.readFileSync(path.join(__dirname, 'html', 'ranking.html'), 'utf-8');
const resourcesPage = fs.readFileSync(path.join(__dirname, 'html', 'resources.html'), 'utf-8');
const careersPage = fs.readFileSync(path.join(__dirname, 'html', 'careers.html'), 'utf-8');
const eventsPage = fs.readFileSync(path.join(__dirname, 'html', 'events.html'), 'utf-8');
const mockDataPath = path.join(__dirname, 'Mock_data.json');
let mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

const server = createServer((req, res) => {
    res.setHeader('Content-type', 'text/html');
    let resUrl = url.parse(req.url).pathname;

    switch (resUrl) {
        case '/':
            res.statusCode = 200;
            res.end(welomePage);
            break;
        case '/login':
            res.statusCode = 200;
            if (req.method === "GET") res.end(loginPage);
            if (req.method === 'POST') {
                let body = '';
                req.on("data", (result) => body += result);
                req.on('end', () => {
                    let obj = qs.parse(body);
                    const user = mockData.find(user => user.username === obj.username && user.pass === obj.password);
                    if (user) {
                        res.statusCode = 302;
                        res.setHeader('Location', '/home');
                    } else {
                        res.statusCode = 302;
                        res.setHeader('Location', '/signup');
                    }
                    res.end();
                });
            }
            break;

            case '/signup':
                if (req.method === "GET") {
                    res.statusCode = 200;
                    res.end(signUpPage);
                }
                if (req.method === "POST") {
                    let body = '';
                    req.on('data', (data) => body += data);
                    req.on('end', () => {
                        let obj = qs.parse(body);
            
                        const existingUser = mockData.find(user => user.username === obj.username);
            
                        if (existingUser) {
                            res.statusCode = 409;
                            res.end('<h1>Username already exists!</h1>');
                        } else {
                           
                            mockData.push({ id: mockData.length+1, username: obj.username, pass: obj.password });
                            fs.writeFile(mockDataPath, JSON.stringify(mockData), (err) => {
                                if (err) {
                                    console.error("Error writing to Mock_data.json:", err);
                                    res.statusCode = 500;
                                    res.end('<h1>Internal Server Error</h1>');
                                } else {
                                    res.statusCode = 302;
                                    res.setHeader('Location', '/home');
                                    res.end();
                                }
                            });
                        }
                    });
                }
                break;
            

        case '/rankings':
            res.statusCode = 200;
            res.end(rankingPage);
            break;

        case '/home':
            res.statusCode = 200;
            res.end(homePage);
            break;
        case '/community':
            res.statusCode = 200;
            res.end(communityPage);
            break;

        case '/courses':
            res.statusCode = 200;
            res.end(coursesPage);
            break;
        case '/discover':
            res.statusCode = 200;
            res.end(discoverPage);
             break;
        
        case '/feestructure':
            res.statusCode = 200;
            res.end(feeStucturePage);
            break;
            case '/Resources':
                res.statusCode = 200;
                res.end(resourcesPage);
                break;
                case '/careers':
                    res.statusCode = 200;
                    res.end(careersPage);
                    break;
                case '/prepare':
                    res.statusCode = 200;
                    res.end(preparePage);
                    break;
                case '/events':
                    res.statusCode = 200;
                    res.end(eventsPage);
                    break;
        default:
            res.statusCode = 404;
            res.end(`<h1 style="font-size:100px; font-weight:bold;">Page not Found 404</h1>`);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});