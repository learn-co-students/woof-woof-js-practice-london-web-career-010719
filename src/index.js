//// GLOBAL VARIABLES //// 
const BASEURL = 'http://localhost:3000/pups/'

//// ATTACH LISTENERS AND SET INITAL STATE ////
document.addEventListener('DOMContentLoaded', () => {
    getAllDogs()
        .then(dogs => drawDogsBar(dogs))
})
document.querySelector('#good-dog-filter').addEventListener('click', () => {
    toggleGoodDogs()
})

//// EVENT ACTIONS ////
function showDog(dog){
    clearNode(document.querySelector('#dog-info'))
    drawDogCard(dog)
}
function toggleGoodDogs(){
    const toggleDogBtnEl = document.querySelector('#good-dog-filter')
    clearNode(document.querySelector('#dog-bar'))
    if (toggleDogBtnEl.innerText === 'Filter good dogs: OFF ❌'){
        toggleDogBtnEl.innerText = 'Filter good dogs: ON ✅'
        getAllDogs()
            .then(dogs => filterGoodDogs(dogs))
            .then(goodDogs => drawDogsBar(goodDogs))
    } else {
        toggleDogBtnEl.innerText = 'Filter good dogs: OFF ❌'
        getAllDogs()
            .then(dogs => drawDogsBar(dogs))
    }
}

//// HELPER FUNCTIONS ////
//returns only good dogs!
function filterGoodDogs(dogs){
    return dogs.filter(dog => dog.isGoodDog)
}
function createDogButton(dog) {
    const dogButtonEl = document.createElement('button')
    let dogButtonText = ""
    dog.isGoodDog ? dogButtonText = 'Make Bad Dog! ❌🐶' : dogButtonText = 'Make Good Dog! ✅🐶'
    dogButtonEl.innerText = dogButtonText

    dogButtonEl.addEventListener('click', () => {
        toggleBehaviour(dog)
        let newDogButtonText
        dog.isGoodDog ? newDogButtonText = 'Make Bad Dog! ❌🐶' : newDogButtonText = 'Make Good Dog! ✅🐶'
        dogButtonEl.innerHTML = newDogButtonText
    })
    return dogButtonEl
}

//// DRAW FUNCTIONS ////
function drawDogBar(dog){
    const dogBarEl = document.querySelector('#dog-bar')
    const dogSpanEl = document.createElement('span')
    dogSpanEl.innerText = dog.name
    dogSpanEl.addEventListener('click', () => {
        showDog(dog)
    })
    dogBarEl.appendChild(dogSpanEl)
}
function drawDogsBar(dogs){
    dogs.forEach(dog => drawDogBar(dog))
}
function drawDogCard(dog){
    const dogInfoEl = document.querySelector('#dog-info')
    const dogCardEl = document.createElement('div')
    let dogButtonText = ""
    dog.isGoodDog ? dogButtonText = 'Good Dog!' : dogButtonText = 'Bad Dog!'
    dogCardEl.innerHTML = `
    <img src="${dog.image}" alt="photo of ${dog.name}"/>
    <h2>${dog.name}</h2>`
    dogCardEl.appendChild(createDogButton(dog))
    dogInfoEl.appendChild(dogCardEl)
}
function clearNode(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild)
    }
}
//// API CALLS (all return a promise) ////
function getAllDogs() {
    return fetch(BASEURL)
        .then(resp => resp.json())
}
function toggleBehaviour(dog){
    dog.isGoodDog = !dog.isGoodDog
    const URL = BASEURL + dog.id
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }
    return fetch(URL, options)
        .then(resp => resp.json())
}