// GOAL: To imitate terminal to the fullest extent possible

// TODO A wall of available commands
// TODO Run it through Babel (for Safari) !!
// TODO Maybe go into the mode of listening to ARROW_UP and ARROW_DOWN when the last result was a list (or a specific option from the available commands)
// TODO Scroll down to the input automatically
// TODO If the quote is already being displayed, don't show it and choose a different one.
// TODO If possible make it so that available commands element is created right after the wrong command is entered.

$(document).ready(function() {

	let $terminal = $('#terminal');
	let historyDisplayedIndex = -1;
	let lastDisplayedIndex = -1;

	let termHistory = []; // work with this

	// Text Options
	let wakeUp = "Hello, Friend...",
	knock = "Knock, knock, Ari...",
	about = 'My name is Arihant Chawla. Leave me here.',
	writeCode = "I write code. I write. And I dream.",
	learnMore = "Learn more. Read More.",
	quote = "We don't need no education.",
	listCommands = 'Available commands: [about] [bio] [clear] [contact] [skills] [social] [blog] [quote]',
	commandNotFound = 'command not found. don\'t worry, it\'s probably just a gg..glitch in the matrixxxx. gli$dvcs$glitch in the mmmaatrix-trix.',
	skills = "Languages: & C/C++, Python, LaTeX, Qiskit, Bash, MySQL \n Software & Tools: MatLab, GNU Octave, Adobe Photoshop, Proteus, Django \n Operating Systems: Linux (Debian), Windows 7/8/8.1/10",
	contact = "Contact me -> arihant.chawla@yahoo.com";
	// let

	let arrowNavigationMode = false;

	let quotes = [
		"(on the milennial spirit) ...and we made and filed memories under our favourite songs. Our discography a collection of memories of places we longed to visit, conversations that did not happen, of repressed feelings, feelings of nostalgia, nostalgia of memories that we conviently made up, too afraid to actually live them. We filed these memories under our favourite songs, to live on for eternity. The memories live on for eternity. We, alas, are stuck in the banalities of the present.",
		"The collective feeling of being trapped in the wrong spatio-temporal location (?) that's ingrained in our generation's dna is rooted in this cyclic renaissance, which like a comet returns and dazzles all of us by it's chameleon tail. All of us seeing a part of us as part of that tail and that's surreal, almost beautiful that we can feel this camaraderie without the need of discussing it or even mentioning it.",
		"chalo chalein neel gagan ko",
		"It's time to get back in the swing of things \n When my life crashes, I'm not the guy that'll flee the scene, I'll take ownership, own it and raise my hand if it's me",	
		"If you looked at yourself in the world's most honest mirror, what would you see?",
		"aren't you tired of being a hostage of your own pride?",
		"ffsarihant , a cracked polystyrene man, who just crumbles and burns",
		"ffsarihant authors his own disasters. % so you don't need me anymore?",
		"ƃuıʎpnʇs ǝq plnoɥs ı ",
		"how long must I justify my pain through these songs?",
		"A beanie instantly increases your asshole-ry stat by 10 percent",
		"I don't even feel attacked when someone calls me a boomer anymore",
		"You ever feel you were meant to be alone? Cause I saw a play, and a character said that he was destined to never feel at home",
		"I will draw my line, I will blur my line, I will cross my line",
		"Are you even good enough to have imposter syndrome",
		"Advice is a form of nostalgia, dispensing it is a way of fishing the past from the disposal, wiping it off, painting over the ugly parts and recycling it for more than it's worth",
		"Yeah, if you made a list of people that you trusted, would you put your name down?",
		"I wanna dress up as a DDoS attack for halloween but not enough of my friends are agreeing to",
		"I had an epiphany",
		"I wish I could capture the stars. \n At least in a photo, \n but I'd really like them in a jar, \n emulating fireflies. \n \n How powerful I'd feel, \n knowing that I had a bit of sky, \n the same sky everyone stood under, \n the same sky everyone wished upon, \n when seeing one of these stars fly. \n \n My little piece of universe would remind me \n how small I really am. \n But they would also remind me, \n how connected we are, \n and of the insane beauty of simplicity. \n \n I wish I could capture the stars. \n But now I realize the sadness. \n My jar of stars would outlive me. \n My everlasting fireflies",
	];

	function getRandomQuote() {
		var randomIndex = Math.floor(Math.random() * Math.floor((quotes.length)));
		console.log("Random index generated is " + randomIndex);
		return quotes[randomIndex];
	}

	let list = "For a list of available commands, type 'help'";

	function generateContactHTML() {
		let contact = $('<ul id="abilities"></ul>');

		let instagram = $('<li></li>');
		let github = $('<li></li>'); // optimize this
		let linkedin = $('<li></li>');
		let twitter = $('<li></li>');
		let goodreads = $('<li></li>');


		let githubLink = $('<a>Github</a>').attr({
			'href': 'https://github.com/arihantchawla/',
			'target': '_blank'
		});

		let twitterLink = $('<a>Twitter</a>').attr({
			'href': 'https://twitter.com/ArihantChawla',
			'target': '_blank'
		});

		let instagramLink = $('<a>Instagram</a>').attr({
			'href': 'http://www.instagram.com/ffsarihant',
			'target': '_blank'
		});

		let linkedinLink = $('<a>LinkedIn</a>').attr({
			'href': 'https://linkedin.com/in/arihantchawla',
			'target': '_blank'
		})
		
		let goodreadsLink = $('<a>Goodreads</a>').attr({
			'href': 'https://www.goodreads.com/user/show/81782856-arihant-chawla',
			'target': '_blank'
		})

		instagram.append(instagramLink);
		github.append(githubLink);
		linkedin.append(linkedinLink);
		twitter.append(twitterLink);
		goodreads.append(goodreadsLink);


//		console.log("$$$ Github element is currently: ");
//		console.log(github);

		contact.append(instagram);
		contact.append(github);
		contact.append(linkedin);
		contact.append(twitter);
		contact.append(goodreads);


//		console.log("*** Working with the DOM: contactEl - ");
//		console.log(contact);
		return contact;

		arrowNavigationMode = true; // change this back after a
	}

	function generatePortfolioHTML() {
		let portfolioContainer = $('<div></div>');

		let portfolioLink = $('<a>here</a>').attr({
			'href': 'https://thearihantchawlablog.wordpress.com',
			'target': '_blank'
		});

		let portfolioText = "You can see my blog live ";

		portfolioContainer.append(portfolioText);
		portfolioContainer.append(portfolioLink);

		return portfolioContainer;
	}

	function generateSkillHTML() {
		let skillsFullOne = $('<div id="skills"></div>');

		let skillsFull = $('<div id="skills"><p>> list skill</p><p>> where &lt;skill&gt; is one of:<skill><p class="subresult">HTML5, CSS3, ReactJS, D3, GIT and Github, </p></div><div id="familiar"><p>> list familiar area:</p><p>> where &lt;area&gt; is one of:</p><p class="subresult">Haxe, OpenFL, Python, THREE.js, Node.js</p></div>')
	}

	// <li><i class="fa fa-suitcase"></i> <a href="https://www.vretta.com/" target="_blank">work</a></li>


	let shortBio = "CS Undergrad who loves to code and read. if I'm not making something fun, you'll probably find me sitting in my cosy armchair with coffee, snuggling upto a book.";
	let typeSpeedSuperFast = 25;
	let typeSpeedSlow = 65;
	let typeSpeedFast = 50; // in ms

	var autotype = function(el, text, i, interval) {
		// $(el).append("> ");
		if (i < text.length) {
			$(el).append(text[i++]);
			setTimeout(function () { autotype(el, text, i, interval); }, interval);
		}
		return $(el);
	};

	// IsAutotype is Bool
	// isHTML or not

	function clearTerminal() {
		$('.term-output').remove();
	}

	function addHTMLToTerminal(html) {
		let $el = $('<p class="term-output"></p>').append(html).appendTo($terminal);

		// $el.append(html);
	}

	function addToTerminal(text, speed, isAutotype) {
		let $el = $('<p class="term-output"></p>').text('> ').appendTo($terminal);

		if (isAutotype) {
			autotype($el, text, 0, speed);
		} else {
			$el.append(text);
		}

		return $el;
	}

	var handleInput = function() {
		let value = $('#term-prompt').val();

		console.log("***" + typeof value);

		switch (value.toLowerCase()) {
			case 'about':
				let aboutEl = addToTerminal(about, typeSpeedFast, false);
				break;
			case 'bio':
				let bioEl = addToTerminal(shortBio, typeSpeedFast, false);
				break;
			case 'clear':
				clearTerminal();
				let listEl = addToTerminal(list, typeSpeedFast, true);
				break;
			case 'contact':
				let contactEl = addToTerminal(contact, typeSpeedFast, true);
				break;
			case "whois":	
				// add a div that
				// have a function that creates and appends certan elements to the pages
				break;
			case "help":
				// alert("help is working!");
				let helpEl = addToTerminal(listCommands, typeSpeedFast, false);
				break;
			case "list":
				break;

			case 'skills':

				let skillsEl = addToTerminal(skills, typeSpeedFast, false);
				// generateSkillHTML();
				// $('#abilities').show();
				break;


			case 'social':
				// optimize this code and the code below - maybe in a function
				let socialHTML = generateContactHTML();
				let socialEl = addHTMLToTerminal(socialHTML);
				break;

			case 'blog':
				let portfolioHTML = generatePortfolioHTML();
				let portfolioEl = addHTMLToTerminal(portfolioHTML);
				break;

			case 'quote':
				let quoteEl = addToTerminal(getRandomQuote(), typeSpeedFast, false);
				break;

			case '':
				break;

			default:
				console.log("I don't understand, please choose between these options:");
				let commandNotFoundEl = addToTerminal(commandNotFound, typeSpeedSuperFast, true);
				let unknownEl = addToTerminal(listCommands, typeSpeedFast, false);
				// unknownEl
				setTimeout(function() {

				}, 4000);

		}
	}

	function createAndAutofillEl() {

	}

	function init() {

		// improve this code
		setTimeout(function() {
			let wakeupEl = addToTerminal(wakeUp,  typeSpeedSlow, true);
		}, 200);

		setTimeout(function() {
			let listEl = addToTerminal(list, typeSpeedFast, true);
		}, 3500);

		setTimeout(function() {
			$('#term-prompt').html('&#9612;');
			$('#terminal-line').show();
			$('#term-prompt').focus();

		}, 6500);

		// make "I write code" to be text first, and then change it to link?

	}

	$('body').on('click', function() {
		$('#term-prompt').focus();
	});

	$('#term-prompt').on('click', function() {
		$('#term-prompt').focus();
	});

	$(".expand").on("click", function() {
		$(".learn").delay(100).hide();
		$("#short-bio").delay(200).show();

		autotype('#short-bio', shortBio, 0, typeSpeedFast / 2);

		$("#online-presence").delay(300).show();
		$("#abilities").show();
	});

	$('#term-prompt').on("keydown", function(e) {
		console.log("The button you're currently pressing has a code of " + e.which);
		// preventDefault(); // ???
		// should there be a switch case here?
		let keyEnter = 13,
			keyArrowDown = 40, // check if it works for other machines
			keyArrowUp = 38;

		//
		if (e.which == keyEnter) {
			if ($('#term-prompt').val() != termHistory[termHistory.length-1]) {
				console.log('The input was different from the previous one.');
				handleInput(); //
			} else {
				console.log("This input is the same as previous - it shouldn't be added.");
			}


			// clear the input
			if ($('#term-prompt').val() !== "") {
				termHistory.push($('#term-prompt').val());
			}

			historyDisplayedIndex++;
			console.log("Now the terminal history is");
			console.log(termHistory);

			$('#term-prompt').val('');

		}

		// ARROW UP
		if (e.which == keyArrowUp) {
			console.log("Arrow Up is pressed");

			if (historyDisplayedIndex > 0) {
				historyDisplayedIndex--;
			}


			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
		}

		// ARROW DOWN
		if (e.which == keyArrowDown) {
			console.log("Arrow Down is pressed");
			if (historyDisplayedIndex < termHistory.length) {
				historyDisplayedIndex++;
			}

			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
		}

	})

	// $('#term-prompt').on("keypress", function(e))

	init();
});
