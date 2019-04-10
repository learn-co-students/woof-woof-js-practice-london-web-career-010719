class Puppy {
    constructor({id, name, isGoodDog, image}) {
        this.id = id
        this.name = name
        this.isGoodDog = isGoodDog
        this.image = image
    }

    element() {
        const span = document.createElement("span")
        span.innerText = this.name
        span.dataset.id = this.id
        span.addEventListener("click", e => {PuppyController.showThePup(this)})
        return span
    }
}


class PuppyController {
    static init() {
        const filterDiv = document.querySelector("#filter-div")

        const filterBtn = document.querySelector("#good-dog-filter")
        filterBtn.addEventListener("click", e => {PuppyController.filterGoodDog(pupsList)})

        const createBtn = document.createElement("button")
        createBtn.innerText = "Create New Dog"
        createBtn.id = "toggle-dog-form"
        filterDiv.append(createBtn)

        Adapter.getPups()
        .then(pups => PuppyController.renderPups(pups))
    }

    static renderPup(pup) {
        const dogListBar = document.querySelector("#dog-bar")
        const newDog = new Puppy(pup)
        pupsList.push(newDog)
        dogListBar.appendChild(newDog.element())
    }

    static renderPups(pups) {
        const dogListBar = document.querySelector("#dog-bar")
        dogListBar.innerHTML = ""
        pups.forEach(pup => PuppyController.renderPup(pup))
    }

    static showThePup(pup) { //pup = dog Instance
        const pupInfo = document.querySelector("#dog-info")
        pupInfo.innerHTML = ""
        const pupImg = document.createElement("img")
        pupImg.src = pup.image
        const pupName = document.createElement("h2")
        pupName.innerText = pup.name
        const goodDogBtn = document.createElement("button")
        goodDogBtn.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog"
        goodDogBtn.id = "good-dog-btn"
        goodDogBtn.dataset.id = pup.id
        goodDogBtn.addEventListener("click", (e) => {PuppyController.toggleGoodDogBtn(pup)})
        const deleteDogBtn = document.createElement("button")
        deleteDogBtn.innerText = "Delete"
        deleteDogBtn.id = "delete-dog-btn"
        deleteDogBtn.dataset.id = pup.id
        deleteDogBtn.addEventListener("click", (e) => {PuppyController.deletePup(pup)})

        pupInfo.append(pupImg, pupName, goodDogBtn, deleteDogBtn)

    }

    static toggleGoodDogBtn(pup) {
        const goodDogBtn = document.querySelector("#good-dog-btn")
        const filterBtn = document.querySelector("#good-dog-filter")

        if (goodDogBtn.innerText === "Good Dog") {
            goodDogBtn.innerText = "Bad Dog"
            pup.isGoodDog = false
        } else {
            goodDogBtn.innerText = "Good Dog"
            pup.isGoodDog = true
        }
        return Adapter.updatePup(pup.id, {isGoodDog: pup.isGoodDog})
        .then(pup => {
            PuppyController.updatePupsInstance(pup)
            PuppyController.showThePup(pup)
        })
        .then(() => {
            const goodDogList = pupsList.filter(dog => dog.isGoodDog === true)
            if (filterBtn.innerText === "Filter good dogs: ON") {
                PuppyController.renderPupsList(goodDogList)
            }
        })
    }
    
    static updatePupsInstance(pupdata) {
        const pupInstance = pupsList.find(pup => pupdata.id === pup.id)
        pupInstance.name = pupdata.name
        pupInstance.isGoodDog = pupdata.isGoodDog
        pupInstance.image = pupdata.image
    }

    static filterGoodDog(list) {
        const filterBtn = document.querySelector("#good-dog-filter")
        const goodDogList = list.filter(dog => dog.isGoodDog === true)
        if(filterBtn.innerText === "Filter good dogs: OFF") {
            filterBtn.innerText = "Filter good dogs: ON"
            PuppyController.renderPupsList(goodDogList)
        } else {
            filterBtn.innerText = "Filter good dogs: OFF"
            PuppyController.renderPupsList(list)
        }
    }

    static renderPupsList(list) {
        const dogListBar = document.querySelector("#dog-bar")
        dogListBar.innerHTML = ""
        list.forEach(dog => dogListBar.appendChild(dog.element()))
    }

    static deletePup(pup) {
        pupsList = pupsList.filter(pupInstance => pupInstance.id !== pup.id)
        return Adapter.deletePup(pup.id)
        .then(() => {
            PuppyController.renderPupsList(pupsList)
            const pupInfo = document.querySelector("#dog-info")
            pupInfo.innerHTML = ""
        })
    }
}