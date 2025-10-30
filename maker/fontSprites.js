const fontSpriteData = {
	regular: {
		A: {kern: {T:-1}},
		B: {kern: {',':-1,';':-1}},
		C: {kern: {T:-1,',':-1,';':-1}},
		D: {kern: {',':-1,';':-1}},
		E: {width: 4},
		F: {width: 4, kern: {',':-1,';':-1,'.':-1,'/':-1,'_':-1}},
		G: {kern: {T:-1,',':-1,';':-1}},
		I: {width: 3},
		J: {kern: {',':-1,';':-1}},
		L: {width: 4, kern: {T:-1,' T':-1,V:-1,v:-1,Y:-1,'*':-1,'^':-1,"'":-1,'"':-1,'\\':-1}},
		O: {kern: {T:-1,',':-1,';':-1}},
		P: {width: 4, kern: {',':-1,';':-1,'/':-1,'_':-1}},
		Q: {kern: {T:-1}},
		R: {kern: {C:-1,c:-1,G:-1,g:-1,I:-1,i:-1,O:-1,Q:-1,q:-1,S:-1,T:-1,t:-1,U:-1,u:-1,V:-1,v:-1,Y:-1,y:-1,"'":-1,'\\':-1}},
		S: {width: 4, kern: {',':-1,';':-1}},
		T: {kern: {A:-1,a:-1,C:-1,c:-1,G:-1,g:-1,J:-1,j:-1,O:-1,o:-1,Q:-1,q:-1,T:-1,',':-1,';':-1,'.':-1,'-':-1,'/':-1,'_':-1}},
		V: {kern: {',':-1,';':-1,'_':-1}},
		W: {kern: {',':-1,';':-1}},
		Y: {kern: {',':-1,';':-1}},
		Z: {width: 4},
		b: {kern: {',':-1,';':-1}},
		c: {kern: {T:-1,',':-1,';':-1}},
		d: {kern: {',':-1,';':-1}},
		e: {width: 3},
		f: {width: 3, kern: {',':-1,';':-1}},
		g: {kern: {T:-1,',':-1,';':-1}},
		i: {width: 1},
		k: {kern: {',':-1,';':-1}},
		l: {width: 3, kern: {T:-1,V:-1,v:-1,Y:-1,y:-1,'*':-1,'^':-1,"'":-1,'"':-1}},
		o: {kern: {T:-1,',':-1,';':-1}},
		p: {kern: {',':-1,';':-1,'/':-1,'_':-1}},
		s: {width: 3},
		t: {width: 3},
		v: {kern: {',':-1,';':-1,'.':-1,'/':-1,'_':-1}},
		z: {width: 3},
		1: {width: 3},
		4: {width: 5, kern: {'_':-1}},
		7: {kern: {'_':-1}},
		',': {width: 2},
		';': {width: 2},
		'?': {width: 4},
		'"': {width: 3},
		'_': {width: 5, kern: {T:-1,V:-1}},
		'-': {width: 3, kern: {T:-1}},
		'+': {width: 3},
		'=': {width: 4},
		'/': {width: 3, kern: {i:1}},
		'\\': {width: 3, kern: {T:-1}},
		'(': {width: 2},
		')': {width: 2},
		'[': {width: 2},
		']': {width: 2},
		'{': {width: 3},
		'}': {width: 3},
		'*': {width: 3},
		'^': {width: 3},
		'~': {width: 6},
		'&': {width: 5},
		'%': {width: 5},
		'<': {width: 4},
		'>': {width: 4},
		'#': {width: 6},
		'$': {width: 4},
		'¿': {width: 4},
		' ': {width: 1}
	},
	narrow: {
		B: {kern: {',':-1,';':-1}},
		C: {kern: {',':-1,';':-1}},
		D: {kern: {',':-1,';':-1}},
		E: {width: 3},
		F: {width: 3, kern: {',':-1,';':-1}},
		G: {kern: {',':-1,';':-1}},
		I: {width: 1},
		K: {kern: {',':-1,';':-1}},
		L: {width: 3, kern: {'*':-1,'^':-1,"'":-1,'"':-1}},
		O: {kern: {',':-1,';':-1}},
		P: {kern: {',':-1,';':-1,'/':-1,'_':-1}},
		S: {width: 3},
		T: {width: 3, kern: {'-':-1}},
		V: {kern: {',':-1,';':-1,'.':-1,'/':-1,'_':-1}},
		Z: {width: 3},
		b: {kern: {',':-1,';':-1}},
		c: {kern: {',':-1,';':-1}},
		d: {kern: {',':-1,';':-1}},
		e: {width: 2},
		f: {width: 2, kern: {',':-1,';':-1}},
		g: {kern: {',':-1,';':-1}},
		i: {width: 1},
		k: {kern: {',':-1,';':-1}},
		l: {width: 2, kern: {'*':-1,'^':-1,"'":-1,'"':-1}},
		o: {kern: {',':-1,';':-1}},
		p: {kern: {',':-1,';':-1}},
		s: {width: 2},
		t: {kern: {',':-1,';':-1,'-':-1}},
		z: {width: 2},
		1: {width: 2},
		'.': {width: 1},
		',': {width: 2},
		';': {width: 2},
		'!': {width: 1},
		':': {width: 1},
		"'": {width: 1},
		'-': {kern: {'T':-1,'t':-1}},
		'/': {width: 2, kern: {I:1,i:1}},
		'\\': {width: 2},
		'(': {width: 2},
		')': {width: 2},
		'[': {width: 2},
		']': {width: 2},
		'~': {width: 4},
		'&': {width: 4},
		'#': {width: 5},
		'|': {width: 1},
		'¡': {width: 1},
		' ': {width: 1}
	}
}

