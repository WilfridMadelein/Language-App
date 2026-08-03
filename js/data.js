const modules = {


chiffres:{


nom:"Les chiffres",


sousOnglets:{


zeroTrente:{

nom:"0 à 30",

type:"liste",


mots:[

["zéro","zero"],
["un","uno"],
["deux","due"],
["trois","tre"],
["quatre","quattro"],
["cinq","cinque"],
["six","sei"],
["sept","sette"],
["huit","otto"],
["neuf","nove"],
["dix","dieci"],

["onze","undici"],
["douze","dodici"],
["treize","tredici"],
["quatorze","quattordici"],
["quinze","quindici"],
["seize","sedici"],
["dix-sept","diciassette"],
["dix-huit","diciotto"],
["dix-neuf","diciannove"],

["vingt","venti"],
["vingt-et-un","ventuno"],
["vingt-deux","ventidue"],
["vingt-trois","ventitré"],
["vingt-quatre","ventiquattro"],
["vingt-cinq","venticinque"],
["vingt-six","ventisei"],
["vingt-sept","ventisette"],
["vingt-huit","ventotto"],
["vingt-neuf","ventinove"],

["trente","trenta"]

]

},




unites:{


nom:"Les unités",

type:"liste",


mots:[

["vingt","venti"],
["trente","trenta"],
["quarante","quaranta"],
["cinquante","cinquanta"],
["soixante","sessanta"],
["soixante-dix","settanta"],
["quatre-vingts","ottanta"],
["quatre-vingt-dix","novanta"],
["cent","cento"],
["mille","mille"],
["un million","un milione"]

]

},





random100:{


nom:"Random - 100",

type:"random",

min:0,

max:100


}



}


},






vetements:{


nom:"Les vêtements",


sousOnglets:{


randomVetements:{


nom:"Random - vêtements",

type:"randomListe",


mots:[


["un pantalon","un pantalone"],
["des pantalons","dei pantaloni"],

["une robe","un vestito"],
["des robes","dei vestiti"],

["une chemise","una camicia"],
["des chemises","delle camicie"],

["une chaussette","un calzino"],
["des chaussettes","dei calzini"],

["une veste","una giacca"],
["des vestes","delle giacche"]

]


}



}


}



};