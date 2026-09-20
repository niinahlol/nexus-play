import { Link } from "react-router-dom";
import "./GameCard.css";

function GameCard({ jogo }) {
  const imagemOtimizada = jogo.background_image.replace(
    "/media/games",
    "/media/resize/640/-/games/",
  );

  return (
    <article className="game-card">
      <Link to={`/jogo/${jogo.id}`}>
        <img
          src={imagemOtimizada}
          alt={`Capa do jogo ${jogo.name}`}
          loading="lazy"
        />

        <div className="game-card-content">
          <h2>{jogo.name}</h2>

          <p>{jogo.rating}</p>

          <p>{jogo.released}</p>
        </div>
      </Link>
    </article>
  );
}

export default GameCard;
