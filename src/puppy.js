class Puppy {
    constructor(pup) {
        this.id = pup.id
        this.name = pup.name
        this.isGoodDog = pup.isGoodDog
        this.image = pup.image
        this.like = pup.like
        this.createInfo()
    }
    
    createInfo() {            
        const dogContainer = document.querySelector("#dog-summary-container")
        const dogInfo = document.getElementById("dog-info")
    
        let isGoodDog = this.isGoodDog ? "Good Dog!" : "Bad Dog!"
        let like = this.like ? this.like : 0
        dogInfo.innerHTML = `
        <img src="${this.image}" />
        <h2>${this.name}</h2>
        <h4>Like: ${like}</h4>
        <button id="good-dog-btn">${isGoodDog}</button>
        <button id="like-dog-btn">Like</button><hr>
        <button id="edit-dog-btn">Edit</button>
        <button id="delete-dog-btn">Delete</button>`
        
        dogContainer.appendChild(dogInfo)
    
        dogInfo.addEventListener("click", event => {
            switch(event.target.id) {
                case "good-dog-btn":
                return this.toggleGoodDogBtn(event)
                case "like-dog-btn":
                return this.likeDog(event)
                case "delete-dog-btn":
                return this.remove(event)
                case "edit-dog-btn":
                return this.renderEditForm(event)

            }
        })
    }

    likeDog(e) {
        this.like++
       
        Api.updatePupLikes(this.id, this.like)
            .then((puppy) => document.querySelector("h4").innerText = `Like: ${puppy.like}`)
    }

    toggleGoodDogBtn(e) {
        const id = this.id
    
        function options(boolean) {
            return {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {isGoodDog: boolean} )
            }
        }  
    
        if (e.target.textContent === "Bad Dog!") {
            fetch(`http://localhost:3000/pups/${id}`, options(true))
            e.target.textContent = "Good Dog!"
        } else {
            fetch(`http://localhost:3000/pups/${id}`, options(false))
            e.target.textContent = "Bad Dog!"
        }
    }

    remove(e) {
        const id = this.id
        fetch(`http://localhost:3000/pups/${id}`, {method: "DELETE"})
        .then(() => location.reload())
    }

    renderEditForm(e) {
        renderForm("Edit", this)
    }

}


