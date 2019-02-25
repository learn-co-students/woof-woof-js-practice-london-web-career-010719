class DogList {
  constructor(){
    this.dogs = []
    this.dogListEl = document.querySelector('#dog-bar')
    this.dogInfoEl = document.querySelector('#dog-info')
  }

  createDog(dog){
    const dogInstance = new Dog (dog)
    this.dogListEl.appendChild(dogInstance.el)
    this.dogs.push(dogInstance)
  }

  createAllDogs(dogs){
    this.dogListEl.innerHTML = ""
    dogs.forEach(dog=> this.createDog(dog))
  }

  goodDogs() {
    return this.dogs.filter(dog => dog.isGoodDog === 'true')
  }


  displayDogs(dogs) {
    this.dogListEl.innerHTML = ""
    dogs.forEach(dog=> {
      this.dogListEl.appendChild(dog.el)
    })
  }

  findDog(id){
    const dogInstance = this.dogs.find((dog)=>dog.id==id)
    return dogInstance
  }

  updateDog(dogId){
    for (let oldDog of this.dogs){
      if (oldDog.id == dogId) {
        oldDog.isGoodDog = `${!JSON.parse(oldDog.isGoodDog)}`
      }
    }
    return this.findDog(dogId)
  }

  displayInfo(dog){
    this.dogInfoEl.innerHTML = ""
    const el = dog.infoEl()
    this.dogInfoEl.appendChild(el)
    return el
  }

}
