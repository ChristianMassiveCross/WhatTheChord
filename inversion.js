function inversion (intervalls,rootNoteNumber){
    this.intervalls = intervalls;
	this.rootNoteNumber = rootNoteNumber;
}
//---------------------------------------------------------------------------------------- 
inversion.prototype.getRootNoteNumber = function(Value){
    return this.rootNoteNumber;
};
//---------------------------------------------------------------------------------------- 
inversion.prototype.isInversionEqual = function(testInversion){
	var returnValue = false;
	if (testInversion.join('-') == this.intervalls.join('-')){
		returnValue = true;
	}
    return returnValue;
};
