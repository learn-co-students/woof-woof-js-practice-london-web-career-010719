const DOGS_URL = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')
const dogContainer = document.querySelector('#dog-summary-container')
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
    dogBar.innerHTML = ""
    fetchDogs()
        .then(writeDogs)
}

function fetchDogs() {
    return fetch(DOGS_URL)
        .then(res => res.json())
}

function fetchDog(ID) {
    return fetch(DOGS_URL + `/${ID}`)
        .then(res => res.json())
}

function writeDog(dog) {
    const dogEl = document.createElement('div')
    dogEl.id = dog.id
    dogEl.className = 'dog-block'
    dogEl.innerHTML = ` <p id='${dog.id}' >${dog.name}</p>`
    dogBar.append(dogEl)
    dogEl.addEventListener('click', () => {
        showDog(dog)
    })
}

function writeDogs(dogs) {
    for (const dog of dogs) {
        if (dog.isGoodDog || filter === false)
            {writeDog(dog)}
    }
}

function showDog(dog) {
    fetchDog(dog.id)
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
}


function displayDog(dog) {
    const dogEl = document.createElement('div')
    dogEl.className = 'dog-show'
    dogEl.innerHTML = `
    <img src='${dog.image}' class="dog-image" >
    <p>${dog.name}</p>
  `
    if (!dog.isGoodDog) {
        dogEl.innerHTML += `<button type="button">Good Dog!</button>`} 
    else {
        dogEl.innerHTML += `<button type="button">Bad Dog!</button>`}

    dogContainer.innerHTML = ""
    dogContainer.append(dogEl)
    dogContainer.querySelector('button').addEventListener('click', () => {
        dogToggle(dog)
    })
}


renderDogBar()
