var GoogleSpreadsheet = require("google-spreadsheet");
var main = function(spreadSheetId, callback){
    var my_sheet = new GoogleSpreadsheet(spreadSheetId);
    var names = []
    my_sheet.getRows( 1, function(err, row_data){
        for(var i = 0; i<row_data.length; i++){
            var entry = row_data[i].content.split(",")
            var name = entry[0].replace("name: ", "")
            names.push({"person":name})
        }
        names = assignAllNames(names)
        callback(names);
    })
}
var assignAllNames = function(names){
    var names2 = names.slice(0); //cheap way to duplicate the array
    var names2 = shuffle(names2)
    for(var i = 0; i<names.length; i++){
        names[i].givingTo = names2[i]
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
        if(array[i].person == array[i].givingTo){
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