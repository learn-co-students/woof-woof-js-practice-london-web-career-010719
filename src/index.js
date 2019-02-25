const DOGS_URL= "http://localhost:3000/pups"
const filterGoodBtn = document.querySelector('#good-dog-filter')
const createPuppyBtn = document.querySelector('#create-new-dog-button')
const puppyForm = document.querySelector('form.add-puppy-form')
const dogList = new DogList ()
let filterGoodBol = false
let addPuppy = false
puppyForm.style.display = 'none'


filterGoodBtn.addEventListener('click',filterGood)
createPuppyBtn.addEventListener('click',()=>{
  addPuppy = !addPuppy
  if (addPuppy) {
    puppyForm.style.display = 'block'
    createPuppyBtn.innerText = 'Hide create form'
    puppyForm.querySelector('.submit').addEventListener('click',createPuppy)
  }
  else {
    puppyForm.style.display = 'none'
    createPuppyBtn.innerText = 'Create my puppy'
  }
})

function createPuppy(){
  event.preventDefault()
  const dogName = puppyForm.querySelector('[name="name"]').value
  const dogImage = puppyForm.querySelector('[name="image"]').value
  const url = DOGS_URL

  const options = {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${dogName}`,
      "image": `${dogImage}`,
      "isGoodDog": true
    })
  }

  fetch (url, options)
    .then (res => res.json())
    .then (dog => dogList.createDog(dog))
    .then (() => puppyForm.reset())
}


function filterGood(){
  filterGoodBol = !filterGoodBol
  if (filterGoodBol === true){
    filterGoodBtn.innerHTML = "Fitler good dogs: ON"
    dogList.displayDogs(dogList.goodDogs())
    addInfoClick()
  }
  else {
    filterGoodBtn.innerHTML = "Fitler good dogs: OFF"
    dogList.displayDogs(dogList.dogs)
    addInfoClick()
  }
}

function fetchDogs(id){
  const dog_URL = `${DOGS_URL}/${id}`
  if (id===undefined){
    return fetch(DOGS_URL)
      .then(res=>res.json())
  }
  else {
    return fetch(dog_URL)
      .then(res=>res.json())
  }
}

function addInfoClick(){
  const dogSpans = document.querySelectorAll('div#dog-bar span')
  dogSpans.forEach((dogSpan)=>{
    dogSpan.addEventListener('click',(e)=>showDog(e))
  })
}

function showDog(e){
  const dogId = e.target.attributes['dog-id'].value
  const dogEl = dogList.displayInfo(dogList.findDog(dogId))

  const goodDogBtn = dogEl.querySelector('button')
  goodDogBtn.addEventListener('click',(e)=>judgeDog(e))
}

function judgeDog(event){
  const goodDogBtn = event.target
  const dogId = parseInt(goodDogBtn.attributes['dog-id'].value)
  const dogInstance = dogList.findDog(dogId)
  const dog_URL = `${DOGS_URL}/${dogInstance.id}`
  const options = {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "isGoodDog": `${!JSON.parse(dogInstance.isGoodDog)}`
    })
  }

  fetch (dog_URL, options)
    .then (res => res.json())
    .then (dog => dogList.updateDog(dog.id))
    .then (dog => goodDogBtn.innerText = `${dog.goodDogText()}`)
}



fetchDogs()
  .then(dogs => dogList.createAllDogs(dogs))
  .then(addInfoClick)
