// variables globales

let cartesActuelles = [];

let index = 0;

let mode = "ordre";

let carteActuelle = null;

let historiqueRandom = [];

let positionHistorique = -1;

let langueSource = "fr";

let langueCible = "it";

let configurationActive = {

    mode:"ordre",

    gram:["s","pl","inv"],

    type:[],

    temps:[]

};

let categorieActive = null;

let listeActive = null;


// éléments HTML

const card = document.getElementById("card");

const front = document.getElementById("front");

const back = document.getElementById("back");

const counter = document.getElementById("counter");

const titreSelection = document.getElementById("titreSelection");

const selectSource = document.getElementById("langueSource");
const selectCible = document.getElementById("langueCible");

// ============================
// CREATION DES MENUS
// ============================


function afficherCategories(){


    const zone = document.getElementById("categories");

    zone.innerHTML = "";


    Object.keys(catalogue).forEach(id => {

        const categorie = catalogue[id];


        const bouton = document.createElement("button");


        bouton.textContent = categorie.nom;

        bouton.classList.add("categorie-btn");


       bouton.onclick = function(){

            afficherSousCategories(categorie, bouton);

        };


        zone.appendChild(bouton);


    });


}




function afficherSousCategories(categorie, boutonCategorie){


  const zone = document.getElementById("sousCategories");


    zone.innerHTML = "";



    document
    .querySelectorAll("#categories button")
    .forEach(b => {

        b.classList.remove("active");

    });



    boutonCategorie.classList.add("active");



    Object.keys(categorie.listes).forEach(id => {


        const liste = categorie.listes[id];


        const bouton = document.createElement("button");


       bouton.textContent = liste.nom;

        bouton.classList.add("souscategorie-btn");


        bouton.onclick = function(){



            chargerListe(

                categorie,

                liste,

                bouton

            );


        };


        zone.appendChild(bouton);


    });


}

// ============================
// CHARGEMENT D'UNE LANGUE
// ============================

selectSource.onchange = function(){

    langueSource = this.value;

    afficherCarte();

};

selectCible.onchange = function(){

    langueCible = this.value;

    afficherCarte();

};

// ============================
// PROPRIETES DISPONIBLES
// ============================

function proprietesDisponibles(cartes){

    const disponibles = {};

    cartes.forEach(carte=>{

        Object.keys(carte).forEach(cle=>{

            disponibles[cle]=true;

        });

    });

    return disponibles;

}

// ============================
// CHARGEMENT D'UNE LISTE
// ============================


function chargerListe(categorie, liste, bouton){

    categorieActive = categorie;

    listeActive = liste;

    document
    .querySelectorAll("#sousCategories button")
    .forEach(b => {

        b.classList.remove("active");

    });



    bouton.classList.add("active");

    configurationActive.mode = liste.mode;

titreSelection.textContent =

categorie.nom

+ " > "

+ liste.nom;


// Détecte automatiquement les propriétés présentes
const cartesFiltrees =
categorie.cartes.filter(liste.filtre);


const disponibles =
analyserFiltres(cartesFiltrees);


console.log(disponibles);


afficherOptions(disponibles);


cartesActuelles =
categorie.cartes.filter(liste.filtre);


index = 0;

 if(configurationActive.mode === "random"){

    historiqueRandom = [];


    positionHistorique = -1;


    carteActuelle = choisirCarteAleatoire();


    historiqueRandom.push(carteActuelle);


    positionHistorique = 0;

}
else {

    carteActuelle = cartesActuelles[index];

}

afficherCarte();

}

// ============================
// AFFICHAGE OPTIONS
// ============================

