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

/* Set who gets to play first  */
		  	number_players = playerList.length;
			$("#game_turn").val("0");
			
/* Initialize the Board */
		    initializeBoard();		 
			$("#game_board").val(board.toString());
			
/* Initialize the deck */
			deck = fulldeck;
			discardpile = [];
			shuffle(deck);
			$("#game_deck").val(deck.toString());
		}

/* 
-------------------------------------------------		
		Players Turn is being saved 
-------------------------------------------------
*/

		else if (header == "Marbles Game") {
	/* save the end of move board positions */
			board_end = ($("#game_board").val()).split(",");
			cardsDealt = false;
			
	/* check if move is valid and if not, reset board to start of move */
			if (checkMove(playedCard, board_start, board_end) == false) {
				alert("There was a problem with your move.  Take your turn over.");
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
			} else {
				/* set next persons turn */
			  	number_players = playerList.length;
				turn = parseInt($("#game_turn").val());
				turn = turn + 1;
				if (turn >= number_players) {
					turn = 0;
				}
				$("#game_turn").val(turn.toString());								
			};			
			
	/* lock the discard pile by setting last discard as the discard background */
			var discardElement = document.getElementById("discardpile");
			if ( discardElement.hasChildNodes) {
				console.log(discardElement.childNodes[0]);
				var discard = discardElement.childNodes[0];
				discard_url = discard.getAttribute("src");
				discardElement.removeChild(discardElement.childNodes[0]);
			  	discard_background = "url(" + discard_url + ")";
			  	$("#discardpile").css('backgroundImage', discard_background);
			}
			
		}
  })

/* 
-------------------------------------------------  
  	Player hits the "Deal" button 
-------------------------------------------------
*/ 
	$('[id="deal"]').on("click", function() {
		if (cardsDealt) {
			alert("Cards have already been dealt.");
		} else {
			if (confirm("Deal cards?")) {
				dealCards();
				displayCards(turn_color);
				$("#game_deck").val(deck.toString());
				$("#game_discardpile").val(discardpile.toString());
				$("#game_greenhand").val(greenhand.toString());
				$("#game_redhand").val(redhand.toString());
				$("#game_bluehand").val(bluehand.toString());
				$("#game_yellowhand").val(yellowhand.toString());
				cardsDealt = true;			
			}
		}
	})

/*
------------------------------------------------- 
 INTIIALIZE EVERYTHING for all forms (New Game, Show Game and New Turn)
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
		var cardsDealt = false;
		var fulldeck = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS","J1","J2","J3","J4"];
		var cardvalue = 
		[2, 2, 2, 2, 3, 3, 3, 3, -4, -4, -4, -4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 1, 1, 1, 1, 0, 0, 0, 0, 13, 13, 13, 13, 12, 12, 12, 12, 15, 15, 15, 15];
		var marbleids = 
		["g21", "g22", "g23", "g24", "r45", "r46", "r47", "r48", "b69", "b70", "b71", "b72", "y93", "y94", "y95", "y96"];
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
		var greenplayer = false;
		var yellowplayer = false;
		var redplayer = false;
		var blueplayer = false;
		playedCard = "";
/* Initialize the board to all empty */
		board.fill("");	
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
		var comment = document.getElementById("game_comment").innerHTML;
		user_name = document.getElementById("user_name").innerHTML;
/* convert strings in page to arrays */	
		var board = (document.getElementById("game_board").innerHTML).split(",");
		var deck = (document.getElementById("game_deck").innerHTML).split(",");
		var discardpile = (document.getElementById("game_discard").innerHTML).split(",");
		var greenhand = document.getElementById("game_greenhand").innerHTML.split(",");
		var redhand = document.getElementById("game_redhand").innerHTML.split(",");
		var bluehand = document.getElementById("game_bluehand").innerHTML.split(",");
		var yellowhand = document.getElementById("game_yellowhand").innerHTML.split(",");

/* draw the board and card area */
		drawBoard();
		drawCardArea();
/* show the card on top of the discard pile */
		if (discardpile[0]) {
	  	  discard_background = "url(/cards/" + discardpile[0] + ".png)";
		  discardElement = document.getElementById("discardpile");
		  discardElement.style.backgroundImage = discard_background;
		  document.body.appendChild(discardElement);
	  	}
				
