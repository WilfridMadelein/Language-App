// variables globales

let cartesActuelles = [];

let index = 0;

let mode = "ordre";

let carteActuelle = null;

let ordreRandom = [];
let indexRandom = 0;

let positionHistorique = -1;

let langueSource = "fr";

let langueCible = "it";

let configurationActive = {

    mode:"ordre",

    gram:["s","pl","inv"],

    type:[
        "infinitif",
        "conju",

        "fam",
        "gens",

        "boie",
        "prots",
        "plat",
        "vege",
        "ingr",
        "repa",
    ],

    temps:["présent","passé","futur"]

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

    arreterAudioBook();

    categorieActive = categorie;

    listeActive = liste;

    document
    .querySelectorAll("#sousCategories button")
    .forEach(b => {

        b.classList.remove("active");

    });



    bouton.classList.add("active");

    configurationActive.mode = liste.mode;

        Object.keys(filtres).forEach(idFiltre => {

    const filtre = filtres[idFiltre];

    if(filtre.selectionParDefaut){

        configurationActive[idFiltre] =
            [...filtre.selectionParDefaut];

    }

    });

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

rechargerCartes();

}

// ============================
// AFFICHAGE OPTIONS
// ============================


function afficherFiltre(idFiltre, disponibles){

    if(!disponibles[idFiltre]){
        return "";
    }

    const compteur = compterValeurs(idFiltre);

    let html = `

    <div class="option-groupe">

        <h4>${filtres[idFiltre].titre}</h4>

    `;

    disponibles[idFiltre].forEach(valeur=>{

        const texte =
        filtres[idFiltre].options[valeur] ?? valeur;

        const nombre =
        compteur[valeur] ?? 0;

        const estSelectionne =
        filtres[idFiltre].selectionParDefaut
        ? filtres[idFiltre].selectionParDefaut.includes(valeur)
        : true;

        html += `

        <label>

            <input
                type="checkbox"
                class="option-filtre"
                data-filtre="${idFiltre}"
                value="${valeur}"
                ${estSelectionne ? "checked" : ""}
                ${nombre===0 ? "disabled" : ""}
                onchange="changerOptionFiltre(this)">

            <span class="option-valeur-texte">

                ${texte} (${nombre})

            </span>

        </label>

        `;

    });

    html += `</div>`;

    return html;

}

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



// AUTRES FILTRES

zone.innerHTML += afficherFiltre("gram", disponibles);
zone.innerHTML += afficherFiltre("type", disponibles);
zone.innerHTML += afficherFiltre("temps", disponibles);



}

// ============================
// CHANGEMENT D'OPTION
// ============================
function changerOptionFiltre(input){

    const idFiltre = input.dataset.filtre;

    // lire les cases cochées

    const cases =
    document.querySelectorAll(
        `.option-filtre[data-filtre="${idFiltre}"]:checked`
    );


    const nouvelleSelection =
    Array.from(cases).map(
        checkbox => checkbox.value
    );

    // teste si la nouvelle sélection est valide

    const cartesTest =
    appliquerFiltre(
        idFiltre,
        nouvelleSelection
    );

    // aucune carte, refuse le changement

    if(cartesTest.length === 0){

        alert(
            "Impossible : aucune carte avec cette sélection."
        );
    

    document
        .querySelectorAll(
            `.option-filtre[data-filtre="${idFiltre}"]`
        )
        .forEach(c=>{

            if(
            configurationActive[idFiltre]
            .includes(c.value)
            ){

                c.checked=true;

            }
            else{

                c.checked=false;

            }

        });


        return;

    }

    // accepte changement   

    configurationActive[idFiltre] =
    nouvelleSelection;

     rechargerCartes();

}
    

