//Riferimento al textarea del testo in chiaro
const chiaroText = document.getElementById('chiaro-text');
//Riferimento al textarea del verme
const vermeText = document.getElementById('verme-text');
//Riferimento al textarea del testo cirfrato
const cifratoText = document.getElementById('cifrato-text');

//Variabili che andranno a memorizzare testo che andrà poi messo nei textarea.
let chiaro, verme, cifrato = "";

const alphabet = [
    "A", "B", "C", "D", "E",
    "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
];

//Usata come indice per scegliere il car
let vermeIndex = 0;

//Aggiorna il testo contenuto nella variabile 'verme' con il testo appena digitato nel textarea corrispondente.
function updateVerme(){
    verme = vermeText.value;
}
//Aggiorna il testo contenuto nella variabile 'chiaro' con il testo appena digitato nel textarea corrispondente.
function updateChiaro(){
    chiaro = chiaroText.value;
}

/*Controlla se il carattere passato è un carattere compreso tra a - z (case insensitive).
Ritorna true in caso positivo, altrimenti ritorna false.*/
function validChar(char){
    return /[a-z]/gi.test(char);
}

//Controllo se la stirnga contiene caratteri illegali, se si stampo un errore dove indico quale
function validStr(str,textarea){
    for(let i = 0; i < str.length; i++){
        if(!validChar(str[i])){
            cifrato = "carattere non valido: '" + str[i] + "'";
            textarea.style.border = "4px solid red";
            return false;
        }
    }
    return true;
}

//Controlla se la stringa passata è vuota o con spazi all'interno.
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//Rimette a default lo stile dei bordi dei textarea.
function setDefault(){
    chiaroText.style.border = "none";
    vermeText.style.border = "none";
}

var tempStr = "";    //Stringa che conterrà temporaneamente l'index della lettera cifrata

function encoding(chiaro, verme){

    setDefault();                  //Rimetto i bordi con lo stile di default

    cifrato = "";                  //Ripulisco la variabile che contiene la cifratura

    if(!isBlank(verme)){

        chiaro = chiaro.toUpperCase()   //Metto in UpperCase il testo così da non fare differenza tra il testo maiuscolo e minuscolo
        verme = verme.toUpperCase()

        var vermeIndex = 0;             //Usata per percorrere i caratteri del 'verme'

        for(let i = 0; i < chiaro.length; i++, vermeIndex++){

            if(vermeIndex >= verme.length){     //Se l'index supera la lunghezza del verme allora resetto l'index a 0
                vermeIndex = 0;
            }

            tempStr = alphabet.indexOf(chiaro[i]) + alphabet.indexOf(verme[vermeIndex]); //Sommo l'index di un carattere in 'chiaro' a quello corrispondente in 'verme'

            while(tempStr > 25){
                tempStr -= 26;
            }

            cifrato += alphabet[tempStr];  //Assegno il carattere cifrato prendendolo dall'array all'indice appena calcolato

        }
        validStr(chiaro,chiaroText);    //Controllo se la stringa 'chiaro' è 'OK', in caso negativo stampo l'errore

        validStr(verme,vermeText);      //Controllo se la stringa 'verme' è 'OK', in caso negativo stampo l'errore

        cifratoText.value = cifrato;  //Assegno al textarea 'cifrato' il testo cifrato o un messaggio di errore

    }
}