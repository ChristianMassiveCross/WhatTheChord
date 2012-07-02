        function chordStore (){
    this.Chords;
}
chordStore.prototype.buildChord = function(Name,notes){
    var returnObject = new chord(Name);
    returnObject.setInversions(notes);
    returnObject.setIntervalls(notes);
    return returnObject;
}
chordStore.prototype.loadChords = function (){
    var Chords = new Array;
    Chords.push(this.buildChord('Dur',new Array (0,4,7)));
    Chords.push(this.buildChord('Moll',new Array (0,3,7)));
    Chords.push(this.buildChord('7sus4',new Array (0,5,7,10)));
    Chords.push(this.buildChord('5',new Array (0,7)));
    Chords.push(this.buildChord('-5',new Array (0,4,6)));
    Chords.push(this.buildChord('6',new Array (0,4,7,9)));
    Chords.push(this.buildChord('6/9',new Array (0,2,4,7)));
    Chords.push(this.buildChord('maj7',new Array (0,4,7,11)));
    Chords.push(this.buildChord('maj7+5',new Array (0,5,7,11)));
    Chords.push(this.buildChord('maj9',new Array (0,2,4,7,11)));
    Chords.push(this.buildChord('Moll6',new Array (0,3,7,9)));
    Chords.push(this.buildChord('Moll7',new Array (0,3,7,10)));
    Chords.push(this.buildChord('Moll7',new Array (0,3,6,10)));
    Chords.push(this.buildChord('Moll9',new Array (0,2,3,7,10)));
    Chords.push(this.buildChord('Moll9(ohne5)',new Array (0,2,3,10)));
    Chords.push(this.buildChord('7',new Array (0,4,7,10)));
    Chords.push(this.buildChord('7-9',new Array (0,1,4,7,10)));
    Chords.push(this.buildChord('7-5',new Array (0,4,6,10)));
    Chords.push(this.buildChord('9',new Array (0,2,4,7,10)));
    Chords.push(this.buildChord('aug',new Array (0,4,8)));
    Chords.push(this.buildChord('sus2',new Array (0,2,7)));
    Chords.push(this.buildChord('sus4',new Array (0,5,7)));
    this.Chords = Chords;
}
