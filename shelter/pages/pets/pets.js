var hamburger = document.querySelector(".hamburger");
var headerMenu = document.querySelector(".header_menu");
var backdrop = document.querySelector(".backdrop");
var headerLogo = document.querySelector(".header_logo");
const arrowRight = document.querySelector("#arrowRight");
const arrowRightTotal = document.querySelector("#arrowRightTotal");
const arrowLeft = document.querySelector("#arrowLeft");
const arrowLeftTotal = document.querySelector("#arrowLeftTotal");
var pageButton = document.querySelector(".button_arrow_active");

let pets = [];
let fullPetsList = [];
let currentPage = 0;
let countPets;

const request = new XMLHttpRequest();
request.open('GET', 'pets.json');
request.onload = () => {
    pets = JSON.parse(request.response);

    fullPetsList = (() => {
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = pets;
            for (let k = pets.length; k > 0; k--) {
                let randInd = Math.floor(Math.random() * k);
                const randElement = newPets.splice(randInd, 1)[0];
                newPets.push(randElement);
            }
            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();
    fullPetsList = sort863(fullPetsList);
    createPets(fullPetsList.slice(currentPage * countPets, (currentPage * countPets) + countPets));
    let cards = document.querySelectorAll('.our_friends_card');
    cards.forEach((element) => element.addEventListener('click', showPopup));
}
const createPets = (petsList) => {
    const elem = document.querySelector('.our_friends_list');
    elem.innerHTML += createElement(petsList);
}
const createElement = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<div class="our_friends_card">`;
        str += `<div class="our_friends_card_img"><img src="${petsList[i].img}" alt="photo of ${petsList[i].name}"></div>`;
        str += `<h6 class="our_friends_name">${petsList[i].name}</h6>`;
        str += `<button class="button_secondary">Learn more</button>`
        str += `</div>`;
    }
    return str;
}
request.send();

function sort863(list) {
    let length = list.length;
    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);
        for (let k = 0; k < 6; k++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[k].name && (ind !== k);
            });
            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + k;
                const which8OfList = Math.trunc(ind / 8);
                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);
                i -= 2;
                break;
            }
        }
    }
    return list;
}

function showPopup() {
    let currentPet;
    for (let i = 0; i < pets.length; i++)
        if (pets[i].name === this.querySelector('.our_friends_name').innerHTML)
            currentPet = pets[i];

    let str = '';
    str += `<div class="overlay"> <div class="modal">`;
    str += `<div class="modal_close_icon"><object data="../../assets/icons/close_icon.svg" type="image/svg+xml" width="12px" height="12px"></object></div>`;
    str += `<div class="our_friends_card_img"><img src="${currentPet.img}" alt="photo of ${currentPet.name}"></div>`;
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
    if (classes.contains('overlay') || classes.contains('modal_close_icon'))
        document.querySelector('.modal_close_icon').style.background = 'var(--color-primary-light)';
    else
        document.querySelector('.modal_close_icon').style.background = 'none';
}

function closePopup(e) {
    let classes = e.target.classList;
    if (classes.contains('overlay') || classes.contains('modal_close_icon')) {
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
    if (window.innerWidth >= 1280) countPets = 8;
    if (window.innerWidth < 1280 && window.innerWidth >= 768) countPets = 6;
    if (window.innerWidth < 768) countPets = 3;
    document.querySelector('.our_friends_list').innerHTML = '';
    changePets();
}


function changePets() {
    createPets(fullPetsList.slice(currentPage * countPets, (currentPage * countPets) + countPets));
    pageButton.innerHTML = `<h4>${currentPage + 1}</h4>`;
    cards = document.querySelectorAll('.our_friends_card');
    cards.forEach(element => element.addEventListener('click', showPopup));
}

function firstPage() {
    arrowLeft.classList.add("button_arrow_inactive");
    arrowLeft.classList.remove("button_arrow");
    arrowLeftTotal.classList.add("button_arrow_inactive");
    arrowLeftTotal.classList.remove("button_arrow");
    isRight();
}

function lastPage() {
    arrowRight.classList.add("button_arrow_inactive");
    arrowRight.classList.remove("button_arrow");
    arrowRightTotal.classList.add("button_arrow_inactive");
    arrowRightTotal.classList.remove("button_arrow");
    isLeft();
}

function isLeft() {
    arrowLeft.classList.add("button_arrow");
    arrowLeft.classList.remove("button_arrow_inactive");
    arrowLeftTotal.classList.add("button_arrow");
    arrowLeftTotal.classList.remove("button_arrow_inactive");
}

function isRight() {
    arrowRight.classList.add("button_arrow");
    arrowRight.classList.remove("button_arrow_inactive");
    arrowRightTotal.classList.add("button_arrow");
    arrowRightTotal.classList.remove("button_arrow_inactive");
}


function rightClick() {
    if (arrowRight.classList.contains("button_arrow_inactive")) return;
    document.querySelector('.our_friends_list').innerHTML = '';
    currentPage++;
    if (currentPage === fullPetsList.length / countPets - 1) lastPage();
    changePets();
    isLeft();
}

function rightClickTotal() {
    if (arrowRightTotal.classList.contains("button_arrow_inactive")) return;
    document.querySelector('.our_friends_list').innerHTML = '';
    currentPage = fullPetsList.length / countPets - 1;
    changePets();
    lastPage();
}

function leftClick() {
    if (arrowLeft.classList.contains("button_arrow_inactive")) return;
    document.querySelector('.our_friends_list').innerHTML = '';
    currentPage--;
    if (currentPage === 0) firstPage();
    changePets();
    isRight();
}

function leftClickTotal() {
    if (arrowLeftTotal.classList.contains("button_arrow_inactive")) return;
    document.querySelector('.our_friends_list').innerHTML = '';
    currentPage = 0;
    changePets();
    firstPage();
}


arrowRight.addEventListener('click', rightClick);
arrowRightTotal.addEventListener('click', rightClickTotal);
arrowLeft.addEventListener('click', leftClick);
arrowLeftTotal.addEventListener('click', leftClickTotal);

document.querySelector('body > header > div > span').addEventListener('click', showBurger);
backdrop.addEventListener('click', showBurger);

contentWidth();
window.addEventListener(`resize`, contentWidth);