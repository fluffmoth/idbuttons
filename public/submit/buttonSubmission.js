let tagUl;

// string output to be copied
let output = '';

function initButtonSubmit() {
	tagUl = document.getElementById('tag-list');
	
	for (let filter of filterList) addFilter(filter,tagUl);
	updateOutput();
}

function addFilter(filter,parent) {
	let li = document.createElement('li');
	
	// checkbox
	let check = document.createElement('input');
	check.type = "checkbox";
	check.id = "checkbox-" + (filter.label + '-' + filter.tags).replaceAll(' ','');
	check.addEventListener('input', function (event) {
		let sublist = this.parentElement.querySelector('ul');
		if (sublist) sublist.classList.toggle('hidden');
		if (this.checked == false) this.parentElement.querySelectorAll('input[type=checkbox]').checked = false;
	});
	
	li.appendChild(check);
	
	// checkbox label
	let label = document.createElement("label");
	label.htmlFor = check.id;
	label.innerHTML = filter.label;
	label.dataset.tags = filter.tags;
	li.appendChild(label);
	
	parent.appendChild(li);
	
	// add this filter's children
	if (filter.children) {
		let ul = document.createElement('ul');
		ul.classList.add('hidden');
		li.appendChild(ul);
		for (let child of filter.children) addFilter(child,ul);
	}
}

// updates the string output to be copied
function updateOutput() {
	let section = document.getElementById('button-form-0');
	let num = Number(section.id.replace('button-form-', ''));
	
	//section.querySelectorAll
}