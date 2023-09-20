let id;
let a = 0;
let time = 5
let posO = 0
let posV = 0
let posX = 370
let posY = 190
let immagini = [
    "./img/invader1.png",
    "./img/invader1.png",
    "./img/invader2.png",
    "./img/invader2.png"
]

function start() {
    document.getElementById("munizione").style.left = posY + "px"
    document.getElementById("munizione").style.top = posX + "px"
    document.getElementById("quadrato").innerHTML = "<img src = " + immagini[0] + " >"
}
function scambia() {

    document.getElementById("quadrato").innerHTML = "<img src = " + immagini[a] + " >"
    a++
    if (a >= 4) {
        a = 0
    }
}
function parti() {


    const elem = document.getElementById("quadrato");

    elem.style.top = 0 + "px";
    elem.style.left = 0 + "px";
    document.getElementById("scritta").innerHTML = "";
    animazione()
}
function animazione() {

    
    let a = 0
    const elem = document.getElementById("quadrato");
    id = setInterval(movimentoOrizzontale, time);

    function movimentoOrizzontale() {
        if (posO == 350) {
            clearInterval(id);
            movimentoVerticale()

        } else {
            posO++;
            elem.style.left = posO + "px";
            scambia()
        }
    }
    function movimentoIndietro() {
        if (posO == 0) {
            clearInterval(id);
            movimentoVerticale()
        }
        else {
            posO--;
            elem.style.left = posO + "px";
            scambia()
        }
    }

    function movimentoVerticale() {
        setTimeout(() => {
            if (posV == 350 && posO == 0) {
                clearTimeout();
                fine(1)
            } else {

                if (a == 50) {
                    if (elem.offsetLeft == 0) {
                        id = setInterval(movimentoOrizzontale, time);
                    }
                    else {
                        id = setInterval(movimentoIndietro, time);
                    }
                    a = 0;
                    clearTimeout();
                } else {
                    a++;
                    posV++;
                    elem.style.top = posV + "px";
                    scambia()
                    movimentoVerticale()
                }
            }

        }, time)
    }

}
function fine(a) {
    if(a == 1){
        document.getElementById("scritta").innerHTML = "GAME OVER"
    }else if(a == 2){
        
        document.getElementById("scritta").innerHTML = "WIN"
    }
    
}
function spara(){
    
    document.getElementById("munizione").style.visibility = "inherit"
    posX = 370
    posY = 190
    document.getElementById("munizione").style.left = posY + "px"
    document.getElementById("munizione").style.top = posX + "px"
    movimentoMunizione()

}
function movimentoMunizione(){
    setInterval(()=>{
        if (document.getElementById("munizione").style.top == 0 + "px") {
            //console.log("top")
            document.getElementById("munizione").style.visibility = "hidden"
            clearInterval()
        }else{
            posX--;
            document.getElementById("munizione").style.top = posX + "px"
            if(colpito()){
                clearInterval(id)
                document.getElementById("quadrato").innerHTML = ""
                document.getElementById("munizione").style.visibility = "hidden"
                fine(2)
            }
        }
    }, time)
}

function colpito(){
    let colpito = false
    if(posV + 50 == posX){
        if(posO < posY && (posO + 50) > (posY + 20)){
            colpito = true
        }
    }

    return colpito
}
