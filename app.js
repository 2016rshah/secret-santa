app = require('express.io')()
app.http().io()
var randomizer = require('./randomizer')
var names;
randomizer.getNames('1zlqvP1NIlx1mVQ2ruyARQyzuSLIWvHX2xz_r0bMbAiY', function(data){
	names = data
	console.log("Data randomized")
})




// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
	var givers = [];
	for(var i = 0; i<names.length; i++){
		givers.push(names[i].first + " " + names[i].last)
	}
	console.log("Givers: ", givers)
	var recievers = [];
	for(var i = 0; i<names.length; i++){
		reciever = names[i].givingTo
		recievers.push(reciever.first+ " " + reciever.last)
	}
	console.log("Recievers: ", recievers)
    req.io.emit('givers', {
        message: givers
    })
    req.io.emit('recivers', {
    	message: recievers
    })
})

// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html')
})

app.listen(3000)
console.log("App listening on 3000")