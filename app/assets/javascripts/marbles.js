
$(document).ready(() => {
  
/* Listen for player hitting the Save button */

  $('[id="Save"]').on("click", function(){
	  
	  var header = document.getElementById("header").innerHTML;
	  
/* get the players list */
	    yplayer = $("#game_yplayer").val();
	    gplayer = $("#game_gplayer").val();
	    rplayer = $("#game_rplayer").val();
	    bplayer = $("#game_bplayer").val();	  
	    playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
	
/*
-------------------------------------------------		
		 New Game is being created 
-------------------------------------------------		
*/
	    if (header == "New Game") {

/* Randomly set who gets to play first  */
		  	number_players = playerList.length;
			turn = (Math.floor(Math.random() * number_players));
			alert(playerList[turn][0] + "-" + playerList[turn][1] + " gets to play first.");
			$("#game_turn").val(turn.toString());
			
/* Initialize the Board */
		    initializeBoard();		 
			$("#game_board").val(board.toString());
			$("#game_status").val("Started");
			$("#game_winner").val("");
			$("#game_moved").val("");
			$("#game_plays").val("0");
			
/* Initialize the deck */
			deck = fulldeck;
			discardpile = [];
			
/* Initialize the screen positions of players hands, discard pile and deck */
			screencoords = ["365", "435", "365", "435", "365", "435", "365", "435"];
			$("#game_screen").val(screencoords);
			
/* Deal cards for first time */
			shuffle(deck);
			dealCards();
			$("#game_deck").val(deck.toString());
			$("#game_discardpile").val(discardpile.toString());
			$("#game_greenhand").val(greenhand.toString());
			$("#game_redhand").val(redhand.toString());
			$("#game_bluehand").val(bluehand.toString());
			$("#game_yellowhand").val(yellowhand.toString());
		}
		

/* 
-------------------------------------------------		
		Players Turn is being saved 
-------------------------------------------------
*/

		else if (header == "Marbles Game") {
			
	/* get the marble paths array */
			get_paths();

	/* save the end of move board positions */
			board_end = ($("#game_board").val()).split(",");
			
	/* check if move is valid and if not, reset board to start of move */
			if (checkMove(playedCard, board_start, board_end) == false) {
				/* Move was not valid */
				alert("There was a problem with your move.  Take your turn over.");
				/* Restore board and hands to point before the last move */
				board = board_start;
				yellowhand = yellowhand_start;
				greenhand = greenhand_start;
				redhand = redhand_start;
				bluehand = bluehand_start;
				deck = deck_start;
				discardpile = discardpile_start;
				$("#game_deck").val(deck.toString());
				$("#game_discardpile").val(discardpile.toString());
				$("#game_greenhand").val(greenhand.toString());
				$("#game_redhand").val(redhand.toString());					
				$("#game_bluehand").val(bluehand.toString());					
				$("#game_yellowhand").val(yellowhand.toString());					
				$("#game_board").val(board.toString());
				$("#game_screen").val(screencoords).toString();
			} else {
				/* Move is valid - page values will be saved to the database */
				/* Need to save the screen coordinates in case anyone moved their hand to a new spot during their move.*/
				hand_div = document.getElementById("hand");
				x_coord = hand_div.offsetLeft;
				y_coord = hand_div.offsetTop;
				saveScreenCoords(x_coord, y_coord, user_color);
				$("#game_screen").val(screencoords).toString();

				/* Need to save the list of marbles that moved this turn for display with green arrows */
				moved_marble_ids = "";
				if (moved_marbles) {
					for (i=0; i<moved_marbles.length; i++) {
						moved_marble_ids = moved_marbles[i][0].toString() + "," + moved_marble_ids;
					}										
				}
				$("#game_moved").val(moved_marble_ids);

				/* Increment the number of plays made */
				plays = parseInt($("#game_plays").val());
				plays++;
				$("#game_plays").val(plays.toString());

				/* Check for game over if all the players playable colors are in their home rows */
				board_str = $("#game_board").val();
				board = board_str.split(",");
				if (gameOver()) {
					if (ryteam && playable_colors.includes("red")) {
						winner = ryteam;
					} else if (gbteam && playable_colors.includes("green")) {
						winner = gbteam;
					} else {
						winner = getPlayerName(playable_colors[0]);
					}
					alert("GAME OVER!!  Congratulations to " + winner + " for winning the game!");
					$("#game_status").val("Finished");
					$("#game_winner").val(winner);				
				} else {
					/* Set next persons turn */
				  	number_players = playerList.length;
					/* To be fair, the next person in line to play should play even if cards have to be redealt */
					turn_fair = turn + 1;
					if (turn_fair >= number_players) {
						turn_fair = 0;
					}
					/* Now see if anyone can play */
					turn = -1;
					next = parseInt($("#game_turn").val());
					next = next + 1;
					for (i=0; i<number_players; i++) {
						/* look at the next players hand to see if they have any cards left to play */
						if (next >= number_players) {
							next = 0;
						}
						/* Check to see if this player has any cards left to play */
						next_color = playerList[next][1];
						playerhand_str = "#game_" + next_color + "hand";
						playerhand = ($(playerhand_str).val()).split(",");
						if (playerhand[0] == "") {
							next = next + 1;
						} else {
							turn = next;
							turn_color = next_color;
							break;
						}					
					}
					if (turn != -1) {
						/* There is a player who still has cards left to play */
						$("#game_turn").val(turn.toString());	
					} else {
						/* Nobody else can play now - must shuffle and redeal the cards */
						alert("Nobody else can play now.");
						alert("Another hand will be dealt.");
						dealCards();
						displayCards(turn_color);
						turn = turn_fair;
						$("#game_turn").val(turn.toString());
						$("#game_deck").val(deck.toString());
						if (discardpile.length > 0) {
							$("#game_discardpile").val(discardpile.toString());							
						}
						$("#game_greenhand").val(greenhand.toString());
						$("#game_redhand").val(redhand.toString());
						$("#game_bluehand").val(bluehand.toString());
						$("#game_yellowhand").val(yellowhand.toString());
					}						
				}					
			}			
			
	/* lock the discard pile by setting last discard as the discard background */
			discardElement = document.getElementById("discardpile");
			if ( discardElement.childNodes[0]) {
				discard = discardElement.childNodes[0];
				discard_url = discard.getAttribute('src');
				discardElement.removeChild(discardElement.childNodes[0]);
			  	discard_background = "url(" + discard_url + ")";
			  	$("#discardpile").css('backgroundImage', discard_background);
			}
									
		}
  })


/*
------------------------------------------------- 
 INTIIALIZE Constants for all pages (New Game, Show Game and New Turn)
-------------------------------------------------
*/	
		var board = [];
		var playerList = [];
		var deck = [];
		var discardpile = [];
		var hand = [];
		var greenhand = [];
		var redhand = [];
		var bluehand = [];
		var yellowhand = [];
		var fulldeck = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS","J1","J2","J3","J4"];
		var cardvalue = 
		[2, 2, 2, 2, 3, 3, 3, 3, -4, -4, -4, -4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 1, 1, 1, 1, 0, 0, 0, 0, 13, 13, 13, 13, 12, 12, 12, 12, 15, 15, 15, 15];
		var marbleids = 
		["g21", "g22", "g23", "g24", "r45", "r46", "r47", "r48", "b69", "b70", "b71", "b72", "y93", "y94", "y95", "y96"];
		var outCards = ["KH","KS","KD","KC","AH","AS","AD","AC","J1","J2","J3","J4"];
		var red_home_holes = [17, 18, 19, 20];
		var blue_home_holes = [41, 42, 43, 44];
		var yellow_home_holes = [65, 66, 67, 68];
		var green_home_holes = [89, 90, 91, 92];
		var red_start_holes = [45, 46, 47, 48];
		var blue_start_holes = [69, 70, 71, 72];
		var yellow_start_holes = [93, 94, 95, 96];
		var green_start_holes = [21, 22, 23, 24];
		startHoles = red_start_holes.concat(blue_start_holes, yellow_start_holes, green_start_holes);
		homeHoles = red_home_holes.concat(blue_home_holes, yellow_home_holes, green_home_holes);
		
		var headerElement = document.getElementById("header");
		var header = headerElement.innerHTML;

/*		
----------------------------------------------------		
	NEW GAME STARTS HERE (CREATE MODE)
----------------------------------------------------

*/		 
	if (header == "New Game") {
		$("#myCanvas").addClass("hidden");
		$("#game_status").val("Started");
		$("#game_turn").val("0");
		$("#game_plays").val("0");
		var greenplayer = false;
		var yellowplayer = false;
		var redplayer = false;
		var blueplayer = false;
		playedCard = "";
		discardpile = [];
/* Initialize the board to all empty */
		board.fill("");

/* Intiailize the screen coordinates for the players hands, discard pile and deck */
		screencoords = ["365", "435", "365", "435", "365", "435", "365", "435"];
		$("#game_screen").val(screencoords.toString());
	}

/*	
----------------------------------------------------	
	SHOW GAME STARTS HERE (SHOW MODE) between turns
----------------------------------------------------	
	
*/
	if (header == "Show Game") {
				
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var game_name = document.getElementById("game_name").innerHTML;
		var game_status = document.getElementById("game_status").innerHTML;
		var turn = parseInt(document.getElementById("game_turn").innerHTML);
		var refresh_rate = parseInt(document.getElementById('game_refresh').innerHTML);
		var plays = parseInt(document.getElementById('game_plays').innerHTML);
		var comment = document.getElementById("game_comment").innerHTML;
		user_name = document.getElementById("user_name").innerHTML;
		id = document.getElementById("game_id").innerHTML;
/* convert strings in page to arrays */	
		var board = (document.getElementById("game_board").innerHTML).split(",");
		var deck = (document.getElementById("game_deck").innerHTML).split(",");
		/* If deck is empty, make sure it is truly empty */
		if (deck[0] == "") {
			deck = [];
		}
		discardpile = document.getElementById("game_discardpile").innerHTML.split(",");
		/* If discardpile is empty, make sure it is truly empty */
		if (discardpile[0] == "") {
			discardpile = [];
		}
		moved = document.getElementById("game_moved").innerHTML.split(",");
/* Get the card hands for each player and the screen coordinates for their hands */
		greenhand = document.getElementById("game_greenhand").innerHTML.split(",");
		redhand = document.getElementById("game_redhand").innerHTML.split(",");
		bluehand = document.getElementById("game_bluehand").innerHTML.split(",");
		yellowhand = document.getElementById("game_yellowhand").innerHTML.split(",");
		screencoords = document.getElementById("game_screen").innerHTML.split(",");

/* Get the player list */
		playerList = [];
		yplayer = document.getElementById("game_yplayer").innerHTML;
		gplayer = document.getElementById("game_gplayer").innerHTML;
		rplayer = document.getElementById("game_rplayer").innerHTML;
		bplayer = document.getElementById("game_bplayer").innerHTML;
		ryteam = document.getElementById("game_ryteam").innerHTML;
		gbteam = document.getElementById("game_gbteam").innerHTML;
		playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
		player = playerList[turn][0];
		turn_color = playerList[turn][1];

/* Check every few seconds to see if player has made a move (plays count incremented).  Frequency of checks set by refresh_rate. */
		if (refresh_rate < 2) {
			refresh_rate = 2;			
		}
		setInterval(function() {			
	  	    $.ajax({
			  url: "/games/"+id+"/query",
	  		  dataType: 'json',
	  	      success: function(data) {
				  var old_plays = document.getElementById("game_plays").innerHTML;
	  			  var new_plays = data.plays;
	  			  if ( new_plays != old_plays) {
	  				location.reload();
					old_plays = new_plays;
	  			  }
	  	      },
		      error: function (jqXHR, textStatus, errorThrown) {
		        alert('error: ' + textStatus + ': ' + errorThrown);
		      }
	  	  });					
		}, refresh_rate*1000);						

/* Get the current user's color */
		user_color_list = [];
		for (i=0; i<playerList.length; i++) {
			if (playerList[i][0] == user_name) {
				user_color_list.push(playerList[i][1]);
			}
		}
/* Set the users color. It will be set to the current turn color if the user is playing that color.
	Otherwise it will be set to the next color that user happens to be playing */
		i = turn;
		while ( !user_color_list.includes(playerList[i][1]) ) {
			i++;
			if (i >= playerList.length) {
				i = 0;
			}
		}
		user_color = playerList[i][1]; 

/* draw the board and card area */
		drawBoard();
		drawCardArea();

/* show the card on top of the discard pile */
		if (discardpile.length != 0) {
	  	  discard_background = "url(/cards/" + discardpile[0] + ".png)";
	  	} else {
	  	  discard_background = "discard_background.png";
	  	}	  
		discardElement = document.getElementById("discardpile");
		discardElement.style.backgroundImage = discard_background;
		document.body.appendChild(discardElement);
	  	 
/* Display cards of person who is logged in */
		if (user_color != ""){
			displayCards(user_color);
			updateBoardArray();	
		}

/* Put arrow beside the marbles that moved last turn */
		drawArrows();

/* Set all elements on board to be non-draggable since this is Show mode only */
		p = document.getElementsByTagName("div");
		for (i = 0; i < p.length; i++) {
			p[i].setAttribute("draggable", "false");
		}
		p = document.getElementsByTagName("IMG");
		for (i = 0; i < p.length; i++) {
			p[i].setAttribute("draggable", "false");
		}
		p = document.getElementsByClassName("card");
		for (i = 0; i < p.length; i++) {
			p[i].setAttribute("draggable", "false");
		}

	}
	
		
/*

----------------------------------------------------
	NEW TURN STARTS HERE (EDITING MODE)
----------------------------------------------------
*/

	if (header == "Marbles Game") {	
/* Pull content from page into internal storage */
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var game_name = $("#game_name").val();
		var game_status = $("#game_status").val();
		var turn = parseInt($("#game_turn").val());
		var comment = $("#game_comment").val();
		user_name = document.getElementById("user_name").innerHTML;

/* convert strings in form to arrays */	
		var board = ($("#game_board").val()).split(","); 
		var deck = ($("#game_deck").val()).split(",");
		/* If deck is empty, make sure it is truly empty */
		if (deck[0] == "") {
			deck = [];
		}
		var discardpile = ($("#game_discardpile").val()).split(",");
		/* If discardpile is empty, make sure it is truly empty */
		if (discardpile[0] == "") {
			discardpile = [];
		}
		greenhand = ($("#game_greenhand").val()).split(",");
		redhand = ($("#game_redhand").val()).split(",");
		bluehand = ($("#game_bluehand").val()).split(",");
		yellowhand = ($("#game_yellowhand").val()).split(",");
		screencoords = ($("#game_screen").val()).split(",");
	  	yplayer = $("#game_yplayer").val();
		gplayer = $("#game_gplayer").val();
		rplayer = $("#game_rplayer").val();
		bplayer = $("#game_bplayer").val();
		ryteam = $("#game_ryteam").val();
		gbteam = $("#game_gbteam").val();
		
/* get the players list */
	    playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
		var player = playerList[turn][0];
		var turn_color = playerList[turn][1];
		playedCard = "";  

/* This is edit mode so the user color is same as the turn color */
		user_color = turn_color; 

/* Normal Page processing */
		drawBoard();
		drawCardArea();

/* Display cards of person whose turn it is */
		displayCards(turn_color);
		updateBoardArray();
		
/* Save everything back out to the page at this point in case it was updated during the move */
		$("#deck").val(deck.toString());
		$("#game_discardpile").val(discardpile.toString());
		$("#greenhand").val(greenhand.toString());
		$("#redhand").val(redhand.toString());
		$("#bluehand").val(bluehand.toString());
		$("#yellowhand").val(yellowhand.toString());
				
	}
	
/* Save board and card hands at start of turn */
	board_start = board;
	yellowhand_start = yellowhand;
	greenhand_start = greenhand;
	redhand_start = redhand;
	bluehand_start = bluehand;
	discardpile_start = discardpile;
	deck_start = deck;

/* Control is now turned over to drag and drop functions of browser */


	
/* -----------------------------FUNCTIONS----------------------------------- */

	function shuffle(array) {
		for (i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}						
	}

/* Display the hand */
	function displayCards(turn_color) {
		hand = document.getElementById("hand");
		while (hand.firstChild) {
			hand.removeChild(hand.lastChild);
		}
		if (turn_color == "green") {
			var playerhand = greenhand;
		} else if (turn_color == "yellow") {
			var playerhand = yellowhand;
		} else if (turn_color == "red") {
			var playerhand = redhand;
		} else if (turn_color == "blue") {
			var playerhand = bluehand;
		}
		for (i=0; i<=4; i++) {
			if (playerhand[i]) {
				cardImage = "/cards/" + playerhand[i] + ".png";
				spot = "hand";
				placeCard(spot, playerhand[i], cardImage);
			}
		}
		if (discardpile[0]) {
	  	  discard_background = "url(/cards/" + discardpile[0] + ".png)";
	  	  $("#discardpile").css('backgroundImage', discard_background);
		}
	}

	function placeCard(spot, card_id) {
		var c = document.createElement("IMG");
		card_image = "/cards/" + card_id + ".png";
		c.setAttribute("id", card_id);
		c.className = "card";
		c.src = "/cards/" + card_id + ".png";
		c.src = card_image;
		c.setAttribute("draggable", "true");
		c.setAttribute("ondragstart", "drag(event)");
		c.style.width = "65px";
		c.style.height = "100px";
/* put the card into the DOM */
		h = document.getElementById(spot);
		h.appendChild(c);		
	}


	function drawBoard() {		

/* draw marble holes and card areas on a canvas first to get positioning */
		board_offset = 50;
		board_size = 800 - 2 * board_offset;
		centre_x = board_offset + board_size/2;
		centre_y = board_offset + board_size/2;
		
		var radius = board_size * 0.5;
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var arc_centre_x = 0;
		var arc_centre_y = 0;
		var arc_radius = board_size * 0.4;
		var start_angle = 0.0;
		var end_angle = 0.0;
		var hole_nbr = 0.0;
		var hole_x = 0.0;
		var hole_y = 0.0;
		var hole_color = "";
		
		var arcHoleNbrs = [1,25,49,73];
		var homeHoleNbrs = [86, 14, 38, 62];
		var startHoleNbrs = [21, 45, 69, 93];
		var colorList = ["yellow", "green", "red", "blue"];

	/* Allow drops onto the board canvas */
		c.setAttribute("ondrop", "drop(event)");
		c.setAttribute("ondragover", "allowDrop(event)");

	/* Board Orientation: For board rotations to put current player's home at bottom of screen */
		if (user_color == "yellow") {
			colorIndex = 0;
		} else if (user_color == "green") {
			colorIndex = 1;
		} else if (user_color == "red") {
			colorIndex = 2;
		} else if (user_color == "blue") {
			colorIndex = 3;
		}

	/* Draw board border */
/*		ctx.strokeRect(0, 0, 800, 800); */
		ctx.beginPath();
		ctx.lineWidth = "6";
		ctx.strokeStyle = "#663300";
		ctx.moveTo(0,800);
		ctx.lineTo(800,800);
		ctx.moveTo(800,800);
		ctx.lineTo(800,0);
		ctx.stroke();

	/* Make uppper left arc 270 to 360 degrees*/
		arc_centre_x = board_offset;
		arc_centre_y = board_offset;
		start_angle = 3*Math.PI/2;
		holeIndex = colorIndex;
		start_nbr = arcHoleNbrs[holeIndex];
		ctx.beginPath();
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);

	/* Make upper right arc 180 to 270 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset + board_size;
		arc_centre_y = board_offset;
		start_angle = Math.PI;
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		start_nbr = arcHoleNbrs[holeIndex];
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make lower right arc 90 to 180 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset + board_size;
		arc_centre_y = board_offset + board_size;
		start_angle = Math.PI/2;
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		start_nbr = arcHoleNbrs[holeIndex];
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make lower left arc 0 to 90 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset;
		arc_centre_y = board_offset + board_size;
		start_angle = 0;
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		start_nbr = arcHoleNbrs[holeIndex];
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make left home holes */
		holeIndex = colorIndex;
		c = colorIndex + 1;;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		nbr = homeHoleNbrs[holeIndex];	
		hole_x = board_offset;
		hole_y = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		hole_y = board_offset + board_size/2;
		nbr++;
		makeHole(hole_x, hole_y, "grey", nbr);
		hole_y = (board_offset + board_size/2) - 35;
		nbr++;
		makeHole(hole_x, hole_y, "grey", nbr);
		hole_y = board_offset + board_size/2;
		nbr++;	
		for (i=1; i<=4; i++){
			hole_x = board_offset + i * 35;
			makeHole(hole_x, hole_y, color, nbr);
			nbr = nbr + 1;
		}

	/* Make upper home holes */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = homeHoleNbrs[holeIndex];
		hole_y = board_offset;
		hole_x = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = board_offset + board_size/2;
		for (i=1; i<=4; i++){
			hole_y = board_offset + i * 35;
			makeHole(hole_x, hole_y, color, nbr);
			nbr = nbr + 1;
		}
	
	/* Make right home holes */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = homeHoleNbrs[holeIndex];		
		hole_x = board_offset + board_size;
		hole_y = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_y = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_y = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_y = board_offset + board_size/2;
		for (i=1; i<=4; i++){
			hole_x = (board_offset + board_size) - i * 35;
			makeHole(hole_x, hole_y, color, nbr);
			nbr = nbr + 1;
		}

	/* Make lower home holes */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = homeHoleNbrs[holeIndex];
		hole_y = board_offset + board_size;
		hole_x = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", nbr);
		nbr++;
		hole_x = board_offset + board_size/2;
		for (i=1; i<=4; i++){
			hole_y = (board_offset + board_size) - i * 35;
			makeHole(hole_x, hole_y, color, nbr);
			nbr = nbr + 1;
		}
	
	/* Make Centre Hole */
		hole_x = board_offset + board_size/2;
		hole_y = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "black", 0);


	/* Make Left Starting Row */
		holeIndex = colorIndex;
		/* the color of the left starting holes is actually 1 position beyond the lower player's color */
		c = colorIndex + 1;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];	
		holeIndex = colorIndex;
		nbr = startHoleNbrs[holeIndex];					
		hole_x = board_size / 8;
		hole_y = board_size / 8;
		for (i=nbr; i<=(nbr+3); i++){
			makeHole(hole_x, hole_y, color, i);
			hole_x = hole_x + 25;
			hole_y = hole_y + 25;
		}
		player_name = getPlayerName(color);
		if (player_name != "") {
			x = hole_x - 100;
			y = hole_y + 50;
			labelBoard(x, y, player_name, color, "playername", "leftPlayer");
			x = hole_x - 100 + 10;
			y = hole_y + 50 + 25;
			card_count = getCardCount(color);
			if (card_count>=0) {
				labelBoard(x, y, card_count, "white", "boardlabel", "leftPlayer")			
			} else {
				labelBoard(x, y, "Can't play", "white", "boardlabel", "lowerPlayer");
			}
		}

		
	/* Make Upper Starting Row */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = startHoleNbrs[holeIndex];
		hole_x = board_size + 2*board_offset - board_size/8;
		hole_y = board_size / 8;
		for (i=nbr; i<=(nbr+3); i++){
			makeHole(hole_x, hole_y, color, i);
			hole_x = hole_x - 25;
			hole_y = hole_y + 25;
		}
		player_name = getPlayerName(color);
		if (player_name != "") {
			x = hole_x - 60;
			y = hole_y - 60;
			labelBoard(x, y, player_name, color, "playername", "upperPlayer");
			card_count = getCardCount(color);
			x = hole_x - 60 + 10;
			y = hole_y - 60 + 25;
			if (card_count>=0) {
				labelBoard(x, y, card_count.toString(), "white", "boardlabel", "upperPlayer")			
			} else {
				labelBoard(x, y, "Can't play", "white", "boardlabel", "lowerPlayer");
			}
		}


	/* Make Right Starting Row */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = startHoleNbrs[holeIndex];
		hole_x = board_size + 2*board_offset - board_size/8;
		hole_y = board_size + 2*board_offset - board_size/ 8;
		for (i=nbr; i<=(nbr+3); i++){
			makeHole(hole_x, hole_y, color, i);
			hole_x = hole_x - 25;
			hole_y = hole_y - 25;
		}
		/* Get players name and card count */
		player_name = getPlayerName(color);
		/* Draw the players name */
		player_name = getPlayerName(color);
		if (player_name != "") {
			x = hole_x + 80;
			y = hole_y - 50;
			labelBoard(x, y, player_name, color, "playername", "rightPlayer");
			card_count = getCardCount(color);
			x = hole_x + 80 + 10;
			y = hole_y - 50 + 25;
			if (card_count>=0) {
				labelBoard(x, y, card_count.toString(), "white", "boardlabel", "rightPlayer")			
			} else {
				labelBoard(x, y, "Can't play", "white", "boardlabel", "lowerPlayer");
			}
		}

		
			
	/* Make Lower Starting Row */
		c++;
		if (c > 3) {
			c = 0;
		}
		color = colorList[c];
		holeIndex++;
		if (holeIndex > 3) {
			holeIndex = 0;
		}
		nbr = startHoleNbrs[holeIndex];
		hole_x = board_size / 8;
		hole_y = board_size + 2*board_offset - board_size/8;
		for (i=nbr; i<=(nbr+3); i++){
			makeHole(hole_x, hole_y, color, i);
			hole_x = hole_x + 25;
			hole_y = hole_y - 25;
		}
		/* Draw the players name */
		player_name = getPlayerName(color);
		if (player_name != "") {
			x = hole_x + 20;
			y = hole_y + 60;
			labelBoard(x, y, player_name, color, "playername", "lowerPlayer");
			/* Draw the players card count */
			card_count = getCardCount(color);
			x = hole_x + 20 + 10;
			y = hole_y + 60 + 25;
			if (card_count>=0) {
				labelBoard(x, y, card_count.toString(), "white", "boardlabel", "lowerPlayer")
			} else {
				labelBoard(x, y, "Can't play", "white", "boardlabel", "lowerPlayer");
			}
		}
		
		
	/* Display all the marbles on the board */
		for (i=0; i<=96; i++) {
			if (board[i]) {
				marble_id = board[i];
				marble_image = "/" + marble_id.substring(0,1) + "_marble.png"
				placeMarble(i, marble_id, marble_image);
			}
		}
		
	}	

	function makeArcHoles(centre_x, centre_y, arc_radius, start_radian, start_nbr){
		var nbr = start_nbr;
		var x = 0.0;
		var y = 0.0;
		var radian_increment = (Math.PI/2.0) / 12.0;
		var angle = start_radian;
		var start_angle = start_radian;
		var end_angle = start_radian + Math.PI/2;
		ctx.arc(centre_x, centre_y, arc_radius, start_angle, end_angle);
		while (angle <= end_angle+0.001) {
		    x = centre_x + arc_radius * Math.cos(-angle);
		    y = centre_y + arc_radius * Math.sin(-angle);
			makeHole(x, y, "grey", nbr);
			angle = angle + radian_increment;
			nbr = nbr + 1;
		}
	}

	function makeHole(x, y, color, nbr){
/*	create the div for the hole */
			var d = document.createElement("div");
			var divID = 'hole' + nbr.toString();
			d.setAttribute("id", divID);
			d.style.position = "absolute";
			d.style.left = x.toString() + 'px';
			d.style.top = y.toString() + 'px';
			d.style.width = "30px";
			d.style.height = "30px";
			d.setAttribute("ondrop", "drop(event)");
			d.setAttribute("ondragover", "allowDrop(event)");
			/*	select background image for the hole */
			var hole_image = "empty_hole";
			/* color the holes */
			if ([7, 31, 55, 79].includes(nbr) || color == "black") {
				hole_image = "black_hole.png";				
			} else if (color =="green" || nbr == 1){
				hole_image = "green_hole.png";
			} else if (color == "red" || nbr == 25){
				hole_image = "red_hole.png";
			} else if (color == "blue" || nbr == 49) {
				hole_image = "blue_hole.png";
			} else if (color == "yellow" || nbr == 73) {
				hole_image = "yellow_hole.png"
			} else if (color == "grey") {
				hole_image = "empty_hole.png"
			} else {
				hole_image = "empty_hole.png"
			}
			hole_image = "url(/" + hole_image + ")";
			d.style.backgroundImage = hole_image;
			/* place the hole on the board */
			document.body.appendChild(d);
		
	}


	function drawCardArea() {
		card_width = 65;
		card_height = 100;
		coords = [];
	/* Draw the card hand area */
		var d = document.createElement("div");
		d.setAttribute("id", "hand");
		d.setAttribute("draggable", "true");
		d.setAttribute("ondragstart", "drag(event)");
		d.className = "cardspot";
		d.style.position = "absolute";
		coords = getScreenCoords(user_color);
		d.style.left = coords[0] + "px";
		d.style.top = coords[1] + "px";
		d.style.width = "100px";
		d.style.height = "120px";
		d.style.border = "dashed 1px";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);			

	/* Draw the discard area */
		var d = document.createElement("div");
		d.setAttribute("id", "discardpile");
		d.setAttribute("draggable", "false");
		d.className = "discardspot";
		d.style.position = "absolute";
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 33).toString() + "px";
		d.style.top = ((centre_y + 15) - (card_height*.33) - card_height).toString() + "px";
		d.style.width = "65px";
		d.style.height = "100px";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);
	/* Draw the discard area label */
		var d = document.createElement("div");
		d.setAttribute("id", "discard_label");
		d.style.position = "absolute";
		d.className = "boardlabel";
		d.innerHTML = "Discards";
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 40).toString() + "px";
		d.style.top = ((centre_y + 15) - (card_height*.33) - card_height-20).toString() + "px";
		document.body.appendChild(d);
	/* Draw the discard card count */
		var d = document.createElement("div");
		d.setAttribute("id", "discard_count");
		d.style.position = "absolute";
		d.className = "boardlabel";
		if (discardpile[0]) {
			d.innerHTML = discardpile.length.toString();
		} else {
			d.innerHTML = "0";
		}
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 60).toString() + "px";
		d.style.top = ((centre_y + 15) - (card_height*.33)).toString() + "px";
		document.body.appendChild(d);

	/* Draw the deck area i.e. deal pile */
		var d = document.createElement("div");
		d.setAttribute("id", "deck");
		d.setAttribute("draggable", "false");
		d.className = "cardspot";
		d.style.position = "absolute";
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 25 + 195).toString() + "px";
		d.style.top = ((centre_y + 15) - (card_height*.33) - card_height).toString() + "px";
		d.style.width = "65px";
		d.style.height = "100px";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);
	/* Draw the deck label */
		var d = document.createElement("div");
		d.setAttribute("id", "deck_label");
		d.className = "boardlabel";
		d.style.position = "absolute";
		d.innerHTML = "Deck";
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 40 + 195).toString() + "px";
		d.style.top = "265px";
		document.body.appendChild(d);
	/* Draw the deck card count */
		var d = document.createElement("div");
		d.setAttribute("id", "deck_count");
		d.style.position = "absolute";
		d.className = "boardlabel";		
		if (deck[0]) {
			d.innerHTML = deck.length.toString();
		} else {
			d.innerHTML = "0";
		}		
		d.innerHTML = deck.length.toString();
		d.style.left = (((centre_x + 15) - (5 * card_width)/2) + 45 + 195).toString() + "px";
		d.style.top = ((centre_y + 15) - (card_height*.33)).toString() + "px";
		document.body.appendChild(d);
	}
	
	function makeCardSpot(x, y, spot) {
/*	create the div for the card spots */
		var d = document.createElement("div");
		var divID = spot;
		d.setAttribute("id", divID);
		d.setAttribute("draggable", "false");
		d.className = "cardspot";
		d.style.position = "absolute";
		d.style.left = x.toString() + 'px';
		d.style.top = y.toString() + 'px';
		d.style.width = "65px";
		d.style.height = "100px";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
/* place the card spot on the board */
		document.body.appendChild(d);				
	}
	
	function placeMarble(hole_nbr, marble_id, marble_image){
		var m = document.createElement("IMG");
		m.setAttribute("id", marble_id);
		m.src = marble_image;
		m.setAttribute("draggable", "true");
		m.setAttribute("ondragstart", "drag(event)");
		m.style.width = "35px";
		m.style.height = "35px";
		hole_id = "hole" + hole_nbr.toString();
/* put the marble into the DOM */
		d = document.getElementById(hole_id);
		d.appendChild(m);
	}


	function drawArrows() {
		/* get position of each moved marble and put an arrow on it */
		for (i=0; i<moved.length; i++) {
			mid = moved[i];
			if (mid) {
				marble_element = document.getElementById(mid);
				x = marble_element.parentElement.offsetLeft;
				y = marble_element.parentElement.offsetTop;
				arrow_element = document.createElement("div");
				arrow_element.setAttribute("id", "arrow");
				arrow_element.style.position = "absolute";
				arrow_element.style.width = "50px";
				arrow_element.style.height = "50px";
				arrow_element.style.left = (x-50).toString() + "px";
				arrow_element.style.top = (y-10).toString() + "px";
				document.body.appendChild(arrow_element);								
			}
		}		
	}
			
	function dealCards() {
	  	yplayer = $("#game_yplayer").val();
		gplayer = $("#game_gplayer").val();
		rplayer = $("#game_rplayer").val();
		bplayer = $("#game_bplayer").val();  
	    playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
		/* If any cards left in players hands, add them to bottom of the discard pile */

		if (greenhand[0]) {
			for (i=0; i<greenhand.length; i++) {
				discardpile.push(greenhand[i]);
			}
		}
		if (redhand[0]) {
			for (i=0; i<redhand.length; i++) {
				discardpile.push(redhand[i]);
			}
		}
		if (bluehand[0]) {
			for (i=0; i<bluehand.length; i++) {
				discardpile.push(bluehand[i]);
			}
		}
		if (yellowhand[0]) {
			for (i=0; i<yellowhand.length; i++) {
				discardpile.push(yellowhand[i]);
			}
		}
		
		/* clear out the players hands */

		greenhand = [];
		yellowhand = [];
		redhand = [];
		bluehand = [];


		/* If deck out of cards, empty the discard pile and shuffle the full deck */
		number_players = playerList.length;
		if (deck.length <= 1) {
			alert("No cards left in the deck.  Will shuffle and deal from full deck now.")
			deck = fulldeck;
			shuffle(deck);
			discardpile = [];
		} 	
		/* deal the cards */
		cards_left = deck.length;
		max_deal = cards_left / number_players;
		if ( max_deal > 5) {
			max_deal = 5;
		}
		for (i=0; i<max_deal; i++) {
			if (yplayer) {
				yellowhand.push(deck.pop());
			}
			if (gplayer) {
				greenhand.push(deck.pop());
			}
			if (rplayer) {
				redhand.push(deck.pop());
			}
			if (bplayer) {
				bluehand.push(deck.pop());
			}
		}		
		$("#deck").val(deck.toString());
		$("#discardpile").val(discardpile.toString());
		$("#greenhand").val(greenhand.toString());
		$("#redhand").val(redhand.toString());
		$("#bluehand").val(bluehand.toString());
		$("#yellowhand").val(yellowhand.toString());
		
	}
	

	function initializeBoard() {
	  if ($("#game_yplayer").val()) {
  		  for (p=93; p<=96; p++) {
  			board[p] = "y" + p.toString();
  		  }	
	  }
	  if ($("#game_gplayer").val()) {
		  for (p=21; p<=24; p++) {
			board[p] = "g" + p.toString();
		  }
	  }
	  if ($("#game_rplayer").val()) {
		  for (p=45; p<=48; p++) {
			board[p] = "r" + p.toString();
	      }
	  }
	  if ($("#game_bplayer").val()) {
		  for (p=69; p<=72; p++) {
			board[p] = "b" + p.toString();
	      }	
	  }	
	}

	
	function checkMove(playedCard, board_start, board_end) {
/* Uncomment the line below to turn move checking off for testing purposes */
		/*moved_marbles = [];
		return true; */

/* check for movement of any marbles */
		moved_marbles = [];
		number_players = playerList.length;
		marbles_in_play = 4 * number_players;
		moved_count = 0;
		marble_count = 0;
		distance = 0;
		total_distance = 0;
		marbles_killed = 0;
/* get the card value of the played card to determine how far player can move a marble */
		card_index = fulldeck.indexOf(playedCard);
		card_value = cardvalue[card_index];
/* find out what the playable colors are */
		player_color = playerList[turn][1];
		playable_colors = getPlayableColors(player_color);		
/* Count number of marbles on the board */
		for (p=0; p<=96; p++) {
			if(board_end[p] != "") {
				marble_count++;
			}
		}

		/* Get the specifics of each marble moved this turn e.g. start hole and end hole etc. */
		for ( m= 0; m < marbleids.length; m++) {
			/* set the start_hole and end_hole for any marbles that may not be in play this game */
			start_hole = 99;
			end_hole = 99;
			/* find start and end positions of each marble */
			mid = marbleids[m];
			for (p=0; p<=96; p++) {
				if (board_start[p] == mid) {
					start_hole = p;
				}
			}
			for (p=0; p<=96; p++) {
				if (board_end[p] == mid) {
					end_hole = p;
				}
			}
			/* find the path taken for any marbles that moved */
			if (start_hole != end_hole) {
				moved_count++;
				i = 0;			
				marble_path_index = -1;
				while (marble_path_index==-1 && i<paths.length) {
					if (paths[i][0] == start_hole) {
						/* Found the path now must calculate distance along it */
						for (j=0; j<paths[i].length; j++) {
							if (paths[i][j] == end_hole) {
								marble_path_index = i;
								distance = j;
								/* set distance to negative if this is a backwards direction path */
								if (back_paths.includes(marble_path_index)) {
									distance = -distance;
								}
								/* set distance to 0 if marble moved out of start row */
								if (startHoles.includes(start_hole)) {
									distance = 0;
											}
								/* Note that it is possible when coming out of the 0 centre hole
								that you can get to holes, 5, 29, 53 or 77 by two different paths.  One path is going negative from the centre
								hole and another path going positive around the other direction with a Joker 15 card.  In this case, select the path
								that results in a valid distance */
								if ([-1,-2,-3, 14].includes(distance)) {
									marble_path_index = -1;
								}
							}
						}
					}					
					i++;	
				}
				/* set distance to zero if no path found or marble moved into start row (was killed) */
				if (marble_path_index==-1 || startHoles.includes(end_hole)) {
					distance = 0;
				}
				/* save details of the move: marble id, start hole, end hole, path followed, distance moved */
/*				alert("mid=" + mid + " " + start_hole + " " + end_hole + " " + marble_path_index + " " + distance); */
				moved_marbles.push([mid, start_hole, end_hole, marble_path_index, distance]);
			}
		}
		
		/* Add up the total distance of the all the marbles moved this turn for checking on 7 card plays */
		total_distance = 0;
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][1];
			end_hole = moved_marbles[i][2];						
			if ((moved_marbles[i][3] != -1) && !startHoles.includes(start_hole) && !startHoles.includes(end_hole) && !["JH", "JD", "JC", "JS"].includes(playedCard)) {
				total_distance = total_distance + moved_marbles[i][4];
			}
		}

		/* Count marbles killed this move */
		marbles_killed = 0;
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][1];
			end_hole = moved_marbles[i][2];
			if ( startHoles.includes(end_hole)) {
				marbles_killed++;
			}
		}

		/* Check to see if any marbles came out of a start hole */
		start_hole_involved = false;
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][1];
			if ( startHoles.includes(start_hole)) {
				start_hole_involved = true;
			}
		}

		/* Check that total number of marbles on board is always 4 x number_of_players */
		if (marble_count != marbles_in_play) {
			alert("Some marbles have been moved off board!  Marble count is " + marble_count);
			return false;
		}				

		/* If marble not found in either the start hole or the end hole it is error condition. */
		if( (start_hole==99) && (end_hole!=99)) {
			alert("A marble appears on board out of no where.");
			return false;
		} else if ( (start_hole!=99) && (end_hole==99)) {
			alert("A marble has disappeard from the board.");
			return false;
		}
		
		/* Check if a card was played but no marbles were moved */
		if (playedCard != "" && moved_count ==0){
			alert("A card was played but no marbles were moved.");
			return false;
		}
		
		/* Check if a marble was moved but no card was played */
		if (playedCard == "" && moved_count > 0) {
			alert("A marble was moved but no card was played.")
			return false;
		}	

		/* Check if no card played and no marbles moved */
		if (playedCard == "" && moved_count == 0) {
			if (confirm("Press the Ok button to confirm you can't play")) {
				/* player can't play so clear out his/her hand and return cards to discard pile */
				if (turn_color == "yellow") {
					playerhand = yellowhand;
					yellowhand = [];
					$("#game_yellowhand").val(yellowhand);					
				} else if (turn_color == "green") {
					playerhand = greenhand;
					greenhand = [];
					$("#game_greenhand").val(greenhand);		
				} else if (turn_color == "red") {
					playerhand = redhand;
					redhand = [];
					$("#game_redhand").val(redhand);
				} else if (turn_color == "blue") {
					playerhand = bluehand;
					bluehand = [];
					$("#game_bluehand").val(bluehand);
				}
				/* return players cards to the discard pile */				
				for (i=0; i<playerhand.length; i++) {
					discardpile.push(playerhand[i]);
				}
				td = [];
				/* filter to remove any null elemnts in discardpile */
				j = 0;
				for (i=0; i<discardpile.length; i++) {
					if (discardpile[i] != "") {
						td[j] = discardpile[i];
						j = j + 1;
					}
				}
				discardpile = td;				
				$("#game_discardpile").val(discardpile.toString());
				return true;
			} else {
				return false;
			}
		}

		/* If Jack card was played then handle move checks completely different */
		if ( ["JH", "JD", "JC", "JS"].includes(playedCard) ) {
			/* Two and only two marbles must be involved */
			if (moved_count != 2) {
				alert("Jack played but other than two marbles were moved.");
				return false;
			}
			mid_1 = moved_marbles[0][0].substring(0,1);
			mid_2 = moved_marbles[1][0].substring(0,1);
			if (mid_1=="r") {
				marble_color_1="red";
			} else if (mid_1=="y") {
				marble_color_1 = "yellow";
			} else if (mid_1=="g") {
				marble_color_1 = "green";
			} else if (mid_1=="b") {
				marble_color_1 = "blue";
			}
			if (mid_2=="r") {
				marble_color_2="red";
			} else if (mid_2=="y") {
				marble_color_2 = "yellow";
			} else if (mid_2=="g") {
				marble_color_2 = "green";
			} else if (mid_2=="b") {
				marble_color_2 = "blue";
			}	
			/* Make sure that one of the marbles involved is playable */
			if (!playable_colors.includes(marble_color_1) && !playable_colors.includes(marble_color_2)) {
				alert("Jack played but none of the marbles moved could be played by the player.");
				return false;
			}
			/* Check to make sure the two marbles swapped are of different colors */
			if (mid_1 == mid_2) {
				alert("Two marbles of the same color were played when Jack card played.");
				return false;
			}

			/* start_hole of first marble must become end_hole of second marble and vice versa */
			start_hole_1 = moved_marbles[0][1];
			end_hole_1   = moved_marbles[0][2];
			start_hole_2 = moved_marbles[1][1];
			end_hole_2   = moved_marbles[1][2];
			if ( (start_hole_1 != end_hole_2) || (start_hole_2 != end_hole_1) ) {
				alert("Jack played but marble positions were not properly swapped.");
				return false;
			}
			/* Check to make sure the two marbles involved were not in start row or home row positions */
			if (startHoles.includes(start_hole_1) || startHoles.includes(start_hole_2) ) {
				alert("Cannot use Jack to move marbles in start rows.");
				return false;
			}
			if ( homeHoles.includes(start_hole_1) || homeHoles.includes(start_hole_2) ) {
				alert("Cannot use Jack to move marbles in home rows.");
				return false;
			}
			return true;
		}


		/* Check that all marbles moved are playable */
		for (i=0; i<moved_count; i++) {
			marble_cc = moved_marbles[i][0].substring(0,1);
			if (marble_cc=="r") {
				marble_color="red";
			} else if (marble_cc=="y") {
				marble_color = "yellow";
			} else if (marble_cc=="g") {
				marble_color = "green";
			} else if (marble_cc=="b") {
				marble_color = "blue";
			}
			if (!playable_colors.includes(marble_color)) {
				/* Wrong color so marble is not playable, unless it was killed */
				end_hole = moved_marbles[i][2];
				if ( !startHoles.includes(end_hole) ) {
					alert(player_color + " player is not allowed to move " + marble_color + " marbles.");
					return false;
				}
			}
		}	


		/* Check if a marble is coming out of a start row */
		if (start_hole_involved) {
			
			/* Check to make sure an outcard was played */
			if (!outCards.includes(playedCard)) {
				alert("Marble brought out of start row but no outcard was played.");
				return false;
			}

			/* If more than one marble involved coming out of a start row, the second one must be a killed marble */
			if (moved_count > 1 && marbles_killed!= 1) {
				alert("Marble brought out of start row but other marbles were moved.");
				return false;
			}
			
			/* Check that marble put into the correct hole coming of start row */
			for (i=0; i<moved_count; i++) {
				mid = moved_marbles[i][0].substring(0,1);
				start_hole = moved_marbles[i][1];
				end_hole = moved_marbles[i][2];
				if ( !startHoles.includes(end_hole) ) {
					if ( green_start_holes.includes(start_hole)) {
						if ( end_hole != 1) {
							alert("A green marble came out of start row into the wrong hole.");
							return false;
						}
					} else if ( red_start_holes.includes(start_hole)) {
						if (end_hole != 25) {
							alert("A red marble came out of start row into the wrong hole.");
							return false;
						}
					} else if ( blue_start_holes.includes(start_hole)) {
						if (end_hole != 49) {
							alert("A blue marble came out of start row into the wrong hole.");
							return false;
						}
					} else if ( yellow_start_holes.includes(start_hole)) {
						if (end_hole!= 73) {
							alert("A yellow marble came out of start row into the wrong hole.");
							return false;
						}
					}
				}
			}			
			return true;						
		}

		/* At this point, no Jacks played or marbles coming out of start rows */
		
		/* Check that the total distance moved matches with the value of the card played */
		if (total_distance != card_value){
			alert("Number of positions marbles moved was " + total_distance + " but value of played card was " + card_value);
			return false;
		}					

		/* All marbles moved must be on a valid path, unless the marble was killed */
		for (i=0; i<moved_count; i++) {
			if ( !startHoles.includes(moved_marbles[i][2])) {
				if ( moved_marbles[i][3] == -1) {
					alert("Marble move is invalid.  Please take your turn over.")
					return false;
				}
			}
		}

		/* If more than one marble killed, there must have been a 7 card played */
		if (marbles_killed > 1) {
			if (!["7H", "7D", "7C", "7S"].includes(playedCard)) {
				alert("A 7 card was not played but more than one marble was killed.");
				return false;
			}
		}

		/* If total distance is non-zero and no 7 card played, then total distance must come from one card only */
		if ( total_distance!=0 && !["7H", "7D", "7C", "7S"].includes(playedCard) ) {
			count = 0;
			for (i=0; i<moved_marbles.length; i++) {
				if ( moved_marbles[i][4] != 0) {
					count++;
				}
			}
			if ( count != 1 ) {
				alert("Other than one marble moved but no 7 card played.");
				return false;
			}
		}


		/* If a 7 card was not played, no marbles should have been killed along the path */
		if (!["7H", "7D", "7C", "7S"].includes(playedCard)) {
			/* Find the end hole of the non-killed marble in this move */
			non_killed_end_hole = -1;
			for (i=0; i<moved_marbles.length; i++) {
				end_hole = moved_marbles[i][2];
				if (!startHoles.includes(end_hole)) {
					non_killed_end_hole = end_hole;
				}
			}
			if (non_killed_end_hole == -1) {
				alert("All the moved marbles in this turn were killed?");
				return false;
			}
			for (i=0; i<moved_marbles.length; i++) {
				start_hole = moved_marbles[i][1];
				end_hole = moved_marbles[i][2];
				/* check if this is a killed marble, that it only came from the end of the path, not along the way */
				if ( startHoles.includes(end_hole)) {
					if (start_hole != non_killed_end_hole) {
						alert("A marble was killed along the path but no 7 card was played.");
						return false;
					}
				}
			}
		}
		

		/* Check that no marbles went into the wrong home row */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0].substring(0,1);
			start_hole = moved_marbles[i][1];
			end_hole = moved_marbles[i][2];
			if ( red_home_holes.includes(end_hole) && mid!="r") {
				alert("A non-red marble went into the red home row.");
				return false;
			}
			if ( blue_home_holes.includes(end_hole) && mid!="b") {
				alert("A non-blue marble went into the blue home row.");
				return false;			
			}
			if ( yellow_home_holes.includes(end_hole) && mid!="y") {
				alert("A non-yellow marble went into the yellow home row.");
				return false;
			}
			if ( green_home_holes.includes(end_hole) && mid!="g") {
				alert("A non-green marble went into the green home row.");
				return false;			
			}		
		}

		/* Check that each killed marble went into their correct starting row */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0].substring(0,1);
			start_hole = moved_marbles[i][1];
			end_hole = moved_marbles[i][2];
			if (startHoles.includes(end_hole)) {
				if (mid == "r") {
					if( !red_start_holes.includes(end_hole)) {
						alert("A killed red marble went into the wrong starting row.");
						return false;
					}
				}
				if (mid == "b") {
					if (!blue_start_holes.includes(end_hole)) {
						alert("A killed blue marble went into the wrong starting row.");
						return false;
					}
				}
				if (mid == "y") {
					if (!yellow_start_holes.includes(end_hole)) {
						alert("A killed yellow marble went into the wrong starting row.");
						return false;
					}
				}
				if (mid == "g") {
					if (!green_start_holes.includes(end_hole)) {
						alert("A killed green marble went into the wrong starting row.");
						return false;
					}
				}
			}
		}

		/* Check to make sure no marble jumped any other marble */
		/* first get all the marbles in play */
		marbles_in_play = []
		for (i=0; i<moved_count; i++) {
			marbles_in_play.push(moved_marbles[i][0]);
		}
		/* Look for jumps along the path */
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][1];
			end_hole = moved_marbles[i][2];
			marble_path_index = moved_marbles[i][3];
			dist = moved_marbles[i][4];
			if (marble_path_index!=-1 && !startHoles.includes(end_hole) && ![0,1].includes(dist)) {
				marble_path = paths[marble_path_index];
				j = 1;
				hole = marble_path[j];		
				/* Look at all the holes between the start and end of the path to see if any are occupied */
				while (hole!=end_hole && j<marble_path.length) {
					mid = board[hole];
					if (mid) {
						/* Don't say its a jump if the marble being jumped is also one being moved in this turn e.g. with 7 card*/
						if (!marbles_in_play.includes(mid)) {
							alert("A marble cannot jump over another marble.  When killing marbles using a 7 card, you have to land on each marble being killed");
							return false;
						}
					}
   					j++;
   					hole = marble_path[j];	
				}				
			}
		}			

		/* Checks for when just one marble moved */
		if (moved_count == 1){
		
			var marble = moved_marbles[0][0];
			var marble_color = marble.substring(0,1);
			start_hole = moved_marbles[0][1];
			end_hole = moved_marbles[0][2];
			distance = moved_marbles[0][4];

			/* If marble is put back in start row (killed), then more than one marble must have moved */
			if (startHoles.includes(end_hole)) {
				alert("A marble was killed but no other marble moved to kill it.");
				return false;
			}
					
			/* If a move is -4 positions then a 4 card must have been played */
			if ( (distance == -4) && !(["4H","4S","4D","4C"].includes(playedCard) )) {
				alert("A marble was moved -4 positions but a 4 card was not played.");
				return false;
			}
		
			/* If marble moved out of centre hole with a 4 card, there are only 4 valid holes it could go to */
			if ( card_value == -4) {
				if (start_hole == 0 && ![4, 28, 52, 76].includes(end_hole)) {
					alert("A 4 card played with marble coming out of centre hole but marble was moved to wrong hole.");
					return false;
				}
			}

			/* If marble moved backwards but not -4 positions */
			if ( (distance<0) && (distance!=-4)) {
				alert("A marble was moved backwards an invalid number of positions");
				return false;			
			}
											
		}		

		/* No errors found in the move */
		/*alert("End of checkMove - no errors found."); */
		return true;
	}


	function getPlayerList(yplayer, gplayer, rplayer, bplayer) {
		var pList = [];
	    if (yplayer) {
	  	  pList.push([yplayer, "yellow"]);
	    }
	    if (gplayer) {
	  	  pList.push([gplayer, "green"]);
	    }
	    if (rplayer) {
	  	  pList.push([rplayer, "red"]);
	    }
	    if (bplayer) {
	  	  pList.push([bplayer, "blue"]);
	    }
		return pList;
	}

	function labelBoard(x, y, tstring, tcolor, classname, id) {
	/* Write a text string label to a spot on the board */
		var d = document.createElement("div");
		d.setAttribute("id", id);
		d.className = classname;
		d.style.position = "absolute";
		d.style.color = tcolor;
		d.innerHTML = tstring;
		d.style.left = x.toString() + "px";
		d.style.top = y.toString() + "px";
		document.body.appendChild(d);			
	}

	function getPlayerName(color) {
		player_name = "";
		for (i=0; i<playerList.length; i++) {
			if (playerList[i][1] == color) {
				player_name = playerList[i][0];
			}
		}
		return player_name;
	}
		
	function getScreenCoords(user_color) {
		if (user_color == "green") {
			x = screencoords[0];
			y = screencoords[1];
			return [x, y];
		} else if (user_color == "red") {
			x = screencoords[2];
			y = screencoords[3];
			return [x, y];
		} else if (user_color == "blue") {
			x = screencoords[4];
			y = screencoords[5];
			return [x, y];
		} else if (user_color == "yellow") {
			x = screencoords[6];
			y = screencoords[7];
			return [x, y];
		} else {
			return ["400", "436"];		
		}
	}

	function getCardCount(color) {
		card_count = -1;
		if (color == "yellow") {
			if(yellowhand[0]!="") {card_count = yellowhand.length;}
		} else if (color == "green") {
			if(greenhand[0]!="") {card_count = greenhand.length;}
		} else if (color == "red") {
			if(redhand[0]!="") {card_count = redhand.length;}
		} else if (color == "blue") {
			if (bluehand[0]!="") {card_count = bluehand.length;}
		}
		return card_count;
	}
	
	function getPlayableColors(player_color) {
		/* First check if player is on a team or not */
		if ((player_color=="yellow" || player_color=="red") && !ryteam) {
			return [player_color];
		}
		if ((player_color=="green" || player_color=="blue") && !gbteam) {
			return [player_color];
		}
		/* Player is on a team, Now check if all their marbles are out */
		allOut = true;
		if(player_color == "yellow") {
			playable = ["yellow", "red"];
			for ( i=93; i<=96; i++) {
				if (board[i] != "") {
					allOut =false;
				}
			}
		}
		if(player_color == "green") {
			playable = ["green", "blue"];
			for ( i=21; i<=24; i++) {
				if (board[i] != "") {
					allOut =false;
				}
			}
		}
		if(player_color == "red") {
			playable = ["yellow", "red"];
			for ( i=45; i<=48; i++) {
				if (board[i] != "") {
					allOut =false;
				}
			}
		}
		if(player_color == "blue") {
			playable = ["green", "blue"];
			for ( i=69; i<=72; i++) {
				if (board[i] != "") {
					allOut =false;
				}
			}
		}
		if (allOut) {
			return playable;
		} else {
			return [player_color];
		}
	}
		
	function gameOver() {
		playable_colors = getPlayableColors(user_color);
		game_over = true;
		for (i=0; i<playable_colors.length; i++) {
			color = playable_colors[i];
			/* Look to see if all home holes of this color have marbles in them */
			if (color == "green") {
				for (h=0; h<4; h++) {
					hole = green_home_holes[h];
					if (board[hole] == "") {
						game_over = false;
					}
				}	
			} else if (color == "red") {
				for (h=0; h<4; h++) {
					hole = red_home_holes[h];
					if (board[hole] == "") {
						game_over = false;
					}
				}
			} else if (color == "blue") {
				for (h=0; h<4; h++) {
					hole = blue_home_holes[h];
					if (board[hole] == "") {
						game_over = false;
					}
				}
			} else if (color == "yellow") {
				for (h=0; h<4; h++) {
					hole = yellow_home_holes[h];
					if (board[hole] == "") {
						game_over = false;
					}
				}
			}
		}
		if (game_over) {
			return true;
		} else {
			return false;
		}					
	}


});


