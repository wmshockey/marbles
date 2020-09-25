
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
			
/* Initialize the deck */
			deck = fulldeck;
			discardpile = [];
			
/* Initialize the screen positions of players hands, discard pile and deck */
			screencoords = ["253", "435", "253", "435", "253", "435", "253", "435"];
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
				/* Make sure internal arrays and DOM values are in sync */
				greenhand = document.getElementById("game_greenhand").innerHTML.split(",");
				redhand = document.getElementById("game_redhand").innerHTML.split(",");
				bluehand = document.getElementById("game_bluehand").innerHTML.split(",");
				yellowhand = document.getElementById("game_yellowhand").innerHTML.split(",");
				discardpile = document.getElementById("game_discardpile").innerHTML.split(",");

				/* Need to save the screen coordinates in case anyone moved their hand to a new spot during their move.*/
				hand_div = document.getElementById("hand");
				x_coord = hand_div.offsetLeft;
				y_coord = hand_div.offsetTop;
				saveScreenCoords(x_coord, y_coord, user_color);
				$("#game_screen").val(screencoords).toString();

				/* Check for game over if all the players playable colors are in their home rows */
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
						$("#game_discardpile").val(discardpile.toString());
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
		var startHoles = red_start_holes.concat(blue_start_holes, yellow_start_holes, green_start_holes);
		var homeHoles = red_home_holes.concat(blue_home_holes, yellow_home_holes, green_home_holes);
		
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
		var greenplayer = false;
		var yellowplayer = false;
		var redplayer = false;
		var blueplayer = false;
		playedCard = "";
/* Initialize the board to all empty */
		board.fill("");

/* Intiailize the screen coordinates for the players hands, discard pile and deck */
		screencoords = ["253", "435", "253", "435", "253", "435", "253", "435"];
		$("#game_screen").val(screencoords.toString());
	}

/*
----------------------------------------------------	
	SHOW GAME STARTS HERE (SHOW MODE) between turns
----------------------------------------------------	
	
*/
	if (header == "Show Game") {

/* sets timer so that Show pages refresh every 10 seconds */
		setTimeout(function() {
			location.reload();		  
		}, 10000);
				
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var game_name = document.getElementById("game_name").innerHTML;
		var game_status = document.getElementById("game_status").innerHTML;
		var turn = parseInt(document.getElementById("game_turn").innerHTML);
		var comment = document.getElementById("game_comment").innerHTML;
		user_name = document.getElementById("user_name").innerHTML;
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
		
/* Save everything to database at this point in case it was updated during the move */
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
		d.style.width = "340px";
		d.style.height = "105px";
		d.style.border = "none";
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
		d.className = "noDrop";
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
		if (spot == 'deck') {
			d.className = "noDrop";
		}
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
		return true;
/* check for movement of any marbles */
/* get the card value of the played card to determine how far player can move a marble */
		moved_marbles = [];
		number_players = playerList.length;
		marbles_in_play = 4 * number_players;
		moved_count = 0;
		marble_count = 0;
		distance = 0;
		total_distance = 0;
		marbles_killed = 0;
		card_index = fulldeck.indexOf(playedCard);
		card_value = cardvalue[card_index];
				
/* Count number of marbles on the board */
		for (p=0; p<=96; p++) {
			if(board_end[p] != "") {
				marble_count++;
			}
		}

/* get the start hole and end hole for all marbles in play */
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

/* Calculate distance marble moved for all marbles currently in play */
			if (start_hole!=99 && end_hole!=99) {
				distance = calcDistance(start_hole, end_hole);
				if (distance != 0) {
					moved_marbles.push([mid, distance, start_hole, end_hole]);
					/* if marble killed or moved out of start row then don't include in total distance */
					if (distance < 100) {
						total_distance = total_distance + distance;
					}
					moved_count++;	
				}
			}
		}

/* Count marbles killed this move */
		marbles_killed = 0;
		for (i=0; i<moved_count; i++) {
			if ( moved_marbles[i][1] == 101) {
				marbles_killed++;
			}
		}

/* Check to see if any marbles came out of a start hole or into home holes*/
		start_hole_involved = false;
		home_hole_involved = false;
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			if ( startHoles.includes(start_hole)) {
				start_hole_involved = true;
			}
			if ( homeHoles.includes(start_hole) || homeHoles.includes(end_hole)) {
				home_hole_involved = true;
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
		if(playedCard == "" && moved_count > 0) {
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
			} else {
				return false;
			}
		}

