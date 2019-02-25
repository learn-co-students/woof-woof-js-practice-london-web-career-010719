const PUPS_URL = "http://localhost:3000/pups"
const dogBar = document.querySelector("#dog-bar")
const dogContainer = document.querySelector("#dog-summary-container")
const filterBtn = document.querySelector("#good-dog-filter")



function getPups() {
    return fetch(PUPS_URL)
    .then(res => res.json())
}

function addPupsToBar (pups) {
    document.querySelector("#dog-bar").innerHTML = ""
     pups.forEach(puppy => {
        const span = document.createElement("span")
        span.innerText = puppy.name
        span.id = `span-${puppy.id}`
        document.querySelector("#dog-bar").appendChild(span)
    })
}

function initPupsBar() {
    getPups()
    .then (addPupsToBar)
}

function getPuppyInfo(e) {
    return getPups()
    .then(pups => {
        return pups.find(puppy => e.target.id === `span-${puppy.id}`)
    })
    .then(puppy => showPuppy(puppy))
}

function showPuppy(puppy) {
    // console.log(puppy)

    const dogInfo = document.getElementById("dog-info")

    let dogImg = puppy.image
    let dogName = puppy.name
    let isGoodDog = puppy.isGoodDog ? "Good Dog!" : "Bad Dog!"
    
    dogInfo.innerHTML = `
    <img src="${dogImg}" />
    <h2>${dogName}</h2>
    <button class="good-dog-btn" id=${puppy.id}>${isGoodDog}</button>`
    
    dogContainer.appendChild(dogInfo)

    document.querySelector(".good-dog-btn").addEventListener("click", toggleGoodDogBtn)
}

function toggleGoodDogBtn(e) {
    // console.log(e)
    const id = e.target.id

    if (e.target.textContent === "Bad Dog!") {
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isGoodDog: true
            })
        }
        fetch(`http://localhost:3000/pups/${id}`, options)
        e.target.textContent = "Good Dog!"
    } else {
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isGoodDog: false
            })
        }
        fetch(`http://localhost:3000/pups/${id}`, options)
        e.target.textContent = "Bad Dog!"
    }
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
    dogBar.addEventListener("click", getPuppyInfo)
    filterBtn.addEventListener("click", toggleFilter)
}

init()