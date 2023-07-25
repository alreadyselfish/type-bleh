document.addEventListener('DOMContentLoaded', main);

let count = 5;
let target_text = document.querySelector('#hidden').innerHTML;
let intervalID = 0;

function render_text(){
    let target = target_text.split("");
    let para = document.querySelector('#target-text');
    target.forEach(element => {
        const ch = document.createElement('span');
        ch.innerHTML = element;
        para.appendChild(ch);
    });
}

function gameOver() {
    let target = target_text.split(" ");
    const typedText = document.getElementById('typer').value.trim();
    const typedWords = typedText.split(' ');
    let correctWords = 0;
    for (let i = 0; i < target.length; i++) {
        if (i>=typedWords.length){
            break;
        }
        if (target[i] === typedWords[i]) {
            correctWords++;
        }
    }
    let accuracy =  (correctWords/typedWords.length) * 100;
    // Display the results
    document.querySelector('.headcount').innerHTML = `Game Over!`;
    document.querySelector('#target-text').innerHTML = `Speed: <span class="correct size-inc mx-2">${correctWords} WPM</span> <br> Accuracy: ${accuracy}%`;
    document.querySelector('#typer').classList.add('none-dis');
}


function timer(){
    if (count == -60) {
        clearInterval(intervalID);
        gameOver();
        return;
    }   
    count -= 1;
    if (count >= 0){
        document.querySelector('#headcount-num').innerHTML = `${count}`;
    }
    if (count == 0){
        render_text();
        document.querySelector('#typer').disabled = false;
        document.querySelector('#typer').focus();
    }
    if(count <= 0) {
        document.querySelector('.headcount').innerHTML = `Time left: <span id="headcount-num" class="incorrect size-inc mx-2">${60+count}</span> seconds.`;
    }
}

function color_change() {
    let target = target_text.split('');
    let inp = document.getElementById('typer').value;
    let para = document.querySelector('#target-text');
    para.innerHTML = "";
    for (let ind = 0; ind<target.length; ind++){
        const ch = document.createElement('span');
        ch.innerHTML = target[ind];
        if (ind >= inp.length) {
            ch.classList.remove('incorrect');
            ch.classList.remove('correct');
        }
        else if (target[ind] != inp[ind]){
            ch.classList.add('incorrect');
            ch.classList.remove('correct');
        }
        else {
            ch.classList.add('correct');
            ch.classList.remove('incorrect');
        }
        para.appendChild(ch);
    }
}

function main(){
    intervalID = setInterval(timer, 1000);
    document.querySelector("#typer").addEventListener('input', color_change);
}