/* Control is now turned over to the DOM and for players to make their moves on screen */
/* ----------------------------- Playing Functions -------------------------*/
/* ----------------------------- Playing Functions -------------------------*/
/* ----------------------------- Playing Functions -------------------------*/

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	var data = ev.dataTransfer.getData("text");
	x_offset = ev.clientX - $("#" + data).offset().left;
	y_offset = ev.clientY - $("#" + data).offset().top;
	if (ev.target.parentElement.nodeName == "BODY") {
		draggingFrom = "board";
	} else {
		draggingFrom = ev.target.parentElement.id;		
	}
}

function drop(ev) {
  ev.preventDefault();
  var header = document.getElementById("header").innerHTML;
  if (header == "Marbles Game") {
  	  yplayer = $("#game_yplayer").val();
	  gplayer = $("#game_gplayer").val();
	  rplayer = $("#game_rplayer").val();
	  bplayer = $("#game_bplayer").val();	  
      playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
	  var data = ev.dataTransfer.getData("text");
	  var turn = parseInt($("#game_turn").val());
	  var player = playerList[turn][0];
	  var player_color = playerList[turn][1];
	  if (performDrop(player_color, data, ev)) {
	  } else {
		  console.log("Drop is NOT valid");
	  }
	  updateBoardArray();
	}
}

