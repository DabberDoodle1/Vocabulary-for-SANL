// Get Relevant HTML nodes
const word = document.getElementById('word');
const choices = document.getElementsByClassName('choice');
const choiceText = document.getElementsByClassName('choicetext');
const selector = document.querySelector('.selector');

// Important variables
let data;
let words = [];
let array = [];
let d = 0;
let ok;

// Dropdown essentials
selector.closest('section').addEventListener('click', event => {
    switch(true){
        case event.target.matches('.selector'):
        case event.target.matches('i'):
            if(!document.querySelector('.menu').classList.contains('active')) document.querySelector('.menu').classList.add('active');
            else document.querySelector('.menu').classList.remove('active');
            break;
        case event.target.matches('.select'):
            selector.innerText = event.target.innerText;
            document.querySelector('.menu').classList.remove('active');
            break;
    }
});
// Select Between Words or Phrases
document.getElementById('start').addEventListener('click', e => {
    if(selector.innerText != 'Select Topic'){
        switch(selector.innerText){
            case 'Phrases':
                GetData('/src/phrase.json');
                break;
            case 'Words':
                GetData('/src/word.json');
                break;
        }
        e.target.closest('section').classList.add('none');
        document.querySelector('.display').classList.remove('none');
        document.querySelector('.container').classList.remove('none');
        [...choices].forEach(button => button.addEventListener('click', function(event){
            if(event.target.innerText !== ok) {
                event.target.closest('.choice').style.background = '#c51e3a';
                event.target.closest('.choice').style.color = '#fff';
            }
            for(let element of [...choiceText]){
                if(element.innerText === ok){
                    element.closest('.choice').style.background = '#45f800';
                    element.closest('.choice').style.color = '#fff';
                }
            }
            document.querySelector('body').style.pointerEvents = 'none';
            setTimeout(() => {
                [...choices].forEach(button => button.style.background = '#afafaf');
                [...choices].forEach(button => button.style.color = '#000');
                document.querySelector('body').style.pointerEvents = 'auto';
                Question();
            }, 1000);
        }));
    }
});

// Async function to retrieve JSON file
async function GetData(url) {
    await fetch(url)
        .then(response => response.json())
        .then(resolve => data = resolve)
        .catch(error => console.error(error));
    Question();
}

// Quiz function
function Question(){
    while(words.length < d + 1){
        let int = Math.floor(Math.random() * (Object.keys(data).length));
        if(!words.includes(Object.keys(data)[int])){
            words.push(Object.keys(data)[int]);
            array.push(Object.values(data)[int]);
            ok = Object.values(data)[int];
        }
    }
    word.innerText = words[d];
    d++;
    for(let i = array.length; i < 4;){
        let other = Object.values(data)[Math.floor(Math.random() * (Object.keys(data).length))];
        if(!array.includes(other)){
            array.push(other);
            i++;
        }
        array.sort(() => Math.random() - 0.5);
    }
    for(let item in array){
        [...choiceText][item].innerText = array[item];
    }
    array = [];
    if(words.length >= 10){
        words = [];
    }
}
