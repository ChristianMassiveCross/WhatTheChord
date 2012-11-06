function scale (){
    this.allNotes = new Array("c","c#","d","d#","e","f","f#","g","g#","a","a#","b");
}
//---------------------------------------------------------------------------------------- 
scale.prototype.getScale = function(Value){
    return this.allNotes;
};
//---------------------------------------------------------------------------------------- 
scale.prototype.limitToLenght = function(Value){
    if(Value < 0){
        Value *= -1;
        Value = Value % this.allNotes.length;
        Value = this.allNotes.length - Value;
    }
    return Value % this.allNotes.length;
};
//---------------------------------------------------------------------------------------- 
scale.prototype.getNoteByNumber = function(number){
    number = this.limitToLenght(number); 
    return this.allNotes[number];
}
//---------------------------------------------------------------------------------------- 
scale.prototype.getNumberByNote = function(Note){
    result = false;
    for(var i = 0; i<this.allNotes.length;i++){
        if (Note == this.getNoteByNumber(i)){
            result = i;
            break;
        }
    }
    return result;
}
