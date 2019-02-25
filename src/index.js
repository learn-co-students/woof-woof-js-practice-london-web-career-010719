const PUPS_URL = "http://localhost:3000/pups"
const dogBar = document.querySelector("#dog-bar")
const filterBtn = document.querySelector("#good-dog-filter")
const dogContainer = document.querySelector("#dog-summary-container")


// create dog btn
const createDogBtn = document.createElement("button")
createDogBtn.innerText = "Create New Dog"
createDogBtn.id = "new-dog-create"
document.querySelector("#filter-div").appendChild(createDogBtn)

createDogBtn.addEventListener("click", () => renderForm("Create"))

function renderForm(type, dog = {}) {
    document.getElementById("dog-info").innerHTML = `
    <h1>${type} New Dog 🐶</h1>
    <form id="dog-form">
    <input type="hidden" id="dog-id" name="id" value="${dog.id || ''}">
    <label for="dog-name">Name: </label>
    <input type="text" id="dog-name" name="name" value="${dog.name || ''}"><br><br>
    <label for="dog-img">Image URL: </label>
    <input type="text" id="dog-img" name="img" value="${dog.image || ''}"><br><br>
    <label for="dog-isGoodDog">Is he/she a good dog?</label>
    <input type="checkbox" id="dog-isGoodDog" name="isGoodDog" ${dog.isGoodDog ? 'checked' : ''}><br><br>
    <input type="submit">    
    </form>`

    if (type === "Edit") {
        document.querySelector("#dog-form").addEventListener("submit", edit)
    } else {
        document.querySelector("#dog-form").addEventListener("submit", createNewDog)
    }
}

function createNewDog(e) {
    e.preventDefault()
    const options = {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            "name": e.target.name.value,
            "isGoodDog": e.target.isGoodDog.checked,
            "image": e.target.img.value,
            "like": 0
        })
    }
    return fetch(PUPS_URL, options)
    .then(res => res.json())
    .then(puppy => {
        initPupsBar()        
        new Puppy(puppy.id, puppy.name, puppy.isGoodDog, puppy.image, puppy.like)
    })
}

function edit(e) {
    e.preventDefault()
    const id = e.target.id.value
    const options = {
        method: "PATCH", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            "name": e.target.name.value,
            "isGoodDog": e.target.isGoodDog.checked,
            "image": e.target.img.value
        })
    }
    return fetch(`http://localhost:3000/pups/${id}`, options)
    .then(res => res.json())
    .then(puppy => {
        initPupsBar()        
        new Puppy(puppy.id, puppy.name, puppy.isGoodDog, puppy.image)
    })
}

// get dogs info from server
function getPups() {
    return fetch(PUPS_URL)
    .then(res => res.json())
}

function addPupsToBar (pups) {
    dogBar.innerHTML = ""
     pups.forEach(puppy => {
        const span = document.createElement("span")
        span.innerText = puppy.name
        span.id = `span-${puppy.id}`
        document.querySelector("#dog-bar").appendChild(span)
    })
}

function initPupsBar() {
    getPups()
    .then(res => addPupsToBar(res))
}

function createPupsInstance(e) {
    return getPups()
    .then(pups => {
        return pups.find(puppy => e.target.id === `span-${puppy.id}`) 
    })
    .then(puppy => {
        puppy.like ? puppy.like : puppy.like = 0
        new Puppy(puppy.id, puppy.name, puppy.isGoodDog, puppy.image, puppy.like)
    })
}

function toggleFilter(e) {
    getPups()
    .then(pups => {
        if (e.target.innerText === "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
            let goodDogs = pups.filter(puppy => puppy.isGoodDog === true)
            addPupsToBar(goodDogs)
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            addPupsToBar(pups)
        }
    })
}   

function init() {
    initPupsBar()
    dogBar.addEventListener("click", createPupsInstance)
    filterBtn.addEventListener("click", toggleFilter)
}

init()