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

            nom:"Nom",
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
    - ajoute les libellé en allant dans const Filtres (filtres.js)

    --

        *nouveau filtre*:{

        titre:"Nom",

        type:"checkbox",

        dependDe:"*autre filtre*",   *!!!si nécessaire seulement!!!*

        afficherSi:[
            "*option de autre filtre*"
        ],                           *!!! si "dependDe" utilisé!!!*

        ordre:[
            "*1er option*",
            "*2e option*",
            "*3e option*"
        ],

        options:{

            "*1er option*":"*Nom affiché 1*",
            "*2e option*":"*Nom affiché 2*",
            "*3e option*":"*Nom affiché 3*"

        }

        },
    --------

    - dans let configurationActive (app.js), ajouter la mémoire du choix :

    --

        *filtre*:["*option1*","*option2*",...]

    -------

    - dans fonction afficherOption (app.js), dans // AUTRES FILTRES , colle :

    --

        zone.innerHTML += afficherFiltre("*filtre*", disponibles);

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





