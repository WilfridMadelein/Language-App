const directions = {

    nom:"Les directions",


    cartes:[


        {
            fr:"à gauche",
            it:"a sinistra"
        },


        {
            fr:"à droite",
            it:"a destra"
        },


        {
            fr:"tout droit",
            it:"dritto"
        },


        {
            fr:"devant / en face",
            it:"davanti"
        },


        {
            fr:"derrière",
            it:"dietro"
        },


        {
            fr:"tourne",
            it:"gira"
        },


        {
            fr:"avance",
            it:"avanza"
        },


        {
            fr:"recule",
            it:"indietreggia"
        },


        {
            fr:"arrête",
            it:"fermati"
        },


        {
            fr:"en dessous",
            it:"sotto"
        },


        {
            fr:"au-dessus",
            it:"sopra"
        },


        {
            fr:"dedans",
            it:"dentro"
        },


        {
            fr:"à côté de",
            it:"accanto a"
        }


    ],



    listes:{


        ordre:{

            nom:"Directions - ordre",
            mode:"ordre",
            filtre: carte => true

        },

        random:{

            nom:"Directions - random",
            mode:"random",
            filtre: carte => true

        }

    }

};