function performDrop(player_color, data, ev) {
    drop_ok = false;
    draggingObj = dragObjectType(data);
    draggingTo = dragObjectType(ev.target.id);
	var playerfield = "#game_" + player_color + "hand";
	/* alert("dragging " + draggingObj + " From " + draggingFrom + " To " + draggingTo); */

/* player is moving a card from hand to discard */
    if ( (draggingObj == "card") && (draggingFrom == "hand") && (draggingTo == "discard") ) {
  	  	playedCard = data;
		/* remove card from hand */
    	var playerhand = ($(playerfield).val()).split(",");
    	for (i=0; i<=5; i++) {
    		  if (data == playerhand[i]) {
    			  playerhand[i] = "";
    		  }
    	}
  	    playerhand = playerhand.filter(item => item);
    	$(playerfield).val(playerhand.toString()); 	  
		/* place card on top of discard pile */
    	discardpile = ($("#game_discardpile").val()).split(",");
    	discardpile.unshift(data);
  	    discardpile = discardpile.filter(item => item);
    	$("#game_discardpile").val(discardpile.toString(","));
  	    ev.target.appendChild(document.getElementById(data));
  	    drop_ok = true;			
	 }	  


 /* player is moving a card from discardpile back to cards (his hand) */
     if ((draggingObj == "card") && (draggingFrom == "discardpile") && ( (draggingTo == "hand") || (draggingTo == "card") )) {
     	var playerhand = ($(playerfield).val()).split(",");
		/* remove card off discard pile */
 		discardpile = ($("#game_discardpile").val()).split(",");
 		removed_card = discardpile.shift();
 		$("#game_discardpile").val(discardpile.toString(","));
		/* add card back to hand */
 		playerhand.unshift(removed_card);
 	  	playerhand = playerhand.filter(item => item);
 	    $(playerfield).val(playerhand.toString(","));
		c = document.getElementById(data);
		h = document.getElementById("hand");
		h.appendChild(c);
		playedCard = "";  		
   	  	drop_ok = true;
     }


/* player is moving a card from hand to card */
	 if ((draggingObj == "card") && (draggingFrom == "hand") && ( (draggingTo == "hand") || (draggingTo == "card") )) {
 		target_parent_element_id = ev.target.parentElement.id;
 		if (target_parent_element_id == "discardpile") {
 			alert("Invalid play.  You have already played a card this move.");
 		} else {
			if (draggingTo == "card") {
				ev.target.parentElement.appendChild(document.getElementById(data));
			} else if (draggingTo == "hand"){
				ev.target.appendChild(document.getElementById(data));
			} 			
 		}  	  
   	    drop_ok = true;	 	
	 }
	 
/* player is moving a card to somewhere on open board */
	 if ((draggingObj == "card") && ((draggingTo == "board") || (draggingTo == "hole") )) {
		 alert("Invalid play.  A card can only be placed in your hand or on the discard pile.");
		 drop_ok = true;
	 }


 /* player is dragging his/her hand to somewhere on the board */
 	if ((draggingObj=="hand") && (draggingTo=="board" || draggingTo=="hand" || draggingTo=="card")) {
 		dm = document.getElementById(data);
 		dm.style.position = "fixed";
 		dm.style.left = (ev.clientX - x_offset) + "px";
 		dm.style.top = (ev.clientY - y_offset) + "px";
 		document.body.appendChild(dm);
 		drop_ok = true;
 	}

/*  player is moving a marble to an empty hole */
    if ((draggingObj == "marble") && (draggingTo == "hole")){
		m = document.getElementById(data);
		/* Don't allow manually moving a marble into a start row */
		target_hole = ev.target.id;
		target_hole_nbr = parseInt(target_hole.substring(4,6));
		if ( startHoles.includes(target_hole_nbr)) {
			alert("Invalid play.  Manually moving a marble to a start row is not allowed.");
			drop_ok = true;
		} else {
			m.removeAttribute("style");
			m.style.width = "35px";
			m.style.height = "35px";
		    ev.target.appendChild(m);
	  	    drop_ok = true;
		}
    }

/* player is moving a marble from a hole to hole on top of another marble */
	if ((draggingObj == "marble") && (draggingFrom!="board") && (draggingTo == "marble")) {
		killed_marble = ev.target.id;
		killer_marble = data;
		/* If a Jack is played, swap the two marbles involved. */
		if (["JH", "JD", "JC", "JS"].includes(playedCard)) {
			killedMarbleElement = document.getElementById(killed_marble);
			killerMarbleElement = document.getElementById(killer_marble);
			/* get hole where target marble currently resides */
			targetElement = document.getElementById(killed_marble).parentElement;
			/* get hole where players marble currently resides */
			playerElement = document.getElementById(killer_marble).parentElement;
			/* place the target marble in the players original hole */
			playerElement.appendChild(killedMarbleElement);
			/* place the players marble in the target marbles hole */
			targetElement.appendChild(killerMarbleElement);
			drop_ok = true;
		} else {
		/* This is a straight kill move */
			/* get hole where killed marble currently resides */
			targetElement = document.getElementById(killed_marble).parentElement;
			/* send killed_marble back to its' home */
			hole_nbr = killed_marble.substring(1,3);
			home_hole_id = "hole" + hole_nbr;
			homeElement = document.getElementById(home_hole_id);
			killedMarbleElement = document.getElementById(killed_marble);
			homeElement.appendChild(killedMarbleElement);
			/* put the killer marble into the target hole */
			killerMarbleElement = document.getElementById(killer_marble);
			targetElement.appendChild(killerMarbleElement);
			drop_ok = true;			
		}
	}
	
/* player is dragging marble from hole to somewhere on the open board */
	if ((draggingObj == "marble") && (draggingFrom!="board") && (draggingTo == "board")) {
		moving_marble = data;
		/* save the original hole info in case the marble is being moved with a Jack */
		originalElement = document.getElementById(draggingFrom);
		dm = document.getElementById(moving_marble);
		dm.style.position = "fixed";
		dm.style.left = (ev.clientX - x_offset) + "px";
		dm.style.top = (ev.clientY - y_offset) + "px";
		document.body.appendChild(dm);
		drop_ok = true;
	}

/* player is dragging marble from somewhere on the board to somewhere else on the board?? */
	if ((draggingObj == "marble") && (draggingFrom=="board") && (draggingTo == "board")) {
		moving_marble = data;
		dm = document.getElementById(moving_marble);
		dm.style.position = "fixed";
		dm.style.left = (ev.clientX - x_offset) + "px";
		dm.style.top = (ev.clientY - y_offset) + "px";
		document.body.appendChild(dm);
		drop_ok = true;
	}


/* player is moving marble from somewhere on the board to a hole on top of another marble. */
	if ((draggingObj == "marble") && (draggingFrom=="board") && (draggingTo == "marble")) {
		killed_marble = ev.target.id;
		killer_marble = data;
		killerMarbleElement = document.getElementById(killer_marble);
		/* In moving marbles in off the open board, you have to remove their left and top attributes first */
		killerMarbleElement.style.left = "";
		killerMarbleElement.style.top = "";
		/* If a Jack is played, swap the two marbles involved. */
		if (["JH", "JD", "JC", "JS"].includes(playedCard)) {
			killedMarbleElement = document.getElementById(killed_marble);
			/* get hole where target marble currently resides */
			targetElement = document.getElementById(killed_marble).parentElement;
			/* get hole where players marble originally resided */
			playerElement = originalElement;
			/* place the target marble in the players original hole */
			playerElement.appendChild(killedMarbleElement);
			/* place the players marble in the target marbles hole */
			targetElement.appendChild(killerMarbleElement);
			drop_ok = true;
		} else {
		/* This is a straight kill move */
			/* get hole where killed marble currently resides */
			targetElement = document.getElementById(killed_marble).parentElement;
			/* send killed_marble back to its' home */
			hole_nbr = killed_marble.substring(1,3);
			home_hole_id = "hole" + hole_nbr;
			homeElement = document.getElementById(home_hole_id);
			killedMarbleElement = document.getElementById(killed_marble);
			homeElement.appendChild(killedMarbleElement);
			/* put the killer marble into the target hole */
			killerMarbleElement = document.getElementById(killer_marble);
			targetElement.appendChild(killerMarbleElement);
			drop_ok = true;			
		}
		
	}

	
/* player is dragging marble to their card hand, to discard pile or onto the draw deck */
	if ((draggingObj == "marble") && ((draggingTo == "card") || (draggingTo == "hand") || (draggingTo == "discard") || draggingTo == "deck")) {
		alert("Invalid Play.  A marble can only be placed on a valid hole spot on the board.");
		drop_ok = true;
	}
	
	if (drop_ok) {
		return true;
	} else {
		return false;
	}
}


