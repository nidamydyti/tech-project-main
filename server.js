var express = require('express'),
    path = require('path'),
    http = require('http'),
    doc = require('./routes/docs');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/docs', doc.findAll);
app.get('/docs/:id', doc.findById);
app.post('/docs', doc.addDoc);
app.put('/docs/:id', doc.updateDoc);
app.delete('/docs/:id', doc.deleteDoc);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