/* Check that if no Jack played or marble coming out of start row, then total distance moved must match card played. */
		if ( playedCard && !["JH","JD","JS","JC"].includes(playedCard) && !start_hole_involved ){
			if (total_distance != card_value){
				alert("Number of positions marbles moved does not match the card played.");
				return false;
			}						
		}

/* Check that all marbles moved are playable */
		player_color = playerList[turn][1];
		/* Need to check if player is on a team and if he/she can play their partners marbles as well */
		playable_colors = getPlayableColors(player_color);

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
			/* Check if marble moved is playable 
			alert("player_color = " + player_color + " playable_colors = " + playable_colors + " marble_color = " + marble_color); */
			if (!playable_colors.includes(marble_color)) {
				/* marble is not playable unless it was killed or moved with a Jack card */
				marble_dist = moved_marbles[i][1];
				if ( marble_dist!=101 && !["JH","JD","JS","JC"].includes(playedCard)) {
					alert(player_color + " player is not allowed to move " + marble_color + " marbles.");
					return false;
				}
			}
		}		

/* Check that no marbles came out of a home row anywhere */
		for (i=0; i<moved_count; i++) {
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			if (homeHoles.includes(start_hole) && !homeHoles.includes(end_hole)) {
				alert("A marble cannot be moved out of its home row");
				return false;
			}
		}
		
/* Check that no marbles backed into a home row with a 4 card */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0];
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			if ((card_value == -4) && homeHoles.includes(end_hole)) {
				alert("A marble cannot be backed into a home row with a 4 card ");
				return false;
			}
		}
		
/* Check that no marbles went into the wrong home row */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0].substring(0,1);
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
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
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			if (moved_marbles[i][1] == 101) {
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

/* Check that if marble comes out of its start row it goes into correct position on active board. */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0].substring(0,1);
			dist = moved_marbles[i][1];
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			/* If marble came out of start hole, make sure an out card was played  */
			if ( startHoles.includes(start_hole) && !outCards.includes(playedCard) ) {
				alert("A marble came out of start row but no out card was played.");
				return false;
			}
			/* If marble came out of start hole, make sure it was only marble doing that */
			if ( startHoles.includes(start_hole) ) {
				if (moved_count>=2 && marbles_killed!=1) {
					alert("More than one marble moved when coming out of a start row.");
					return false;
				}
			}							
			if ( red_start_holes.includes(start_hole) && end_hole!=25) {
				alert("A red marble came out of start row into wrong hole on board.");
				return false;
			}
			if (blue_start_holes.includes(start_hole) && end_hole!=49) {
				alert("A blue marble came out of start row into wrong hole on board.");
				return false;
			}
			if (yellow_start_holes.includes(start_hole) && end_hole!=73) {
				alert("A yellow marble came out of start row into wrong hole on board.");
				return false;
			}
			if (green_start_holes.includes(start_hole) && end_hole!=1) {
				alert("A green marble came out of start row into wrong hole on board.");
				return false;
			}
		}

