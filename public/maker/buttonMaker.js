let canvas, ctx, buttonWidth, buttonHeight, baseCanvasWidth, baseCanvasHeight;
let flexWrapper, makerFormLeft, makerResult;

// current values of base, icon, and text
let urlBase, curIcon, curText;

// default values of base, icon, and text
const defaultBase = `Button Base`;
const defaultIcon = `Button Base`;
const defaultText = ``;

let fontStyle, forceCustomText, shadowOn, textShadowOn, glowOn;

// current display palette key
let paletteKey = 'Standard';
let palette;

// load button maker
function initButtonMaker() {
	palette = buttonPalettes[paletteKey];
	
	// store elements in variables
	flexWrapper = document.querySelector('main').querySelector('.flex-wrapper');
	makerForm = document.getElementById('maker-options');
	makerFormLeft = document.getElementById('maker-options-left');
	makerResult = document.getElementById('result');
	
	// set up download button
	document.getElementById('download').addEventListener('click', function (e) {
		const link = document.createElement('a');
		link.download = document.getElementById('buttonmaker-text').value.replace(/ |\//gi,`_`) + `.png`;
		link.href = canvas.toDataURL();
		link.click();
		link.delete;
	});
	
	// adjust element style/placement based on window width
	adjustMakerLayout();
	window.addEventListener('resize', function(event) { adjustMakerLayout() }, true);
	
	// reload page with default settings on reset
	makerForm.addEventListener("reset", (event) => {
		event.preventDefault();
		window.location.href='/maker';
	});
	
	// put icon options in dropdown
	sortButtons(buttonList).forEach((b) => {
		if (b.inMakerIcons !== false) {
			if (b.tags.includes('icon base')) {
				newIconOption(b.name,b.icon,b.name,'shape',{type:'base'});
			}
			if (b.tags.includes('gender') && (b.icon.startsWith('flag') || b.icon.startsWith('alt flag'))) {
				newIconOption(b.name,b.icon,`${b.name} ${b.icon}`,'gender');
			}
			if (b.tags.includes('orientation') && (b.icon.startsWith('flag') || b.icon.startsWith('alt flag'))) {
				newIconOption(b.name,b.icon,`${b.name} ${b.icon}`,'orientation');
			}
		}
	});
	
	// get saved palettes from localStorage and add them to buttonPalettes
	getSavedPalettes();
	
	// put color palettes in dropdown
	for (let key in buttonPalettes) newPaletteOption(key);
	
	// set up custom color inputs
	buttonPalettes['Custom'] = {};
	for (let input of Array.from(document.getElementsByClassName('custom-color'))) {
		input.addEventListener('input', function (event) {
			// if valid hex color OR blank & transparency allowed for that property
			if (isColor(input.value) || (input.value == '' && input.placeholder != 'Color required')) {
				buttonPalettes['Custom'][input.name] = colorArr(input.value);
				setPalette('Custom');
			}
		});
	}
	
	// put button canvas elements in variables
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	scaleCanvas = document.getElementById("scaleCanvas");
	scaleCtx = scaleCanvas.getContext("2d");
	
	// make sure canvas' width/height match its display width/height
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	baseCanvasWidth = canvas.width;
	baseCanvasHeight = canvas.height;
	
	// prevent smoothing
	ctx.imageSmoothingEnabled = false;
	
	// get saved settings from the URL or local storage
	getSavedSettings();
	
	updateButton();
}

// get saved settings from the URL or local storage
function getSavedSettings() {
	let save = JSON.parse(localStorage.getItem('makerSettings'));
	if (!save) save = {};
	
	if (urlParams.has('icon') && urlParams.get('icon') != ``) curIcon = decodeURI(urlParams.get('icon'));
	setIconSelection(curIcon);
	
	if (urlParams.has('text') && urlParams.get('text') != ``) curText = decodeURI(urlParams.get('text'));
	else curText = defaultText;
	setTextContent(curText);
	
	if (urlParams.has('base') && urlParams.get('base') != ``) setPalette(decodeURI(urlParams.get('base')));
	else if (save.base) setPalette(save.base);
	else setPalette('Standard');
	
	// prestyled text
	if (save.prestyledText) {
		if (save.prestyledText == 'on') forceCustomText = false;
		else forceCustomText = true;
	}
	else if (urlParams.has('prestyledText') && urlParams.get('prestyledText') == 'off' ) { forceCustomText = true; }
	else forceCustomText = false;
	document.getElementById('prestyled-text').checked = !forceCustomText;
	document.getElementById('prestyled-text-off').disabled = !forceCustomText;
	
	// disable glow
	if (save.disableGlow) {
		if (save.disableGlow == 'on') glowOn = false;
		else glowOn = true;
	}
	else if (urlParams.has('disableGlow') && urlParams.get('disableGlow') == 'on' ) glowOn = false;
	else glowOn = true;
	document.getElementById('disable-glow').checked = !glowOn;
	
	// disable shadow
	if (save.disableShadow) {
		if (save.disableShadow == 'on') shadowOn = false;
		else shadowOn = true;
	}
	else if (urlParams.has('disableShadow') && urlParams.get('disableShadow') == 'on' ) shadowOn = false;
	else shadowOn = true;
	document.getElementById('disable-shadow').checked = !shadowOn;
	
	// disable text shadow
	if (save.disableTextShadow) {
		if (save.disableTextShadow == 'on') textShadowOn = false;
		else textShadowOn = true;
	}
	else if (urlParams.has('disableTextShadow') && urlParams.get('disableTextShadow') == 'on' ) textShadowOn = false;
	else textShadowOn = true;
	document.getElementById('disable-textShadow').checked = !shadowOn;
	
	// font style
	if (save.fontstyle) fontStyle = save.fontstyle;
	else if (urlParams.has('fontstyle') && document.getElementById(urlParams.get('fontstyle'))) fontStyle = urlParams.get('fontstyle');
	else fontStyle = 'regular';
	// check radio button for font width
	document.getElementById(fontStyle).checked = true;
	
	// show 2x scale
	if ( document.getElementById('scalePreview').classList.contains('hidden') ) {
		if (save.showScaled == 'on' || (urlParams.has('showScaled') && urlParams.get('showScaled') == 'on') ) toggleShowScaledButton();
	} //else toggleShowScaledButton();
}

// save current settings in local storage
function saveSettings() {
	localStorage.removeItem('makerSettings');
	
	let save = {};
	
	save.base = document.getElementById('palette-select').value;
	
	for (let input of Array.from(document.getElementById('advanced-section').querySelectorAll('input'))) {
		if (input.type == 'checkbox') {
			if (input.checked) save[input.name] ='on';
			else save[input.name] = 'off';
		}
		else if (input.type == 'radio' && input.checked == true) save[input.name] = input.value;
	}
	
	localStorage.setItem('makerSettings',JSON.stringify(save))
	
	document.getElementById('saved-status').classList.remove('hidden');
	setTimeout(function(){ document.getElementById('saved-status').classList.add('hidden'); },1000);
}

// clear saved settings in local storage
function clearSavedSettings() {
	localStorage.removeItem('makerSettings');
	
	document.getElementById('cleared-status').classList.remove('hidden');
	setTimeout(function(){ document.getElementById('cleared-status').classList.add('hidden'); },1000);
}

// adjust width/placement of elements based on window and element sizes
function adjustMakerLayout() {
	flexWrapper.classList.remove('wrapped');
	
	if (window.innerWidth < makerFormLeft.offsetWidth + makerResult.offsetWidth + 30) {
		makerForm.querySelector('.flex-wrapper').classList.add('wrapped');
		makerFormLeft.appendChild(document.getElementById('advanced-section-wrapper'));
	} else makerForm.appendChild(document.getElementById('advanced-section-wrapper'));
	
	for (let spacer of Array.from(document.getElementsByClassName('accordion-right-spacer'))) spacer.style.width = makerResult.offsetWidth + 'px';
}

// creates new option in buttonmaker-icon dropdown
function newIconOption(name,icon,innerHTML,category,params) {
	if (!params) params = {};
	if (!params.type) params.type = 'icon';
	
	// find parent to add option to
	var par = ``;
	// if optgroup specified and doesn't yet exist
	if ( params.optgroup && !document.getElementById(category+'-optgroup-'+params.optgroup)) {
		par = document.createElement("optgroup");
		par.label = category;
		par.id = category+'-optgroup-'+params.optgroup;
		document.getElementById(params.type+'-category-'+category).appendChild(par);
	}
	// if optgroup specified and exists
	else if (params.optgroup) par = document.getElementById(category+'-optgroup-'+params.optgroup);
	// if no optgroup specified
	else par = document.getElementById(params.type+'-category-'+category);
	
	let value;
	value = `${name},icon:${icon}`;
	
	// determine option id
	let id = `${category}-option-${innerHTML}`;
	id = id.replace(/[^a-z0-9]/gi, ''); // remove non-alphanumeric characters
	
	// if option doesn't already exist
	if (!par.querySelector('#'+id)) {
		let opt = document.createElement("option");
		opt.value = value;
		opt.id = id;
		opt.innerHTML = innerHTML;
		par.appendChild(opt);
		
		if (params.type == 'color') {
			let p = buttonPalettes[Object.keys(buttonPalettes).find(key => key.toLowerCase() === innerHTML.toLowerCase())];
			if (p) {
				if (p.display && p.display.base) opt.style.backgroundColor = colorString(p.display.base);
				else opt.style.backgroundColor = colorString(p.base);
				
				if (p.display && p.display.text) opt.style.color = colorString(p.display.text);
				else opt.style.color = colorString(p.text);
			}
		}
		
		if (params.select && params.select == true) setIconSelection(opt.value,true);
	}
}

function selectIconBase(category,option,tag) {
	option = option.replace(/,icon:.*/,'');
	
	// save currently selected color
	let curSelected;
	let colorSelectEl = document.getElementById('color-category-'+category);
	if (colorSelectEl.value.includes(',icon:')) curSelected = colorSelectEl.value.replace(/.*,icon:/,'');
	
	// clear color categories
	colorSelectEl.innerHTML = '';
	
	let optionNames = [];
	// add color category for each button with selected name
	sortButtons(buttonList).forEach((b) => {
		let select = false;
		if (optionNames.length == 0) select = true;
		
		if (b.inMakerIcons !== false && b.name == option && !optionNames.includes(b.icon) && b.tags.includes(tag)) {
			newIconOption(b.name,b.icon,b.icon,category,{type:'color',select:select});
			optionNames.push(b.icon);
		}
	});
	
	// if currently selected color is in the new list, select it again
	if (curSelected && optionNames.includes(curSelected)) setIconSelection(option+',icon:'+curSelected,true);
}

// returns button from buttonList that matches name and icon parameters in text
function getButtonFromOption(text,params) {
	let data = text.split(',icon:');
	return getButton(data[0],data[1],params);
}

// returns button from buttonList with icon matching provided text
function getButtonFromOptionIcon(text,params) {
	text = text.replace(/.*,icon:/,'');
	return getButton(null,text,params);
}

// updates the button's base, icon, and text based on cur values
function updateButton(params) {
	if (!params) params = {};
	
	// clear canvas
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//scaleCtx.clearRect(0,0,scaleCanvas.width,scaleCanvas.height);
	
	// set base and text
	setBase();
	
	// set icon (default to palette base)
	if (curIcon) setIcon(curIcon);
	else setIcon(paletteKey+' Base',false);
	
	updateScaleButton();
}

let cScale = 2;
// sets scaling for canvas
function setCanvasScale(num,update) {
	cScale = num;
	if (update != false) updateScaleButton();
}

// updates scaled button canvas
function updateScaleButton() {
	scaleCanvas.width = canvas.width;
	scaleCanvas.height = canvas.height;
	
	scaleCtx.drawImage(document.getElementById('canvas'),0,0);
	
	document.getElementById('scaleCanvas').style.width = canvas.width * cScale + 'px';
	document.getElementById('scaleCanvas').style.height = canvas.height * cScale + 'px';
	//scaleCanvas.width = scaleCanvas.offsetWidth;
	//scaleCanvas.height = scaleCanvas.offsetHeight;
	
	//scaleCtx.imageSmoothingEnabled = false;
	
	scaleCtx.scale(cScale,cScale);
	adjustMakerLayout();
}

// show the scaled up button
function toggleShowScaledButton() {
	document.getElementById('scalePreview').classList.toggle('hidden');
	document.getElementById('result-spacer').classList.toggle('hidden');
	document.getElementById('show-scaled').checked = !document.getElementById('scalePreview').classList.contains('hidden');
	adjustMakerLayout();
}

// set the base in the canvas
function setBase(name) {
	console.log('Updating canvas base area');
	
	let src;
	
	// if name provided get image source of button with given name and (optional) icon
	if (name) { var btn = getButtonFromOption(name); if (btn) src = getLocalSrc(btn); }
	// if source not found or button name not provided
	if (!src && palette.glow && glowOn) {
		if (
			palette.shadow && shadowOn &&
			(palette.shadow.length < 4 || palette.shadow[3] > 0)
		) src = '/bases/palettes/Standard_Glow_Shadow.png';
		else src = '/bases/palettes/Standard_Glow.png';
	}
	else if (!src) src = '/bases/palettes/Standard.png';
	
	// create new img element for button
	var img = new Image();
	img.crossOrigin = "Anonymous";
	
	// draw image when src is loaded
	img.addEventListener( "load", () => {
		[[0,0,86,3],[0,3,5,1],[0,4,3,6],[0,10,5,1],[0,11,86,3],[17,3,1,8],[80,0,6,4],[82,4,4,6],[80,10,6,1]].forEach((r) => {
			ctx.clearRect(r[0],r[1],r[2],r[3]);
			ctx.globalCompositeOperation = "xor";
			ctx.drawImage(img,r[0],r[1],r[2],r[3],r[0],r[1],r[2],r[3]);
			ctx.globalCompositeOperation = "source-over"; // reset composite operation
			updateBaseColors(20,r[0],r[1],r[2],r[3]);
			updateScaleButton();
		});
		
		ctx.globalCompositeOperation = "source-over"; // reset composite operation
		// redraw text after base updates
		setText(curText);
	}, false, );
	
	img.src = src;
}

// set the icon in the canvas
function setIcon(name,set) {
	if (name) {
		console.log('Updating canvas icon:',name);
		
		if (set != false) curIcon = name;
		
		// get button with given name and (optional) icon
		let btn;
		if (!name.includes(',icon:')) btn = getButtonFromOptionIcon(name,{anyPalette:true});
		if (!btn) btn = getButtonFromOption(name,{anyPalette:true});
		
		// if button found
		if (btn) {
			// create new img element for button
			var img = new Image();
			img.crossOrigin = "Anonymous";
			
			// draw image when src is loaded
			img.addEventListener( "load", () => {
				let clipWidth, clipHeight, clipX, clipY;
				
				clipX = 5; clipY = 3; clipWidth = 12; clipHeight = 8;
				ctx.drawImage(img,clipX,clipY,clipWidth,clipHeight,clipX,clipY,clipWidth,clipHeight);
				
				clipX = 3; clipY = 4; clipWidth = 14; clipHeight = 6;
				ctx.drawImage(img,clipX,clipY,clipWidth,clipHeight,clipX,clipY,clipWidth,clipHeight);
				updateScaleButton();
			}, false, );
			
			img.src = getLocalSrc(btn);
		}
	}
}

// set the icon selection in the dropdowns
function setIconSelection(name,update) {
	let parentRadio, selOpt;
	
	// if name provided
	if (name) {
		document.getElementById('icon-option-wrapper').querySelectorAll('option').forEach((opt) => {
			if (opt.value == name) {
				selOpt = opt;
				selOpt.selected = true;
				
				// get the radio element for this option's select parent
				let parentSelect = opt;
				while (parentSelect.tagName.toLowerCase() !== 'select' && parentSelect.tagName.toLowerCase() !== 'body') {
					parentSelect = parentSelect.parentNode;
				}
				parentRadio = document.getElementById(parentSelect.id.replace(/icon-category-|base-category-|color-category-/gi,'')+'-icon-radio');
			}
		});
	}
	else name = '';
	
	// if icon option not found in dropdowns
	if (!selOpt) {
		selOpt = document.getElementById('icon-category-custom');
		selOpt.value = name;
		parentRadio = document.getElementById('custom-icon-radio');
	}
	
	// if icon option found in dropdowns
	if (selOpt) {
		curIcon = selOpt.value;
		if (update) updateButton();
	
		// check the radio parent of the selected option
		if (parentRadio) {
			parentRadio.checked = true;
			parentRadio.value = name;
		}
	}
}

// set the text in the canvas
function setText(name) {
	console.log('Updating canvas text area');
	
	curText = name;
	
	// get button with given name and (optional) icon
	var btn = getButtonFromOption(name,{altNames:false});
	// if button found
	if (btn && name && !forceCustomText
		&& !btn.tags.includes('button base')
		&& (!btn.palette || btn.palette.toLowerCase() == 'standard')
		&& !palette.altColors // isn't alternating text colors
		&& (!palette.textShadow || !textShadowOn) // doesn't have text shadow
		) {
		// create new img element for button
		var img = new Image();
		img.crossOrigin = "Anonymous";
		
		// draw image when src is loaded
		img.addEventListener( "load", () => {
			let clipWidth, clipHeight, clipX, clipY;
			
			clipX = 18; clipY = 3; clipWidth = 62; clipHeight = 8;
			ctx.drawImage(img,clipX,clipY,clipWidth,clipHeight,clipX,clipY,clipWidth,clipHeight);
			updateTextColors(20,clipX,clipY,clipWidth,clipHeight);
			
			clipX = 18; clipY = 4; clipWidth = 64; clipHeight = 6;
			ctx.drawImage(img,clipX,clipY,clipWidth,clipHeight,clipX,clipY,clipWidth,clipHeight);
			updateTextColors(20,clipX,clipY,clipWidth,clipHeight);
		}, false, );
		
		img.src = getLocalSrc(btn);
	}
	else {
		ctx.fillStyle = colorString(buttonPalettes['Standard'].base);
		let clipWidth, clipHeight, clipX, clipY;
		
		// determine text shadow
		let sColor;
		if (textShadowOn && palette.textShadow) sColor = palette.textShadow;
		
		clipX = 18; clipY = 3; clipWidth = 62; clipHeight = 8;
		ctx.fillRect(clipX,clipY,clipWidth,clipHeight);
		drawSpriteString(ctx,name,clipX+2,clipY,clipX+clipWidth,{
			style:fontStyle,
			colors:palette.altColors,
			textShadow:sColor});
		// draw regular text
		updateTextColors(20,clipX,clipY,clipWidth,clipHeight);
		
		clipX = 18; clipY = 4; clipWidth = 64; clipHeight = 6;
		ctx.fillRect(clipX,clipY,clipWidth,clipHeight);
		// draw regular text
		drawSpriteString(ctx,name,clipX+2,clipY-1,clipX+clipWidth,{
			style:fontStyle,
			colors:palette.altColors,
			textShadow:sColor});
		updateTextColors(20,clipX,clipY,clipWidth,clipHeight);
		
		showUnsupportedChars(name);
	}
}

// set the text in the input box
function setTextContent(text,update) {
	document.getElementById('buttonmaker-text').value = text;
	
	if (update) updateButton();
}

// display unsupported characters in the unsupported-char-display element
function showUnsupportedChars(text) {
	// find unsupported characters
	let unsupported = [];
	for (let i = 0; i < text.length; i++ ) {
		if(!fontSpriteList.includes(text[i]) && !unsupported.includes(text[i])) unsupported.push(text[i]);
	}
	
	// if characters found, show
	if (unsupported.length > 0) {
		document.getElementById('buttonmaker-text-error').classList.remove('hidden');
		document.getElementById('unsupported-char-display').innerHTML = unsupported.join(' ');
	} else document.getElementById('buttonmaker-text-error').classList.add('hidden');
}

// open/close advanced settings and custom colors settings
function openAdvancedSection() {
	document.getElementById('advanced-section').classList.remove('hidden');
	closeCustomColors();
}
function closeAdvancedSection() { document.getElementById('advanced-section').classList.add('hidden'); }
function openCustomColors() {
	document.getElementById('custom-palette-section').classList.remove('hidden');
	closeAdvancedSection();
}
function closeCustomColors() { document.getElementById('custom-palette-section').classList.add('hidden'); }

///////////// COLOR FUNCTIONS /////////////////

// creates new palette option in dropdown select
function newPaletteOption(key) {
	let name = key;
	let id = 'palette-option-' + key;
	let listId = 'list-' + id;
	let parent = document.getElementById('palette-select-default');
	
	if (key.startsWith('CUSTOM:')) {
		// if option already exists, delete it
		deletePaletteOption(key);
		
		name = name.replace('CUSTOM:','');
		parent = document.getElementById('palette-select-custom');
		
		// add to edit saved palettes list
		let listEntry = document.createElement('li');
		listEntry.classList.add('list-entry');
		listEntry.innerHTML += name;
		listEntry.id = listId;
		let deleteEntry = document.createElement('button');
		deleteEntry.type = 'button';
		deleteEntry.addEventListener("click", function (event) { deleteCustomPalette(key); });
		deleteEntry.innerHTML = 'Delete';
		deleteEntry.classList.add('linkbtn');
		listEntry.appendChild(deleteEntry);
		document.getElementById('saved-palette-list').appendChild(listEntry);
	}
	
	let opt = document.createElement("option");
	opt.value = key;
	opt.innerHTML = name;
	opt.id = id;
	
	// set dropdown option text color
	if (buttonPalettes[key].display && buttonPalettes[key].display.text) opt.style.color = colorString(buttonPalettes[key].display.text);
	else opt.style.color = colorString(buttonPalettes[key].text);
	
	// set dropdown option background color
	if (buttonPalettes[key].display && buttonPalettes[key].display.base) opt.style.backgroundColor = colorString(buttonPalettes[key].display.base);
	else opt.style.backgroundColor = colorString(buttonPalettes[key].base);
	
	// add option to dropdown
	parent.appendChild(opt);
}

// delete palette option from dropdown
function deletePaletteOption(key) {
	let id = 'palette-option-' + key;
	let listId = 'list-' + id;
	
	if (document.getElementById(id)) document.getElementById(id).remove();
	if (document.getElementById(listId)) document.getElementById(listId).remove();
}

// set palette to given key in buttonPalettes
function setPalette(key) {
	if (buttonPalettes[key]) {
		// if setting to custom palette, show custom color section
		if (key == 'Custom') openCustomColors();
		
		if(document.getElementById('palette-option-' + key)) document.getElementById('palette-option-' + key).selected = true;
		palette = buttonPalettes[key];
		paletteKey = key;
		
		// update custom colors to match palette
		updateCustomColors();
		
		updateButton();
		if (!curIcon) setIcon(paletteKey + ' Base',false);
	}
}

// update custom colors based on inputs
// optional set = boolean, determines whether to set input values or not
function updateCustomColors() {
	for (let input of Array.from(document.getElementsByClassName('custom-color'))) {
		// if current palette is not the editable custom palette
		if (paletteKey != 'Custom') {
			// custom palette = copy of new palette
			buttonPalettes['Custom'] = structuredClone(palette);
			// put colors in custom palette text inputs
			if (palette[input.name]) input.value = colorString(palette[input.name],'hex');
			else input.value = '';
		}
		
		let prev = document.getElementById('custom-color-' + input.name + '-preview');
		prev.style.backgroundColor = input.value;
		if (input.value == '') prev.innerHTML = '<div></div><div></div>';
		else prev.innerHTML = '';
	}
}

// save the current palette as a new custom palette
function saveCustomPalette() {
	let formData = Object.fromEntries(new FormData(makerForm));
	
	let key = 'CUSTOM:' + formData.customName;
	buttonPalettes[key] = structuredClone(buttonPalettes['Custom']);
	buttonPalettes[key].display = null;
	buttonPalettes[key].overlay = null;
	newPaletteOption(key);
	setPalette(key);
	
	// update saved palettes in localStorage
	updateSavedPalettes();
	
	document.getElementById('palette-saved-status').style.visibility = 'visible';
	setTimeout(function(){ document.getElementById('palette-saved-status').style.visibility = 'hidden'; },1000);
	
}

// delete custom palette with the given key
function deleteCustomPalette(key) {
	if (key.startsWith('CUSTOM:')) {
		delete buttonPalettes[key];
		deletePaletteOption(key);
		
		// update saved palettes in localStorage
		updateSavedPalettes();
	}
}

// get saved palettes from localStorage and add them to buttonPalettes
function getSavedPalettes() {
	let save = JSON.parse(localStorage.getItem('savedMakerPalettes'));
	if (!save) save = {};
	
	for (let key in save) buttonPalettes[key] = save[key];
}

// update saved palettes in localStorage
function updateSavedPalettes() {
	let savedPalettes = {};
	for (let key in buttonPalettes) if (key.startsWith('CUSTOM:')) savedPalettes[key] = buttonPalettes[key];
	localStorage.setItem('savedMakerPalettes',JSON.stringify(savedPalettes));
	console.log(JSON.stringify(savedPalettes));
}

// update base colors in selected region
function updateBaseColors(diff,x,y,width,height) {
	
	let outOld = buttonPalettes['Standard'].outline, outNew = palette.outline;
	let inOld = buttonPalettes['Standard'].innerOutline, inNew = palette.innerOutline;
	
	// if overlaying image for outline and/or innerOutline
	let ol = palette.overlay;
	if ( ol && ( ol.outline || ol.innerOutline )) {
		if (ol.outline) {
			let image = ol.outline.image; if (!image) image = paletteKey.replaceAll(' ','_')+'_Overlay.png';
			replaceColorWithImage(outOld,image,{composite:ol.outline.composite,diff:diff,x:x,y:y,width:width,height:height});
		} else replaceColor(outOld,outNew,diff,x,y,width,height);
		
		if (ol.innerOutline) {
			let image = ol.innerOutline.image; if (!image) image = paletteKey.replaceAll(' ','_')+'_Overlay.png';
			replaceColorWithImage(inOld,image,{composite:ol.innerOutline.composite,diff:diff,x:x,y:y,width:width,height:height});
		} else replaceColor(inOld,inNew,diff,x,y,width,height);
	}
	// if changing outline to default inner outline color
	if (colorMatch(inOld,outNew,diff)) {
		// if also changing outline to inner outline default, preserve inner outline placement first
		if (colorMatch(outOld,inNew,diff)) {
			// preserve inner outline placement
			let safeIn = getSafeColor(outOld,outNew,diff);
			replaceColor(inOld,safeIn,diff,x,y,width,height);
			// replace outline with new outline color
			replaceColor(outOld,outNew,diff,x,y,width,height);
			// replace inner outline with new inner outline color
			replaceColor(safeIn,inNew,diff,x,y,width,height);
		}
		// otherwise change text then base
		else {
			replaceColor(inOld,inNew,diff,x,y,width,height);
			replaceColor(outOld,outNew,diff,x,y,width,height);
		}
	}
	// if new outline color is not the default inner outline color
	else {
		replaceColor(outOld,outNew,diff,x,y,width,height);
		replaceColor(inOld,inNew,diff,x,y,width,height);
	}
	
	let shadowOld = buttonPalettes['Standard'].shadow;
	let shadowNew = [];
	shadowNew = shadowNew.concat(palette.shadow);
	let glow = palette.glow;
	
	// if palette has glow
	if (glow && glowOn) {
		// more opaque shadow
		if (
			palette.shadow && shadowOn &&
			(palette.shadow.length < 4 || palette.shadow[3] > 0)
		) {
			if (shadowNew.length < 4) shadowNew.push(160);
			replaceColor(shadowOld,shadowNew,diff,x,y,width,height);
		}
		
		// swap glow colors (or image if overlaying)
		let ol = palette.overlay;
		if ( ol && ol.glow ) {
			let image = ol.glow.image; if (!image) image = paletteKey.replaceAll(' ','_')+'_Overlay.png';
			let composite = ol.glow.composite; if (!composite) composite = 'source-atop';
			replaceColorWithImage([255,255,255,70],image,{composite:composite,diff:70,x:x,y:y,width:width,height:height});
		} else replaceColor([255,255,255,70],glow,70,x,y,width,height);
	}
	else {
		if (palette.shadow && shadowOn) replaceColor(shadowOld,shadowNew,diff,x,y,width,height);
		else replaceColor(shadowOld,[0,0,0,0],diff,x,y,width,height);
	}
}

// update text and text background colors in selected region
function updateTextColors(diff,x,y,width,height) {
	let baseOld = buttonPalettes['Standard'].base, baseNew = palette.base;
	let txtOld = buttonPalettes['Standard'].text, txtNew = palette.text;
	
	// if overlaying image for base and/or text
	let ol = palette.overlay;
	
	if ( ol && ( ol.text || ol.base )) {
		// if text overlay is included
		if (ol.text) {
			let image = ol.text.image; if (!image) image = paletteKey.replaceAll(' ','_')+'_Overlay.png';
			replaceColorWithImage(txtOld,image,{composite:ol.text.composite,diff:diff,x:x,y:y,width:width,height:height});
		} else replaceColor(txtOld,txtNew,diff,x,y,width,height);
		// if text background overlay is included
		if (ol.base) {
			let image = ol.base.image; if (!image) image = paletteKey.replaceAll(' ','_')+'_Overlay.png';
			replaceColorWithImage(baseOld,image,{composite:ol.base.composite,diff:diff,x:x,y:y,width:width,height:height});
		} else replaceColor(baseOld,baseNew,diff,x,y,width,height);
	}
	// if changing text to default base color
	else if (colorMatch(baseOld,txtNew,diff)) {
		// if also changing base to text default, preserve text placement first
		if (colorMatch(txtOld,baseNew,diff)) {
			// preserve text placement
			let safeTxt = getSafeColor(baseOld,baseNew,diff);
			replaceColor(txtOld,safeTxt,diff,x,y,width,height);
			// replace base with new base color
			replaceColor(baseOld,baseNew,diff,x,y,width,height);
			// replace text with new text color
			replaceColor(safeTxt,txtNew,diff,x,y,width,height);
		}
		// otherwise change base first, then text
		else {
			replaceColor(baseOld,baseNew,diff,x,y,width,height);
			replaceColor(txtOld,txtNew,diff,x,y,width,height);
		}
	}
	// if new text color is not the default base color, change text first, then base
	else {
		replaceColor(txtOld,txtNew,diff,x,y,width,height);
		replaceColor(baseOld,baseNew,diff,x,y,width,height);
	}
	updateScaleButton();
}

// determines whether color 1 and color 2 are a match
// diff is the margin of error
// returns boolean
function colorMatch(color1,color2,diff) {
	if (typeof(color1) === 'string') color1 = colorArr(color1);
	if (typeof(color2) === 'string') color2 = colorArr(color2);
	
	return Math.abs(color1[0] - color2[0]) <= diff &&
		Math.abs(color1[1] - color2[1]) <= diff &&
		Math.abs(color1[2] - color2[2]) <= diff;
}

// takes 2 colors a and b
// returns an rgb color array that is at least diff away from all colors 
function getSafeColor(a,b,diff) {
	var color = [];
	
	for (let i = 0; i < 3; i++) {
		var num;
		
		// calculate the minimum and maximum safe values for the range
		var minSafe = Math.min(a[i], b[i]) - diff - 1;
		var maxSafe = Math.max(a[i], b[i]) + diff + 1;
		
		// set num to a safe option
		if (minSafe >= 0) num = 0;
		else if (maxSafe <= 255) num = 255;
		else num = Math.min(a[i], b[i]) + diff + 1;
		
		// add num to color array
		color.push(num);
	}
	//console.log('safe color:',colorString(color));
    return color;
}

// takes colorIndices in format [redIndex, greenIndex, blueIndex]
// optional x,y,width,height is area to change, otherwise changes entire canvas
// does not affect alpha
// also affects colors with diff digits difference
function replaceColor(targetColor,newColor,diff,x,y,width,height) {
	if (typeof(targetColor) === 'string') targetColor = colorArr(targetColor);
	if (typeof(newColor) === 'string') newColor = colorArr(newColor);
	// set defaults if none specified
	if (!diff) diff = 1;
	if (!x) x = 0;
	if (!width) width = canvas.width;
	if (!y) y = 0;
	if (!height) height = canvas.height;
	if (targetColor.length < 4) targetColor.push(255); // default to opaque if alpha not provided
	
	let imageData = ctx.getImageData(x,y,width,height);
	let data = imageData.data;
	
	// for each pixel on canvas
	for (let i = 0; i < data.length; i += 4) {
		// if the color of this pixel is within (diff) of the target color & pixel is solid OR matches alpha of target
		if (colorMatch([data[i],data[i+1],data[i+2]],targetColor,diff) && Math.abs(data[i+3]-targetColor[3]) < diff) {
			data[i] = newColor[0]; // red
			data[i + 1] = newColor[1]; // green
			data[i + 2] = newColor[2]; // blue
			
			// if new alpha provided
			if (newColor.length > 3) data[i + 3] = newColor[3];
		}
	}
	// update canvas
	ctx.putImageData(imageData, x, y);
}

// takes colorIndices in format [redIndex, greenIndex, blueIndex]
// params object optional properties:
// x,y,width,height is area to change, otherwise changes entire canvas
// diff affects colors with diff digits difference, otherwise defaults to 1
function replaceColorWithImage(targetColor,imageUrl,params) {
	if (typeof(targetColor) === 'string') targetColor = colorArr(targetColor);
	// set defaults if none specified
	if (!params) params = {};
	else {
		if (!params.diff) params.diff = 1;
		if (!params.x) params.x = 0;
		if (!params.width) params.width = canvas.width;
		if (!params.y) params.y = 0;
		if (!params.height) params.height = canvas.height;
		if (!params.composite) params.composite = "source-over";
	}
	imageUrl = '/bases/palettes/' + imageUrl;
	if (targetColor.length < 4) targetColor.push(255); // default to opaque if alpha not provided
	
	// get image data for selected region
	let data = ctx.getImageData(params.x,params.y,params.width,params.height).data;
	
	// create new img element for button
	var img = new Image();
	img.crossOrigin = "Anonymous";
	
	// draw image when src is loaded
	img.addEventListener( "load", () => {
		// for each pixel on canvas
		for (let i = 0; i < data.length; i += 4) {
			// if the color of this pixel is within (params.diff) of the target color & pixel matches alpha of target
			if (colorMatch([data[i],data[i+1],data[i+2]],targetColor,params.diff) && Math.abs(data[i+3]-targetColor[3]) < params.diff) {
				var iX = ((i / 4) % params.width) + params.x;
				var iY = (Math.floor((i / 4) / params.width)) + params.y;
				
				ctx.globalCompositeOperation = params.composite;
				ctx.drawImage(img,iX,iY,1,1,iX,iY,1,1);
				ctx.globalCompositeOperation = "source-over";
			}
		}
		updateScaleButton();
	}, false, );
	
	img.src = imageUrl;
}


// takes hex, rgb, or rgba string and converts to rgb array
function colorArr(str) {
	console.log(str);
	if (typeof(str) == 'string' && isColor(str)) {
		// if rgb/rgba string
		if (str.startsWith('rgb(') || str.startsWith('rgba(')) {
			let arr = [];
			for (let s of str.replace(/rgb\(|rgba\(|\)| /gi,'').split(',')) arr.push(Number(s));
			return arr;
		}
		// if hex string
		else {
			str = str.replace('#', '');
			// double each character if using shorthand
			if (str.length <= 4) str = str.replace(/./g, '$&$&');
			// create rgb array
			let arr = [
				parseInt(str.substring(0,2), 16),
				parseInt(str.substring(2,4), 16),
				parseInt(str.substring(4,6), 16)
			]
			if (str.length == 8) arr.push(parseInt(str.substring(6,8), 16));
			// return array
			return arr;
		}
	}
	else console.log('Could not parse color',str);
}

// takes rgb/rgba array and converts to rgb/rgba string or hex string
// optional type = 'hex', 'rgb', or 'rgba'. defaults to rgb/rgba based on length of array
function colorString(arr,type) {
	if (typeof(arr) === 'object') {
		if (type == 'hex') {
			arr = arr.slice(0,3);
			return '#' + arr.reduce((accum, colorVal) => {
					if (colorVal.toString(16).length < 2) accum += '0';
					accum += colorVal.toString(16);
					return accum;
				}, '').toUpperCase();
		} else {
			if (arr.length == 3) return `rgb(${arr[0]},${arr[1]},${arr[2]})`;
			else if (arr.length == 4) return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
		}
	} else if (typeof(arr) === 'string') return arr;
}

// check if string is valid color
function isColor(str) {
	const s = new Option().style;
	s.color = str;
	return s.color !== '';
}