function doTests(isTestSession){
    if(isTestSession){
        ScaleTests();
        ChordTests();
        ChordMappingTest();
    }
}
function ChordMappingTest(){
    var CM = new chordMapping();
    test('ChordMappingTest',function () {
        equal(CM.notesToNumbers(new Array('c','e','g')).join('-'),'0-4-7','Notes to numbers');
        equal(CM.buildChord(new Array(0,4,7)).join('-'),'Dur-c','047build c dur');
        equal(CM.buildChord(new Array(0,7,4)).join('-'),'Dur-c','074build c dur');
        equal(CM.buildChord(new Array(4,0,7)).join('-'),'Dur-c','407build c dur');
        equal(CM.buildChord(new Array(4,7,0)).join('-'),'Dur-c','470build c dur');
        equal(CM.buildChord(new Array(7,4,0)).join('-'),'Dur-c','740build c dur');
        equal(CM.buildChord(new Array(7,0,4)).join('-'),'Dur-c','704build c dur');
        equal(CM.buildChord(new Array(5,8,0)).join('-'),'Moll-f','build f moll');
        equal(CM.buildChord(new Array(0,3,7)).join('-'),'Moll-f','build f moll');
        equal(CM.buildChord(new Array(5,8,0)).join('-'),'Moll-f','build f moll');
    });
}
// -----------------------------------------------------------------------
function ScaleTests(){
var myScale = new scale(); 
    test("Scale.limitToLenght", function () {
        equal(myScale.limitToLenght(0) , 0, "scale 0 -> 0");
        equal(myScale.limitToLenght(11) , 11, "scale 11 -> 11");
        equal(myScale.limitToLenght(12) , 0, "scale 12 -> 0");
        equal(myScale.limitToLenght(-1) , 11, "scale -1 -> 11");
        equal(myScale.limitToLenght(-2) , 10, "scale -2 -> 10");
        equal(myScale.limitToLenght(-12) , 0, "scale -12 -> 0");
        equal(myScale.limitToLenght(-13) , 11, "scale -13 -> 11");
    });
    test("Scale.getNoteByNumber", function () {
        equal(myScale.getNoteByNumber(0)  , 'c', "scale  0 -> c");
        equal(myScale.getNoteByNumber(11) , 'h', "scale 11 -> h");
        equal(myScale.getNoteByNumber(12) , 'c', "scale 12 -> c");
        equal(myScale.getNoteByNumber(-1) , 'h', "scale -1 -> h");
    });
    test("Scale.getNumberByNote", function () {
        equal(myScale.getNumberByNote('c') , 0, "scale c -> 0");
        equal(myScale.getNumberByNote('h') , 11, "scale h -> 11");
    });
}

