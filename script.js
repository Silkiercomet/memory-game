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

  //----------- funcionality --------------->
  let matchTask = [], player1 = 0, player2 = 0,currentPlay = [], turn = 1;


  const itsAMatch = () => {
      //we can make an array that takes the two recent nodes if its a match it empyties the array
      //other wise it call mismatch turns then around and the empties
    if(matchTask.length === 2){
       // matchTask[0] == matchTask[1] ? alert("match"):alert("no match")
        if(matchTask[0] == matchTask[1] && turn % 2 !== 1){
            ++player1
            scoreboard()
            point()
            matchTask = []
            currentPlay = []
           // alert("match")
        }else if(matchTask[0] == matchTask[1] && turn % 2 == 1){
            ++player2
            scoreboard()
            point()
            matchTask = []
            currentPlay = []
           // alert("match")
        }else if(matchTask[0] !== matchTask[1]){
            turn++;
            matchTask = []
            currentPlay = []
            missMatch()
            //alert("no match")
        }
        
        
    }
    //picks the result

  }
  //turn the cards up || down
  document.querySelectorAll(".card").forEach(a => {
      a.addEventListener("click", function(){
            //enviamos el valor obtenido abajo y lo evaluamos junto con el siguiente valor clickeado en 
            //un array fuera de esta funcion
          matchTask.push(a.childNodes[3].childNodes[1].childNodes[1].textContent)
           a.childNodes[3].classList.toggle("cardback")
           a.childNodes[1].classList.toggle("cardfront")
           currentPlay.push(a.childNodes[3].id)
           itsAMatch()
           if(document.querySelectorAll(".card").length === ((player1+player2)*2)){
            if(player1 < player2){
                alert("player 1, you're winner")
            }else if(player1 == player2){
                alert("ties")
            }else if(player2 < player1){
                alert("player 2, you're winner")
            }
        }
      })
  })

  //turn cards down on mismatch
  function missMatch(){
      setTimeout(function(){
        document.querySelectorAll(".cardfront").forEach(a => a.classList.toggle("cardfront"))
        document.querySelectorAll(".cardback").forEach(a => a.classList.toggle("cardback"))
    }, 1000)
  } 

  //if its a match changes the classes of the already selected cards
  function point(){
      for(let ids of currentPlay){
          document.querySelector(`#${ids}`).classList.add('solidback')
          document.querySelector(`#${ids}`).classList.remove('cardback')


          document.querySelector(`#${ids}`).previousElementSibling.classList.add('solidfront')
          document.querySelector(`#${ids}`).previousElementSibling.classList.remove('cardfront')
      }
  }

  //updates the content of the scoreboard
  function scoreboard(){
  document.querySelector(".player1").textContent = player2
  document.querySelector(".player2").textContent = player1
}
