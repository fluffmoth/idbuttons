// list of filters for checklist
const filterList = [
	{ label: `Genders`, tags: `gender`,
		children: [
			{ label: `Transgender`, tags: `transgender` },
			{ label: `Cisgender`, tags: `cisgender` },
			{ label: `Male`, tags: `male` },
			{ label: `Female`, tags: `female` },
			{ label: `Masculine`, tags: `masculine` },
			{ label: `Feminine`, tags: `feminine` },
			{ label: `Nonbinary`, tags: `nonbinary` },
			{ label: `Neutral`, tags: `neutral` },
			{ label: `Genderless/Agender`, tags: `genderless|agender` },
			{ label: `Androgynous`, tags: `androgynous|androgyne` },
			{ label: `Multigender`, tags: `multigender` },
			{ label: `Genderfluid`, tags: `genderfluid` },
			{ label: `Demigender`, tags: `demigender` },
			{ label: `Unknown/Unclear/Unlabeled`, tags: `uingender` },
			{ label: `Xenogender`, tags: `xenogender|xenic|xenine|xiaspec`,
				children: [
					{ label: `Faunagender (animals)`, tags: `faunagender` },
					{ label: `Floragender (plants)`, tags: `floragender` },
					{ label: `Mythogender (fantasy/mythology)`, tags: `mythogender` },
					{ label: `Fictigender (fiction/media)`, tags: `fictigender` },
					{ label: `Gastrogender (food)`, tags: `gastrogender` },
					{ label: `Genderspace (outer space)`, tags: `genderspace` },
					{ label: `Aliengender (alien/alterhuman)`, tags: `alien` }
				]
			},
			{ label: `Exclusive Genders`, tags: ``,
				children: [
					{ label: `Jewish`, tags: `jewish` },
					{ label: `North American Indigenous`, tags: `north american,indigenous` },
					{ label: `Neurogender`, tags: `neurogender` },
					{ label: `Intersex Genders`, tags: `intersex` }
				]
			},
			{ label: `Gender Systems`, tags: ``,
				children: [
					{ label: `Circa-binary/Proximal Identities`, tags: `circa-binary` },
					{ label: `Genderfluid Fragment System`, tags: `genderfluid fragment system` },
					{ label: `Galactian Alignments`, tags: `galactian alignment system` },
					{ label: `Alloy Alignments`, tags: `alloy alignment system` },
					{ label: `Celestial Gender System`, tags: `celestial gender system` },
					{ label: `Sylvian System`, tags: `sylvian system` },
					{ label: `Mystian System`, tags: `mystian system` },
					{ label: `Singender System`, tags: `singender system` },
					{ label: `Techno-gender System`, tags: `technogender system` }
				]
			}
		]
	},
	{ label: `Pronouns`, tags: `pronoun`,
		children: [
			{ label: `Single Pronoun Sets`, tags: `single pronoun`,
				children: [
					{ label: `He/Him`, tags: `he/him` },
					{ label: `She/Her`, tags: `she/her` },
					{ label: `They/Them`, tags: `they/them` },
					{ label: `It/Its`, tags: `it/its` },
					{ label: `Neopronouns`, tags: `neopronoun`,
						children: [
							{ label: `Nounself`, tags: `nounself` },
							{ label: `Spivak`, tags: `spivak` },
							{ label: `Sie/Hir`, tags: `sie/hir` },
							{ label: `Fae & Fey`, tags: `fae|fey` },
							{ label: `Ze & Xe`, tags: `ze|xe` },
							{ label: `Nameself`, tags: `nameself` },
							{ label: `Historical`, tags: `historical` },
							{ label: `Other Neopronouns`, tags: `!nounself,!spivak,!sie/hir,!fae,!fey,!ze,!xe,!nameself,!historical,!conlang` }
						]
					}
				]
			},
			{ label: `Mixed/Multi Pronouns`, tags: `mixed pronouns`,
				children: [
					{ label: `He/They`, tags: `he/they|they/he` },
					{ label: `She/They`, tags: `she/they|they/she` },
					{ label: `He/She`, tags: `he/she|she/he|he/her|she/him` },
					{ label: `He/She/They`, tags: `he,she,they` },
					{ label: `They/It`, tags: `it/they|they/it` },
					{ label: `Other Mixed Pronouns`, tags: `!he/they,!they/he,!she/they,!they/she,!he/she,!she/he,!he/she/they,!it/they,!they/it` }
				]
			},
			{ label: `Any Pronouns`, tags: `any pronouns` },
			{ label: `Ask Pronouns`, tags: `ask pronouns` },
			{ label: `No Pronouns`, tags: `no pronouns` },
			{ label: `Spanish Pronouns`, tags: `spanish` },
			{ label: `Conlang Pronouns`, tags: `conlang` },
			{ label: `Flags/Icons`, tags: ``,
				children: [
					{ label: `Gender Flag`, tags: `gender flag` },
					{ label: `Orientation Flag`, tags: `orientation flag` },
					{ label: `Pronoun Flag`, tags: `pronoun flag` },
					{ label: `Solid Color`, tags: `color` },
					{ label: `Shape Bases`, tags: `shape icon` },
					{ label: `Other`, tags: `!gender flag,!orientation flag,!pronoun flag,!color,!shape icon` }
				]
			},
		]
	},
	{ label: `Orientations`, tags: `orientation`,
		children: [
			{ label: `Female/FIN Attraction`, tags: `fin attraction` },
			{ label: `Lesbian/Sapphic/WLW`, tags: `sapphic|wlw|lesbian` },
			{ label: `Male/MIN Attraction`, tags: `min attraction` },
			{ label: `Achillean/MLM`, tags: `mlm|gay man|achillean` },
			{ label: `Nonbinary/NIN Attraction`, tags: `nin attraction` },
			{ label: `M-spec/Multisexual`, tags: `m-spec`,
				children: [
					{ label: `Bi`, tags: `bi`},
					{ label: `Pan`, tags: `pan`},
					{ label: `Omni`, tags: `omni`},
					{ label: `Other M-spec Orientations`, tags: `!bi,!pan,!omni`}
				]
			},
			{ label: `Fluid`, tags: `fluid` },
			{ label: `A-spec`, tags: `a-spec`,
				children: [
					{ label: `Ace Spectrum`, tags: `asexual|ace spectrum,ace spectrum`},
					{ label: `Aro Spectrum`, tags: `aromantic|aro spectrum,aro spectrum`},
					{ label: `Aroace Spectrum`, tags: `aroace|aroace spectrum,aroace spectrum`}
				]
			},
			{ label: `Straight`, tags: `straight|hetero` },
			{ label: `Queer`, tags: `queer` },
			{ label: `Questioning`, tags: `questioning` },
			{ label: `Tertiary Attraction`, tags: `tertiary attraction` },
			{ label: `Split Attraction Model`, tags: `split attraction model`}
		]
	},
	{ label: `Intersex`, tags: `intersex` },
	{ label: `LGBTQ+ Allies`, tags: `ally` },
	{ label: `Polyamory & Relationships`, tags: `relationship|relationship style`,
		children: [
			{ label: `Relationships`, tags: `relationship` },
			{ label: `Relationship Structures/Orientations`, tags: `relationship style` },
			{ label: `Polyamory`, tags: `polyamorous` },
			{ label: `Monogamy/Monoamory`, tags: `monogamous|monoamorous` },
			{ label: `Nonamory`, tags: `nonamorous` }
		]
	},
	{ label: `Religion`, tags: `religion` },
	{ label: `Alterhuman/Otherkin`, tags: `alterhuman|otherkin|therian,!gender,!orientation` ,
		children: [
			{ label: `Genders & Orientations`, tags: `gender|orientation` }
		]
	},
	{ label: `Health & Disability`, tags: `health|disability|disorder,!gender`},
	{ label: `Dietary Info`, tags: `diet` },
	{ label: `Fandoms & Interests`, tags: `interests|fandom`,
		children: [
			{ label: `Genres`, tags: ``,
				children: [
					{ label: `Science Fiction`, tags: `science fiction|scifi` },
					{ label: `Fantasy`, tags: `fantasy` },
					{ label: `Horror`, tags: `horror` }
				]
			},
			{ label: `Music`, tags: `music`,
				children: [
					{ label: `Artists`, tags: `music artist` },
					{ label: `Albums`, tags: `music album` },
					{ label: `Instruments`, tags: `musical instrument` },
					{ label: `Genres`, tags: `genre` }
				]
			},
			{ label: `Games`, tags: `game`,
				children: [
					{ label: `Video Games`, tags: `video game` },
					{ label: `Consoles/Devices`, tags: `game console|gaming device` },
					{ label: `Game Development`, tags: `game dev` },
					{ label: `Platformers`, tags: `platformer` },
					{ label: `MMOs`, tags: `mmo` },
					{ label: `RPGs`, tags: `rpg` },
					{ label: `FPS`, tags: `fps` }
				]
			},
			{ label: `TV Shows`, tags: `television` },
			{ label: `Anime/Manga`, tags: `anime|manga` },
			{ label: `Comics/Webcomics`, tags: `comic|webcomic` },
			{ label: `Podcasts`, tags: `podcast` },
			{ label: `Streamers`, tags: `streamer` },
			{ label: `Books`, tags: `book` },
		]
	},
	{ label: `Flight Rising`, tags: `flight rising,!subspecies extras,!lineage extras`,
		children: [
			{ label: `Flights/Affiliations`, tags: ``,
				children: [
					{ label: `Arcane`, tags: `arcane flight` },
					{ label: `Earth`, tags: `earth flight` },
					{ label: `Fire`, tags: `fire flight` },
					{ label: `Ice`, tags: `ice flight` },
					{ label: `Light`, tags: `light flight` },
					{ label: `Lightning`, tags: `lightning flight` },
					{ label: `Nature`, tags: `nature flight` },
					{ label: `Plague`, tags: `plague flight` },
					{ label: `Shadow`, tags: `shadow flight` },
					{ label: `Water`, tags: `water flight` },
					{ label: `Wind`, tags: `wind flight` },
					{ label: `Beastclans`, tags: `beastclans` },
					{ label: `Shade`, tags: `shade` },
					{ label: `Unaligned`, tags: `unaligned flight` }
				]
			},
			{ label: `Breeds`, tags: ``,
				children: [
					{ label: `Modern`, tags: ``,
						children: [
							{ label: `Bogsneak`, tags: `bogsneak` },
							{ label: `Coatl`, tags: `coatl` },
							{ label: `Fae`, tags: `fae` },
							{ label: `Fathom`, tags: `fathom` },
							{ label: `Guardian`, tags: `guardian` },
							{ label: `Imperial`, tags: `imperial` },
							{ label: `Mirror`, tags: `mirror` },
							{ label: `Nocturne`, tags: `nocturne` },
							{ label: `Obelisk`, tags: `obelisk` },
							{ label: `Pearlcatcher`, tags: `pearlcatcher` },
							{ label: `Ridgeback`, tags: `ridgeback` },
							{ label: `Skydancer`, tags: `skydancer` },
							{ label: `Snapper`, tags: `snapper` },
							{ label: `Spiral`, tags: `spiral` },
							{ label: `Tundra`, tags: `tundra` },
							{ label: `Wildclaw`, tags: `wildclaw` }
						]
					},
					{ label: `Ancient`, tags: ``,
						children: [
							{ label: `Aberration`, tags: `aberration` },
							{ label: `Aether`, tags: `aether` },
							{ label: `Auraboa`, tags: `auraboa` },
							{ label: `Banescale`, tags: `banescale` },
							{ label: `Cirrus`, tags: `cirrus` },
							{ label: `Dusthide`, tags: `dusthide` },
							{ label: `Everlux`, tags: `everlux` },
							{ label: `Gaoler`, tags: `gaoler` },
							{ label: `Sandsurge`, tags: `sandsurge` },
							{ label: `Undertide`, tags: `undertide` },
							{ label: `Veilspun`, tags: `veilspun` }
						]
					}
				]
			},
			{ label: `Locations`, tags: `location` },
			{ label: `Subspecies`, tags: `subspecies` },
			{ label: `Lineage`, tags: `lineage` },
			{ label: `Challenges`, tags: `challenge` },
			{ label: `Special Dragons`, tags: `special dragon` },
			{ label: `Eye Types`, tags: `eye type` },
			{ label: `Colors`, tags: `color|dragon color`,
				children: [
					{ label: `Rarity`, tags: `gene rarity` },
					{ label: `Color Patterns`, tags: `color pattern` },
					{ label: `Specific Color Genes`, tags: `specific color` },
					{ label: `Other`, tags: `!gene rarity,!color pattern` }
				]
			},
			{ label: `Exalting`, tags: `exalting` }
		]
	},
	{ label: `Cultures & Nationalities`, tags: `country|nationality|culture` },
	{ label: `Time Zones`, tags: `time zone` },
	{ label: `Aesthetics/Subcultures`, tags: `aesthetic|subculture,!gender` },
	{ label: `Jobs/Roles/Hobbies`, tags: `job|role|hobby` ,
		children: [
			{ label: `Academia`, tags: `academia` },
			{ label: `Animals`, tags: `animals` },
			{ label: `Arts`, tags: `arts` },
			{ label: `Building/Crafting`, tags: `building|crafting` },
			{ label: `Combat`, tags: `combat` },
			{ label: `Government/Leadership`, tags: `government|leadership` },
			{ label: `Magic`, tags: `magic` },
			{ label: `Science`, tags: `science` },
			{ label: `Technology`, tags: `technology` },
			{ label: `Other`, tags: `job|role,!academia,!animals,!arts,!building,!crafting,!combat,!leadership,!magic,!science,!technology` }
		]
	},
	{ label: `Button Bases`, tags: `button base`,
		children: [
			{ label: `Palette Bases`, tags: `palette button base` },
			{ label: `Shape Icons`, tags: `icon base`,
				children: [
					{ label: `Hearts`, tags: `heart` },
					{ label: `Stars`, tags: `star` }
				]
			},
			{ label: `Colors`, tags: ``,
				children: [
					{ label: `Red`, tags: `red` },
					{ label: `Orange`, tags: `orange` },
					{ label: `Yellow`, tags: `yellow` },
					{ label: `Green`, tags: `green` },
					{ label: `Blue`, tags: `blue` },
					{ label: `Purple`, tags: `purple` },
					{ label: `Pink`, tags: `pink` },
					{ label: `Black`, tags: `black` },
					{ label: `White`, tags: `white` },
					{ label: `Gray`, tags: `gray` },
					{ label: `Multicolor`, tags: `multicolor|rainbow` }
				]
			}
		]
	}
]