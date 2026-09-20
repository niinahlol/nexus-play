import { useEffect, useState } from "react";
import { buscarFavoritos } from "../../utils/localStorage";
import GameCard from "../../components/GameCard/GameCard";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosSalvos = buscarFavoritos();

    setFavoritos(favoritosSalvos);
  }, []);

  return (
    <section className="favorites">
      <h1>Favoritos</h1>
      <p>Seus melhores jogos.</p>
      <div className="games-grid">
        {favoritos.length === 0 ? (
          <p> Você ainda não possui jogos favoritos. </p>
        ) : (
          favoritos.map((jogo) => <GameCard key={jogo.id} jogo={jogo} />)
        )}
      </div>
    </section>
  );
}

export default Favoritos;
