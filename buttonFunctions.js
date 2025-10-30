// url parameters
var urlParams = new URL(window.location.toLocaleString()).searchParams;
// url tags array
var urlTags = [];
// original search parameters
var searchInput = '';
// modified search parameter array
var urlSearch = [];

// page theme colors
var theme = {
	light: {
		bg: '#fff',
		
		text: '#312F43',
		link: '#9278a1',
		linkhover: '#312F43',
		selectbg: '#DBD2E0',
		
		btn: '#DBD2E0',
		btntext: '#312F43',
		btnborder: '#312F43',
		btnhover: '#f3f0f5',
		btnhighlight: 'yellow',
		
		filterbutton: '#DBD2E0',
		filterbuttontext: '#312F43',
		
		tablehead: '#DBD2E0',
		tableheadtxt: '#312F43',
		tablerow1: '#fff',
		tablerow2: '#f3f0f5',
		
		boxborder: '#DBD2E0',
		textboxborder: '#DBD2E0'
	},
	dark: {
		bg: '#191620',
		
		text: '#f3f0f5',
		link: '#aa96b6',
		linkhover: '#f3f0f5',
		selectbg: '#9278a1',
		
		filterbutton: '#DBD2E0',
		filterbuttontext: '#312F43',
	
		tablehead: '#38344b',
		tablerow1: '#000',
		tablerow2: '#211f2d',
		
		boxborder: '#9278a1',
		textboxborder: '#9278a1'
	}
}

// initial page setup
function initButtons() {
	// set page color theme
	setPageTheme();
	
	// add button count text
	var buttonCount = ``;
	buttonCount += buttonList.length;
	if (buttonCount.length > 3) buttonCount = buttonCount.slice(0,buttonCount.length - 3) + `,` + buttonCount.slice(buttonCount.length - 3);
	document.getElementById('button-count').innerHTML = buttonCount;
	
	// split url tags into array
	if ( urlParams.has('tags') && urlParams.get('tags') != '' ) {
		urlParams.get('tags').split(',').forEach((t) => {
			// if the tag is not already in the array
			if ( !urlTags.includes(adjustText(t)) ) urlTags.push(adjustText(t));
		});
	}
	console.log('Tag filters:');
	console.log(urlTags);
	
	// define search variables
	if ( urlParams.has('search') && urlParams.get('search') != '' ) {
		searchInput = urlParams.get('search').trim();
		document.querySelector('#search-input').value = searchInput;
		// split search by various symbols (skipping duplicates)
		urlSearch = urlSearch.concat(searchInput.split(','));
		urlSearch = urlSearch.concat(searchInput.split(' ').filter((item) => urlSearch.indexOf(item) < 0));
		urlSearch = urlSearch.concat(searchInput.split('-').filter((item) => urlSearch.indexOf(item) < 0));
		urlSearch = urlSearch.concat(searchInput.split('/').filter((item) => urlSearch.indexOf(item) < 0));
		// adjustText on all search parameters
		for (let i = 0; i < urlSearch.length; i++) urlSearch[i] = adjustText(urlSearch[i]);
	}
	console.log('Search filters:');
	console.log(urlSearch);
	
	// set up filter form if it exists
	if (document.querySelector('#filter-buttons') && document.querySelector('#filters')) initFilterForm();
	
	// set up table if it exists
	if (document.querySelector('#button-table')) initButtonTable();
	
	console.log(urlParams);
}

