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

        const categorie = catalogue[id];


        const bouton = document.createElement("button");


        bouton.textContent = categorie.nom;


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
// CHARGEMENT D'UNE LISTE
// ============================


function chargerListe(categorie, liste, bouton){



    document
    .querySelectorAll("#sousCategories button")
    .forEach(b => {

        b.classList.remove("active");

    });



    bouton.classList.add("active");



    modeActuel = liste.mode;



    cartesActuelles = categorie.cartes.filter(
        liste.filtre
    );



    index = 0;



    if(modeActuel === "random"){

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



    front.textContent = carteActuelle.fr;


    back.textContent = carteActuelle.it;

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



    const position = Math.floor(

        Math.random()

        *

        cartesActuelles.length

    );


    index = position;


    return cartesActuelles[position];


}




// ============================
// AUDIO
// ============================


function parler(texte, langue){



    const voix = new SpeechSynthesisUtterance(texte);


    voix.lang = langue;


    voix.rate = 0.8;


    speechSynthesis.speak(voix);


}



function prononcerFrancais(){



    if(carteActuelle){



        parler(

            carteActuelle.fr,

            "fr-FR"

        );


    }


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