function afficherOptions(disponibles){

console.log(
    "OPTIONS RECUES :",
    disponibles
);
    const zone = document.getElementById("optionsContenu");


    zone.innerHTML = "";



// MODE (toujours présent)

zone.innerHTML += `

<div class="option-groupe">

    <h4>Mode</h4>

    <label>

    <input 
    type="radio" 
    name="mode" 
    value="ordre"
    checked
    onchange="changerOptionMode(this.value)">

    <span class="option-valeur-texte">
    Ordre
    </span>

    </label>


    <label>

    <input 
    type="radio" 
    name="mode" 
    value="random"
    onchange="changerOptionMode(this.value)">

    <span class="option-valeur-texte">
    Random
    </span>

    </label>

</div>

`;



  // FILTRE : GRAMMAIRE

  if(disponibles.gram){

    const compteur = compterValeurs("gram");

    zone.innerHTML += `
        <div class="option-groupe">
            <h4>Grammaire</h4>
    `;

    disponibles.gram.forEach(valeur=>{

        const texte =
            libellesFiltres.gram[valeur] ?? valeur;

        const nombre =
            compteur[valeur] ?? 0;

        zone.innerHTML += `

            <label>

                <input
                    type="checkbox"
                    class="option-gram"
                    value="${valeur}"
                    checked
                    ${nombre===0 ? "disabled" : ""}
                    onchange="changerOptionGram()">
                
                <span class="option-valeur-texte">
                ${texte} (${nombre})
                </span>
            </label>

        `;

    });

    zone.innerHTML += `</div>`;

}


}

function changerOptionMode(mode){

    configurationActive.mode = mode;


    console.log(
        "Mode choisi :",
        configurationActive.mode
    );

    rechargerCartes();

}

function changerOptionGram(){

    //lire cases cochées

    const cases =
    document.querySelectorAll(
        ".option-gram:checked"
    );

     const nouvelleSelection =
    Array.from(cases).map(
        checkbox => checkbox.value
    );


    // teste si la nouvelle sélection est valide

     const cartesTest =
    appliquerFiltre(
        "gram",
        nouvelleSelection
    );


    // aucune carte, refuse le changement

    if(cartesTest.length === 0){

        alert(
    "Impossible : aucune carte avec cette sélection."
);

    document.querySelectorAll(".option-gram")
        .forEach(c=>{

            if(configurationActive.gram.includes(c.value)){
             c.checked=true;
            }
            else{
             c.checked=false;
            }

        });


        return;

    }

//accepte changement

    configurationActive.gram =
    nouvelleSelection;


    rechargerCartes();

}

// filtre

function appliquerFiltre(cle, valeurs){

    const cartesTest = cartesActuelles.filter(carte=>{

        if(
            carte[cle] !== undefined
            &&
            !valeurs.includes(carte[cle])
        ){
            return false;
        }

        return true;
    });

    return cartesTest;

}

// ============================
// RECHARGER CARTE SELON OPTIONS
// ============================

function rechargerCartes(){


    if(!categorieActive || !listeActive){

        return;

    }


    cartesActuelles =
categorieActive.cartes.filter(carte => {

    // La carte doit appartenir à la sous-catégorie

    if(!listeActive.filtre(carte)){
        return false;
    }

    // FILTRE GRAMMAIRE

    if(
        carte.gram !== undefined
        &&
        !configurationActive.gram.includes(carte.gram)
    ){
        return false;
    }
    return true;

});


    index=0;


    if(configurationActive.mode==="random"){


        carteActuelle =
        choisirCarteAleatoire();


    }
    else{


        carteActuelle =
        cartesActuelles[index];


    }


    afficherCarte();

}

function compterValeurs(cle){

    const compteurs = {};

    categorieActive.cartes.forEach(carte=>{

        // On applique seulement le filtre de la sous-catégorie
        if(!listeActive.filtre(carte)){
            return;
        }

        // La carte possède-t-elle cette propriété ?
        if(carte[cle]===undefined){
            return;
        }

        const valeur = carte[cle];

        if(!compteurs[valeur]){
            compteurs[valeur]=0;
        }

        compteurs[valeur]++;

    });

    return compteurs;

}

// ============================
// CONFIGURATION DES FILTRES
// ============================

const ordreFiltres = {

    gram:[
        "s",
        "pl",
        "inv"
    ],

    type:[
        "infinitif",
        "conju"
    ],

    temps:[
        "présent",
        "passé",
        "futur"
    ],

    personne:[
        "1s",
        "2s",
        "3s",
        "1pl",
        "2pl",
        "3pl"
    ]

};

const libellesFiltres = {

    gram:{

        s:"Singulier",

        pl:"Pluriel",

        inv:"Invariable"

    },

    type:{

        infinitif:"Infinitif",

        conju:"Conjugaison"

    },

    temps:{

        "présent":"Présent",

        "passé":"Passé",

        "futur":"Futur"

    },

    personne:{

        "1s":"Je",

        "2s":"Tu",

        "3s":"Il / Elle",

        "1pl":"Nous",

        "2pl":"Vous",

        "3pl":"Ils / Elles"

    }

};

