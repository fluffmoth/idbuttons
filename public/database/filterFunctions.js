let filterArea, filterForm;

function initFilterForm() {
	filterArea = document.querySelector('#filter-buttons');
	filterForm = document.querySelector('#filters');
	
	// when filterForm is submitted, modify values first
	filterForm.addEventListener('submit', (e) => {
		// delay submission
		e.preventDefault();
		// adjust the filterForm values to prepare for submitting
		modifyFilterForm();
		// submit filterForm
		filterForm.submit();
	});
	
	// populate filter list
	filterList.forEach((f) => { createFilter(document.getElementById('filter-ul'),f) });
}

// adjust the filterForm values to prepare for submitting
// merge all checked tags into "tags" value
// remove all empty values
// remove all contradicting tags
function modifyFilterForm() {
	var values = [];
	var formEntries = Object.fromEntries(new FormData(filterForm));
	
	// add each filterTags value to the values
	// skip duplicates
	for (let key in formEntries) {
		let v = formEntries[key];
		if (key.startsWith(`filterTags`)) {
			// add all tags in key if they haven't already been added
			v.split(`,`).forEach((tag) => { if (!values.includes(tag)) values.push(tag); });
		}
	}
	// if any tag and !tag pairs exist, remove the !tag
	values = removeContradictingTags(values);
	// set tags = values
	filterForm.querySelector(`#filter-tags`).value = values.join(',');
	
	// clear blank and filterTags inputs
	// prevents them from being submitted
	filterForm.querySelectorAll(`input`).forEach((input) => {
		// if value is blank or key is filterTags
		if (input.value.trim() == `` || input.name.startsWith(`filterTags`)) {
			input.name = ``;
		}
	});
}

// adds a new filter to the navigation filters
// el parameter = element to insert filter into
// (optional) tags parameter = additional tags to add
function createFilter(el,f,tags) {
	// log inherited tags
	//if (f.tags == '') console.log(f.label + ' tags = ' + tags);
	
	// create container element and add to provided parent element
	var li = document.createElement("li");
	el.appendChild(li);
	
	// if filter has tags
	if (f.tags != `` && f.tags != undefined) {
		// if additional tags were provided, add this filter's tags to the given tags
		if (tags && f.tags) f.tags = tags + `,` + f.tags;
		else if (tags) f.tags = tags;
	}
	
	// if this filter has tags, create checkbox
	if (f.tags) {
		f.id = 'filterTags' + '-' + f.label.replace(/\W/gi, '') + '-' + f.tags.replaceAll(',','-').replace(/[^a-z0-9\-]/gi, '')
		
		// create checkbox
		var checkbox = document.createElement("input");
		checkbox.type = `checkbox`;
		checkbox.id = f.id;
		checkbox.name = f.id;
		checkbox.value = f.tags;
		// if urlTags includes this filter's tags, check the box
		if ( f.tags.split(`,`).every(t => urlTags.includes(adjustText(t)) ) ) checkbox.checked = true;
		// if box is checked, make sure parent container is expanded
		if (checkbox.checked) {
			let elem = li;
			while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
				elem = elem.parentNode;
				if (elem.nodeName.toLowerCase() == 'ul') { expandSection(elem) }
			}
		}
		
		// create checkbox label
		var label = document.createElement("label");
		label.htmlFor = f.id;
		label.innerHTML = f.label;
		
		li.appendChild(checkbox);
		li.appendChild(label);
	}
	// otherwise add label as plain text
	else li.innerHTML = f.label;
	
	// if this filter has children, run createFilter on each child
	// include this filter's tags in the children
	// also add button to expand section
	if (f.children) {
		// add button to expand child list
		var open = document.createElement("button");
		open.type = `button`;
		open.classList.add(`open-filters`);
		open.addEventListener(`click`, function() {
			if (ul.classList.contains(`hidden`)) {
				ul.classList.remove(`hidden`);
				if (ul.parentElement && ul.parentElement.querySelector(`.open-filters`)) {
					open.innerHTML = `[less]`;
				}
			}
			else {
				ul.classList.add(`hidden`);
				if (ul.parentElement && ul.parentElement.querySelector(`.open-filters`)) {
					open.innerHTML = `[more]`;
				}
			}
		});
		li.appendChild(open);
		
		// create subcontainer
		var ul = document.createElement("ul");
		li.appendChild(ul);
		collapseSection(ul);
		
		// get merged parent tags to pass to children
		var inheritTags = ``;
		if (tags && f.tags) inheritTags = tags + `,` + f.tags;
		else if (tags) inheritTags = tags;
		else inheritTags = f.tags;
		
		// createFilter for all child filters
		f.children.forEach((child) => { createFilter(ul,child,inheritTags); });
	}
}

// expand/collapse filter button sections
function expandSection(ul) {
	ul.classList.remove(`hidden`);
	if (ul.parentElement && ul.parentElement.querySelector(`.open-filters`)) {
		ul.parentElement.querySelector(`.open-filters`).innerHTML = `[less]`;
	}
}
function collapseSection(ul) {
	ul.classList.add(`hidden`);
	if (ul.parentElement && ul.parentElement.querySelector(`.open-filters`)) {
		ul.parentElement.querySelector(`.open-filters`).innerHTML = `[more]`;
	}
}
