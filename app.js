app = require('express.io')()
app.http().io()
var randomizer = require('./randomizer')
var names;
app.io.route('gotNames', function(req) {
	console.log("got here")
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
    req.io.emit("giversAndRecievers", {
    	message: [givers, recievers]
    })
})
app.io.route('gotDocumentId', function(req){
	console.log("Id: ", req.data)
	randomizer.getNames(req.data, function(data){
		names = data
		console.log("Data randomized")
		req.io.route("gotNames")
	})
})
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html')
})
app.listen(3000)
console.log("App listening on 3000")