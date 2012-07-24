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
