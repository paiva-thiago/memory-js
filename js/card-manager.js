const CRESTS = ['bangu',
                'brasil-pelotas',
                'jabaquara',
                'sao-raimundo',
                'uniao-sao-joao',
                'xv-piracicaba',
                'portuguesa-santista',
                'juventude',
                'tuna-luso',
                'mirassol',
                'guarani',
                'ponte-preta',
                'portuguesa',
                'sousa'
        ]
const cardManager = {
  imageCards:  CRESTS,
  
  putCard: (svgFileName) => {
    const div = document.createElement('div');
    div.className = 'memory-card who';
    div.setAttribute('data-tipo', svgFileName);
    
    const frontImg = document.createElement('img');
    frontImg.className = 'front-face';
    frontImg.src = 'img/' + svgFileName + '.svg';
    frontImg.alt = svgFileName;
    
    const backImg = document.createElement('img');
    backImg.className = 'back-face';
    backImg.src = 'img/bola.svg';
    backImg.alt = 'Memory Card';
    
    div.appendChild(frontImg);
    div.appendChild(backImg);
    return div; 
  },
  
  feedBoard: function() { 
    this.imageCards.sort(() => Math.random() - 0.5);
    this.imageCards=this.imageCards.slice(0,8);
    this.imageCards.push(...this.imageCards);
    this.imageCards.sort(() => Math.random() - 0.5);
    
    
    for(let idx = 0; idx < this.imageCards.length; idx++) { 
      const card = this.imageCards[idx]; 
      document.getElementById('memory-game').appendChild(this.putCard(card)); 
    }
  }
}

