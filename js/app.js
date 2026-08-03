let mots=[];

let index=0;

let mode="liste";

let parametres={};

function afficherCategories(){


let zone=document.getElementById("categories");


zone.innerHTML="";


Object.keys(modules).forEach(id=>{


let bouton=document.createElement("button");


bouton.innerHTML=modules[id].nom;


bouton.onclick=()=>{

selectionnerModule(id);

};


zone.appendChild(bouton);


});


}



function selectionnerModule(id){


let zone=document.getElementById("sousCategories");


zone.innerHTML="";


let module=modules[id];



document.querySelectorAll(".menu button")
.forEach(b=>b.classList.remove("active"));



Object.keys(module.sousOnglets)
.forEach(sous=>{


let bouton=document.createElement("button");


bouton.innerHTML=
module.sousOnglets[sous].nom;



bouton.onclick=()=>{


chargerSousOnglet(module.sousOnglets[sous], bouton);


};



zone.appendChild(bouton);


});


}

function chargerSousOnglet(data,bouton){



document.querySelectorAll(".menu button")
.forEach(b=>b.classList.remove("active"));



bouton.classList.add("active");



mode=data.type;


parametres=data;



index=0;



if(mode==="liste"){


mots=data.mots;


}




if(mode==="random"){


genererNombreAleatoire();


}



if(mode==="randomListe"){


genererVetementAleatoire();


}



afficher();



}

function genererNombreAleatoire(){


let nombre=Math.floor(

Math.random()*(parametres.max-parametres.min+1)

)+parametres.min;



mots=[

[nombre.toString(),nombre.toString()]

];


}



function genererVetementAleatoire(){


let choix=

parametres.mots[

Math.floor(

Math.random()*parametres.mots.length

)

];


mots=[choix];


}

const card=document.getElementById("card");

const front=document.getElementById("front");

const back=document.getElementById("back");

const counter=document.getElementById("counter");





function chargerCategorie(nom){


mots=categories[nom];

index=0;


afficher();


}





function afficher(){


card.classList.add("no-animation");

card.classList.remove("flipped");


void card.offsetWidth;



setTimeout(()=>{

card.classList.remove("no-animation");

},50);



front.innerHTML=mots[index][0];

back.innerHTML=mots[index][1];


counter.innerHTML=(index+1)+" / "+mots.length;



}




card.onclick=function(){

if(mots.length>0){

card.classList.toggle("flipped");

}

};





function suivant(){


if(mode==="random" || mode==="randomListe"){


genererAleatoire();


afficher();

return;

}



if(index<mots.length-1){

index++;

afficher();

}


}

function genererAleatoire(){


if(mode==="random"){

genererNombreAleatoire();

}


if(mode==="randomListe"){

genererVetementAleatoire();

}



}


function precedent(){


if(mode==="random" || mode==="randomListe"){


genererAleatoire();


afficher();

return;

}



if(index>0){

index--;

afficher();

}


}




function parler(texte, langue){


let voix=new SpeechSynthesisUtterance(texte);

voix.lang=langue;

voix.rate=0.8;


speechSynthesis.speak(voix);


}





function prononcerFrancais(){

parler(mots[index][0],"fr-FR");

}



function prononcerItalien(){

parler(mots[index][1],"it-IT");

}






document.addEventListener("keydown",function(event){



if(event.code==="ArrowRight"){

suivant();

}




if(event.code==="ArrowLeft"){

precedent();

}




if(event.code==="Space"){

event.preventDefault();

card.classList.toggle("flipped");

}




if(event.code==="ArrowUp"){


if(card.classList.contains("flipped")){

prononcerItalien();

}

else{

prononcerFrancais();

}


}



});

window.onload=function(){

afficherCategories();

}