// returns first button in buttonList with the given name and (optional) icon
function getButton(name,icon,params) {
	if (name) name = name.trim().toLowerCase();
	if (icon) icon = icon.trim().toLowerCase();
	if (!params) params = {};
	else if (params.palette) params.palette = params.palette.toLowerCase();
	
	let btn;
	
	function isPaletteMatch(b) { return !params.palette || (b.palette.toLowerCase() == params.palette) || params.anyPalette; }
	function isIconMatch(b) { return !icon || b.icon.toLowerCase() === icon; }
	
	if (name) {
		btn = buttonList.find(b =>
			b.name.toLowerCase() == name
			&& isIconMatch(b)
			&& isPaletteMatch(b)
		);
		// if button not found matching name and icon, check if button exists with 'buttonname buttonicon' matching provided name or icon
		if (!btn) btn = buttonList.find(b =>
			(b.name + ' ' + b.icon).toLowerCase() === (name || icon)
			&& isPaletteMatch(b)
		);
		
		// if name not found and altNames parameter either not set or true, check altNames
		if (!btn && (params.altNames == undefined || params.altNames == true)) {
			btn = buttonList.find(b =>
				b.altNames
				&& b.altNames.findIndex(element => { return element.toLowerCase() === name; }) != -1
				&& isIconMatch(b)
				&& isPaletteMatch(b)
			);
			// if button not found, check if button exists with 'altName buttonicon' matching provided name
			if (!btn) btn = buttonList.find(b =>
				b.altNames
				&& b.altNames.findIndex(element => {
					return element.toLowerCase() + ' ' + b.icon.toLowerCase() === name
						|| element.toLowerCase() + ' ' + b.icon.toLowerCase() === icon;
				}) != -1
				&& isPaletteMatch(b)
			);
		}
	}
	// if icon given but not name
	else if (icon) {
		btn = buttonList.find(b =>
			b.icon.toLowerCase() === icon
			&& isPaletteMatch(b)
		);
	}
	return btn;
}

// for each tag string in given array, remove all instances of !tag from the array
// return updated array
function removeContradictingTags(arr) {
	var testArr = arr;
	// for any tags that contain OR characters, split the separate tags and put them in testArr
	arr.forEach((tag) => { if (tag.includes('|')) testArr = testArr.concat(tag.split('|')); });
	// for each "tag" in testArr, remove all instances of "!tag" from arr 
	testArr.forEach((tag) => { if (!tag.startsWith('!')) arr = arr.filter(a => a !== '!'+tag) });
	// return updated array
	return arr;
}

// sort buttons in given array by matchCount, then alphabetically
// returns new sorted array
function sortButtons(array) {
	array = array.sort( function(a, b) {
		return b.exactName - a.exactName || // sort by exactName (descending)
			b.exactIcon - a.exactIcon || // if still identical, sort by exactIcon (descending)
			b.exactTags - a.exactTags || // if still identical, sort by exactTags (descending)
			b.partialNameStart - a.partialNameStart || // if still identical, sort by partialNameStart (descending)
			b.partialName - a.partialName || // if still identical, sort by partialName (descending)
			(b.partialIcon + b.partialTags) - (a.partialIcon + a.partialTags) || // if still identical, sort by partial icon/tag matches
			a.name.localeCompare(b.name) || // if still identical, sort alphabetically by name (ascending)
			a.icon.localeCompare(adjustIconText(b)) || // if still identical, sort alphabetically by icon name (ascending)
			generateIconText(a.icon).localeCompare(generateIconText(b.icon)) ||
			// if still identical, sort by palette (standard palette at top)
			(!b.palette || (b.palette && b.palette.toLowerCase() == 'standard')) - (!a.palette  || (a.palette && a.palette.toLowerCase() == 'standard'));
	});
	
	// remove excess low accuracy matches
	if ( array.length > 200 ) {
		var extras = [];
		array.forEach((b) => { if ( b.exactName + b.exactIcon + b.exactTags + b.partialName + b.partialIcon == 0 ) extras.push(b); });
		if ( extras.length > 50 ) {
			for ( let i = extras.length - 1; i >= 0; i-- ) {
				var b = extras[i];
				if ( b.exactName + b.exactIcon + b.exactTags == 0 && extras.length > 50 ) array.splice(array.indexOf(b), 1);
			}
		}
	}
	
	return array;
}

// sort buttons in given array by dateAdded, then alphabetically
// returns new sorted array
function sortButtonsNewToOld(array) {
	array = array.sort( function(a, b) {
		// set dateAdded values to 0 if they don't already exist
		if (!a.dateAdded) a.dateAdded = 0;
		if (!b.dateAdded) b.dateAdded = 0;
		
		return Date.parse(b.dateAdded) - Date.parse(a.dateAdded) || // sort by dateAdded (descending)
			a.name.localeCompare(b.name) || // if dateAdded is identical, sort alphabetically by name (ascending)
			a.icon.localeCompare(adjustIconText(b)) || // if names are identical, sort alphabetically by icon name (ascending)
			a.icon.localeCompare(b.icon);
	});
	return array;
}

