const verbes = {


nom:"Les verbes",


cartes:[

    ...etre.cartes

],



listes:{


etreOrdre:{


nom:"Être - ordre",

mode:"ordre",

filtre: carte => carte.cat==="etre"


},



etreRandom:{


nom:"Être - random",

mode:"random",

filtre: carte => carte.cat==="etre"


}


}


};