let grid = document.querySelector(".grid")

class Memory {
    constructor(){
        this.card = document.createElement("div")
    }
    create(amount,number){
        
            this.card.classList.add("card")
            this.card.innerHTML = `
            <div class="front" id="cardf${amount}"></div>
            <div class="back middle " id="cardb${amount}">
                
                <div class="back-content middle">
                    <h1>${number}</h1>
                </div>
            </div>
            `
            grid.appendChild(this.card)
    }
}

let array = [1,2,3,4,5,6]
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  function fillCards() {
    numberElements = [...shuffle(array),...shuffle(array)]
    for(let i = 0; i < numberElements.length; i++){
        let container = new Memory()
        container.create(i,numberElements[i])
    }
  }
  fillCards()