function changerOptionMode(mode){

    configurationActive.mode = mode;


    console.log(
        "Mode choisi :",
        configurationActive.mode
    );

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

    arreterAudioBook();

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


    // FILTRE TYPE

    if(
        carte.type !== undefined
        &&
        !configurationActive.type.includes(carte.type)
    ){
        return false;
    }

    // FILTRE TEMPS

    if(
        carte.temps !== undefined
        &&
        !configurationActive.temps.includes(carte.temps)
    ){
        return false;
    }






    return true;



});


    index=0;


    if(configurationActive.mode === "random"){

    creerOrdreRandom();

    carteActuelle =
    ordreRandom[indexRandom];

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
                cle==="es" ||
                cle==="la" ||
                cle==="el"
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

    if(filtres[cle]?.ordre){

        filtres[cle].sort((a,b)=>{

            return filtres[cle].ordre.indexOf(a)
                 - filtres[cle].ordre.indexOf(b);

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

    counter.textContent =
        (indexRandom + 1)
        + " / "
        + ordreRandom.length;

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

    if(indexRandom < ordreRandom.length - 1){

        indexRandom++;

        carteActuelle =
        ordreRandom[indexRandom];

        afficherCarte();

    }

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

    if(indexRandom > 0){

        indexRandom--;

        carteActuelle =
        ordreRandom[indexRandom];

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

function premiereCarte(){


    if(configurationActive.mode === "random"){

        indexRandom = 0;

        carteActuelle =
            ordreRandom[indexRandom];

    }
    else{

        index = 0;

        carteActuelle =
            cartesActuelles[index];

    }

    afficherCarte();

}



// ============================
// RANDOM UNIVERSEL
// ============================


function creerOrdreRandom(){

    ordreRandom = [...cartesActuelles];


    for(let i = ordreRandom.length - 1; i > 0; i--){

        const j = Math.floor(
            Math.random() * (i + 1)
        );


        [
            ordreRandom[i],
            ordreRandom[j]
        ] = [
            ordreRandom[j],
            ordreRandom[i]
        ];

    }


    indexRandom = 0;

}



// ============================
// AUDIO
// ============================


function parler(texte, langue){

 speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(texte);


    utterance.lang = langue;

    utterance.rate = 0.8;

    const voixDisponibles = speechSynthesis.getVoices();


    const voixChoisie = voixDisponibles.find(voix =>
    voix.lang === langue ||
    voix.lang.startsWith(langue.split("-")[0])
);

    if(voixChoisie){

        utterance.voice = voixChoisie;
    }

    speechSynthesis.speak(utterance);

}


const voix = {

    fr:"fr-FR",
    en:"en-US",
    it:"it-IT",
    de:"de-CH",
    es:"es-ES",
    la:"la",
    el:"el-GR"

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
// Audio Book
// ============================

let audioBookEnCours = false;
let audioBookEnPause = false;
let audioBookIndex = 0;
let audioBookAnnulation = 0;
let cartesAudioBook = [];


async function demarrerAudioBook(){

    console.log("Audio Book démarré");

    // Si un Audio Book est déjà en cours, on l'annule
    if(audioBookEnCours){

        annulerAudioBook();

    }

    // Nouvelle session
    audioBookAnnulation++;

    audioBookAnnulation++;

    const session =
        audioBookAnnulation;

    audioBookEnCours = true;
    audioBookEnPause = false;
    audioBookIndex = 0;

    // CRÉER LA LISTE DE L'AUDIO BOOK

    if(configurationActive.mode === "random"){

        console.log("Ordre Random actuel :", ordreRandom);

    cartesAudioBook =
        [...ordreRandom];
}

else{

    cartesAudioBook =
        [...cartesActuelles];
}


    // BOUTON PAUSE

    document.getElementById(
        "boutonPauseAudioBook"
    ).disabled = false;

    document.getElementById(
        "boutonPauseAudioBook"
    ).textContent = "⏸";

    speechSynthesis.cancel();


    // PHRASE DE DÉBUT
    

    await parlerAudioBook(
        "Vous avez sélectionné le mode Audio Book",
        "fr"
    );


    if(session !== audioBookAnnulation){
        return;
    }


    // Pause de 3 secondes
    const pauseDebut =
        await attendreAudioBook(
            3000,
            session
        );

    if(!pauseDebut){
        return;
    }


    // Parcours de toutes les cartes sélectionnées
    for(
        audioBookIndex = 0;
        audioBookIndex < cartesActuelles.length;
        audioBookIndex++
    ){

        if(session !== audioBookAnnulation){
            return;
        }


        const carte =
            cartesAudioBook[audioBookIndex];


        // LANGUE SOURCE
        await parlerAudioBook(
            carte[langueSource],
            langueSource
        );


        if(session !== audioBookAnnulation){
            return;
        }


        const pauseSource =
            await attendreAudioBook(
                3000,
                session
            );

        if(!pauseSource){
            return;
        }


        // LANGUE CIBLE
        await parlerAudioBook(
            carte[langueCible],
            langueCible
        );


        if(session !== audioBookAnnulation){
            return;
        }


        const pauseCible =
            await attendreAudioBook(
                3000,
                session
            );

        if(!pauseCible){
            return;
        }

    }


    // Vérifie encore une fois avant la phrase finale
    if(session !== audioBookAnnulation){
        return;
    }


    // Phrase de fin TOUJOURS en français
    await parlerAudioBook(
        "Félicitations ! Vous avez terminé votre Audio Book. Youpi!",
        "fr"
    );


    audioBookEnCours = false;
    audioBookEnPause = false;

    document.getElementById(
        "boutonPauseAudioBook"
    ).disabled = true;

}

// temps de pause entre les cartes 

function attendreAudioBook(duree, session){

    return new Promise(resolve => {

        setTimeout(() => {

            if(session !== audioBookAnnulation){

                resolve(false);
                return;

            }

            resolve(true);

        }, duree);

    });

}

function annulerAudioBook(){

    if(!audioBookEnCours){

        return;

    }

    audioBookAnnulation++;

    audioBookEnCours = false;
    audioBookEnPause = false;

    speechSynthesis.cancel();

    console.log("Audio Book annulé");

}

function arreterAudioBook(){

    // Invalide immédiatement l'Audio Book actuel
    audioBookAnnulation++;

    audioBookEnCours = false;
    audioBookEnPause = false;

    speechSynthesis.cancel();

    const bouton =
        document.getElementById(
            "boutonPauseAudioBook"
        );

    if(bouton){

        bouton.disabled = true;
        bouton.textContent = "";

    }

    console.log("Audio Book arrêté");

}


// parler audio book

function parlerAudioBook(texte, langue){

    return new Promise(resolve => {

        const utterance =
        new SpeechSynthesisUtterance(texte);


        utterance.lang = langue;


        utterance.rate = 0.8;


        const voixDisponibles =
        speechSynthesis.getVoices();


        const voixChoisie =
        voixDisponibles.find(voix =>
            voix.lang === langue ||
            voix.lang.startsWith(
                langue.split("-")[0]
            )
        );


        if(voixChoisie){

            utterance.voice = voixChoisie;

        }


        utterance.onend = function(){

            resolve(true);

        };

        utterance.onerror = function(){

            resolve(false);

        };


        speechSynthesis.speak(utterance);

    });

}

function pauseReprendreAudioBook(){

    if(!audioBookEnCours){

        return;

    }


    if(audioBookEnPause){

        speechSynthesis.resume();

        audioBookEnPause = false;


        document.getElementById(
            "boutonPauseAudioBook"
        ).textContent = "⏸";


    }
    else{

        speechSynthesis.pause();

        audioBookEnPause = true;


        document.getElementById(
            "boutonPauseAudioBook"
        ).textContent = "▶";

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