function dragObjectType(data) {
	if ("rgby".includes(data.substring(0,1))) {
		obj = "marble"
	} else if ("1234567890KQAJ".includes(data.substring(0,1))) {
		obj = "card";
	} else if (data.substring(0,4) == "hole") {
		obj = "hole";
	} else if (data.substring(0,4) == "disc") {
		obj = "discard";
	} else if (data.substring(0,4) == "hand") {
		obj = "hand"
	} else if (data.substring(0,4) == "myCa") {
		obj = "board"
	}
	else {
		obj = "unknown"
	}
	return obj
}

function updateBoardArray() {
/* update the field that stores the board and marble positions */
	var gamestr = "";
	var str = "";
	var mrblid = "";
	for (i=0; i<=96; i++) {
		divID = "hole" + i.toString();
		div = document.getElementById(divID);
		if ( $("#"+divID).children().length > 0) {
			child = $("#"+divID).children()[0];
			mrblid = child.id;
		} else {
			mrblid = "";
		}
		gamestr = gamestr.concat(mrblid, ",");
	} 
	$("#game_board").val(gamestr);
}

function getPlayerList() {
	pList = [];
    if ($("#game_yplayer").val()) {
  	  player = $("#game_yplayer").val();
  	  pList.push([player, "yellow"]);
    }
    if ($("#game_gplayer").val()) {
  	  player = $("#game_gplayer").val();
  	  pList.push([player, "green"]);
    }
    if ($("#game_rplayer").val()) {
  	  player = $("#game_rplayer").val();
  	  pList.push([player, "red"]);
    }
    if ($("#game_bplayer").val()) {
  	  player = $("#game_bplayer").val();
  	  pList.push([player, "blue"]);
    }
	return pList;	
}

