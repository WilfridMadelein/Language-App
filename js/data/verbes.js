const verbes = {


nom:"Les verbes",


cartes:[

    ...etre.cartes,

    ...avoir.cartes

],



listes:{


etre:{

nom:"Être",
filtre: carte => carte.cat==="etre"
},


avoir:{

nom:"Avoir",
filtre: carte => carte.cat==="avoir"
},


}


};