// returns unsorted array of all buttons matching current parameters
function matchButtonsList(search,tags) {
	// buttons that matched
	let list = [];
	
	// define search array if one not given
	if (!search) { search = []; }
	// define tag array if one not given
	if (!tags) { tags = []; }
	
	//console.log(`Fetching button list with search parameters '${search}' and tag parameters '${tags}'`);
	
	// log search/tag match properties of all buttons
	buttonList.forEach((b) => {
		// reset button match properties
		// whether button matches enough to be displayed
		b.match = true;
		// number of matches found within tags and names
		b.exactName = 0;
		b.partialName = 0;
		b.partialNameStart = 0; // partial name matches where the match was at the start of the name
		b.exactIcon = 0;
		b.partialIcon = 0;
		b.exactTags = 0;
		b.partialTags = 0;
		
		// set this button's adjusted tag list
		b.adjTags = [];
		b.tags.forEach((t) => { b.adjTags.push(adjustText(t)); });
		
		// set this button's adjusted name
		b.adjName = adjustText(b.name);
		
		// set this button's adjusted icon
		b.adjIcon = adjustText(b.icon);
		
		// if search parameters given, require at least one to match
		if ( search.length > 0 ) {
			search.forEach((s) => {
				if ( b.adjTags.includes(s) ) b.matchCount += 1;
				// search the button's name
				if ( b.adjName.includes(s) ) {
					b.partialName += 1;
					if ( b.name.toLowerCase().startsWith(s.toLowerCase()) ) b.partialNameStart = 1;
					// if exact match
					if ( s == b.adjName ) b.exactName = 1;
				}
				// search the buttons altNames if it has any
				if ( b.altNames ) {
					b.altNames.forEach((n) => {
						n = adjustText(n);
						if ( n.includes(s) || s.includes(n) ) {
							if (b.partialName == 0) b.partialTags += 1;
							// if exact match
							if ( s == n ) b.exactName = 1;
						}
					});
				}
				// search the button's icon
				if ( b.icon != '' && (b.adjIcon.includes(s) || s.includes(b.adjIcon)) ) {
					b.partialIcon += 1;
					// if exact match
					if ( s == b.adjIcon || s == adjustText(adjustIconText(b)) ) b.exactIcon = 1;
				}
				// search the button's taglist
				b.adjTags.forEach((bTag) => {
					// if exact match
					if ( bTag == s ) b.exactTags += 1;
					// if partial match
					else if ( bTag.includes(s) || bTag == s.replaceAll(/gender|sexual|romantic/gi,'') ) b.partialTags += 1;
				});
			});
			// if no search parameters matched
			if ( (b.exactName + b.partialName + b.exactIcon + b.partialIcon + b.exactTags + b.partialTags) < 1 ) b.match = false;
		}
		
		// if search matched
		if (b.match) {
			tags.forEach((t) => {
				// if the tag didn't match, set b.match to false
				if ( isTagMatch(b,t) == false ) b.match = false;
				
				// if tag is a match
				if (b.match) updateMatchData(b,t);
			});
		}
		
		// if everything matched
		if (b.match) list.push(b);
	});
	
	return list;
}

// update button b's exactName and exactTags based on matches with tag t
function updateMatchData(b, t) {
	// if the tag contains an or function
	// indicated by |
	if (t.includes('|')) {
		let tags = t.split('|');
		tags.forEach((newT) => {
			updateMatchData(b, adjustText(newT));
		});
	}
	// if the tag is not an or function
	else {
		// check if the tag matches the button's name
		if ( t == b.adjName ) { b.exactName += 1; b.exactTags = 1; }
		// check if the tag matches the button's icon
		if ( t == b.adjIcon || t == adjustText(adjustIconText(b)) ) b.exactTags = 1;
		// check if the tag is in the button's taglist
		b.adjTags.forEach((bTag) => { if (bTag == t) b.exactTags += 1; });
	}
}

