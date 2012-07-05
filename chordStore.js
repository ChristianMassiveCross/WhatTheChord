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
    Chords.push(this.buildChord('+5',new Array (0,4,8)));
    Chords.push(this.buildChord('6',new Array (0,4,7,9)));
    Chords.push(this.buildChord('6/9',new Array (0,2,4,7)));
    Chords.push(this.buildChord('maj7',new Array (0,4,7,11)));
    Chords.push(this.buildChord('maj7+5',new Array (0,5,7,11)));
    Chords.push(this.buildChord('maj9',new Array (0,2,4,7,11)));
    Chords.push(this.buildChord('maj11',new Array (0,4,7,11,5)));
    Chords.push(this.buildChord('m-5',new Array (0,3,6)));
    Chords.push(this.buildChord('m6',new Array (0,3,7,9)));
    Chords.push(this.buildChord('m6/9',new Array (0,3,7,9,2)));
    Chords.push(this.buildChord('m7',new Array (0,3,7,10)));
    Chords.push(this.buildChord('m7-5',new Array (0,3,6,10)));
    Chords.push(this.buildChord('dim7',new Array (0,3,6,9)));
    Chords.push(this.buildChord('mMaj7',new Array (0,3,7,11)));
    Chords.push(this.buildChord('mMaj9',new Array (0,3,7,11,2)));
    Chords.push(this.buildChord('mAdd9',new Array (0,3,7,2)));
    Chords.push(this.buildChord('m7',new Array (0,3,6,10)));
    Chords.push(this.buildChord('m9',new Array (0,2,3,7,10)));
    Chords.push(this.buildChord('m11',new Array (0,3,7,10,2,5)));
    Chords.push(this.buildChord('m9(no5)',new Array (0,2,3,10)));
    Chords.push(this.buildChord('7',new Array (0,4,7,10)));
    Chords.push(this.buildChord('7/6',new Array (0,4,7,9,10)));
    Chords.push(this.buildChord('7/13',new Array (0,4,7,9,10)));
    Chords.push(this.buildChord('7-9',new Array (0,4,7,10,1)));
    Chords.push(this.buildChord('7+9',new Array (0,4,7,10,3)));
    Chords.push(this.buildChord('7-5',new Array (0,4,6,10)));
    Chords.push(this.buildChord('7+5',new Array (0,4,8,10)));
    Chords.push(this.buildChord('9',new Array (0,2,4,7,10)));
    Chords.push(this.buildChord('+9',new Array (0,2,4,7,10)));
    Chords.push(this.buildChord('9-5',new Array (0,2,4,6,10)));
    Chords.push(this.buildChord('9+5',new Array (0,2,4,8,10)));
    Chords.push(this.buildChord('9/6',new Array (0,2,4,6,7,10)));
    Chords.push(this.buildChord('11',new Array (0,4,7,10,2,5)));
    Chords.push(this.buildChord('+11',new Array (0,4,7,10,2,5)));
    Chords.push(this.buildChord('11-9',new Array (0,4,7,10,2,6)));
    Chords.push(this.buildChord('13',new Array (0,4,7,10,3)));
    Chords.push(this.buildChord('add9',new Array (0,4,7,2)));
    Chords.push(this.buildChord('aug',new Array (0,4,8)));
    Chords.push(this.buildChord('sus2',new Array (0,2,7)));
    Chords.push(this.buildChord('sus4',new Array (0,5,7)));
    Chords.push(this.buildChord('7sus4',new Array (0,5,7,10)));
    Chords.push(this.buildChord('-9',new Array (0,1,4,7,10)));
    Chords.push(this.buildChord('-9+5',new Array (0,1,4,8,10)));
    Chords.push(this.buildChord('-9+11',new Array (0,1,4,6,7,10)));
    Chords.push(this.buildChord('-9',new Array (0,1,4,6,10)));
    Chords.push(this.buildChord('test',new Array (0)));
    this.Chords = Chords;
}
