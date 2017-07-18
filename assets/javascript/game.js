// Crystals Collectors Game JavaScript
// Author: Sofia Fernandez
// Goal: Match Target Score with random earned points from each crystal selected.


$(document).ready(function() {

	var counter = 0;
	var completes = 0;
	var fails = 0;

	//This is the Crystal Selection Array
	var crystals = ['assets/images/crystal_white.png','assets/images/crystal_green.png','assets/images/crystal_orange.png','assets/images/crystal_blue.png'];

	// Update value on #completes with the value on var completes
	$('#completes').text(completes);

	// Update value on #fails with the value on var fails 
	$('#fails').text(fails);
	

	function newCrystals () {
		var numbers = []
			while(numbers.length < 4){
			  var randomnumber = Math.ceil(Math.random()*12)
			  var found = false;
			  for (var i=0; i< numbers.length; i++){
				if (numbers[i] == randomnumber){
					found = true; break
				}
			  }
			  if(!found)numbers[numbers.length]=randomnumber;
			}
		//console.log(numbers);		

		for (i = 0; i < numbers.length; i++) {
			var imageCrystal = $('<img>');
			imageCrystal.attr('data-num', numbers[i]);
			imageCrystal.attr('src', crystals[i]);
			imageCrystal.attr('alt', 'crystalCollection');
			imageCrystal.addClass('crystalImage')
			$('#crystalCollection').append(imageCrystal);
		}
	}

	function newGame() {
		// Start counter at 0
		counter = 0;
		$('#quotaScore').text(counter);

		function randomIntFromInterval(min,max){
		   	return Math.floor(Math.random()*(max-min+1)+min);
			}

		//This is the Target Quota the Player wants to meets.
		var quotaToMatch = randomIntFromInterval(19,120);
		$('.value').text(quotaToMatch);

		//Once a Crystal is Clicked, do the following:
		$('.crystalImage').on('click', function(){
		    counter = counter + parseInt($(this).data('num'));
		   	
		    $('#quotaScore').text(counter);

		    // The Player wins if the current quota is the same as the target quota
		    if (counter == quotaToMatch){
		      $('#status').text('Congratulations! You completed the target quota!');
		      completes ++;
		      $('#completes').text(completes);
		      //console.log(completes)

		      // Reset the game
		      $('#crystalCollection').empty();
		      newCrystals();
		      newGame();

		     // The player fails if the current quota is more than target quota
		    } else if ( counter > quotaToMatch){
		        $('#status').text('You collected too much! Try again.')
		        fails ++;
		        $('#fails').text(fails);
		        //console.log(fails)

		        // Reset the game
		        $('#crystalCollection').empty();
		        newCrystals();
		        newGame();
		    }
		});
	}

	//Run newCrystals function
	newCrystals();
	//Run newGame function
	newGame();


});