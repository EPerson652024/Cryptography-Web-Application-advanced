document.getElementById("card_morse").style.display = "none"
document.getElementById("card_shift").style.display = "none"

function gettext_FromRat() {
    var plainText = document.getElementById("Text_input").value;
    var codingMechanism = document.getElementById("codingMechanism").value;
    console.log(plainText);
    console.log(codingMechanism);
    var result = "";
    if (codingMechanism === "caesar") {
        result = rot13(plainText);
    } else if (codingMechanism === "decaesar") {
        result = rot13(plainText);
    }
    document.getElementById("plaintext").textContent = plainText;
    document.getElementById("result").textContent = result;
    document.getElementById("Text_input").value = "";

}
function FromMorse() {
    var MorseplainText = document.getElementById("MorseText_input").value;
    var MorsecodingMechanism = document.getElementById("MorsecodingMechanism").value;
    console.log(MorseplainText);
    console.log(MorsecodingMechanism);
    var MorseResult = "";
    if (MorsecodingMechanism === "morse") {
        MorseResult = convertToMorse(MorseplainText);
    } else if (MorsecodingMechanism === "demorse") {
        MorseResult = decodeMorse(MorseplainText);
    }
    document.getElementById("Morseplaintext").textContent = MorseplainText;
    document.getElementById("Morseresult").textContent = MorseResult;
    document.getElementById("MorseText_input").value = "";

}

function FromShift() {
    var Shift_Text = document.getElementById("Shift_Text_input").value;
    var shift_choose = parseInt(document.getElementById("Shifting").value);
    console.log(Shift_Text);
    console.log(shift_choose);
    var Shift_Resulttext = caesarCipher(Shift_Text, shift_choose);
    document.getElementById("Shift_plaintext").textContent = Shift_Text;
    document.getElementById("Shift_result").textContent = Shift_Resulttext;
    document.getElementById("Shift_Text_input").value = "";

}
function rotshift() {
    var x = document.getElementById("card_rot13");
    var y = document.getElementById("card_morse");
    var z = document.getElementById("card_shift");
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "none";

}
function morseshift() {
    var x = document.getElementById("card_rot13");
    var y = document.getElementById("card_morse");
    var z = document.getElementById("card_shift");
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";

}
function shift() {
    var x = document.getElementById("card_rot13");
    var y = document.getElementById("card_morse");
    var z = document.getElementById("card_shift");
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "block";


}

function caesarCipher(message, shift) {
    
        let result = '';
        
        for (let i = 0; i < message.length; i++) {
          let char = message[i];
          
          if (char.match(/[a-z]/i)) {
            const code = message.charCodeAt(i);
            
            if (code >= 65 && code <= 90) {
              char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
              char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
          }
          
          result += char;
        }
        
        return result;
      }
// ROT13 Caesar Cipher implementation
const rot13 = (text) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
    return text.replace(/[a-z]/gi, letter => alpha[alpha.indexOf(letter) + 13]);
}

function decodeMorse(text) {
    var ref = {
        '.-': 'a',
        '-...': 'b',
        '-.-.': 'c',
        '-..': 'd',
        '.': 'e',
        '..-.': 'f',
        '--.': 'g',
        '....': 'h',
        '..': 'i',
        '.---': 'j',
        '-.-': 'k',
        '.-..': 'l',
        '--': 'm',
        '-.': 'n',
        '---': 'o',
        '.--.': 'p',
        '--.-': 'q',
        '.-.': 'r',
        '...': 's',
        '-': 't',
        '..-': 'u',
        '...-': 'v',
        '.--': 'w',
        '-..-': 'x',
        '-.--': 'y',
        '--..': 'z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
        "/": " ",
        "-.-.--": "!",
        ".-.-.-": ".",
        "--..--": ","
    };

    return text
        .split('   ')
        .map(
            a => a
                .split(' ')
                .map(
                    b => ref[b]
                ).join('')
        ).join(' ');
}

const morseCode = {
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    " ": "/",
    "!": "-.-.--",
    ".": ".-.-.-",
    ",": "--..--"
}
const convertToMorse = (str) => {
    return str.toLowerCase().split("").map(el => {
        return morseCode[el] ? morseCode[el] : el;
    }).join(" ");
};
var audioCtx;

function createAudioContext() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

document.getElementById("playButton").addEventListener("click", function () {
    if (!audioCtx) {
        createAudioContext();
    }
    var morseCode = document.getElementById("Morseresult").textContent;
    playMorseCode(morseCode);
});

function playMorseCode(morseCode) {
    var oscillator;
    var gainNode;
    var dotDuration = 100;
    var dashDuration = dotDuration * 3;
    var time = audioCtx.currentTime;

    for (var i = 0; i < morseCode.length; i++) {
        switch (morseCode[i]) {
            case '.':
                startTone(800, dotDuration);
                break;
            case '-':
                startTone(800, dashDuration);
                break;
            case ' ':
                time += dotDuration / 1000;
                break;
            case '/':
                time += dashDuration / 1000;
                break;
        }
    }

    function startTone(frequency, duration) {
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.setValueAtTime(frequency, time);
        gainNode.gain.setValueAtTime(1, time);
        oscillator.start(time);
        oscillator.stop(time + duration / 1000);

        time += duration / 1000;
    }
}

