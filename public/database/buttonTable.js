let buttonTable;

// default max number of buttons to show in recent
let recentMax = 250;

function initButtonTable() {
	buttonTable = document.querySelector('#button-table');
	
	// make text areas select all on click
	document.querySelector('#button-sample').querySelectorAll('textarea').forEach((t) => {
		t.addEventListener('click', function() { this.select(); });
	});
	
	if (
		(urlParams.has('latest') && urlParams.get('latest') == 'true')
		|| urlParams.has('latestCount')
	) {
		// add recent buttons to table
		recentButtons();
	} else {
		// add search/tag match buttons to table
		addButtons();
	}
}

// clear button table
function clearButtons() {
	// delete all .button-row rows
	buttonTable.querySelectorAll('.button-row').forEach((c) => { if (c.id != 'button-sample') c.remove(); });
}

// show buttons in #button-table
function addButtons() {
	// clear button table
	clearButtons();
	
	// if search or tag parameters have been set, add buttons that match
	if ( urlTags.length + urlSearch.length > 0 ) {
		sortButtons(matchButtonsList(urlSearch,urlTags)).forEach((b) => { newButtonRow(b); });
	}
	//else sortButtons(buttonList).forEach((b) => { newButtonRow(b); });
	
	// show results row if there are no buttons displayed, otherwise hide results row
	updateResultsRow();
}

// display one random button
function randomButton() {
	// clear button table
	clearButtons();
	
	let matchButtons = matchButtonsList(urlSearch,urlTags.concat(['!button base']));
	newButtonRow(getRandomFrom(matchButtons));
	
	// show results row if there are no buttons displayed, otherwise hide results row
	updateResultsRow();
}

// display recent buttons
function recentButtons() {
	// add latest to url parameters
	if (
		!urlParams.has('latest')
		|| (urlParams.has('latest') && urlParams.get('latest') != 'true')
	) {
		urlParams.set('latest','true');
		window.location.search = urlParams;
	}
	
	// clear button table
	clearButtons();
	
	// number of buttons to show
	var num = recentMax;
	// if url parameters include a value for recent
	if (
		urlParams.has('latestCount')
		&& Number(urlParams.get('latestCount')) > 0
	) {
		num = Number(urlParams.get('latestCount'));
	}
	
	console.log(num);
	
	var arr = sortButtonsNewToOld(recentButtonsList(num));
	// add array buttons to table
	arr.forEach((b) => { if (!b.tags.includes(`button base`)) newButtonRow(b); });
	
	updateResultsRow('Showing the ' + arr.length + ' most recent buttons:');
}

