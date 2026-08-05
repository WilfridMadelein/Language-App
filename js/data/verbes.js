const verbes = {


nom:"Les verbes",


cartes:[

    ...etre.cartes,

    ...avoir.cartes

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
},

avoirOrdre:{

nom:"Avoir - ordre",
mode:"ordre",
filtre: carte => carte.cat==="avoir"
},

avoirRandom:{

nom:"Avoir - random",
mode:"random",
filtre: carte => carte.cat==="avoir"
},


}


};