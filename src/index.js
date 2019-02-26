const url = "http://localhost:3001/pups"

const dogImg = document.querySelector("img")
const dogName = document.querySelector('h2')
state = {
  filter: true
}


// =============================================================================
// populate page at start
getPuppies()
  .then(addPuppies)


function getPuppies(){
  return fetch(url)
    .then (resp =>resp.json())
}


function addPuppies(puppies){
  const localPuppies = puppies
  localPuppies.forEach(puppy =>{
    addPuppy(puppy)
  })
}
// =============================================================================



// fetch individual puppy information
function addPuppy(puppy){
  const dogBar = document.querySelector('#dog-bar')
  const puppyEl = document.createElement('span')
  puppyEl.innerText = puppy.name
  dogBar.appendChild(puppyEl)
  puppyEl.addEventListener("click", event =>{
    findPuppy(puppy)
  })
}

function findPuppy(puppy){
  getPuppyInfo(puppy.id)
}

function getPuppyInfo(id){
  puppyURL = `http://localhost:3001/pups/${id}`
  return fetch(puppyURL)
    .then (resp =>resp.json())
      .then(parsePuppy);
    }


function parsePuppy(puppy){
  const localPuppy = puppy
  addPuppyInfo(localPuppy);
}

function addPuppyInfo(localPuppy){
  dogImg.src = localPuppy.image
  dogName.innerText = localPuppy.name
  const dogBtn = document.createElement("button")
  dogBtn.className = "show-btn"
  dogBtn.id = "dog-btn"
  dogName.appendChild(dogBtn)

localPuppy.isGoodDog ? dogBtn.innerText = "Good Dog!" : dogBtn.innerText = "Bad Dog!"
  // functionality to assign good Dog/Bad Dog
  dogBtn.addEventListener("click", event => {
    toggleBehaviour(localPuppy)
  })
}


// =============================================================================


// functionality to assign good Dog/Bad Dog
function toggleBehaviour(puppy){
    const puppyURL = `http://localhost:3001/pups/${puppy.id}`
    const dogBtn = document.querySelector('#dog-btn')
    let behaviour = ""

    if(dogBtn.innerText === "Good Dog!"){
      behaviour = false
      dogBtn.innerText = "Bad Dog!"
    }else {
      behaviour = true
      dogBtn.innerText = "Good Dog!"
    }



const options ={
    method: "PATCH",
    headers: { "Content-type": 'application/json'},
    body: JSON.stringify({
      "isGoodDog": behaviour
    })
  }
  return fetch(puppyURL, options)
  		.then(resp => resp.json())
}



// =============================================================================

// clear all dogs from the page
document.addEventListener("keydown", event =>{
  if(event.key ==="Escape"){
    clearDogs()
  }
})

function clearDogs(){
  const dogBtn = document.querySelector('#dog-btn')
  dogImg.src = ""
  dogName.innerText = ""
  dogBtn.className = "hide-btn"
}
// =============================================================================

// filtering functionality

document.addEventListener('click', event => {
  if (event.target.id === 'good-dog-filter'){

    const filterBtn = document.querySelector('#good-dog-filter')

    if (filterBtn.innerText === "Filter good dogs: OFF"){
      clearSpan()
  filterBtn.innerText = "Filter good dogs: ON"
      getFilteredPuppies()
        .then(addFilteredPuppies)

    } else {

      clearSpan()
    filterBtn.innerText = "Filter good dogs: OFF"
      getPuppies()
        .then(addPuppies)
    }
  }
})

function getFilteredPuppies(){
  return fetch(url)
    .then (resp =>resp.json())
}


function addFilteredPuppies(puppies){
  const localPuppies = puppies
  const filteredPuppies = localPuppies.filter(puppy => puppy.isGoodDog === true)
  filteredPuppies.forEach(puppy =>{
    addPuppy(puppy)
  })
}


function clearSpan(){
  dogBar = document.querySelector("#dog-bar")
  while( dogBar.firstChild ){
dogBar.removeChild( dogBar.firstChild );
  }
}

// =============================================================================
//