function saveScreenCoords(x, y, user_color) {
	if (user_color == "green") {
		screencoords[0] = x.toString();
		screencoords[1] = y.toString();
	} else if (user_color == "red") {
		screencoords[2] = x.toString();
		screencoords[3] = y.toString();
	} else if (user_color == "blue") {
		screencoords[4] = x.toString();
		screencoords[5] = y.toString();
	} else if (user_color == "yellow") {
		screencoords[6] = x.toString();
		screencoords[7] = y.toString();
	}
}


/*---------------------PATHS-----------------------*/
/* From each marbles position it is possible to take one of 4 possibilities:
	1. Around the outside of the board path
	2. Around and into home row path
	3. Around and into centre hole path
	4. Backwards 4 path
*/

function get_paths() {
	paths = [];	
	paths[0]=[0,7,8,9,10,11,12,13,14,15,16,25,26,27,28,29];
	paths[1]=[0,7,8,9,10,11,12,13,14,15,17,18,19,20];
	paths[2]=[0];
	paths[3]=[0,7,6,5,4];

	paths[4]=[0,31,32,33,34,35,36,37,38,39,40,49,50,51,52,53];
	paths[5]=[0,31,32,33,34,35,36,37,38,39,41,42,43,44];
	paths[6]=[0];
	paths[7]=[0,31,30,29,28];

	paths[8]=[0,55,56,57,58,59,60,61,62,63,64,73,74,75,76,77];
	paths[9]=[0,55,56,57,58,59,60,61,62,63,65,66,67,68];
	paths[10]=[0];
	paths[11]=[0,55,54,53,52];

	paths[12]=[0,79,80,81,82,83,84,85,86,87,88,1,2,3,4,5];
	paths[13]=[0,79,80,81,82,83,84,85,86,87,89,90,91,92];
	paths[14]=[0];
	paths[15]=[0,79,78,77,76];

	paths[16]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	paths[17]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17];
	paths[18]=[1,2,3,4,5,6,7,0];
	paths[19]=[1,88,87,86,85];

	paths[20]=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,25];
	paths[21]=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18];
	paths[22]=[2,3,4,5,6,7,0];
	paths[23]=[2,1,88,87,86];

	paths[24]=[3,4,5,6,7,8,9,10,11,12,13,14,15,16,25,26];
	paths[25]=[3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19];
	paths[26]=[3,4,5,6,7,0];
	paths[27]=[3,2,1,88,87];

	paths[28]=[4,5,6,7,8,9,10,11,12,13,14,15,16,25,26,27];
	paths[29]=[4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20];
	paths[30]=[4,5,6,7,0];
	paths[31]=[4,3,2,1,88];

	paths[32]=[5,6,7,8,9,10,11,12,13,14,15,16,25,26,27,28];
	paths[33]=[5,6,7,8,9,10,11,12,13,14,15,17,18,19,20];
	paths[34]=[5,6,7,0];
	paths[35]=[5,4,3,2,1];

	paths[36]=[6,7,8,9,10,11,12,13,14,15,16,25,26,27,28,29];
	paths[37]=[6,7,8,9,10,11,12,13,14,15,17,18,19,20];
	paths[38]=[6,7,0];
	paths[39]=[6,5,4,3,2];

	paths[40]=[7,8,9,10,11,12,13,14,15,16,25,26,27,28,29,30];
	paths[41]=[7,8,9,10,11,12,13,14,15,17,18,19,20];
	paths[42]=[7,0];
	paths[43]=[7,6,5,4,3];

	paths[44]=[8,9,10,11,12,13,14,15,16,25,26,27,28,29,30,31];
	paths[45]=[8,9,10,11,12,13,14,15,17,18,19,20];
	paths[46]=[8];
	paths[47]=[8,7,6,5,4];

	paths[48]=[9,10,11,12,13,14,15,16,25,26,27,28,29,30,31,32];
	paths[49]=[9,10,11,12,13,14,15,17,18,19,20];
	paths[50]=[9,10,11,12,13,14,15,16,25,26,27,28,29,30,31,0];
	paths[51]=[9,8,7,6,5];

	paths[52]=[10,11,12,13,14,15,16,25,26,27,28,29,30,31,32,33];
	paths[53]=[10,11,12,13,14,15,17,18,19,20];
	paths[54]=[10,9,8,7,0];
	paths[55]=[10,9,8,7,6];

	paths[56]=[11,12,13,14,15,16,25,26,27,28,29,30,31,32,33,34];
	paths[57]=[11,12,13,14,15,17,18,19,20];
	paths[58]=[11,12,13,14,15,16,25,26,27,28,29,30,31,0];
	paths[59]=[11,10,9,8,7];

	paths[60]=[12,13,14,15,16,25,26,27,28,29,30,31,32,33,34,35];
	paths[61]=[12,13,14,15,17,18,19,20];
	paths[62]=[12,13,14,15,16,25,26,27,28,29,30,31,0];
	paths[63]=[12,11,10,9,8];

	paths[64]=[13,14,15,16,25,26,27,28,29,30,31,32,33,34,35,36];
	paths[65]=[13,14,15,17,18,19,20];
	paths[66]=[13];
	paths[67]=[13,12,11,10,9];

	paths[68]=[14,15,16,25,26,27,28,29,30,31,32,33,34,35,36,37];
	paths[69]=[14,15,17,18,19,20];
	paths[70]=[14];
	paths[71]=[14,13,12,11,10];

	paths[72]=[15,16,25,26,27,28,29,30,31,32,33,34,35,36,37,38];
	paths[73]=[15,17,18,19,20];
	paths[74]=[15];
	paths[75]=[15,14,13,12,11];

	paths[76]=[16,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];
	paths[77]=[16];
	paths[78]=[16,25,26,27,28,29,30,31,0];
	paths[79]=[16,15,14,13,12];

	paths[80]=[17,18,19,20];
	paths[81]=[17];
	paths[82]=[17];
	paths[83]=[17];

	paths[84]=[18,19,20];
	paths[85]=[18];
	paths[86]=[18];
	paths[87]=[18];

	paths[88]=[19,20];
	paths[89]=[19];
	paths[90]=[19];
	paths[91]=[19];

	paths[92]=[20];
	paths[93]=[20];
	paths[94]=[20];
	paths[95]=[20];

	paths[96]=[21,1];
	paths[97]=[21];
	paths[98]=[21];
	paths[99]=[21];

	paths[100]=[22,1];
	paths[101]=[22];
	paths[102]=[22];
	paths[103]=[22];

	paths[104]=[23,1];
	paths[105]=[23];
	paths[106]=[23];
	paths[107]=[23];

	paths[108]=[24,1];
	paths[109]=[24];
	paths[110]=[24];
	paths[111]=[24];

	paths[112]=[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
	paths[113]=[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,41];
	paths[114]=[25,26,27,28,29,30,31,0];
	paths[115]=[25,16,15,14,13];

	paths[116]=[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,49];
	paths[117]=[26,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42];
	paths[118]=[26,27,28,29,30,31,0];
	paths[119]=[26,25,16,15,14];

	paths[120]=[27,28,29,30,31,32,33,34,35,36,37,38,39,40,49,50];
	paths[121]=[27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,43];
	paths[122]=[27,28,29,30,31,0];
	paths[123]=[27,26,25,16,15];

	paths[124]=[28,29,30,31,32,33,34,35,36,37,38,39,40,49,50,51];
	paths[125]=[28,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44];
	paths[126]=[28,29,30,31,0];
	paths[127]=[28,27,26,25,16];

	paths[128]=[29,30,31,32,33,34,35,36,37,38,39,40,49,50,51,52];
	paths[129]=[29,30,31,32,33,34,35,36,37,38,39,41,42,43,44];
	paths[130]=[29,30,31,0];
	paths[131]=[29,28,27,26,25];

	paths[132]=[30,31,32,33,34,35,36,37,38,39,40,49,50,51,52,53];
	paths[133]=[30,31,32,33,34,35,36,37,38,39,41,42,43,44];
	paths[134]=[30,31,0];
	paths[135]=[30,29,28,27,26];

	paths[136]=[31,32,33,34,35,36,37,38,39,40,49,50,51,52,53,54];
	paths[137]=[31,32,33,34,35,36,37,38,39,41,42,43,44];
	paths[138]=[31,0];
	paths[139]=[31,30,29,28,27];

	paths[140]=[32,33,34,35,36,37,38,39,40,49,50,51,52,53,54,55];
	paths[141]=[32,33,34,35,36,37,38,39,41,42,43,44];
	paths[142]=[32];
	paths[143]=[32,31,30,29,28];

	paths[144]=[33,34,35,36,37,38,39,40,49,50,51,52,53,54,55,56];
	paths[145]=[33,34,35,36,37,38,39,41,42,43,44];
	paths[146]=[33,34,35,36,37,38,39,40,49,50,51,52,53,54,55,0];
	paths[147]=[33,32,31,30,29];

	paths[148]=[34,35,36,37,38,39,40,49,50,51,52,53,54,55,56,57];
	paths[149]=[34,35,36,37,38,39,41,42,43,44];
	paths[150]=[34,33,32,31,0];
	paths[151]=[34,33,32,31,30];

	paths[152]=[35,36,37,38,39,40,49,50,51,52,53,54,55,56,57,58];
	paths[153]=[35,36,37,38,39,41,42,43,44];
	paths[154]=[35,36,37,38,39,40,49,50,51,52,53,54,55,0];
	paths[155]=[35,34,33,32,31];

	paths[156]=[36,37,38,39,40,49,50,51,52,53,54,55,56,57,58,59];
	paths[157]=[36,37,38,39,41,42,43,44];
	paths[158]=[36,37,38,39,40,49,50,51,52,53,54,55,0];
	paths[159]=[36,35,34,33,32];

	paths[160]=[37,38,39,40,49,50,51,52,53,54,55,56,57,58,59,60];
	paths[161]=[37,38,39,41,42,43,44];
	paths[162]=[37,38,39,40,49,50,51,52,53,54,55,0];
	paths[163]=[37,36,35,34,33];

	paths[164]=[38,39,40,49,50,51,52,53,54,55,56,57,58,59,60,61];
	paths[165]=[38,39,41,42,43,44];
	paths[166]=[38,39,40,49,50,51,52,53,54,55,0];
	paths[167]=[38,37,36,35,34];

	paths[168]=[39,40,49,50,51,52,53,54,55,56,57,58,59,60,61,62];
	paths[169]=[39,41,42,43,44];
	paths[170]=[39,40,49,50,51,52,53,54,55,0];
	paths[171]=[39,38,37,36,35];

	paths[172]=[40,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
	paths[173]=[40];
	paths[174]=[40,49,50,51,52,53,54,55,0];
	paths[175]=[40,39,38,37,36];

	paths[176]=[41,42,43,44];
	paths[177]=[41];
	paths[178]=[41];
	paths[179]=[41];

	paths[180]=[42,43,44];
	paths[181]=[42];
	paths[182]=[42];
	paths[183]=[42];

	paths[184]=[43,44];
	paths[185]=[43];
	paths[186]=[43];
	paths[187]=[43];

	paths[188]=[44];
	paths[189]=[44];
	paths[190]=[44];
	paths[191]=[44];

	paths[192]=[45,25];
	paths[193]=[45];
	paths[194]=[45];
	paths[195]=[45];

	paths[196]=[46,25];
	paths[197]=[46];
	paths[198]=[46];
	paths[199]=[46];

	paths[200]=[47,25];
	paths[201]=[47];
	paths[202]=[47];
	paths[203]=[47];

	paths[204]=[48,25];
	paths[205]=[48];
	paths[206]=[48];
	paths[207]=[48];

	paths[208]=[49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64];
	paths[209]=[49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,65];
	paths[210]=[49,50,51,52,53,54,55,0];
	paths[211]=[49,40,39,38,37];

	paths[212]=[50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,73];
	paths[213]=[50,51,52,53,54,55,56,57,58,59,60,61,62,63,65,66];
	paths[214]=[50,51,52,53,54,55,0];
	paths[215]=[50,49,40,39,38];

	paths[216]=[51,52,53,54,55,56,57,58,59,60,61,62,63,64,73,74];
	paths[217]=[51,52,53,54,55,56,57,58,59,60,61,62,63,65,66,67];
	paths[218]=[51,52,53,54,55,0];
	paths[219]=[51,50,49,40,39];

	paths[220]=[52,53,54,55,56,57,58,59,60,61,62,63,64,73,74,75];
	paths[221]=[52,53,54,55,56,57,58,59,60,61,62,63,65,66,67,68];
	paths[222]=[52,53,54,55,0];
	paths[223]=[52,51,50,49,40];

	paths[224]=[53,54,55,56,57,58,59,60,61,62,63,64,73,74,75,76];
	paths[225]=[53,54,55,56,57,58,59,60,61,62,63,65,66,67,68];
	paths[226]=[53,54,55,0];
	paths[227]=[53,52,51,50,49];

	paths[228]=[54,55,56,57,58,59,60,61,62,63,64,73,74,75,76,77];
	paths[229]=[54,55,56,57,58,59,60,61,62,63,65,66,67,68];
	paths[230]=[54,55,0];
	paths[231]=[54,53,52,51,50];

	paths[232]=[55,56,57,58,59,60,61,62,63,64,73,74,75,76,77,78];
	paths[233]=[55,56,57,58,59,60,61,62,63,65,66,67,68];
	paths[234]=[55,0];
	paths[235]=[55,54,53,52,51];

	paths[236]=[56,57,58,59,60,61,62,63,64,73,74,75,76,77,78,79];
	paths[237]=[56,57,58,59,60,61,62,63,65,66,67,68];
	paths[238]=[56];
	paths[239]=[56,55,54,53,52];

	paths[240]=[57,58,59,60,61,62,63,64,73,74,75,76,77,78,79,80];
	paths[241]=[57,58,59,60,61,62,63,65,66,67,68];
	paths[242]=[57,58,59,60,61,62,63,64,73,74,75,76,77,78,79,0];
	paths[243]=[57,56,55,54,53];

	paths[244]=[58,59,60,61,62,63,64,73,74,75,76,77,78,79,80,81];
	paths[245]=[58,59,60,61,62,63,65,66,67,68];
	paths[246]=[58,57,56,55,0];
	paths[247]=[58,57,56,55,54];

	paths[248]=[59,60,61,62,63,64,73,74,75,76,77,78,79,80,81,82];
	paths[249]=[59,60,61,62,63,65,66,67,68];
	paths[250]=[59,60,61,62,63,64,73,74,75,76,77,78,79,0];
	paths[251]=[59,58,57,56,55];

	paths[252]=[60,61,62,63,64,73,74,75,76,77,78,79,80,81,82,83];
	paths[253]=[60,61,62,63,65,66,67,68];
	paths[254]=[60,61,62,63,64,73,74,75,76,77,78,79,0];
	paths[255]=[60,59,58,57,56];

	paths[256]=[61,62,63,64,73,74,75,76,77,78,79,80,81,82,83,84];
	paths[257]=[61,62,63,65,66,67,68];
	paths[258]=[61,62,63,64,73,74,75,76,77,78,79,0];
	paths[259]=[61,60,59,58,57];

	paths[260]=[62,63,64,73,74,75,76,77,78,79,80,81,82,83,84,85];
	paths[261]=[62,63,65,66,67,68];
	paths[262]=[62,63,64,73,74,75,76,77,78,79,0];
	paths[263]=[62,61,60,59,58];

	paths[264]=[63,64,73,74,75,76,77,78,79,80,81,82,83,84,85,86];
	paths[265]=[63,65,66,67,68];
	paths[266]=[63,64,73,74,75,76,77,78,79,0];
	paths[267]=[63,62,61,60,59];

	paths[268]=[64,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87];
	paths[269]=[64];
	paths[270]=[64,73,74,75,76,77,78,79,0];
	paths[271]=[64,63,62,61,60];

	paths[272]=[65,66,67,68];
	paths[273]=[65];
	paths[274]=[65];
	paths[275]=[65];

	paths[276]=[66,67,68];
	paths[277]=[66];
	paths[278]=[66];
	paths[279]=[66];

	paths[280]=[67,68];
	paths[281]=[67];
	paths[282]=[67];
	paths[283]=[67];

	paths[284]=[68];
	paths[285]=[68];
	paths[286]=[68];
	paths[287]=[68];

	paths[288]=[69,49];
	paths[289]=[69];
	paths[290]=[69];
	paths[291]=[69];

	paths[292]=[70,49];
	paths[293]=[70];
	paths[294]=[70];
	paths[295]=[70];

	paths[296]=[71,49];
	paths[297]=[71];
	paths[298]=[71];
	paths[299]=[71];

	paths[300]=[72,49];
	paths[301]=[72];
	paths[302]=[72];
	paths[303]=[72];

	paths[304]=[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88];
	paths[305]=[73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89];
	paths[306]=[73,74,75,76,77,78,79,0];
	paths[307]=[73,64,63,62,61];

	paths[308]=[74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,1];
	paths[309]=[74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90];
	paths[310]=[74,75,76,77,78,79,0];
	paths[311]=[74,73,64,63,62];

	paths[312]=[75,76,77,78,79,80,81,82,83,84,85,86,87,88,1,2];
	paths[313]=[75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,91];
	paths[314]=[75,76,77,78,79,0];
	paths[315]=[75,74,73,64,63];

	paths[316]=[76,77,78,79,80,81,82,83,84,85,86,87,88,1,2,3];
	paths[317]=[76,77,78,79,80,81,82,83,84,85,86,87,89,90,91,92];
	paths[318]=[76,77,78,79,0];
	paths[319]=[76,75,74,73,64];

	paths[320]=[77,78,79,80,81,82,83,84,85,86,87,88,1,2,3,4];
	paths[321]=[77,78,79,80,81,82,83,84,85,86,87,89,90,91,92];
	paths[322]=[77,78,79,0];
	paths[323]=[77,76,75,74,73];

	paths[324]=[78,79,80,81,82,83,84,85,86,87,88,1,2,3,4,5];
	paths[325]=[78,79,80,81,82,83,84,85,86,87,89,90,91,92];
	paths[326]=[78,79,0];
	paths[327]=[78,77,76,75,74];

	paths[328]=[79,80,81,82,83,84,85,86,87,88,1,2,3,4,5,6];
	paths[329]=[79,80,81,82,83,84,85,86,87,89,90,91,92];
	paths[330]=[79,0];
	paths[331]=[79,78,77,76,75];

	paths[332]=[80,81,82,83,84,85,86,87,88,1,2,3,4,5,6,7];
	paths[333]=[80,81,82,83,84,85,86,87,89,90,91,92];
	paths[334]=[80];
	paths[335]=[80,79,78,77,76];

	paths[336]=[81,82,83,84,85,86,87,88,1,2,3,4,5,6,7,8];
	paths[337]=[81,82,83,84,85,86,87,89,90,91,92];
	paths[338]=[81,82,83,84,85,86,87,88,1,2,3,4,5,6,7,0];
	paths[339]=[81,80,79,78,77];

	paths[340]=[82,83,84,85,86,87,88,1,2,3,4,5,6,7,8,9];
	paths[341]=[82,83,84,85,86,87,89,90,91,92];
	paths[342]=[82,81,80,79,0];
	paths[343]=[82,81,80,79,78];

	paths[344]=[83,84,85,86,87,88,1,2,3,4,5,6,7,8,9,10];
	paths[345]=[83,84,85,86,87,89,90,91,92];
	paths[346]=[83,84,85,86,87,88,1,2,3,4,5,6,7,0];
	paths[347]=[83,82,81,80,79];

	paths[348]=[84,85,86,87,88,1,2,3,4,5,6,7,8,9,10,11];
	paths[349]=[84,85,86,87,89,90,91,92];
	paths[350]=[84,85,86,87,88,1,2,3,4,5,6,7,0];
	paths[351]=[84,83,82,81,80];

	paths[352]=[85,86,87,88,1,2,3,4,5,6,7,8,9,10,11,12];
	paths[353]=[85,86,87,89,90,91,92];
	paths[354]=[85,86,87,88,1,2,3,4,5,6,7,0];
	paths[355]=[85,84,83,82,81];

	paths[356]=[86,87,88,1,2,3,4,5,6,7,8,9,10,11,12,13];
	paths[357]=[86,87,89,90,91,92];
	paths[358]=[86,87,88,1,2,3,4,5,6,7,0];
	paths[359]=[86,85,84,83,82];

	paths[360]=[87,88,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	paths[361]=[87,89,90,91,92];
	paths[362]=[87,88,1,2,3,4,5,6,7,0];
	paths[363]=[87,86,85,84,83];

	paths[364]=[88,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	paths[365]=[88];
	paths[366]=[88,1,2,3,4,5,6,7,0];
	paths[367]=[88,87,86,85,84];

	paths[368]=[93,73];
	paths[369]=[94,73];
	paths[370]=[95,73];
	paths[371]=[96,73];
	
	paths[372]=[89,90,91,92];
	paths[373]=[89];
	paths[374]=[89];
	paths[375]=[89];
	
	paths[376]=[90,91,92];
	paths[377]=[90];
	paths[378]=[90];
	paths[379]=[90];
	
	paths[380]=[91,92];
	paths[381]=[91];
	paths[382]=[91];
	paths[383]=[91];

	paths[384]=[92];
	paths[385]=[92];
	paths[386]=[92];
	paths[387]=[92];

	back_paths=[3,7,11,15,19,23,27,31,35,39,43,47,51,54,55,59,63,67,71,75,79,115,119,123,127,131,135,139,143,147,150,151,155,159,163,167,171,175,211,215,219,223,227,231,235,239,243,246,247,251,255,259,263,267,271,307,311,315,319,323,327,331,335,342,343,347,351,355,359,363,367];

}

