class PupList {
    constructor (pups) {
        this.pupTags = []
        this.createPupTags(pups)
        this.dogBar = document.querySelector("#dog-bar")
    }

    createPupTag (pup) {
        const pupTag = new PupTag(pup)
        this.pupTags.push(pupTag)
    }

    createPupTags (pups) {
        pups.forEach(pup => this.createPupTag(pup))
    }

    addPupToPage (id) {
        const foundPupTag = this.pupTags.find(pupTag => pupTag.id === id)
        this.dogBar.appendChild(foundPupTag.pupTagEl)
    }

    removePup (id) {
        const foundPupTag = this.pupTags.find(pupTag => pupTag.id === id)
        this.pupTags = this.pupTags.filter(pupTag => pupTag.id !== pup.id)
        foundPupTag.remove()
    }
}

class PupTag {
    constructor (pup) {
        this.id = pup.id
        this.name = pup.name
        this.isGoodDog = pup.isGoodDog
        this.image = pup.image
        this.dogInfo = document.getElementById("dog-info")
        this.createPupTag()
    }

    createPupTag () {
        this.pupTagEl = document.createElement('span')
        this.pupTagEl.innerText = this.name
        this.pupTagEl.id = `span-${puppy.id}`
    }

    showDogInfo () {
        let isGoodDog = this.isGoodDog ? "Good Dog!" : "Bad Dog!"

        this.dogInfo.innerHTML = `
        <img src="${this.image}" />
        <h2>${this.name}</h2>
        <button id="good-dog-btn">${isGoodDog}</button>
        <button id="edit-dog-btn">Edit</button>
        <button id="delete-dog-btn">Delete</button>`
        
        dogContainer.appendChild(dogInfo)
    
        dogInfo.addEventListener("click", event => {
            switch(event.target.id) {
                case "good-dog-btn":
                return this.toggleGoodDogBtn(event)
                case "delete-dog-btn":
                return this.remove(event)
                case "edit-dog-btn":
                return this.renderEditForm(event)
            }
        })
    }

    remove () {
        this.pupTagEl.remove()
    }
}