/* If Jack card played then 2 marbles must have been involved */
		if( ["JH","JD","JS","JC"].includes(playedCard) ) {
			if (moved_count != 2) {
				alert("A Jack was played but two marbles were not moved.");
				return false;
			}
			/* start_hole of first marble must become end_hole of second marble and vice versa */
			mid_1 = moved_marbles[0][0].substring(0,1);
			mid_2 = moved_marbles[1][0].substring(0,1);
			start_hole_1 = moved_marbles[0][2];
			end_hole_1   = moved_marbles[0][3];
			start_hole_2 = moved_marbles[1][2];
			end_hole_2   = moved_marbles[1][3];
			/* Check to make sure two marbles of same color were not swapped */
			if (mid_1 == mid_2) {
				alert("Two marbles of the same color were played when Jack card played.");
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
			if ( (start_hole_1 != end_hole_2) || (start_hole_2 != end_hole_1) ) {
				alert("Jack played but marble positions were not properly swapped.");
				return false;
			}
		}

/* If more than one marble moved, but no Jack, 7 or kills played, then move is invalid. */
		if (moved_count > 1) {
			if ( !["JH", "JD", "JC", "JS"].includes(playedCard) ) {
				if ( !["7H", "7D", "7C", "7S"].includes(playedCard)) {
					if (marbles_killed==0) {
						alert("More than one marble moved but card played does not allow that.");
						return false;
					}
				}
			}
		}


/* Check to make sure no marble jumped any other marble */
		for (i=0; i<moved_count; i++) {
			mid = moved_marbles[i][0].substring(0,1);
			dist = moved_marbles[i][1];
			start_hole = moved_marbles[i][2];
			end_hole = moved_marbles[i][3];
			/* if no Jacks, start holes, centre hole or 7 card involved, then it is just a straight board move */
			if ( !["JH","JD","JS","JC"].includes(playedCard) && !start_hole_involved && !home_hole_involved) {
				if ( dist<100 && end_hole!=0 && start_hole!=0 && card_value!=7) {
					if (checkForJumps(start_hole, end_hole)) {
						alert("A marble is trying to jump over another marble.");
						return false;
					}
				}
			}
		}


/* Checks for when just one marble moved */
		if (moved_count == 1){
			
			var marble = moved_marbles[0][0];
			var marble_color = marble.substring(0,1);
			distance = moved_marbles[0][1];
			start_hole = moved_marbles[0][2];
			end_hole = moved_marbles[0][3];

			/* If marble came out of starting row, an outcard must have been played */
			if ( (distance == 100) && !outCards.includes(playedCard)) {
				alert("A marble was brought out of start row but no outcard was played.");
				return false;
			}
			
			/* If marble is put back in start row (killed), then more than one marble must have moved */
			if (distance == 101) {
				alert("A marble was killed but no other marble moved to kill it.");
				return false;
			}
			
			/* If a Jack was played then more than one marble must have moved */
			if (["JH","JD","JS","JC"].includes(playedCard)) {
				alert("A Jack was played but only one marble moved");
				return false;				
			}
			
			/* If a move is -4 positions then a 4 card must have been played */
			if ( (distance == -4) && !(["4H","4S","4D","4C"].includes(playedCard) )) {
				alert("A marble was moved -4 positions but a 4 card was not played.");
				return false;
			}
			
			/* If marble moved out of centre hole with a 4 card, there are only 4 valid holes it could go to */
			if( card_value == -4) {
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
												
			/* If a normal marble move, the total distance moved must equal the card value */
			if (distance<100 && !["JH","JD","JS","JC"].includes(playedCard)) {
				if (total_distance != card_value) {
					alert("Number of places marble moved does not match the card played.")
					return false;
				}
			}
			
		}
/*		alert("finished checkMove OK"); */
		return true;
		
	}


	function calcDistance(start_hole, end_hole) {
	/* return codes:
			0   = marble unmoved or within start row
			100 = move from start row to first position on board
			101 = move from board to start row (i.e. marble was killed)
			109 = invalid move
	*/
		var start_rows = [21,22,23,24,45,46,47,48,69,70,71,72,93,94,95,96];
	/* move is within their start row */
		if (start_hole>=21 && start_hole<=24 && end_hole>=21 && end_hole<=24) {
			return 0;
		} else if (start_hole>=45 && start_hole<=48 && end_hole>=45 && end_hole<=48) {
			return 0;
		} else if (start_hole>=69 && start_hole<=72 && end_hole>=69 && end_hole<=72) {
			return 0;
		} else if (start_hole>=93 && start_hole<=96 && end_hole>=93 && end_hole<=96) {
			return 0;
	/* move is backwards using 4 card */
		} else if ([1,2,3].includes(start_hole) && [85,86,87,88].includes(end_hole)) {
			return -((start_hole -1) + (88 - end_hole) + 1);
		} else if ([25,26,27].includes(start_hole) && [13,14,15,16].includes(end_hole)) {
			return -((start_hole - 25) + (16 - end_hole) + 1);
		} else if ([49,50,51].includes(start_hole) && [37,38,39,40].includes(end_hole)) {
			return -((start_hole - 49) + (40 - end_hole) + 1);
		} else if ([73,74,75].includes(start_hole) && [61,62,63,64].includes(end_hole)) {
			return -((start_hole - 73) + (64 - end_hole) + 1);
		} else if (start_hole==0 && [4, 28, 52, 76].includes(end_hole)) {
			return -4;
		} else if ([10, 34, 58, 82].includes(start_hole) && end_hole==0) {
			return -4;
	/* move is from active board position to active board position */
		} else if ( start_hole>=1 && start_hole<=16 && end_hole>=1 && end_hole<=16 ) {
			return end_hole - start_hole;
		} else if (start_hole>=1 && start_hole<=15 && end_hole>=17 && end_hole<=20) {
			return (15 - start_hole) + (end_hole - 16);
		} else if (start_hole>=1 && start_hole<=16 && end_hole>=25 && end_hole<=40) {
			return (16- start_hole) + (end_hole - 25) + 1;
		} else if (start_hole>=25 && start_hole<=40 && end_hole>=25 && end_hole<=40) {
			return end_hole - start_hole;
		} else if (start_hole>=25 && start_hole<=39 && end_hole>=41 && end_hole<=44) {
			return (39 - start_hole) + (end_hole - 40);
		} else if (start_hole>=25 && start_hole<=40 && end_hole>=49 && end_hole<=64) {
			return (40- start_hole) + (end_hole - 49) + 1;
		} else if (start_hole>=49 && start_hole<=64 && end_hole>=49 && end_hole<=64) {
			return end_hole - start_hole;
		} else if (start_hole>=49 && start_hole<=63 && end_hole>=65 && end_hole<=68) {
			return (63- start_hole) + (end_hole - 64);
		} else if (start_hole>=49 && start_hole<=64 && end_hole>=73 && end_hole<=88) {
			return (64- start_hole) + (end_hole - 73) + 1;
		} else if (start_hole>=73 && start_hole<=88 && end_hole>=73 && end_hole<=88) {
			return end_hole - start_hole;
		} else if (start_hole>=73 && start_hole<=87 && end_hole>=89 && end_hole<=92) {
			return (87- start_hole) + (end_hole - 88);
		} else if (start_hole>=73 && start_hole<=88 && end_hole>=1 && end_hole<=16) {
			return (88- start_hole) + (end_hole - 1) + 1;
	/* move is into the centre hole */
		} else if (start_hole>=1 && start_hole<=7 && end_hole==0) {
			return 8- start_hole;
		} else if (start_hole>=8 && start_hole<=16 && end_hole==0) {
			return (16-start_hole) + 8;
		} else if (start_hole>=25 && start_hole<=31 && end_hole==0) {
			return 32 - start_hole;
		} else if (start_hole>=32 && start_hole<=40 && end_hole==0) {
			return (40 - start_hole) + 8;
		} else if (start_hole>=49 && start_hole<=55 && end_hole==0) {
			return 56 - start_hole;
		} else if (start_hole>=56 && start_hole<=64 && end_hole==0) {
			return (64 - start_hole) + 8;
		} else if (start_hole>=73 && start_hole<=79 && end_hole==0) {
			return 80 - start_hole;
		} else if (start_hole>=80 && start_hole<=88 && end_hole==0) {
			return (88 - start_hole) + 8;		
	/* move is to come out of starting row to first active board position */
		} else if (start_hole>=21 && start_hole<=24 && end_hole==1) {
			return 100;
		} else if (start_hole>=45 && start_hole<=48 && end_hole==25) {
			return 100;
		} else if (start_hole>=69 && start_hole<=72 && end_hole==49) {
			return 100;
		} else if (start_hole>=93 && start_hole<=96 && end_hole==73) {
			return 100;
	/* marble was killed so it is moving to home row from somewhere on board */
		} else if (start_rows.includes(end_hole) && !start_rows.includes(start_hole)) {
			return 101;
	/* handle marbles moving within their home row */
		} else if (start_hole>=17 && end_hole<=20) {
			return end_hole - start_hole;
		} else if (start_hole>= 41 && end_hole<=44) {
			return end_hole - start_hole;
		} else if (start_hole>=65 && end_hole<=68) {
			return end_hole - start_hole;
		} else if (start_hole>=89 && end_hole<=92) {
			return end_hole - start_hole;
	/* handle marbles starting from the centre hole */
		} else if (start_hole==0) {
			if (end_hole==0) {
				return 0;
			} else if (end_hole>=7 && end_hole<=16) {
				return end_hole - 6;
			} else if (end_hole>=17 && end_hole<=20) {
				return 10 + end_hole - 17;
			} else if (end_hole>=25 && end_hole<=30) {
				return 11 + end_hole - 25;
			} else if (end_hole>=31 && end_hole<=40) {
				return end_hole - 30;
			} else if (end_hole>=41 && end_hole<=44) {
				return 10 + end_hole - 41;
			} else if (end_hole>=49 && end_hole <=54) {
				return 11 + end_hole - 49;
			} else if (end_hole>=55 && end_hole <=64) {
				return end_hole - 54;
			} else if (end_hole>=65 && end_hole<=68) {
				return 10 + end_hole - 65;
			} else if (end_hole>=73 && end_hole<=78) {
				return 11 + end_hole - 73;
			} else if (end_hole>=79 && end_hole<=88) {
				return end_hole - 78;
			} else if (end_hole>=89 && end_hole<=92) {
				return 10 + end_hole - 89;
			} else if (end_hole>=1 && end_hole<=6) {
				return 11 + end_hole - 1;
			} else {
				return 109;
			}
	/* move is undefined */	
		} else {
			return 109;
		}
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
			return ["253", "436"];		
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
	
	function checkForJumps(start_hole, end_hole) {
		var tmp = 0;
		var start_hole_str;
		var end_hole_str;
		var hole_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88"];
		start_hole_str = start_hole.toString();
		end_hole_str = end_hole.toString();

		/* If the marble is moving backwards with a 4 card move, swap the start and end holes */
		if (dist == -4) {
			tmp = end_hole_str;
			end_hole_str = start_hole_str;
			start_hole_str = tmp;
		}

		if (hole_numbers.includes(start_hole_str) && hole_numbers.includes(end_hole_str)) {
			/* First search to find first occurance of start_hole_str */
			for (i=0; i<hole_numbers.length; i++) {
				if ( start_hole_str == hole_numbers[i]) {
					start_hole_index = i;
					break;
				}
			}
			/* Next search from position of start hole to where it finds the end hole number */
			for (i=start_hole_index; i<hole_numbers.length; i++) {
				if ( end_hole_str == hole_numbers[i]) {
					end_hole_index = i;
					break;
				}
			}
		} else {
			alert("Fatal Error: Cannot find the hole where marble resides.");
			return true;
		}

		/* Now check the holes BETWEEN the start and end index positions */
		start_hole_index = start_hole_index + 1;
		end_hole_index = end_hole_index - 1;
		for (i=start_hole_index; i<=end_hole_index; i++) {
			hole = parseInt(hole_numbers[i]);
			if ( board[hole] != "") {
				return true;
				break;
			}
		}
		return false;
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
	draggingFrom = ev.target.parentElement.id;
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
/*	alert("dragging " + draggingObj + " From " + draggingFrom + " To " + draggingTo); */

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

/* player is moving his hand to another place on the board */
	 if ( (draggingObj == "hand") && (draggingTo == "board")) {
		 h = document.getElementById(data);
		 ev.target.appendChild(h);
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
		if ( draggingTo == "card" ) {
			ev.target.parentElement.appendChild(document.getElementById(data));
		} else if (draggingTo = "hand") {
			ev.target.appendChild(document.getElementById(data));
		}
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

/*  player is moving a marble from hole to an empty hole */
    if ((draggingObj == "marble") && (draggingTo == "hole")){
		m = document.getElementById(data);
		/* Don't allow manually moving a marble into a start row */
		target_hole = ev.target.id;
		target_hole_nbr = parseInt(target_hole.substring(4,6));
		if ( [21, 22, 23, 24, 45, 46, 47, 48, 69, 70, 71, 72, 93, 94, 95, 96].includes(target_hole_nbr)) {
			alert("Invalid play.  Manually moving a marble to a start row is not allowed.  (Killed marbles are placed into their start row automatically).");
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
	if ((draggingObj == "marble") && (draggingTo == "marble")) {
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
	if ((draggingObj == "marble") && (draggingTo == "board")) {
		dm = document.getElementById(data);
		dm.style.position = "fixed";
		dm.style.left = (ev.clientX - x_offset) + "px";
		dm.style.top = (ev.clientY - y_offset) + "px";
		document.body.appendChild(dm);
		drop_ok = true;
	}

/* player is dragging his/her hand to somewhere on the board */
	if ((draggingObj=="hand") && (draggingTo=="board")) {
		dm = document.getElementById(data);
		dm.style.position = "fixed";
		dm.style.left = (ev.clientX - x_offset) + "px";
		dm.style.top = (ev.clientY - y_offset) + "px";
		document.body.appendChild(dm);
		drop_ok = true;
	}
	
/* player is dragging marble to their card hand */
	if ((draggingObj == "marble") && ((draggingTo == "card") || (draggingTo == "hand") || (draggingTo == "discard"))) {
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

