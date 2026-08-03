let cartesActuelles = [];

let index = 0;

let mode = "ordre";

let carteActuelle = null;


// éléments HTML

const card = document.getElementById("card");

const front = document.getElementById("front");

const back = document.getElementById("back");

const counter = document.getElementById("counter");



// ============================
// CREATION DES MENUS
// ============================


function afficherCategories(){


    const zone = document.getElementById("categories");

    zone.innerHTML = "";


    Object.keys(catalogue).forEach(id => {


        const bouton = document.createElement("button");


        bouton.innerHTML = catalogue[id].nom;


        bouton.onclick = () => {

            afficherSousCategories(catalogue[id]);

        };


        zone.appendChild(bouton);


    });


}




function afficherSousCategories(categorie){


    const zone = document.getElementById("sousCategories");

    zone.innerHTML = "";


    Object.keys(categorie.listes).forEach(id => {


        const liste = categorie.listes[id];


        const bouton = document.createElement("button");


        bouton.innerHTML = liste.nom;


        bouton.onclick = () => {


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
// CHARGEMENT D'UNE LISTE
// ============================


function chargerListe(categorie, liste, bouton){



    document
    .querySelectorAll(".menu button")
    .forEach(b => {

        b.classList.remove("active");

    });



    bouton.classList.add("active");



    mode = liste.mode;



    cartesActuelles = categorie.cartes.filter(
        liste.filtre
    );



    index = 0;



    if(mode === "random"){

        carteActuelle = carteAleatoire();

    }

    else{

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



    front.innerHTML = carteActuelle.fr;


    back.innerHTML = carteActuelle.it;



    counter.innerHTML =

    (index + 1)

    + " / "

    + cartesActuelles.length;



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



    if(mode === "random"){


        carteActuelle = carteAleatoire();


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



    if(mode === "random"){


        carteActuelle = carteAleatoire();


        afficherCarte();


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


function carteAleatoire(){



    const hasard = Math.floor(

        Math.random()

        *

        cartesActuelles.length

    );


    index = hasard;


    return cartesActuelles[hasard];


}




// ============================
// AUDIO
// ============================


function parler(texte, langue){



    let voix = new SpeechSynthesisUtterance(texte);


    voix.lang = langue;


    voix.rate = 0.8;


    speechSynthesis.speak(voix);


}





function prononcerItalien(){


    if(carteActuelle){


        parler(
            carteActuelle.it,
            "it-IT"
        );


    }


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




    if(event.code === "Space"){


        event.preventDefault();


        card.classList.toggle("flipped");


    }




    if(event.code === "ArrowUp"){



        if(card.classList.contains("flipped")){


            parler(
                carteActuelle.it,
                "it-IT"
            );


        }

        else{


            parler(
                carteActuelle.fr,
                "fr-FR"
            );


        }


    }



});





// ============================
// DÉMARRAGE
// ============================


window.onload = function(){


    afficherCategories();


};