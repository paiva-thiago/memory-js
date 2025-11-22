function welcome (){
    Swal.fire({
        title: 'Jogo da Memória',
        html: `<p class="swal">
                    Com uma inspiração no <a href="https://medium.freecodecamp.org/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae">Memory Game</a> da <a href="https://github.com/marina-ferreira">Marina Ferreira</a>
                </p>
                <p class="swal">
                    Um jogo da memória com escudos de clubes de futebol!
                </p>
                <p class="swal">
                    <strong>Erro</strong>: -1 ponto<br/>
                    <strong>Acerto</strong>: +2 pontos<br/>
                </p><p class="swal">
                Fonte dos escudos:<br/>
                <a href="http://worldvectorlogo.com/">World Vector Logo</a><br/><a href="http://www.seeklogo.com/">Seek Logo</a><br/> <a href="https://www.footylogos.com/">Footy Logos</a> <br/> <a href="http://wikipedia.org/">Wikipedia</a>
                </p>              `,

        confirmButtonText:'Começar!',      
        footer: '<span class="swal"><a href="http://paiva-thiago.github.io">Thiago Paiva</a></span>'
      })
}
cardManager.feedBoard();

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
        const finalGameText = `Consegui ${score} pontos no memory fc!`;
        showShareModal(finalGameText)
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

cards.forEach(card => card.addEventListener('click', flipCard));
welcome();