// checks if button b is a match for tag t
function isTagMatch(b, t) {
	// whether tag matches
	let tagMatched = true;
	
	// if the tag contains an or function
	// indicated by |
	if (t.includes('|')) {
		tagMatched = false;
		let tags = t.split('|');
		tags.forEach((newT) => {
			if ( isTagMatch(b, adjustText(newT)) ) tagMatched = true;
		});
	}
	
	// if the tag is not an or function
	else {
		// whether the tag should match or not
		let tagMatching = true;
		if (t.substring(0,1) == '!') {
			tagMatching = false;
			t = t.substring(1,t.length);
		}
		
		// require tag to match
		if ( !b.adjTags.includes(t) && b.adjName != t ) tagMatched = false;
		// check if the tag matches the button's altNames, if it has them
		if ( b.altNames ) {
			b.altNames.forEach((n) => {
				if ( t == adjustText(n) ) {
					tagMatched = true;
					b.exactName += 1;
					b.exactTags = 1; };
			});
		}
		
		// invert match result if the tag is supposed to be excluded
		if (tagMatching == false) tagMatched = !tagMatched;
	}
	
	return tagMatched;
}

// returns sorted array of the most recently added buttons
// num is the maximum number of buttons to include
function recentButtonsList(num) {
	var arr = [];
	// add all buttons that have a dateAdded value
	buttonList.forEach((b) => {
		if (b.dateAdded) arr.push(b);
	});
	// sort array by most recent
	sortButtonsNewToOld(arr);
	arr.length = Math.min(arr.length,num);
	return arr;
}

// get random value from array
function getRandomFrom(array) {
	return array[Math.floor((Math.random()*array.length))]
}

