var GoogleSpreadsheet = require("google-spreadsheet");
var main = function(spreadSheetId, callback){
    var my_sheet = new GoogleSpreadsheet(spreadSheetId);
    var names = []
    my_sheet.getRows( 1, function(err, row_data){
        for(var i = 0; i<row_data.length; i++){
            var entry = row_data[i].content.split(",")
            var name = entry[0].split(" ")
            var person = new Person(name[1], name[2])
            names.push(person)
        }
        names = assignAllNames(names)
        console.log(names)
        callback(names);
    })
}
var Person = function(firstName, lastName, givingTo){
    this.first = firstName
    this.last = lastName
    this.givingTo = ""
}
Person.prototype.assignPerson = function(assignedPerson){
    this.givingTo = assignedPerson
}
Person.prototype.toString = function(){
    var res = this.first+this.last
    return res
}
var assignAllNames = function(names){
    var names2 = names.slice(0);
    var names2 = shuffle(names2)
    for(var i = 0; i<names.length; i++){
        names[i].assignPerson(names2[i])
    }
    if(checkWorks(names)){
        return names
    }
    else
        return assignAllNames(names)
}
function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}
var checkWorks = function(array){
    for (var i = 0; i < array.length; i++) {
        if(array[i] == array[i].givingTo){
            return false
        }
    };
    return true
}
module.exports = {
    getNames : function(spreadSheetId, callback){
        main(spreadSheetId, function(data){
            callback(data)

        })
    }
}