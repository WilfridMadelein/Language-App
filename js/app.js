let cartesActuelles = [];

let index = 0;

let mode = "ordre";

let carteActuelle = null;

let historiqueRandom = [];

let positionHistorique = -1;

let langueSource = "fr";

let langueCible = "it";


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
// CHARGEMENT D'UNE LISTE
// ============================


function chargerListe(categorie, liste, bouton){



    document
    .querySelectorAll("#sousCategories button")
    .forEach(b => {

        b.classList.remove("active");

    });



    bouton.classList.add("active");

titreSelection.textContent =

categorie.nom

+ " > "

+ liste.nom;

    modeActuel = liste.mode;



    cartesActuelles = categorie.cartes.filter(
        liste.filtre
    );



    index = 0;

 if(modeActuel === "random"){

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

 if(modeActuel === "random"){


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



    if(modeActuel === "random"){


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



    if(modeActuel === "random"){


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


//temporaire
chargerPageWiktionary("être")

.then(resultat=>{


    const zone = document.getElementById("wiktionaryResult");


    zone.innerText = JSON.stringify(
        resultat,
        null,
        2
    );


})

.catch(erreur=>{


    document.getElementById("wiktionaryResult").innerText =

    "ERREUR : " + erreur;


});


// ============================
// DÉMARRAGE
// ============================


window.onload = function(){


    afficherCategories();


};

