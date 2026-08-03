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

--------
        *mettre tes cartes*

    - dans google sheet > nouvel tab > mettre les données
    - copie/colle dans google doc > copie/colle dans les cartes
    - colle maintenant ceci :

--

    ],


    listes:{

*pour ordre*

        ordre:{

            nom:"*catégorie* - ordre",
            mode:"ordre",
            filtre: carte => true
        },

*pour random*

        random:{

            nom:"*catégorie" - random",
            mode:"random",
            filtre: carte => true
        }
    }
};

--------

    - js/data/catalogue > ajoute la catégorie
    - index.html > ajoute ceci devant catalogue :

--

<script src="js/data/*catégorie*.js"></script>

--------

AJOUTER LANGUE :

