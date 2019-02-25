class Dog {
  constructor(dog){
    this.id = dog.id
    this.image = dog.image
    this.isGoodDog = dog.isGoodDog
    this.name = dog.name
    // this.goodDogText = this.goodDogText()
    this.el = this.createEl()
  }

  createEl(){
    const dogEl = document.createElement('span')
    dogEl.setAttribute('dog-id', `${this.id}`)
    dogEl.innerHTML = `${this.name}`
    return dogEl
  }

  infoEl(){
    const dogInfoEl = document.createElement('div')

    dogInfoEl.innerHTML = `
      <img src=${this.image}>
      <h2>${this.name}</h2>
      <button dog-id=${this.id}>${this.goodDogText()}</button>
    `
    return dogInfoEl
  }

  goodDogText(){
    let goodDog = "Bad Dog!"
    if (JSON.parse(this.isGoodDog)===true) {goodDog = "Good Dog!"}
    return goodDog
  }
}