/* Get the player list */
		playerList = [];
		yplayer = document.getElementById("game_yplayer").innerHTML;
		gplayer = document.getElementById("game_gplayer").innerHTML;
		rplayer = document.getElementById("game_rplayer").innerHTML;
		bplayer = document.getElementById("game_bplayer").innerHTML;
		playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
		player = playerList[turn][0];
		turn_color = playerList[turn][1];

/* Display cards of person who is logged in */
		user_color = "";
		for (i=0; i<playerList.length; i++) {
			if (playerList[i][0] == user_name) {
				user_color = playerList[i][1];
			}
		}
		if (user_color != ""){
			displayCards(user_color);
			updateBoardArray();	
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
		var discardpile = ($("#game_discardpile").val()).split(",");
		var greenhand = ($("#game_greenhand").val()).split(",");
		var redhand = ($("#game_redhand").val()).split(",");
		var bluehand = ($("#game_bluehand").val()).split(",");
		var yellowhand = ($("#game_yellowhand").val()).split(",");
	  	var yplayer = $("#game_yplayer").val();
		var gplayer = $("#game_gplayer").val();
		var rplayer = $("#game_rplayer").val();
		var bplayer = $("#game_bplayer").val();
		
/* get the players list */
	    playerList = getPlayerList(yplayer, gplayer, rplayer, bplayer);
		var player = playerList[turn][0];
		var turn_color = playerList[turn][1];
		playedCard = "";  

/* Normal Page processing */
		drawBoard();
		drawCardArea();

/* Display cards of person whose turn it is */
		displayCards(turn_color);
		updateBoardArray();
				
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

	/* Allow drops onto the board canvas */
		c.setAttribute("ondrop", "drop(event)");
		c.setAttribute("ondragover", "allowDrop(event)");

	/* Make uppper left arc 270 to 360 degrees*/
		arc_centre_x = board_offset;
		arc_centre_y = board_offset;
		start_angle = 3*Math.PI/2;
		start_nbr = 1;
		ctx.beginPath();
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);

	/* Make upper right arc 180 to 270 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset + board_size;
		arc_centre_y = board_offset;
		start_angle = Math.PI;
		start_nbr = 25;
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make lower right arc 90 to 180 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset + board_size;
		arc_centre_y = board_offset + board_size;
		start_angle = Math.PI/2;
		start_nbr = 49;
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make lower left arc 0 to 90 degrees*/
		ctx.beginPath();
		arc_centre_x = board_offset;
		arc_centre_y = board_offset + board_size;
		start_angle = 0;
		start_nbr = 73;
		makeArcHoles(arc_centre_x, arc_centre_y, arc_radius, start_angle, start_nbr);
	
	/* Make left home holes */
		hole_x = board_offset;
		hole_y = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "grey", 87);
		hole_y = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", 88);
		hole_y = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", 86);
		hole_y = board_offset + board_size/2;
		nbr = 89;
		for (i=1; i<=4; i++){
			hole_x = board_offset + i * 35;
			makeHole(hole_x, hole_y, "green", nbr);
			nbr = nbr + 1;
		}

	/* Make upper home holes */
		hole_x = board_offset + board_size/2;
		hole_y = board_offset;
		makeHole(hole_x, hole_y, "grey", 15);
		hole_x = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", 14);
		hole_x = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", 16);
		hole_x = board_offset + board_size/2;
		nbr = 17;
		for (i=1; i<=4; i++){
			hole_y = board_offset + i * 35;
			makeHole(hole_x, hole_y, "red", nbr);
			nbr = nbr + 1;
		}
	
	/* Make right home holes */
		hole_x = board_offset + board_size;
		hole_y = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "grey", 39);
		hole_y = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", 38);
		hole_y = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", 40);
		hole_y = board_offset + board_size/2;
		nbr = 41;
		for (i=1; i<=4; i++){
			hole_x = (board_offset + board_size) - i * 35;
			makeHole(hole_x, hole_y, "blue", nbr);
			nbr = nbr + 1;
		}

	/* Make lower home holes */
		hole_x = board_offset + board_size/2;
		hole_y = board_offset + board_size;
		makeHole(hole_x, hole_y, "grey", 63);
		hole_x = (board_offset + board_size/2) + 35;
		makeHole(hole_x, hole_y, "grey", 62);
		hole_x = (board_offset + board_size/2) - 35;
		makeHole(hole_x, hole_y, "grey", 64);
		hole_x = board_offset + board_size/2;
		nbr = 65;
		for (i=1; i<=4; i++){
			hole_y = (board_offset + board_size) - i * 35;
			makeHole(hole_x, hole_y, "yellow", nbr);
			nbr = nbr + 1;
		}
	
	/* Make Centre Hole */
		hole_x = board_offset + board_size/2;
		hole_y = board_offset + board_size/2;
		makeHole(hole_x, hole_y, "black", 0);


	/* Make Green Starting Row */
		hole_x = board_size / 8;
		hole_y = board_size / 8;
		for (i=21; i<=24; i++){
			makeHole(hole_x, hole_y, "green", i);
			hole_x = hole_x + 25;
			hole_y = hole_y + 25;
		}

	/* Make Red Starting Row */
		hole_x = board_size + 2*board_offset - board_size/8;
		hole_y = board_size / 8;
		for (i=45; i<=48; i++){
			makeHole(hole_x, hole_y, "red", i);
			hole_x = hole_x - 25;
			hole_y = hole_y + 25;
		}

	/* Make Blue Starting Row */
		hole_x = board_size + 2*board_offset - board_size/8;
		hole_y = board_size + 2*board_offset - board_size/ 8;
		for (i=69; i<=72; i++){
			makeHole(hole_x, hole_y, "blue", i);
			hole_x = hole_x - 25;
			hole_y = hole_y - 25;
		}
	
	/* Make Yellow Starting Row */
		hole_x = board_size / 8;
		hole_y = board_size + 2*board_offset - board_size/8;
		for (i=93; i<=96; i++){
			makeHole(hole_x, hole_y, "yellow", i);
			hole_x = hole_x + 25;
			hole_y = hole_y - 25;
		}
		
	/* display the marbles on the board */
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
	/* Draw the card hand area */
		xstart = 50;
		width = 65;
		var d = document.createElement("div");
		d.setAttribute("id", "hand");
		d.setAttribute("draggable", "false");
		d.className = "cardspot";
		d.style.position = "absolute";
		d.style.left = '800px';
		d.style.top = '100px';
		d.style.width = "325px";
		d.style.height = "120px";
		d.style.border = "dotted";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);
		var d = document.createElement("div");
		d.setAttribute("id", "hand_label");
		d.className = "boardlabel";
		d.style.position = "absolute";
		d.innerHTML = user_name + "'s hand";
		d.style.left = "900px";
		d.style.top = "80px";
		document.body.appendChild(d);			
	/* Draw the discard area */
		var d = document.createElement("div");
		d.setAttribute("id", "discardpile");
		d.setAttribute("draggable", "false");
		d.className = "discardspot";
		d.style.position = "absolute";
		d.style.left = '870px';
		d.style.top = '260px';
		d.style.width = "65px";
		d.style.height = "100px";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);
		var d = document.createElement("div");
		d.setAttribute("id", "discard_label");
		d.style.position = "absolute";
		d.className = "boardlabel";
		d.innerHTML = "Played";
		d.style.left = "880px";
		d.style.top = "360px";
		document.body.appendChild(d);
	/* Draw the deck area i.e. deal pile */
		var d = document.createElement("div");
		d.setAttribute("id", "deck");
		d.setAttribute("draggable", "false");
		d.className = "cardspot";
		d.style.position = "absolute";
		d.style.left = '1000px';
		d.style.top = '260px';
		d.style.width = "65px";
		d.style.height = "100px";
		d.className = "noDrop";
		d.setAttribute("ondrop", "drop(event)");
		d.setAttribute("ondragover", "allowDrop(event)");
		document.body.appendChild(d);
		var d = document.createElement("div");
		d.setAttribute("id", "deck_label");
		d.className = "boardlabel";
		d.style.position = "absolute";
		d.innerHTML = "Deck";
		d.style.left = "1010px";
		d.style.top = "360px";
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
		greenhand = [];
		yellowhand = [];
		redhand = [];
		bluehand = [];
		number_players = playerList.length;
		if (deck.length <= 1) {
			deck = fulldeck;
			shuffle(deck);
			discardpile = [];
		} 	
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
/* check for movement of any marbles */
/* get the card value of the played card to determine how far player can move a marble */
		var outCards = ["KH","KS","KD","KC","AH","AS","AD","AC","J1","J2","J3","J4"];
		var card_index = fulldeck.indexOf(playedCard);
		var card_value = cardvalue[card_index];
		var moved_marbles = [];
		var moved_count = 0;
		var distance = 0;
		var total_distance = 0;
		var marbles_killed = 0;
		