// adjust tag/search input text to standardize it
function adjustText(txt) {
	if (!txt || txt == '') return txt;
	else {
		txt = txt.replace(/ |-|'/gm,'').toLowerCase();
		txt = txt.replace(/feminine/gi,'fem').replace(/masculine/gi,'masc').replace(/androgynous/gi,'androgyny').replace(/nonbinary/gi,'nb')
		txt = txt.replace(/transgender/gi,'trans').replace(/cisgender/gi,'cis').replace(/fluix|fliux/gi,'fluidflux');
		txt = txt.replace(/pronouns/gi,'pronoun').replace(/genders/gi,'gender');
		return txt;
	}
}

// adjust button's icon description text for search/sort functions
// returns adjusted text
function adjustIconText(btn) {
	let txt = ``;
	if (btn.icon && btn.icon != '') {
		if (
			!btn.icon.startsWith('flag') ||
			!btn.icon.startsWith('alt flag') ||
			!btn.icon.startsWith('logo') ||
			!btn.icon.startsWith('icon') ||
			!btn.icon.startsWith('symbol') 
		) {
			txt = generateIconText(btn);
			txt = txt.replace(/color - /gi,'');
		}
	}
	else if (btn.iconBase) txt = btn.iconBase.name + ' ' + btn.iconBase.icon;
	return txt;
}

// generate button icon text to display
function generateIconText(btn) {
	if (!btn.icon && btn.iconBase) return `${btn.iconBase.name} (${btn.iconBase.icon})`;
	else if (btn.icon) {
		if (
			btn.icon.startsWith('flag') ||
			btn.icon.startsWith('alt flag') ||
			btn.icon.startsWith('logo') ||
			btn.icon.startsWith('icon') ||
			btn.icon.startsWith('symbol') 
		) return `${btn.name} ${btn.icon}`;
		else return btn.icon;
	}
	else return ``;
}

function adjustIconBaseName(btn) {
	if (btn.iconBase) {
		let name = btn.iconBase.name;
		return name.replace(/.* star/gi,'Star');
	} else return '';
}

// sets button's alt text if not already set
function setAltText(btn) {
	// if alt txt hasn't already been set
	if (!btn.altTextSet) {
		// if alt text not already set
		if (!btn.alt || btn.alt == ``) {
			btn.alt = btn.name;
			// if button icon is not basic flag
			let icon = adjustIconText(btn);
			if (btn.tags.includes('flight rising') && btn.tags.includes('subspecies')) btn.alt += ` (Subspecies)`
			else if (btn.tags.includes('flight rising') && btn.tags.includes('lineage')) btn.alt += ` (Subspecies)`
			else if (btn.iconBase) btn.alt += ' (' + btn.iconBase.icon + ' ' + adjustIconBaseName(btn).toLowerCase() + ')';
			else if (icon) btn.alt += ` (${icon})`;
		}
		else {
			// replace button name references with the name
			btn.alt = btn.alt.replaceAll(`%name`, btn.name)
			// if any of button's altNames are referenced in alt text, insert them
			btn.alt = insertAltNames(btn,btn.alt);
		}
		// log that alt text has been set
		btn.altTextSet = true;
	}
}

// returns the BBCode for the given button
function getBBCode(btn) {
	setAltText(btn);
	
	let code = getSrc(btn,true);
	// if no image sources, return empty string
	if (code == ``) return code;
	else {
		// insert image source
		code = `[img alt="${btn.alt}"]${code}[/img]`;
		
		// if the button should link to something
		if (btn.link && btn.link != ``) code = `[url=${btn.link}]${code}[/url]`;
		
		return code;
	}
}

// returns the HTML code for the given button
function getHTMLCode(btn) {
	setAltText(btn);
	
	let code = getSrc(btn,true);
	// if no image sources, return empty string
	if (code == ``) return code;
	else {
		// insert image source
		code = `<img src="${code}" alt="${btn.alt}">`;
		
		// if the button should link to something
		if (btn.link && btn.link != ``) code = `<a href="` + btn.link + `">` + code + `</a>`;
		
		return code;
	}
}

// returns the image source link for the given button
// prefer imgur source, use local if imgur unavailable
// if no sources, return blank string
// optional full parameter = whether to get full location url for local sources
function getSrc(btn,full) {
	if (btn.imgur && btn.imgur != `` && btn.imgur != undefined) return btn.imgur;
	else if (btn.src) return getLocalSrc(btn,full);
	else return ``;
}

// returns the local image source for the given button
function getLocalSrc(btn, full) {
	if (btn.src != `` && btn.src != undefined) {
		let name = srcFormat(btn.name);
		let src = btn.src.replace(`%name`,name);
		
		// if any of button's altNames are referenced in alt text, insert them
		src = insertAltNames(btn,src,true);
		
		if (btn.palette && btn.palette.toLowerCase() != 'standard') src = src.replace('.png','_'+btn.palette.replaceAll(' ','_')+'.png');
		
		if (full) src = `https://idbuttons.neocities.org` + src;
		return src;
	}
	else if (btn.imgur && btn.imgur != `` && btn.imgur != undefined) return btn.imgur;
	else return ``;
}

// if any of button's altNames are referenced in alt text, insert them
// currently only works with one instance of %altNames
// if src = true, altname will be formatted for local image source
// returns updated text
function insertAltNames(btn,txt,src) {
	if (btn.alt && btn.altNames && btn.altNames.length > 0) {
		let alt = btn.altNames[Number(btn.alt.match(/(?<=%altNames)\d*/gi))];
		if (src) alt = srcFormat(alt);
		if ( txt.includes(`%altNames`) ) txt = txt.replace(/%altNames(\d*)/gi, alt);
	}
	return txt;
}

// formats text correctly for local image sources (spaces to underscores, etc)
// returns formatted text
function srcFormat(txt) {
	txt = txt.replaceAll(/ | - |: |\/| \/ /g,'_');
	return txt;
}

// change the page's theme colors
function setPageTheme(themeName) {
	// if no theme provided, default to the saved theme
	if ( localStorage.getItem("pageTheme") && !themeName ) themeName = localStorage.getItem("pageTheme");
	
	// set theme to given name
	let curTheme = theme[themeName];
	// if a theme with the given name exists
	// set the css root variable for each property of the theme
	if (curTheme) {
		for (let key in curTheme) { document.documentElement.style.setProperty('--' + key, curTheme[key]); }
	}
	
	// save the theme locally
	localStorage.setItem("pageTheme", themeName);
}