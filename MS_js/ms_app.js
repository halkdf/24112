var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');  // jade 유지
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.get('/form', function(req, res){
    res.render('form');
});

app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ',' + description);
});
app.post('/form_receiver', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ',' + description);
})
app.get('/topic', function(req, res){
    var topics = [
        'JavaScript is...',
        'Nodejs is...',
        'Express is...'
    ];

    var id = req.query.id;
    var output = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[id]}
    `;

    res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id + ',' + req.params.mode);
});

app.get('/template', function(req, res){
    res.render('temp', { time: Date(), _title: 'Jade' });
});

app.get('/', function(req, res){
    res.send('Hello home page');
});

app.get('/dynamic', function(req, res){
    var lis = '';
    for (var i = 0; i < 5; i++) {
        lis += '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Dynamic Page</title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul>
            ${time}
        </body>
    </html>`;
    res.send(output);
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">');
});

app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});
