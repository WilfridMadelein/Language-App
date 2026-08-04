async function chargerPageWiktionary(mot){

    const url =
    "https://fr.wiktionary.org/w/api.php"
    +
    "?origin=*"
    +
    "&action=parse"
    +
    "&page="
    +
    encodeURIComponent(mot)
    +
    "&prop=wikitext"
    +
    "&format=json";



    const reponse = await fetch(url);

    const donnees = await reponse.json();

    return donnees;

}