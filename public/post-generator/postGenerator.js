/*
single button:
				<span class="single-button" data-name="" data-icon=""></span>

button section by tags:
				<span class="button-section" id="" data-tags=""></span>

section:
			<span class="section" data-name="">
				
			</span>
*/

// how many buttons in a row before line break
var postBreakPoint = 3;

// whether to display html preview of bbcode
var postPreview = false;

////////////////////////////////////////////

// array of all buttons that have been added to the post
var addedButtonList = [];

// what order to load sections in
var loadOrder = [];

function generatePost() {
	
	if (new URL(window.location.toLocaleString()).searchParams.has('preview')) {
		// if url has "preview" param, show preview
		postPreview = true;
		// if preview param values is "false", hide preview
		if (new URL(window.location.toLocaleString()).searchParams.get('preview') === "false") postPreview = false;
	}
	
	document.getElementById("post navigation").innerHTML = `
		[center][size=4][b]Navigation:[/b][/size]
		<br>[size=4][url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629558]Gender[/url] | [url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629559]Pronouns[/url] | [url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629560]Orientations[/url] | [url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629562]Other Identities[/url]
		<br>[url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629563]Fandoms/Aesthetics[/url] | [url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629596]FR Specific[/url] | [url=https://www1.flightrising.com/forums/cc/3078623/1#post_49629605]Link Buttons[/url]
		<br>-----
		<br>
		<br>
	`;
	
	// load any individually specified buttons into .single-button elements
	// for each .single-button element, insert the button code for button with that name and icon
	Array.prototype.slice.call(document.querySelectorAll('.single-button')).forEach((sb) => {
		let button = buttonList.find(b =>
			b.name.toLowerCase() === sb.dataset.name.toLowerCase()
			&& ( b.icon.toLowerCase() === sb.dataset.icon.toLowerCase() || (b.name + ' ' + b.icon).toLowerCase() === sb.dataset.icon.toLowerCase() || sb.dataset.icon == "" )
			&& b.inFRPost != false
			&& (!b.palette || b.palette == 'Standard')
			&& (!b.shape || b.shape == 'Standard')
		);
		if (button !== undefined) insertButtonCode(button, sb);
		else console.log(
			`Single button load failed: Could not find button with name "` + sb.dataset.name
			+ `" and icon "` + sb.dataset.icon + `"`);
	});
	
	// load button sections based on tags
	loadOrder.forEach((s) => {
		if (document.getElementById(s)) {
			s = document.getElementById(s);
			
			// add buttons matching the section tags if it has them
			if (s.dataset.tags && s.dataset.tags != '') {
				// define array of button-section's tags
				let sTags = [];
				s.dataset.tags.split(',').forEach((tag) => { sTags.push(adjustText(tag)) });
				
				// fetch sorted list of buttons matching the tags
				let buttons = sortButtons(matchButtonsList( null, sTags ));
				
				// put button code in post
				buttons.forEach((b) => {
					if (b.inFRPost != false && (!b.palette || b.palette == 'Standard') && !addedButtonList.includes(b)) {
						insertButtonCode(b,s);
					}
				});
			}
		} else console.log("Could not load section with id " + s + " (ID does not exist)");
	});
	
	// text formatting for button sections
	document.querySelectorAll('.section').forEach((section) => {
		//let subtitle = section.dataset.subtitle
		// add the section title and subtitle if it has them
		if (section.dataset.name && section.dataset.name != '') {
			// get name
			let name = section.dataset.name;
			// get subtitle if it has one
			let subtitle = ``;
			if (section.dataset.subtitle) {
				subtitle = `<br>${section.dataset.subtitle}`;
				// clear HTML data
				section.dataset.subtitle = ``;
			}
			// add to section HTML
			section.innerHTML =
				`[size=4][b]${name}[/b][/size]${subtitle}
				<span class="spacer"></span>`
				+ section.innerHTML;
		}
		
		// blank line before section if not preceded by divider line
		if (!section.previousElementSibling.classList.contains('divider-line')) section.innerHTML = `<br><br>` + section.innerHTML;
		
		// set up spacers
		document.querySelectorAll('.spacer').forEach((spacer) => {
			if (postPreview) spacer.innerHTML = `<p class="html-spacer"></p>`;
			else spacer.innerHTML = `<br>[size=1][color=transparent]_[color][/size]<br>`;
		});
		
		// add line breaks to buttons
		addSectionBreaks( Array.prototype.slice.call( section.querySelectorAll(".button-code, .spacer") ) );
	});
	
	// adjustments for html preview
	if (postPreview) {
		let docBody = document.querySelector('body');
		docBody.classList.add('center');
		docBody.innerHTML = parseBBCode(docBody.innerHTML);
	}
	
	// log any sections that didn't load buttons
	document.querySelectorAll('.button-section').forEach((s) => {
		if (s.innerHTML.trim() == '') console.log('No buttons loaded in section id "' + s.id + '"');
	});
}

// insert button code into given parent element
// button should be from the buttonList array
function insertButtonCode(button, parent) {
	// add the button's bbCode
	let span = document.createElement("span");
	span.classList.add("button-code");
	if (postPreview) span.innerHTML += getHTMLCode(button);
	else span.innerHTML += getBBCode(button);
	parent.appendChild(span);
	
	// remember that this button has been added
	addedButtonList.push(button);
}

// add line breaks to an array of .button-code and .spacer elements
// postBreakPoint variable defines how many buttons per line
function addSectionBreaks(array) {
	// go through array and add spacing
	let bCount = 0;
	for (let i = 0; i < array.length; i++) {
		// if this is not the last child in the array and is the bbcode for a button
		if ( i < array.length - 1 && array[i].classList.contains('button-code') ) {
				
			// if next child is spacer, reset count
			if ( array[i+1].classList.contains('spacer') ) bCount = 0;
			
			// if next child is not a spacer, increment count and check if line break needed
			else {
				bCount += 1;
				
				// if this is the last button in the row, insert line break
				if ( bCount % postBreakPoint === 0 ) array[i].innerHTML += `<br>`;
				// else insert space
				else array[i].innerHTML += ` `;
			}
		}
	}
}

/**
 * This function takes a string in BBCode format and returns the parsed HTML.
 * 
 * @param {string} bbcode - The BBCode string to be parsed
 * @returns {string} - The parsed HTML string
 */
function parseBBCode(bbcode) {
  try {
    // Replace [b] tags with <strong> tags
    bbcode = bbcode.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');
    
    // Replace [i] tags with <em> tags
    bbcode = bbcode.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');
    
    // Replace [url] tags with <a> tags
    bbcode = bbcode.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>');
	
    // Replace [img] tags with <img> tags
    bbcode = bbcode.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1">');
    
	// Replace [size] tags with <span> tags
	bbcode = bbcode.replace(/\[size=(.*?)\](.*?)\[\/size\]/g, '<span style="font-size:var(--BBCode-font-$1);">$2</span>');
	bbcode = bbcode.replace(/\[size=(.*?)\](.*?)/g, '<span style="font-size:var(--BBCode-font-$1);">$2</span>');
	
	// Replace [color] tags with <span> tags
	bbcode = bbcode.replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1;">$2</span>');
	
	// Replace [center] tags with <center> tags
	bbcode = bbcode.replace(/\[\/?center\]|\[\/?columns\]|\[nextcol\]/g, '');
	
	// Replace ----- with <hr> tags
	bbcode = bbcode.replace(/\-{5,}/g, '<hr>');
	
    // Return the parsed HTML
    return bbcode;
  } catch (error) {
    // Log the error
    console.error(error);
    return '';
  }
}