// create a new button row for the given button b
function newButtonRow(b) {
	// update button alt text
	setAltText(b);
	
	// new row at end of table
	var row =  document.querySelector("#button-sample").cloneNode(true);
	row.id = ``;
	
	// name column
	var nameCol = row.insertCell(0);
	nameCol.classList.add('name-col');
	nameCol.innerHTML = b.name;
	// if button is supposed to link to something
	if (b.link && b.link != ``) nameCol.innerHTML += ` <a href="${b.link}" target="_blank">[link]</a>`;
	// if button is an exclusive identity, add note
	if (b.exclusive) nameCol.innerHTML += `<a title="exclusive to ${b.exclusive}">**</a>`;
	
	// preview column
	var prevCol = row.insertCell(1);
	prevCol.classList.add('preview-col');
	var prevImg = document.createElement("img");
	// add alt text
	prevImg.alt = b.alt;
	prevImg.title = b.alt;
	// put the button image source in the img
	// prefer local source, use imgur if local unavailable
	prevImg.src = getLocalSrc(b);
	// add image to preview column
	prevCol.appendChild(prevImg);
	
	// preview column
	var editCol = row.insertCell(2);
	if (
		(!b.shape || b.shape.toLowerCase() == 'standard') &&
		(!b.style || b.style.toLowerCase() == 'left')
	){
		editCol.classList.add('edit-col');
		var editLink = document.createElement("a");
		editLink.target = '_blank';
		// SET LINK URL PARAMS
		let editLinkIcon = '', editLinkText = '', editLinkBase = '';
		// if it's a color/button shape base
		if (b.tags.includes('palette button base')) {
			editLinkText = '(Your Text)';
			editLinkBase = b.name.replace(' Base','');
		}
		// if button is not a palette base
		else {
			if (b.iconBase) editLinkIcon = `${b.iconBase.name},icon:${b.iconBase.icon}`;
			else editLinkIcon = `${b.name},icon:${b.icon}`;
			// if it's not an icon base
			if (!b.tags.includes('icon base')) editLinkText = b.name;
			// if button has a non-standard palette
			if (b.palette && b.palette != 'Standard') editLinkBase = b.palette;
		}
		editLink.href = `/maker/
			?text=` + encodeURIComponent(editLinkText) +
			`&icon=` + encodeURIComponent(editLinkIcon) +
			`&base=` + encodeURIComponent(editLinkBase);
		// put edit image button in link
		var editImg = document.createElement("img");
		editImg.src = `/buttons/edit.png`;
		editLink.alt = `Edit`;
		editLink.title = `Edit Button`;
		editLink.appendChild(editImg);
		editCol.appendChild(editLink);
	}
	
	// icon column
	var iconCol = row.insertCell(3);
	iconCol.classList.add('icon-col');
	// if button has icon description, put the description in the icon column
	iconCol.innerHTML = generateIconText(b);
	
	// bbCode column
	var bbCol = row.insertCell(4);
	bbCol.classList.add('bbCode-col');
	var bbTxt = document.createElement("textarea");
	bbTxt.classList.add('bbCode');
	bbTxt.name = 'bbCode';
	bbTxt.rows = 1;
	bbTxt.readOnly = true;
	// insert the bbCode copy text
	bbTxt.innerHTML = getBBCode(b);
	// add bbCode textarea to column
	bbCol.appendChild(bbTxt);
	
	// htmlCode column
	var htmlCol = row.insertCell(5);
	htmlCol.classList.add('htmlCode-col');
	var htmlTxt = document.createElement("textarea");
	htmlTxt.classList.add('htmlCode');
	htmlTxt.name = 'htmlCode';
	htmlTxt.rows = 1;
	htmlTxt.readOnly = true;
	// insert the htmlCode copy text
	htmlTxt.innerHTML = getHTMLCode(b);
	// add bbCode textarea to column
	htmlCol.appendChild(htmlTxt);
	
	// info column
	var infoCol = row.insertCell(6);
	infoCol.classList.add('info-col');
	// if button has info, put it in the info section
	if (b.info) infoCol.innerHTML = b.info;
	
	// make text areas select all on click
	row.querySelectorAll('textarea').forEach((t) => {
		t.addEventListener('click', function() {
			this.select();
		});
	});
	
	// add row to table
	buttonTable.appendChild(row);
	
	/*
	console.log(
		`Adding ${b.name} (${b.icon}).
		exactName = ${b.exactName},
		exactIcon = ${b.exactIcon},
		partialName = ${b.partialName},
		partialIcon = ${b.partialIcon},
		exactTags = ${b.exactTags},
		partialTags = ${b.partialTags);
	*/
}

// show results row if there are no buttons displayed, otherwise hide results row
// optional txt value sets display text for results row
function updateResultsRow(txt) {
	// if txt value was provided
	if (txt) {
		addResultsRow();
		// set result text
		document.getElementById('results-txt').innerHTML = txt;
	}
	// if no buttons loaded and txt value was not provided
	else if ( document.querySelectorAll('.button-row').length > 1 ) {
		removeResultsRow();
	}
	// if buttons loaded and txt value was not provided
	else {
		addResultsRow();
		
		// default result text
		var resultTxt = `Search or apply filters to view buttons!`;
		
		// if search and/or tags were set, update result text to show that
		if (urlSearch.length + urlTags.length > 0) {
			resultTxt = `No results`;
			if (urlSearch.length > 0) resultTxt += ` for "${searchInput}"`;
			if (urlTags.length > 0) {
				resultTxt += ` with tags "` + urlParams.get('tags') + `"`;
				resultTxt = resultTxt.replaceAll(',',', ');
			}
		}
		
		// set result text
		document.getElementById('results-txt').innerHTML = resultTxt;
	}
}

// add results row at top of button table if one doesn't exist
function addResultsRow() {
	console.log('showing results row');
	// if no results row exists
	if ( !document.getElementById('results-row') ) {
		var table = document.getElementById('button-table');
		
		var row = table.insertRow(1);
		row.id = 'results-row';
		
		var col = row.insertCell(0);
		col.id = 'results-txt';
		col.colSpan = 7;
	}
}

// remove results row at top of button table
function removeResultsRow() {
	console.log('hiding results row');
	// if results row exists
	if ( document.getElementById('results-row') ) document.getElementById('results-row').remove();
}
