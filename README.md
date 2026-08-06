# Language App

Projet d'application d'apprentissage des langues.



SAUVEGARDER :



    - ctr + s
    - git add .
    - git commit -m "*description modification*"
    - git push



AJOUTER CATÉGORIES :



    - js/data/*categorie*.js
    - colle ceci :

    --
        const *categorie* = {

        nom:"*ta catégorie*",


        cartes:[        
            *mettre tes cartes*
    
    --------

    - dans google sheet > nouvel tab > mettre les données
    - copie/colle dans google doc > copie/colle dans les cartes
    - colle maintenant ceci :

    --

        ],


        listes:{

            nom:"Directions",
            filtre: () => true

        },

    }
    };

    --------

    - js/data/catalogue > ajoute la catégorie
    - index.html > ajoute ceci devant catalogue :

    --

        <script src="js/data/*catégorie*.js"></script>

    --------



AJOUTER LANGUE :

    - Modifier les fichiers data (avec google sheet > copie/colle)
    - Dans index.html, trouver : <select id="langueSource"> et: <select id="langueCible"> , puis ajouter :

    --

        <option value="*initial*">*Langue*</option>

    --------

    - Dans app.js, trouver : const voix = { , puis ajouter :

    --

        *initial*:"*initial-pays*"

    ---------

    - Dans app.js, trouver : function analyserFiltres(cartes){ , puis ajouter : 

    --

        cle==="*initial*" ||
    
    ---------


AJOUTER FILTRE

    - Modifier les cartes (pour qu'ils aient le bon filtre)
    - ajoute les libellé en allant dans const libellesFiltres (app.js)

    --

        *filtre*:{
          *nomcarte1* :"*nomaffichage1*",
          *nomcarte2* :"*nomaffichage2*"
        }
    
    --------

    - ajouter affichage automatique dans afficherOption(disponibles) (app.js) :

    --

        // *nouveaufiltre*

        if(disponible.*filtre*){

            zone.innerHTML += `

            <div class="option-groupe">

            <h4>*Filtre Affichagé*</h4>

            `;
        
            disponibles.*filtre*.forEach(valeur=>{


                const texte =
                libellesFiltres.*filtre*[valeur] ?? valeur;

            ... (universel) ...

            }

    --------

    - dans let configurationActive , ajouter la mémoire du choix :

    --

        *filtre*:["*filtre1*","*filtre2*"]

    --------

    - dans // CHANGEMENT D'OPTION , ajouter la fonction :

    --

        function changerOption*filtre"(){

            (copie-colle ce qui existe en changant pour *filtre*)

    -------

    - dans rechargerCartes() , fait un nouveau if :

    --

        // FILTRE *NOUVEAU FILTRE*

        if(
        carte.*filtre* !== undefined
        &&
        !configurationActive.*filtre*.includes(carte.*filtre*)
        ){
        return false;
        }