// note: space at the end
const fontSpriteList = `
	ABCDEFGHIJKLMNOPQRSTUVWXYZ
	abcdefghijklmnopqrstuvwxyz
	0123456789
	.,;!?:'"_-+=/\\()[]{}*^~&%<>#|$¡¿ 
`

const fontSpriteImg = new Image();
fontSpriteImg.src = `/maker/fontSprites.png`;

// get the sprite data of given character
// returns object with properties x,y,width,height
// optional style - 'regular' 'narrow'
function getFontSpriteData(char,style) {
	if (fontSpriteList.includes(char)) {
		return {
			x:getFontSpriteX(char,style),
			y:getFontSpriteY(char,style),
			width:getFontSpriteWidth(char,style),
			height:8,
			kern:getFontSpriteKerns(char,style)
		};
	}
}

// return width (in pixels) of given character
// optional style - 'regular' 'narrow'
function getFontSpriteWidth(char,style) {
	if (fontSpriteList.includes(char)) {
		let width;
		
		if (fontSpriteData[style][char] && fontSpriteData[style][char].width) width = fontSpriteData[style][char].width;
		// if width not defined in fontSpriteData
		else {
			// narrow style
			if (style == 'narrow') {
				// if char is a letter
				if (char.match(/[a-z]/i)) {
					if (char == char.toUpperCase()) width = 4;
					else width = 3;
				}
				// if char is a number
				else if (char.match(/\d/i)) width = 3;
				else width = 3;
			}
			// regular style
			else {
				// if char is a letter
				if (char.match(/[a-z]/i)) {
					if (char == char.toUpperCase()) width = 5;
					else width = 4;
				}
				// if char is a number
				else if (char.match(/\d/i)) width = 4;
				else width = 1;
			}
		}
		return width;
	}
}

// return x coordinate of top left pixel of given character
// optional style - 'regular' 'narrow'
function getFontSpriteX(char,style) {
	if (fontSpriteList.includes(char)) {
		let x = 0;
		
		let rowStart;
		// if char is a letter
		if (char.match(/[a-z]/i)) {
			if (char == char.toUpperCase()) rowStart = 'A';
			else rowStart = 'a';
		}
		// if char is a number
		else if (char.match(/\d/i)) rowStart = '0';
		else rowStart = '.';
		
		let sub = fontSpriteList.substring(fontSpriteList.indexOf(rowStart),fontSpriteList.indexOf(char));
		for (let i = 0; i < sub.length; i++) x += getFontSpriteWidth(sub[i],style) + 1;
		
		return x;
	}
}

// return y coordinate of top pixel of given character
// optional style - 'regular' 'narrow'
function getFontSpriteY(char,style) {
	if (fontSpriteList.includes(char)) {
		// regular
		let y = 0;
		// narrow
		if (style == 'narrow') y = 32;
		
		if (fontSpriteData[style][char] && fontSpriteData[style][char].y) y += fontSpriteData[style][char].y;
		// if char is a letter
		if (char.match(/[a-z]/i)) {
			if (char == char.toUpperCase()) return y;
			// if char is lowercase
			else if (char == char.toLowerCase()) return y + 8;
		}
		// if char is a number
		else if (char.match(/\d/i)) return y + 16;
		// if char is a symbol
		else return y + 24;
	}
}

// return y coordinate of top pixel of given character
// optional style - 'regular' 'narrow'
function getFontSpriteKerns(char,style) {
	if (fontSpriteList.includes(char)) {
		let kern;
		
		if (fontSpriteData[style][char] && fontSpriteData[style][char].kern) kern = fontSpriteData[style][char].kern;
		
		return kern;
	}
}

// draws string on canvas context c at coordinates (cX,cY) with maximum width maxWidth
// optional style - 'regular' 'narrow' 'thin' 'regularCase' 'narrowCase'
function drawSpriteString(c,string,cX,cY,maxX,params) {
	if (!params) params = {};
	else {
		if (params.style == 'regular' || params.style == 'narrow') string = string.toUpperCase();
		else if (params.style == 'thin') { params.style = 'narrow'; string = string.toLowerCase(); }
		else if (params.style == 'regularCase') params.style = 'regular';
		else if (params.style == 'narrowCase') params.style = 'narrow';
		else { params.style = 'regular'; string = string.toUpperCase(); }
	}
	
	let color;
	if (params.colors && params.colors.length > 0) color = 0;
	
	for (let i = 0; i < string.length; i++) {
		let char = string[i];
		if (fontSpriteList.includes(char)) {
			let data = getFontSpriteData(char,params.style);
			
			if (cX + data.width < maxX) {
				if (params.textShadow) {
					c.drawImage(fontSpriteImg,data.x,data.y,data.width,data.height,cX+1,cY,data.width,data.height);
					replaceColor(buttonPalettes['Standard'].text,params.textShadow,20,cX+1,cY,data.width,data.height);
				}
				
				c.drawImage(fontSpriteImg,data.x,data.y,data.width,data.height,cX,cY,data.width,data.height);
				
				// if setting text colors
				if (typeof(color) === 'number' && char != ' ') {
					replaceColor(buttonPalettes['Standard'].text,params.colors[color],20,cX,cY,data.width,data.height);
					color += 1;
					if (color >= params.colors.length) color = 0;
				}
				
				// determine spacing between this character and next character
				let gap = 1;
				if (i < string.length - 1 && data.kern && data.kern[string[i+1]]) gap += data.kern[string[i+1]];
				// if next character is space
				if (i < string.length - 2 && string[i+1] == ' ' && data.kern && data.kern[string[i+2]]) gap += data.kern[string[i+2]]
				// add the gap to cX before starting next character
				cX += data.width + gap;
			}
			else break;
		}
	}
}