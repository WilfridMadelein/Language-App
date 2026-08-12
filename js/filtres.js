const filtres = {

    gram:{

        titre:"Grammaire",

        type:"checkbox",

        ordre:[
            "s",
            "pl",
            "inv"
        ],

        options:{

            s:"Singulier",
            pl:"Pluriel",
            inv:"Invariable"

        }

    },


    type:{

        titre:"Type",

        type:"checkbox",

        ordre:[
            "infinitif",
            "conju",
            "second",
            "fam",
            "gens"
        ],

        options:{

            infinitif:"Infinitif",
            conju:"Conjugaison",
            second:"2e sens",
            fam:"Famille",
            gens:"Gens"

        },

        selectionParDefaut:[
        "infinitif",
        "conju",
        "gens",
        "fam"
    ]

    },


    temps:{

        titre:"Temps",

        type:"checkbox",

        dependDe:"type",

        afficherSi:[
            "conju"
        ],

        ordre:[
            "présent",
            "passé",
            "futur"
        ],

        options:{

            "présent":"Présent",
            "passé":"Passé",
            "futur":"Futur"

        }

    },


    personne:{

        titre:"Personne",

        type:"checkbox",

        dependDe:"type",

        afficherSi:[
            "conju"
        ],

        ordre:[
            "1s",
            "2s",
            "3s",
            "1pl",
            "2pl",
            "3pl"
        ],

        options:{

            "1s":"1er p. - S",
            "2s":"2e p. - S",
            "3s":"3e p. - S",
            "1pl":"1er p. - PL",
            "2pl":"2e p. - PL",
            "3pl":"3e p. - PL"

        }

    }

};