/* first check to see if game has lost any marbles */
		moved_marbles = [];
		number_players = playerList.length;
		marbles_in_play = number_players * 4;
		marble_count = 0;
		distance = 0;
		total_distance = 0;
		for (p=0; p<=96; p++) {
			if(board_end[p] != "") {
				marble_count++;
			}
		}
		if (marble_count != marbles_in_play) {
			alert("Some marbles have been moved off board!  Marble count is " + marble_count);
			return false;
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
/* If marble not found in either the start hole or the end hole it is error condition. */
			if( (start_hole==99) && (end_hole!=99)) {
				alert("A marble appears on board out of no where.");
				return false;
			} else if ( (start_hole!=99) && (end_hole==99)) {
				alert("A marble has disappeard from the board.");
				return false;
			}

/* Calculate distance marble moved for all marbles currently in play */
			if (start_hole!=99 && end_hole!=99) {
				distance = calcDistance(start_hole, end_hole);
				if (distance != 0) {
					moved_marbles.push([mid, distance, start_hole, end_hole]);
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

/* If more than one marble moved */
		if (moved_count > 1) {

			/* If a Jack was played then 2 marbles must have been moved */
			if( ["JH","JD","JS","JC"].includes(playedCard)) {
				total_distance = 0;
				if (moved_count != 2) {
					alert("A Jack was played but two marbles were not moved.");
					return false;
				}
				/* start_hole of first marble must become end_hole of second marble and vice versa */
				start_hole_1 = moved_marbles[0][2];
				end_hole_1   = moved_marbles[0][3];
				start_hole_2 = moved_marbles[1][2];
				end_hole_2   = moved_marbles[1][3];
				if ( (start_hole_1 != end_hole_2) || (start_hole_2 != end_hole_1) ) {
					alert("Jack played but marble positions were not properly swapped.");
					return false;
				}
			
			/* If a 7 card was played */
			} else if (["7H","7D","7S","7C"].includes(playedCard)) {
				if (total_distance != 7) {
					alert("A 7 card was played but total marble moves was not 7");
					return false;
				}
				
			/* If more than one marble moved but a 7 or a Jack card or kill move was not played */
			} else {
				if ( marbles_killed != 1) {
					alert("More than one marble moved but no Jack or 7 card or kill played.");
					return false;
				}
			}

		}
		
/* If just one marble moved */
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
			
		/* If marble came out of a start row, it must be placed in first starting position */
			if ( marble_color == "y" && [93,94,95,96].includes(start_hole) && end_hole!= 73) {
				alert("Marble came out of yellow start row into wrong hole on board.");
				return false;
			} else if (marble_color == "g" && [21,22,23,24].includes(start_hole) && end_hole!=1) {
				alert("Marble came out of green start row into wrong hole on board.");
				return false;
			} else if (marble_color == "r" && [45,46,47,48].includes(start_hole) && end_hole!=25) {
				alert("Marble came out of red start row into wrong hole on board.");
				return false;
			} else if (marble_color == "b" && [69,70,71,72].includes(start_hole) && end_hole!=49) {
				alert("Marble came out of blue start row into wrong hole on board.");
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
		m.removeAttribute("style");
		m.style.width = "35px";
		m.style.height = "35px";
	    ev.target.appendChild(m);
  	    drop_ok = true;
    }
	
/* player is moving a marble from a hole to hole on top of another marble */
	if ((draggingObj == "marble") && (draggingTo == "marble")) {
		killed_marble = ev.target.id;
		killer_marble = data;
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
	
/* player is dragging marble from hole to somewhere on the open board */
	if ((draggingObj == "marble") && (draggingTo == "board")) {
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



