function chordMapping (){
    this.chords = new chordStore();
    this.chords.loadChords();
    this.scales = new scale();
}
chordMapping.prototype.getValue = function (name){
    return document.getElementById(name).value;
}
chordMapping.prototype.pushToArray  = function (inputArray,value){
    if(typeof(value) == 'string' && value != ''){
        inputArray.push(value);
    }
    return inputArray;
}
chordMapping.prototype.writeChordType = function (name){
    document.getElementById("chordType").innerHTML = name;
}
chordMapping.prototype.writeNote = function (noteName){
    document.getElementById("chordNote").innerHTML = noteName;
}
chordMapping.prototype.writeScaleToElement = function (name){
    document.getElementById(name).innerHTML = this.scales.getScale().join(" - ");
}
chordMapping.prototype.writeChordToElement = function (name){
  var chordTypes = this.chords.Chords;
    var collectToTable = '';
   for (var i=0;i<chordTypes.length;i++){
        collectToTable += "<tr><td>"+chordTypes[i].name+"</td></tr>";
    }
    console.log(collectToTable);
    document.getElementById(name).innerHTML = collectToTable;
}
chordMapping.prototype.getNotes = function (){
    var notes = new Array();
    this.pushToArray(notes,this.getValue('noteEins'));
    this.pushToArray(notes,this.getValue('noteZwei'));
    this.pushToArray(notes,this.getValue('noteDrei'));
    this.pushToArray(notes,this.getValue('noteVier'));
    this.pushToArray(notes,this.getValue('noteFuenf'));
    this.pushToArray(notes,this.getValue('noteSechs'));
    return notes;
}
chordMapping.prototype.notesToNumbers = function (notes){
    var numberArray = new Array();
    for (var i=0;i<notes.length;i++){
        numberArray.push(this.scales.getNumberByNote(notes[i]));
    }
    return numberArray;
}
chordMapping.prototype.buildChord = function(numberNotes){
    var chordTypes = this.chords.Chords;
    var returnChord = new Array();
    for(var i=0;i<chordTypes.length;i++){
         var matchChord = chordTypes[i].getChordAndRootNote(numberNotes)
        if(matchChord){
         var rootNumber = numberNotes[matchChord[1]];
         matchChord[1] = this.scales.getNoteByNumber(rootNumber);
      //  console.log(matchChord);
         break;
        }
    }
    return matchChord;
}
chordMapping.prototype.whichChord = function(){
    var notes = this.getNotes();
    var numberNotes = this.notesToNumbers(notes);
    var buildedChord = this.buildChord(numberNotes);
    this.writeChordType(buildedChord[0]);
    this.writeNote(buildedChord[1]);
}
// überprüfe die Noten aus den felder auf Chord
// überprüfe die Noten aus den felder auf inversion nummer
// gib ergibnisse aus
