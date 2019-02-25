const DOGS_URL = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')
const dogContainer = document.querySelector('#dog-info')
const filterEl = document.querySelector('#good-dog-filter')
let filter = false

filterEl.addEventListener('click', () => {
    filterToggle()
    renderDogBar()
})

function filterToggle() {
    filter = !filter
    filterEl.innerText = `Filter good dogs: ${filter}`
}

function renderDogBar() {
    dogBar.innerHTML = ''
    fetchDogs()
        .then(writeDogsBar)
}

function fetchDogs() {
    return fetch(DOGS_URL)
        .then(res => res.json())
}

function fetchDog(dog) {
    return fetch(DOGS_URL + `/${dog.id}`)
        .then(res => res.json())
}

function writeDogBlock(dog) {
    const dogEl = document.createElement('div')
    dogEl.className = 'dog-block'
    dogEl.innerHTML = ` <p>${dog.name}</p>`
    dogBar.append(dogEl)
    dogEl.addEventListener('click', () => {
        showDog(dog)
    })
}

function writeDogsBar(dogs) {
    for (const dog of dogs) {
        if (dog.isGoodDog || filter === false)
            {writeDogBlock(dog)}
    }
}

function showDog(dog) {
    fetchDog(dog)
        .then(displayDog)
}

function dogToggle(dog) {
    const url = (DOGS_URL + `/${dog.id}`)
    dog.isGoodDog = !dog.isGoodDog
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }
    fetch(url, options)
        .then(res => res.json())
        .then(dog => displayDog(dog))
        .then(renderDogBar)
}

function displayDog(dog) {
    const dogEl = document.createElement('div')
    dogEl.innerHTML = `
        <img src='${dog.image}' >
         <h3>${dog.name}</h3>
        <button type="button"></button>
        `
    const btn = dogEl.querySelector('button')
    dog.isGoodDog ? btn.innerText = 'Bad Dog!' : btn.innerText = 'Good Dog!'
    dogContainer.innerHTML = ''
    dogContainer.append(dogEl)
    dogContainer.querySelector('button').addEventListener('click', () => {
        dogToggle(dog)
    })
}

renderDogBar()
