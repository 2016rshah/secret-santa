var express = require('express');
var app = express();
var randomizer = require('./randomizer')
app.use(express.static('views'));

app.set('view engine', 'jade');

app.get('/randomize/:documentId', function(req, res){
	//Sock Wars: 16kn25KuOApNV-qptCcpDHSotEmlhawMLj5k94ePKGMQ
	//Secret Santa: 1zlqvP1NIlx1mVQ2ruyARQyzuSLIWvHX2xz_r0bMbAiY
	randomizer.getNames(req.params.documentId, function(data){
		var names = data
		var gs = []
		var rs = []
		for(var i = 0; i<names.length; i++){
			gs.push(names[i].person)
			rs.push(names[i].givingTo.person)
		}
		res.render('results', {"rs":rs, "gs":gs});
	})
})
app.get('/', function(req, res) {
    res.render('index');
})

app.listen(3000)
console.log("App listening on 3000")