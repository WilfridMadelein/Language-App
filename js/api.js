async function chargerConjugaisonWiktionary(verbe){


    const page = 
    "Conjugaison:français/" + verbe;



    const url =

    "https://fr.wiktionary.org/w/api.php"

    +

    "?origin=*"

    +

    "&action=parse"

    +

    "&page="

    +

    encodeURIComponent(page)

    +

    "&prop=wikitext"

    +

    "&format=json";



    const reponse = await fetch(url);



    if(!reponse.ok){

        throw new Error(
            "Erreur API Wiktionary"
        );

    }



    const donnees = await reponse.json();


    return donnees;


}