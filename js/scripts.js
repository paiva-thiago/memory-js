HTMLElement.prototype.removeClass = function(remove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== remove) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
}

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
function updateScore(somar){
    score = somar ? score+2 : score - 1;     
}
function resetBoard(){
    [hasFlippedCard,lockBoard,firstCard,secondCard]=[false,false,null,null];
}
function flipCard() {
    if(!lockBoard){
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard=this;
        if(firstCard!==secondCard) checkForMatch();
    }
}

function checkForMatch(){
    let confere = (firstCard.dataset.tipo === secondCard.dataset.tipo);
    confere ? disableCards() : unflipCards();
    if( document.querySelectorAll('.who').length==0){
        Swal.fire({text:`FIM DE PARTIDA ${score} pontos`})
    }
}
function disableCards() {
    updateScore(true);
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.removeClass('who');   
    secondCard.removeClass('who');   
    resetBoard();
}
function unflipCards() {
    updateScore(false);
    lockBoard=true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');  
        resetBoard();
    }, 1500);
}
 (function shuffle() {
      cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
      });
     })();
cards.forEach(card => card.addEventListener('click', flipCard));
const helloPlayer = ()=>{
    Swal.fire({
        title: 'Jogo da Memória',
        html: `<p class="swal">Feito graças ao <a href="https://medium.freecodecamp.org/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae">Memory Game </a> da <a href="https://github.com/marina-ferreira">Marina Ferreira</a></p>
              <p  class="swal">Se errar, perde-se um ponto. Se acertar, ganha-se dois pontos!</p>
              <p  class="swal">
              Onde consegui os Ícones:<a href="https://visualpharm.com/free-icons/soccer%20ball-595b40b75ba036ed117d959c">[1]</a>
                  <a href="http://worldvectorlogo.com/">[2]</a>
                  <a href="http://wikipedia.org/">[3]</a>
              </p>`,
        confirmButtonText:'Começar!',      
        footer: '<span class="swal"><a href="http://paiva-thiago.github.io">Thiago Paiva</a></span>'
      })
}
helloPlayer();
