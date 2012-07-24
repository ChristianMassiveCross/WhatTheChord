function scaleConverter (scaleArray,scaleName){
    this.scale = new scale(scaleArray,scaleName);
}
//---------------------------------------------------------------------------------------- 
scaleConverter.prototype.getScale = function(Value){
    return this.scale.getScale();
};
//---------------------------------------------------------------------------------------- 
scaleConverter.prototype.getScaleName = function(Value){
    return this.scale.getScaleName();
};
//---------------------------------------------------------------------------------------- 
scaleConverter.prototype.isTheValueAlreadyInTheArray = function(TestArray,TestValue){
	var returnValue = false;
	for(var i = 0; i < TestArray.length;i++){
		if( TestArray[i] == TestValue){
			returnValue = true; 
			break;
		}	
	}
	return returnValue;
}
//---------------------------------------------------------------------------------------- 
scaleConverter.prototype.killDoubleNotes = function(notes){
	var returnArray = new Array();
	for(var i = 0; i < notes.length;i++){
		if (!this.isTheValueAlreadyInTheArray(returnArray,notes[i])){
			returnArray.push(notes[i]);
		}
	}
    return returnArray;
};
//----------------------------------------------------------------------------------------
scaleConverter.prototype.notesToNumbers = function(notes){
	var noteNumbers = new Array();
	for (var i=0;i<notes.length;i++){
		noteNumbers.push(this.scale.getNumberByNote(notes[i]));
	}
	
return noteNumbers;
}
//---------------------------------------------------------------------------------------- 
scaleConverter.prototype.calcIntervalls = function(noteNumbers){
	var intervalls = new Array();
	for (var i = 0;i<noteNumbers.length-1;i++){
		intervalls.push(noteNumbers[i+1]-noteNumbers[i]);
	}
    return intervalls;
};
//----------------------------------------------------------------------------------------
scaleConverter.prototype.notesToIntervalls = function(notes){
	var intervalls = new Array();
	var noteNumbers = this.notesToNumbers(notes);
	noteNumbers = noteNumbers.sort();
	noteNumbers = this.killDoubleNotes(noteNumbers);
    return this.calcIntervalls(noteNumbers);
};
//----------------------------------------------------------------------------------------
scaleConverter.prototype.IntervallsToNotes = function(intervalls,rootNote){
	var notes = new Array();
	var rootNoteShift = this.scale.getNumberByNote(rootNote);
	var lastIntervall = 0;
	notes.push(this.scale.getNoteByNumber(lastIntervall+rootNoteShift));// the first note is always the root note
	for (var i=0;i<intervalls.length;i++){	
		lastIntervall += intervalls[i];
		notes.push(this.scale.getNoteByNumber(lastIntervall+rootNoteShift));
	}
    return notes;
};
