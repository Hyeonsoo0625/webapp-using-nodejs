var express = require('express');
var bodyParser = require('body-parser'); //post 사용
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true; //jade 예쁘게 하는 코드
app.set('views', './views_file'); //jade 쓰기 위함
app.set('view engine', 'jade'); //jade 쓰기 위함
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
}); //새 파일 만드는 곳
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    } else {
      res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for server.'});
    }
  })
}); //홈페이지 및 파일 설명
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
