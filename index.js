/*

WordPlay Server (node.js)
The Office For Creative Research
May, 2014 - updated 2/5/18

https://github.com/blprnt/wordplay

*/

const express = require('express')
const app = express();

const stylus = require('stylus')
const nib = require('nib')
const marked = require('marked')

const appRoot = require('app-root-path');

const wp = require(appRoot + '/wordplay.js');



//CONFIGURE JADE, NIB, STYLUS
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')


app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

//PAGE SERVING

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Simple, free-text linguistic search' }
  )
})

app.get('/:corpus/:input', function (req, res) {
  res.render('index',
  { title : 'Simple, free-text linguistic search', defCorpus: req.params.corpus, defInput: req.params.input }
  )
})

//API CALLS
app.get('/wp/:corpus/:input/:max', function(req, res){
  //res.send('Process ' + req.params.input + ' from ' + req.params.corpus);
  res.send(JSON.stringify(wp.getWordMatches(req.params.input, req.params.corpus, req.params.max)), null, 4);
});

app.get('/wp/:corpus/:input', function(req, res){
  //res.send('Process ' + req.params.input + ' from ' + req.params.corpus);
  res.send(JSON.stringify(wp.getWordMatches(req.params.input, req.params.corpus, 20)), null, 4);
});

//START IT UP.
var server = app.listen(12892, function() {
    console.log('Listening on port %d', server.address().port);
});