function analyserFiltres(cartes){


    const filtres = {};



    cartes.forEach(carte=>{


        Object.keys(carte).forEach(cle=>{


            // ignorer les traductions
            if(
                cle==="fr" ||
                cle==="en" ||
                cle==="it" ||
                cle==="de" ||
                cle==="es"
            ){
                return;
            }


            // ignorer les identifiants
            if(
                cle==="cat" ||
                cle==="nb"
            ){

                return;
            }

            // créer le filtre s'il n'existe pas encore

            if(!filtres[cle]){
                filtres[cle]=[];
            }

            // ajouter la valeur si elle n'existe pas

            if(
                !filtres[cle].includes(carte[cle])
            ){

                filtres[cle].push(carte[cle]);

            }

        });

    });

    Object.keys(filtres).forEach(cle=>{

    if(ordreFiltres[cle]){

        filtres[cle].sort((a,b)=>{

            return ordreFiltres[cle].indexOf(a)
                 - ordreFiltres[cle].indexOf(b);

        });

    }

});

    return filtres;

}

// ============================
// AFFICHAGE CARTE
// ============================


function afficherCarte(){



    if(!carteActuelle){

        return;

    }



    // empêche le flash de traduction

    card.classList.add("no-animation");

    card.classList.remove("flipped");


    void card.offsetWidth;


    setTimeout(()=>{

        card.classList.remove("no-animation");

    },50);



    front.textContent = carteActuelle[langueSource];


    back.textContent = carteActuelle[langueCible];

 if(configurationActive.mode === "random"){


        counter.textContent = "Mode aléatoire";


    }

 else {
    counter.textContent =

    (index + 1)

    + " / "

    + cartesActuelles.length;



}

}


// ============================
// RETOURNER CARTE
// ============================


card.onclick = function(){


    if(carteActuelle){

        card.classList.toggle("flipped");

    }


};





// ============================
// NAVIGATION
// ============================


function suivant(){



    if(configurationActive.mode === "random"){


        carteActuelle = choisirCarteAleatoire();



        historiqueRandom = historiqueRandom.slice(
            0,
            positionHistorique + 1
        );



        historiqueRandom.push(carteActuelle);



        positionHistorique++;



        afficherCarte();


        return;

    }




    if(index < cartesActuelles.length - 1){


        index++;


        carteActuelle = cartesActuelles[index];


        afficherCarte();


    }



}





function precedent(){



    if(configurationActive.mode === "random"){


        if(positionHistorique > 0){



            positionHistorique--;



            carteActuelle = historiqueRandom[positionHistorique];



            afficherCarte();


        }



        return;


    }




    if(index > 0){


        index--;


        carteActuelle = cartesActuelles[index];


        afficherCarte();


    }



}





// ============================
// RANDOM UNIVERSEL
// ============================


function choisirCarteAleatoire(){
    


    const position = Math.floor(

        Math.random()

        *

        cartesActuelles.length

    );


    return cartesActuelles[position];


}




// ============================
// AUDIO
// ============================


function parler(texte, langue){

 speechSynthesis.cancel();

    const voix = new SpeechSynthesisUtterance(texte);


    voix.lang = langue;


    voix.rate = 0.8;


speechSynthesis.speak(voix);

}


const voix = {

    fr:"fr-FR",

    en:"en-US",

    it:"it-IT",

    de:"de-CH",

    es:"es-ES",

};

function prononcerCarte(){

    if(!carteActuelle){

        return;

    }

    if(card.classList.contains("flipped")){

        prononcerVerso();

    }

    else{

        prononcerRecto();

    }

}

function prononcerRecto(){

    parler(

        carteActuelle[langueSource],

        voix[langueSource]

    );

}

function prononcerVerso(){

    parler(

        carteActuelle[langueCible],

        voix[langueCible]

    );

}




// ============================
// RACCOURCIS CLAVIER
// ============================


document.addEventListener(
"keydown",
function(event){



    if(event.code === "ArrowRight"){


        suivant();


    }




    if(event.code === "ArrowLeft"){


        precedent();


    }




    if(event.code === "ArrowDown"){


        event.preventDefault();


        card.classList.toggle("flipped");


    }




   if(event.code==="ArrowUp"){

    prononcerCarte();

}


});




// ============================
// DÉMARRAGE
// ============================


window.onload = function(){


    afficherCategories();


};

