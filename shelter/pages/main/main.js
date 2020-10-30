var hamburger = document.querySelector(".hamburger");
var headerMenu = document.querySelector(".header_menu");
var backdrop = document.querySelector(".backdrop");
var headerLogo = document.querySelector(".header_logo");
var previousPage = document.querySelector("#previousPage");
var nextPage = document.querySelector("#nextPage");

let pets = [];
let currentPetsList = [];
let futurePetsList = [];
let countPets = 0;

const request = new XMLHttpRequest();
request.open('GET', 'pets.json');
request.onload = () => {
    pets = JSON.parse(request.response);

    currentPetsList = (() => {
        let tempArr = [];
        const newPets = pets;
        for (let k = pets.length; k > 0; k--) {
            let randInd = Math.floor(Math.random() * k);
            const randElement = newPets.splice(randInd, 1)[0];
            newPets.push(randElement);
        }
        tempArr = [...tempArr, ...newPets.slice(0, 3)];
        return tempArr;
    })();
    createPets(currentPetsList);
    let cards = document.querySelectorAll('.our_friends_card');
    cards.forEach((element) => element.addEventListener('click', showPopup));
}
const createPets = (petsList) => {
    const elem = document.querySelector('.our_friends_slider');
    elem.innerHTML += createElement(petsList);
    cards = document.querySelectorAll('.our_friends_card');
    cards.forEach(element => element.addEventListener('click', showPopup));
}
const createElement = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<div class="our_friends_card">`;
        str += `<div class="our_friends_card_img"><img src="${petsList[i].img}" alt="photo of ${petsList[i].name}"></div>`;
        str += `<h6 class="our_friends_name">${petsList[i].name}</h6>` ;
        str += `<button class="button_secondary">Learn more</button>`
        str += `</div>`;
    }
    return str;
}
request.send();


function makeFutureList() {
    pets = JSON.parse(request.response);
    let newPets = pets;
    for (let k = 0; k < newPets.length; k++) {
        for (let i = 0; i < currentPetsList.length; i++) {
            if (newPets[k].name === currentPetsList[i].name)
            newPets.splice(k, 1);
        }
    }
    futurePetsList = newPets.slice(0, countPets);
    document.querySelector('.our_friends_slider').innerHTML = '';
    currentPetsList = futurePetsList;
    createPets(currentPetsList);
    futurePetsList = [];
}

function showPopup () {
    let currentPet;
    for (let i = 0; i < pets.length; i++)
        if (pets[i].name === this.querySelector('.our_friends_name').innerHTML)
            currentPet = pets[i];
    
    let str = '';
    str += `<div class="overlay">`;
    str += `<div class="modal_close_icon"><object data="../../assets/icons/close_icon.svg" type="image/svg+xml" width="12px" height="12px"></object></div>` ;
    str += `<div class="modal"><div class="our_friends_card_img"><img src="${currentPet.img}" alt="photo of ${currentPet.name}"></div>`;
    str += `<div class="content"><h3>${currentPet.name}</h3>`;
    str += `<h4>${currentPet.type} - ${currentPet.breed}</h4>`;
    str += `<h5>${currentPet.description}</h5>`;
    str += `<ul type="disc"><li><span><b>Age: </b>${currentPet.age}</span></li>`;
    str += `<li><span><b>Inoculations: </b>${currentPet.inoculations}</span></li>`;
    str += `<li><span><b>Diseases: </b>${currentPet.diseases}</span></li>`;
    str += `<li><span><b>Parasites: </b>${currentPet.parasites}</span></li></ul>`;
    str += `</div></div></div>`;
    
    document.querySelector('.modal_window').innerHTML += str;
    document.body.style.overflow = 'hidden';
    document.querySelector('.overlay').addEventListener(`mouseover`, addCursor);
    document.querySelector('.overlay').addEventListener(`click`, closePopup);
}
function addCursor(e) {
    let classes = e.target.classList;
    if(classes.contains('overlay') || classes.contains('modal_close_icon'))
        document.querySelector('.modal_close_icon').style.background = 'var(--color-primary-light)';
    else 
        document.querySelector('.modal_close_icon').style.background = 'none';
}

function closePopup(e) {
    let classes = e.target.classList;
    if(classes.contains('overlay') || classes.contains('modal_close_icon')){
        document.querySelector('.overlay').remove();
        document.body.style.overflow = 'auto';
        cards = document.querySelectorAll('.our_friends_card');
        cards.forEach((element) => element.addEventListener('click', showPopup));
    }   
}

function showBurger() {
    hamburger.classList.toggle("show_close");
    headerMenu.classList.toggle("show_header_menu");
    headerLogo.classList.toggle("header_logo_burger");
    document.body.style.overflow === '' ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
}
function contentWidth() {
    if (window.innerWidth >= 1280) countPets = 3;
    if (window.innerWidth < 1280 && window.innerWidth >= 768) countPets = 2;
    if (window.innerWidth < 768) countPets = 1;
    document.querySelector('.our_friends_slider').innerHTML = '';
    createPets(currentPetsList.slice(0, countPets));
}


nextPage.addEventListener('click', makeFutureList);
previousPage.addEventListener('click', makeFutureList);

document.querySelector('body > div:nth-child(1) > header > div > span').addEventListener('click', showBurger);
backdrop.addEventListener('click', showBurger);

contentWidth();
window.addEventListener(`resize`, contentWidth);