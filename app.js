var express = require('express');
var app = express();
app.locals.pretty = true; //jade 방식 예쁘게 변경
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public')); //정적 동적이 무엇인가?
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
})
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
})
app.get('/', function(req, res){
  res.send('Hello home page');
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0;i<5;i++){
    lis = lis + '<li>coding</li>'; //정적일땐 반복문 못하나?
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
`
  res.send(output);
})
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
  res.send('Login please');
});
app.listen(3000, function(){
  console.log('Connected 3000 port!');
});