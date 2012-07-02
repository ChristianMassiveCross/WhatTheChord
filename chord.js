function chord (name){
    this.name = name;
    this.Notes;
    this.intervalls;
    this.inversions;
    this.inversionNumber;
}
/** to clone Array (copied from somewhere)
**/
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
// -----------------------------------------------------------------------
chord.prototype.getName = function(){
    return this.name;
}
// -----------------------------------------------------------------------
chord.prototype.getIntervallsAsNotes = function(){
    return this.Notes;
}
// -----------------------------------------------------------------------
chord.prototype.getInversions = function(){
    return this.inversions;
}
// -----------------------------------------------------------------------
chord.prototype.getInversionNumber = function(){
    return this.inversionNumber;
}
// -----------------------------------------------------------------------
chord.prototype.setIntervalls = function(notes){
    this.intervalls = notes;
}
// -----------------------------------------------------------------------
chord.prototype.isDefined = function(Value){
    return (typeof(Value) != "undefined");
}
/** tests if the incomming notes are in one line like: 1,2,3
    and not 3,2,1 or 1,3,2
**/
chord.prototype.isUpwardRow = function (notes){
    var returnValue = true;
    for(var i=0;i<notes.length-1;i++){
        if(notes[i] >= notes[i+1]){
            returnValue = false;
            break;
        }
    }
    return returnValue;
}
/** checks if 2 Notes are in a Upward line like 1,2,3
    if not, will the second number increased by 12
**/
chord.prototype.increaseNotes = function(notes){
    for(var i=0;i<notes.length-1;i++){
        if(notes[i] >= notes[i+1]){
            notes[i+1] += 12;
        }
    }
    return notes;
}
/** sort the inconming notes Array as long as is in a Upward row **/
chord.prototype.NotesSort = function (notes){
    do{
       notes = this.increaseNotes(notes);
    }while(!this.isUpwardRow(notes.clone()));
       notes = this.increaseNotes(notes);
return notes;
}
/** calculate from the incomming notes Array the intervalls
    between the single notes like: 1,3,6 => 2,6**/
chord.prototype.NotesToIntervalls = function(notes){
    intervalls = new Array();
    for(var i=0;i<notes.length-1;i++){
            intervalls.push(notes[i+1] - notes[i]);
    }
    return intervalls;
}
/** shift at the position which is given by shiftPos at the End of the notesArray **/
chord.prototype.ShiftPosNoteBy12 = function (notes,shiftPos){
    shiftedNotes = new Array();
    for(var i=0;i<notes.length;i++){
        if(shiftPos != i){
            shiftedNotes.push(notes[i]);
        }
    }
    shiftedNotes.push(notes[shiftPos]+12);
    return shiftedNotes;
}
/** loops over all Positions and build the inversions**/
chord.prototype.InversionsWithShiftedPos = function(inversions,notes,shiftPos){
    inversions.push(this.NotesToIntervalls(notes));
    for(var i=0;i<notes.length-1;i++){
        notes = this.ShiftPosNoteBy12(notes,shiftPos);
        notes = this.NotesSort(notes);
        inversions.push(this.NotesToIntervalls(notes));
    }
    return inversions;
}

/** build all inversions from the incomming notesArray**/
chord.prototype.Inversions = function (notes){
    var inversions = new Array();
    for(var i=0;i<notes.length-1;i++){
       this.InversionsWithShiftedPos(inversions,notes,i);
    }
    return inversions;
}
/** build all inversion for this notes, and store it into inversion Classvar**/
chord.prototype.setInversions = function(notes){
    this.inversions = this.Inversions(notes);
}
/** compares a incomming Testinversions array with all possible Inversions**/
chord.prototype.chompareInversion = function(inversions,test){
    returnValue = false;
    for(var i=0;i<inversions.length;i++){
        if(inversions[i].join('-') == test.join('-')){
            this.inversionNumber = i;
            returnValue = true;
            break;
        }
    }
    return returnValue;
}
/** compares a incomming note Array with the own Chords**/
chord.prototype.compareChord = function(notes){
    notes = this.NotesSort(notes);
    inputInversions = this.Inversions(notes);
    returnValue = false;
    if(this.inversions.length != inputInversions.length) return false;
    for(var i=0;i<this.inversions.length;i++){
        if(this.chompareInversion(inputInversions,this.inversions[i])){
            returnValue = true;
            break;
        }
    }
    return returnValue;
}
/** If the incomming array matches with own, this Functions will return the root note of the accord**/
chord.prototype.getChordAndRootNote = function (notes){
    var returnArray = new Array();
    if(this.compareChord(notes)){
        returnArray[0] = this.name;
        returnArray[1] = this.inversionNumber;
    }
    return returnArray;
}

