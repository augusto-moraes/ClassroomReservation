import React from 'react';

function Home() {
  
  return (
    <div>
      <h1>Accueil </h1>
      <button>
        <a href="http://localhost:3000/home2">Réserver une salle</a>
      </button>
      <button>
        <a href="http://localhost:3000/home3">Voir une salle</a>
      </button>
      <button>Aide</button>
      <button>Contact</button>
      <button>
        <a href="https://www.insa-lyon.fr/">En savoir plus sur l'INSA</a>
      </button>
    </div>
  )
}

export default Home;
