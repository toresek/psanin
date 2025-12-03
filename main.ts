/*
Zadávané písmeno na displeji se zvyšuje tlačítkem A o jeden znak v abecedě a tl. AB o pět znaků
při překročení hodnoty kódu pro "Z" se vrací volba na "A"
tlačítkem B se přidává k již zadanému textu, který se ihned ukáže na displeji
mazat poslední písmeno se dá zatřepáním microbitem
napsaný text se vyšle rádiem na kanále 15 i se zobrazením na vlastním displeji tl. LOGO
 */



// při zatřepání smazat v textiku poslední písmeno
input.onGesture(Gesture.Shake, function () {
    textik = textik.substr(0, textik.length - 1)
    basic.clearScreen()
    basic.showString(textik)
    basic.pause(1000)
    kod = 64
    basic.showString("A")
})
// posun kódu písmene o kolik a jeho zobrazení
function prirustek (kolik: number) {
    kod += kolik
    // návrat zvoleného písmene na "A" při překročení kódu pro "Z"
    if (kod > 90) {
        kod = 64
    }
    if (kod==64) {
        znak=" "
    }
    else {
        znak = String.fromCharCode(kod)
    }
    basic.clearScreen()
    basic.showString(znak)
}

// posun písmene o 1 znak
input.onButtonPressed(Button.A, function () {
    prirustek(1)
})

// posun písmene o 5 znaků
input.onButtonPressed(Button.AB, function () {
    prirustek(5)
})

// odeslání napsaného textu
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.clearScreen()
    basic.showString(textik)
    radio.sendString(textik)
    basic.pause(1000)
    basic.showString(" ")
})

// výpis přijaté radiové zprávy
radio.onReceivedString(function (receivedString) {
    basic.clearScreen()
    basic.pause(1000)
    basic.showString(receivedString)
    basic.pause(1000)
    basic.showString(" ")
})

// přidání písmene k řádku textu
input.onButtonPressed(Button.B, function () {
    if (znak < "A" || znak > "Z") {
         znak = " "
    }         
    textik = "" + textik + znak
    basic.clearScreen()
    basic.showString(textik)
    basic.pause(500)
    kod = 64
    basic.showString(" ")
    znak = " "    
})

// Start programu
let textik = ""
let kod = 0
let znak = ""
kod = 64
radio.setGroup(15)
basic.showString("S")
radio.sendString("S")
basic.pause(1000)