// -----------------------------------------------------------------------
function ChordTests(){
var myChord = new chord('Moll'); 
    myChord.setIntervalls(new Array (0,4,7));
    test("Chord.limitToLenght", function () {
        equal(myChord.isDefined(),false,'isDefined == undefined');
        equal(myChord.isDefined(1),true,'isDefined == defined');
        equal(myChord.NotesSort(new Array (1,4,7)).join("-"),'1-4-7','numsort(1-4-7)->1-4-7');
        equal(myChord.NotesSort(new Array (4,7,1)).join("-"),'4-7-13','numsort(4-7-1)->4-7-13');
        equal(myChord.NotesSort(new Array (7,1,4)).join("-"),'7-13-16','numsort(7-1-4)->7-13-16');
        equal(myChord.NotesSort(new Array (4,0,7)).join("-"),'4-12-19','zweiter Test a');
        equal(myChord.NotesSort(new Array (12,19,4)).join("-"),'12-19-28','zweiter Test b');
        equal(myChord.isUpwardRow(new Array(1,2,3)),true,'is a upward Row');
        equal(myChord.isUpwardRow(new Array(1,3,2)),false,'is not a upward Row');
        equal(myChord.getName(),'Moll', 'Akkordname is Moll');
        equal(myChord.NotesToIntervalls(new Array (1,2,3)).join("-"),'1-1', 'Intervalls is 1-1');
        equal(myChord.NotesToIntervalls(new Array(2,3,0)).join("-"),'1--3', 'Intervalls is 1-9');
        equal(myChord.NotesToIntervalls(new Array(2,1,11)).join("-"),'-1-10', 'after sort -> 2-13-23-> Intervalls is 11-10');
        equal(myChord.ShiftPosNoteBy12(new Array(1,2),0).join("-"),'2-13','2-13 shift');
        equal(myChord.ShiftPosNoteBy12(new Array(1,2,3,4),0).join("-"),'2-3-4-13','0 pos shift');
        equal(myChord.ShiftPosNoteBy12(new Array(1,2,3,4),1).join("-"),'1-3-4-14','1 pos shift');
        equal(myChord.ShiftPosNoteBy12(new Array(1,2,3,4),2).join("-"),'1-2-4-15','2 pos shift');

        var inversions = myChord.Inversions(new Array(1,2,3));
        equal(inversions[0].join('-'),'1-1','testInversios[0]');
        equal(inversions[1].join('-'),'1-10','testInversios[1]');
        equal(inversions[2].join('-'),'10-1','testInversios[2]');
        equal(inversions[3].join('-'),'1-1','testInversios[3]');
        equal(inversions[4].join('-'),'2-11','testInversios[4]');
        equal(inversions[5].join('-'),'13-1','testInversios[5]');
        equal(myChord.chompareInversion(new Array (new Array(3,4),new Array(4,5),new Array (5,3)),new Array(5,4)),false,'komisches Mapping');
        equal(myChord.chompareInversion(myChord.Inversions(new Array(1,2,3)),new Array(10,1)),true,'matchtd');
        equal(myChord.chompareInversion(myChord.Inversions(new Array(1,2,3)),new Array(10,2)),false,'matchtd');


        myChord.setInversions(new Array(0,4,7));
        equal(myChord.compareChord(new Array(5,9)),false,'its a to small');
        equal(myChord.compareChord(new Array(0,3,7)),false,'its a Mollchord');
        equal(myChord.compareChord(new Array(3,7,12)),false,'its a Mollchord');
        equal(myChord.compareChord(new Array(7,12,15)),false,'its a Mollchord');
        equal(myChord.compareChord(new Array(12,15,19)),false,'its a Mollchord');
        equal(myChord.compareChord(new Array(0,4,7)),true,'its  a Dur-chord');
        equal(myChord.compareChord(new Array(4,7,12)),true,'its  a Dur-chord');
        equal(myChord.compareChord(new Array(7,12,16)),true,'its  a Dur-chord');
        equal(myChord.compareChord(new Array(12,16,19)),true,'its  a Dur-chord');
        equal(myChord.compareChord(new Array(12,4,19)),true,'its  a Dur-chord');
        equal(myChord.increaseNotes(new Array(1,2,3)).join('-'),'1-2-3','increase 1-2-3');
        equal(myChord.increaseNotes(new Array(1,3,2)).join('-'),'1-3-14','increase1-3-2');
        equal(myChord.increaseNotes(new Array(3,1,2)).join('-'),'3-13-14','increase3-1-2');
        equal(myChord.increaseNotes(new Array(3,2,1)).join('-'),'3-14-13','increase3-2-1');
        equal(myChord.increaseNotes(new Array(2,3,1)).join('-'),'2-3-13','increase2-3-1');
        equal(myChord.increaseNotes(new Array(2,1,3)).join('-'),'2-13-15','increase2-1-3');
        // test inversion number
        myChord.setInversions(new Array(0,4,7));
        equal(myChord.getChordAndRootNote(new Array(0,4,7)).join('-'),'Moll-0','its moll 047');
        equal(myChord.getChordAndRootNote(new Array(0,7,4)).join('-'),'Moll-0','its moll 074');
        equal(myChord.getChordAndRootNote(new Array(4,0,7)).join('-'),'Moll-1','its moll 407');
        equal(myChord.getChordAndRootNote(new Array(7,0,4)).join('-'),'Moll-1','its moll 704');
        equal(myChord.getChordAndRootNote(new Array(4,7,0)).join('-'),'Moll-2','its moll 470');
        equal(myChord.getChordAndRootNote(new Array(7,4,0)).join('-'),'Moll-2','its moll 740');
    });
}
