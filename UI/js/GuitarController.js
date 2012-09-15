/*
*	Controller for selecting notes on the guitar & get the suitable chord
*
*	@author		Thomas Hurtig <contact@thomashurtig.de>
*	@version	0.1
*/

// initialize Chord Mapping	
var chordMapping = new chordMapping();


function GuitarController($scope) {

	var parent = $scope.parent;

	$scope.notes_clicked = [];
	$scope.notes_0		 = [];

	var last_mouse_x 	 = 0;
	$scope.numbers       = false;
	$scope.labelNumbers  = 'Numbers';
	$scope.labelClear    = 'Clear';

	angular.copy(notes_0, $scope.notes_clicked);
	angular.copy(notes_0, $scope.notes_0);

	$scope.chord         = getChord($scope.notes_clicked);

	setNotes(0);					//initialize notes with fret 0
	$scope.setNotes = setNotes;
	$scope.strings = [$scope.notes_e, $scope.notes_b, $scope.notes_g, $scope.notes_d, $scope.notes_a, $scope.notes_e];


//-------------- Notes ----------------------------

	function setNotes(fret) {

		if (fret < 0 ) {
			
			fret = 0;
		
		} else if (fret > 7) {

			fret = 7; 
		
		}
	
		$scope.notes_e = [];
		$scope.notes_a = [];
		$scope.notes_d = [];
		$scope.notes_g = [];
		$scope.notes_b = [];

		for (var i = fret; i <= fret+4; i++) {
		
			$scope.notes_e.push( notes_e[i] );
			$scope.notes_a.push( notes_a[i] );
			$scope.notes_d.push( notes_d[i] );
			$scope.notes_g.push( notes_g[i] );
			$scope.notes_b.push( notes_b[i] );
		}
	}


	$scope.clickNote = function(note, string) {

		if ($scope.notes_clicked.length <= 6) {
		
			if ( angular.equals($scope.notes_clicked[string-1], note) ) {

				$scope.notes_clicked[string-1] = notes_0[string-1];

			} else {

				$scope.notes_clicked[string-1] = note;

			}
		}

		$scope.chord = getChord($scope.notes_clicked);
	};


	$scope.isActiveNote = function (note, string) {

		if ( angular.equals($scope.notes_clicked[string-1], note) ) {
			
			return 'active';
		
		} else {

			return '';
		}
	};


//-------------- Controls -------------------------------

	$scope.toggleShowNumbers = function () {

		$scope.numbers = !$scope.numbers;

		if ($scope.numbers) {
			
			$scope.labelNumbers = 'Numbers';

		} else {

			$scope.labelNumbers = 'Notes';

		}
	};


	$scope.clearNotesClicked = function () {

		angular.copy(notes_0, $scope.notes_clicked);

	}


	$scope.moveSlider = function($event, dragSlider) {

		var target   = angular.element($event.target);
		var dif_x    = $event.clientX - last_mouse_x;
		var slider_x = target.css("left");

		target.removeClass('transition');
		
		slider_x = (slider_x == '') ? 0 : slider_x;
		var new_x = parseInt(slider_x) + dif_x;


		if (dragSlider && new_x >= 0 && new_x <= 203) {

			target.css("left", new_x +"px");
			
		}

		last_mouse_x = $event.clientX;

	}

	$scope.roundSlider = function ($event) {

		var target   = angular.element($event.target);
		var new_x	 = parseInt(target.css("left"));

		var pos_locks 	 = [0, 33, 67, 100, 135, 169, 203];
		var pos_lock_idx = '';
		var rounded_pos  = 0;
		var last 	 	 = 0;
		var x 			 = 0;

		target.addClass('transition');


		for (var i = 0; i <= 6; i++) {

			x = Math.abs(new_x - pos_locks[i]);

			if( x < last ) {

				rounded_pos = pos_locks[i];
			}

			last = x;
		
		}

		target.css("left", rounded_pos +"px");
		
	}

	function setFretPos() {

		

	}

}



/*
*	Returns builded chord with chord name and additional notation (eg. chord.name=e, chord.add=maj7) 
*	from clicked_notes array
*
*	@param		Array
*	@return 	{name, add}
*/

function getChord(notes) {

	var notes 	  = angular.copy(notes);
	var noteNames = [];
	var lastName  = '';

	notes.sort( function(a, b) {
		return a.name < b.name;
	});


	for (var i = notes.length - 1; i >= 0; i--) {

		var name = notes[i].name;

		if (lastName != name) {

			noteNames.push(name);	

		}

		lastName = name;
	}
	
	var buildedChord = chordMapping.buildChord( chordMapping.notesToNumbers(noteNames) );

	if (buildedChord[1] != null) {

		return {name: buildedChord[1], add: buildedChord[0]};

	} else{

		return null;
	}
}