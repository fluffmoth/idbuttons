// color palettes
const buttonPalettes = {
	'Standard': {
		base: [219, 210, 224],
		text: [49, 47, 67],
		innerOutline: [255, 255, 255],
		outline: [49, 47, 67],
		shadow: [49, 47, 67, 126]
	},
	'Dark Mode': {
		base: [49, 47, 67],
		text: [255, 255, 255],
		innerOutline: [201, 197, 207],
		outline: [49, 47, 67],
		shadow: [49, 47, 67]
	},
	'True Black': {
		base: [0, 0, 0],
		text: [255, 255, 255],
		innerOutline: [163, 163, 163],
		outline: [0, 0, 0],
		shadow: [0, 0, 0]
	},
	'Arcane Pink': {
		base: [255, 210, 235],
		text: [142, 44, 112],
		innerOutline: [255, 255, 255],
		outline: [142, 44, 112],
		shadow: [95, 21, 88]
	},
	'Ice Blue': {
		base: [255, 255, 255],
		text: [86, 109, 151],
		innerOutline: [209, 227, 255],
		outline: [86, 109, 151],
		shadow: [33, 54, 91],
		display: {base: [226, 237, 255]}
	},
	'Water Blue': {
		base: [152, 224, 247],
		text: [8, 71, 157],
		innerOutline: [91, 158, 211],
		outline: [8, 71, 157],
		shadow: [0, 46, 118],
		display: {base: [91, 158, 211],text: [0, 17, 100]}
	},
	'Lightning Aqua': {
		base: [24, 76, 76],
		text: [191, 255, 255],
		innerOutline: [128, 210, 184],
		outline: [24, 76, 76],
		shadow: [24, 76, 76],
		display: {base: [32, 97, 95]}
	},
	'Nature Green': {
		base: [145, 215, 108],
		text: [16, 76, 27],
		innerOutline: [211, 255, 163],
		outline: [16, 76, 27],
		shadow: [16, 76, 27]
	},
	'Mire Green': {
		base: [173, 176, 107],
		text: [65, 70, 13],
		innerOutline: [231, 228, 178],
		outline: [90, 69, 59],
		shadow: [66, 88, 9],
		overlay: { base: {}, innerOutline: {} }
	},
	'Wind Green': {
		base: [218, 237, 178],
		text: [81, 121, 16],
		innerOutline: [255, 255, 255],
		outline: [59, 98, 11],
		shadow: [67, 65, 39]
	},
	'Light Yellow': {
		base: [255, 252, 222],
		text: [145, 119, 12],
		innerOutline: [255, 255, 255],
		outline: [167, 144, 37],
		shadow: [124, 92, 33]
	},
	'Sunshine Yellow': {
		base: [251, 248, 154],
		text: [174, 105, 0],
		innerOutline: [253, 220, 83],
		outline: [174, 105, 0],
		shadow: [157, 96, 0]
	},
	'Fire Orange': {
		base: [251, 209, 93],
		text: [144, 52, 15],
		innerOutline: [227, 172, 74],
		outline: [165, 71, 33],
		shadow: [94, 36, 0]
	},
	'Plague Red': {
		base: [255, 137, 130],
		text: [95, 22, 8],
		innerOutline: [203, 74, 56],
		outline: [117, 37, 17],
		shadow: [73, 7, 0],
		display: {base: [227, 103, 90]}
	},
	'Shadow Purple': {
		base: [72, 42, 99],
		text: [230, 198, 249],
		innerOutline: [165, 132, 189],
		outline: [44, 18, 67],
		shadow: [44, 18, 67]
	},
	'Earth Brown': {
		base: [218, 209, 175],
		text: [104, 85, 57],
		innerOutline: [255, 254, 247],
		outline: [82, 65, 40],
		shadow: [64, 49, 28]
	},
	'Asmodaeus Red': {
		base: [29, 0, 0],
		text: [238, 168, 167],
		innerOutline: [189, 43, 41],
		outline: [29, 0, 0],
		shadow: [92, 1, 0],
		overlay: { text: {} },
		display: {text: [255, 78, 76]}
	},
	'Asmodaeus Orange': {
		base: [29, 7, 0],
		text: [238, 185, 167],
		innerOutline: [189, 80, 40],
		outline: [29, 7, 0],
		shadow: [92, 23, 0],
		overlay: { text: {} },
		display: {text: [222, 97, 51]}
	},
	'Asmodaeus Yellow-Orange': {
		base: [29, 16, 0],
		text: [238, 208, 167],
		innerOutline: [189, 129, 40],
		outline: [29, 16, 0],
		shadow: [92, 53, 0],
		overlay: { text: {} },
		display: {text: [213, 145, 45]}
	},
	'Asmodaeus Yellow': {
		base: [29, 28, 0],
		text: [237, 238, 167],
		innerOutline: [184, 189, 40],
		outline: [29, 28, 0],
		shadow: [91, 92, 0],
		overlay: { text: {} },
		display: {text: [184, 189, 40]}
	},
	'Asmodaeus Green': {
		base: [7, 29, 0],
		text: [67, 189, 40],
		innerOutline: [67, 189, 40],
		outline: [7, 29, 0],
		shadow: [18, 92, 0],
		overlay: { text: {} }
	},
	'Asmodaeus Teal': {
		base: [0, 29, 12],
		text: [40, 189, 112],
		innerOutline: [40, 189, 112],
		outline: [0, 29, 12],
		shadow: [0, 92, 42],
		overlay: { text: {} }
	},
	'Asmodaeus Aqua': {
		base: [0, 29, 27],
		text: [40, 188, 189],
		innerOutline: [40, 188, 189],
		outline: [0, 29, 27],
		shadow: [0, 92, 89],
		overlay: { text: {} }
	},
	'Asmodaeus Blue': {
		base: [0, 0, 29],
		text: [73, 68, 237],
		innerOutline: [44, 40, 189],
		outline: [0, 0, 29],
		shadow: [1, 0, 92],
		overlay: { text: {} }
	},
	'Asmodaeus Purple': {
		base: [22, 0, 29],
		text: [180, 55, 213],
		innerOutline: [158, 40, 189],
		outline: [22, 0, 29],
		shadow: [71, 0, 92],
		overlay: { text: {} }
	},
	'Asmodaeus Pink': {
		base: [29, 0, 11],
		text: [189, 40, 97],
		innerOutline: [189, 40, 97],
		outline: [29, 0, 11],
		shadow: [92, 0, 36],
		overlay: { text: {} }
	},
	'Royal Red': {
		base: [175, 21, 21],
		text: [230, 189, 79],
		textShadow: [116, 24, 24],
		innerOutline: [230, 189, 79],
		outline: [51, 12, 12],
		shadow: [77, 38, 38],
		overlay: {
			text: {image:'Royal_Gold_Overlay.png'},
			innerOutline: {image:'Royal_Gold_Overlay.png'}
		}
	},
	'Royal Blue': {
		base: [22, 62, 173],
		text: [230, 189, 79],
		textShadow: [24, 52, 131],
		innerOutline: [230, 189, 79],
		outline: [12, 22, 51],
		shadow: [35, 50, 92],
		overlay: {
			text: {image:'Royal_Gold_Overlay.png'},
			innerOutline: {image:'Royal_Gold_Overlay.png'}
		}
	},
	'Royal Green': {
		base: [13, 106, 13],
		text: [230, 189, 79],
		textShadow: [10, 81, 10],
		innerOutline: [230, 189, 79],
		outline: [6, 53, 6],
		shadow: [34, 56, 47],
		overlay: {
			text: {image:'Royal_Gold_Overlay.png'},
			innerOutline: {image:'Royal_Gold_Overlay.png'}
		}
	},
	'Royal Purple': {
		base: [118, 22, 170],
		text: [230, 189, 79],
		textShadow: [93, 24, 131],
		innerOutline: [230, 189, 79],
		outline: [37, 12, 51],
		shadow: [45, 26, 55],
		overlay: {
			text: {image:'Royal_Gold_Overlay.png'},
			innerOutline: {image:'Royal_Gold_Overlay.png'}
		}
	},
	'Heavenly Gold': {
		base: [228, 183, 75],
		text: [247, 247, 247],
		textShadow: [194, 136, 38],
		innerOutline: [239, 237, 231],
		outline: [228, 183, 75],
		shadow: [162, 120, 64],
		//glow: [222, 184, 106],
		overlay: {
			base: {image:'Heavenly_White_Overlay.png'},
			outline: {image:'Heavenly_White_Overlay.png'}
		}
	},
	'Heavenly White': {
		base: [247, 247, 247],
		text: [219, 178, 74],
		innerOutline: [230, 189, 79],
		outline: [197, 193, 179],
		shadow: [164, 94, 3],
		//glow: [231, 182, 0],
		overlay: { text: {}, innerOutline: {} }
	},
	'Gilded Black': {
		base: [38, 38, 38],
		text: [230, 189, 79],
		innerOutline: [230, 189, 79],
		outline: [10, 10, 10],
		shadow: [55, 55, 55],
		overlay: { 
			text: {image:'Royal_Gold_Overlay.png'},
			innerOutline: {image:'Royal_Gold_Overlay.png'}
		}
	},
	'Vergil Blue': {
		base: [23, 26, 35],
		text: [70, 162, 241],
		innerOutline: [40, 116, 233],
		outline: [0, 0, 0],
		shadow: [0, 168, 234],
		overlay: {
			base: {image: 'Vergil_Blue_Base.png'},
			text: {}, innerOutline: {}
		}
	},
	'Dante Orange': {
		base: [32, 32, 32],
		text: [249, 84, 7],
		textShadow: [0, 0, 0],
		innerOutline: [234, 106, 3],
		outline: [0, 0, 0],
		shadow: [249, 84, 7],
		//glow: [245, 161, 15],
		overlay: {
			base: {image: 'Dante_Orange_Base.png'},
			text: {}, innerOutline: {}
		}
	},
	'Wispwillow Grove': {
		base: [43, 38, 62],
		text: [129, 220, 229],
		innerOutline: [82, 98, 131],
		outline: [32, 25, 49],
		shadow: [58, 57, 189],
		glow: [0, 224, 255],
		overlay: {
			base: {image: 'Wispwillow_Grove_Base.png'},
			text: {}, innerOutline: {}
		}
	},
	'Murkbarrow Close': {
		base: [10, 21, 22],
		text: [125, 201, 198],
		innerOutline: [83, 120, 117],
		outline: [8, 18, 19],
		shadow: [78, 83, 83],
		glow: [106, 141, 145],
		overlay: {
			base: {}, text: {image: 'Murkbarrow_Close_Text.png'}, innerOutline: {}
		}
	},
					'Foxfire Bramble': {
						base: [88, 83, 106],
						text: [217, 215, 225],
						innerOutline: [72, 66, 88],
						outline: [27, 23, 35],
						shadow: [107, 100, 135],
						glow: [142, 139, 157],
						overlay: {
							base: {}, text: {image: 'Foxfire_Bramble_Text.png'}
						}
					},/*
					'Thorndark Altar': {
						base: [],
						text: [],
						innerOutline: [],
						outline: [],
						shadow: [],
						glow: [],
						overlay: {
							base: {}, text: {image: 'Murkbarrow_Close_Text.png'}, innerOutline: {}
						}
					},*/
	'Dusk Sanctum': {
		base: [51, 56, 73],
		text: [180, 171, 250],
		innerOutline: [107, 123, 138],
		outline: [27, 23, 35],
		shadow: [109, 31, 193],
		glow: [153, 132, 244],
		overlay: {
			base: {}, text: {image: 'Dusk_Sanctum_Text.png'}, innerOutline: {}
		}
	},
	'Driftwood Drag': {
		base: [26, 23, 31],
		text: [149, 121, 217],
		innerOutline: [80, 67, 94],
		outline: [16, 17, 26],
		shadow: [71, 70, 193],
		glow: [150, 91, 206],
		overlay: {
			base: {}, text: {image: 'Driftwood_Drag_Text.png'}, innerOutline: {}
		}
	},
	'Wyrmwound': {
		base: [67, 69, 6],
		text: [220, 190, 41],
		innerOutline: [221, 129, 133],
		outline: [40, 17, 1],
		shadow: [71, 94, 5],
		glow: [0,0,0],//119, 160, 0],
		overlay: {
			base: {image: 'Wyrmwound_Base.png'},
			text: {}, innerOutline: {}, glow: {}
		}
	},
	'Trans Pride': {
		base: [255, 255, 255],
		text: [3, 163, 229],
		altColors: [[3, 163, 229],[237, 120, 151]], // blue pink alternating
		innerOutline: [255, 228, 233],
		outline: [207, 74, 113],
		shadow: [133, 51, 90],
		display: {base: [255, 228, 233]}
	},
	'Gay Pride': {
		base: [26, 25, 34],
		text: [254, 135, 0],
		altColors: [[255, 83, 67],[254, 135, 0],[255, 255, 0],[37, 245, 37],[94, 188, 254],[214, 112, 255]], // rainbow alternating
		innerOutline: [0, 0, 0],
		outline: [52, 50, 69],
		shadow: [0, 0, 0, 0],
		glow: [255, 255, 255],
		overlay: { glow: {} }
	},
	'Scratchboard': {
		base: [0, 0, 0],
		text: [255, 255, 255],
		innerOutline: [255, 255, 255],
		outline: [0, 0, 0],
		shadow: [0, 0, 0],
		overlay: { text: {}, innerOutline: {} }
	},
	'Windows 7': {
		base: [255, 255, 255],
		text: [0, 0, 0],
		innerOutline: [240, 240, 240],
		outline: [155, 183, 211],
		shadow: [50, 48, 68],
		display: {base:[240, 240, 240]}
	}
}