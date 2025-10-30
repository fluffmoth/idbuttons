var landing = ``;
var buttonsBlock = ``;
var buttonOptions;
var buttonsAdded = 0;

var buttonsBlockRefresh = ``;

function loadLanding() {
	// set page color theme
	setPageTheme();
	
	landing = document.getElementById(`landing-container`);
	buttonsBlock = document.getElementById(`buttons-block`);
	
	// show landing block
	landing.classList.remove('hidden');
	
	// get array of button image sources to use
	buttonOptions = [];
	buttonList.forEach((b) => { if (b.inFRPost != false && !b.tags.includes(`button base`) && (!b.palette || b.palette == 'Standard')) buttonOptions.push(getSrc(b)) });
	console.log(buttonOptions.length + ' button options found');
	
	updateLandingButtons();
	window.addEventListener('resize', function(event) { updateLandingButtons(); }, true);
	
	/*
	// refresh buttons on loop
	buttonsBlockRefresh = setInterval(function() {
		// each image has chance to change every loop
		buttonsBlock.querySelectorAll('img').forEach((img) => {
			// 40% chance of changing
			if (Math.random() > .25) {
				var src = getRandomFrom(buttonOptions);
				img.src = src;
			}
		});
	}, 1200);
	*/
}

// return max number of buttons needed to fill the screen
function fillButtonNum() {
	let num = ((window.innerWidth / 85) + 4) * (window.innerHeight / 15);
	if (num > 600) {
		setLandingButtonSize(true);
		return num / 2;
	} else {
		setLandingButtonSize(false);
		return num;
	}
}

// update size and quantity of buttons based on window size
function updateLandingButtons() {
	if (window.innerWidth < 450) landing.classList.remove('double');
	else landing.classList.add('double');
	
	while (fillButtonNum() > buttonsAdded) addButtonToBlock();
}

// set double button size
function setLandingButtonSize(double) {
	if (double) buttonsBlock.classList.add('double');
	else buttonsBlock.classList.remove('double');
}

function hideLanding() {
	landing.classList.add('hidden');
}

function addButtonToBlock() {
	console.log('adding');
	var src = getRandomFrom(buttonOptions);
	
	var img = document.createElement('img');
	img.src = src;
	buttonsBlock.appendChild(img);
	
	var index = buttonOptions.indexOf(src);
	if (index > -1) { // only splice array when item is found
		buttonOptions.splice(index, 1); // remove item
	}
	
	buttonsAdded += 1;
}