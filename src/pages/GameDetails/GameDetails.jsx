import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarJogosPorId, buscarScreenshots } from "../../services/api";
import { buscarFavoritos, salvarFavoritos } from "../../utils/localStorage";

function GameDetails() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [carregandoScreenshots, setCarregandoScreenshots] = useState(false);
  const [erroScreenshots, setErroScreenshots] = useState(null);

  useEffect(() => {
    async function carregarJogo() {
      try {
        const dados = await buscarJogosPorId(id);

        setJogo(dados);
        setCarregando(false);

        setScreenshots([]);
        setCarregandoScreenshots(true);
        setErroScreenshots(null);

        try {
          const imagens = await buscarScreenshots(id);
          setScreenshots(imagens);
          setCarregandoScreenshots(false);
        } catch (error) {
          setErroScreenshots("Não foi possível carregar as screenshots.");
        } finally {
          setCarregandoScreenshots(false);
        }
      } catch (error) {
        setCarregando(false);
        setErro("Não foi possível carregar os dados do jogo.");
      }
    }

    carregarJogo();
  }, [id]);

  useEffect(() => {
    const favoritosSalvos = buscarFavoritos();

    setFavoritos(favoritosSalvos);
  }, []);

  if (carregando) {
    return <p>Carregando jogo...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  const estaFavoritado = favoritos.some((favorito) => favorito.id === jogo.id);

  function alternarFavorito() {
    if (estaFavoritado) {
      const novosFavoritos = favoritos.filter(
        (favorito) => favorito.id !== jogo.id,
      );

      setFavoritos(novosFavoritos);
      salvarFavoritos(novosFavoritos);

      return;
    }

    const novosFavoritos = [...favoritos, jogo];

    setFavoritos(novosFavoritos);
    salvarFavoritos(novosFavoritos);
  }

  return (
    <section className="game-details">
      <h1>{jogo.name}</h1>

      <button onClick={alternarFavorito}>
        {estaFavoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </button>
      <img src={jogo.background_image} alt={`Capa do jogo ${jogo.name}`} />

      <p> Nota: {jogo.rating}</p>
      <p> Lançamento: {jogo.released}</p>
      <p>{jogo.description_raw}</p>
      <p>Gêneros: {jogo.genres.map((genero) => genero.name).join(", ")}</p>

      <p>
        Plataformas:{" "}
        {jogo.platforms.map((item) => item.platform.name).join(", ")}
      </p>

      <p>
        Desenvolvedora:{" "}
        {jogo.developers.map((desenvolvedor) => desenvolvedor.name).join(", ")}
      </p>

      <p>Metacritic: {jogo.metacritic ?? "Não disponível"}</p>

      <section className="screenshots-section">
        <h2> Screenshots ({screenshots.length})</h2>
        {carregandoScreenshots ? (
          <p>Carregando screenshots...</p>
        ) : erroScreenshots ? (
          <p>{erroScreenshots}</p>
        ) : screenshots.length > 0 ? (
          <div className="screenshots-grid">
            {screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt={`Screenshot de ${jogo.name}`}
              />
            ))}
          </div>
        ) : (
          <p>Não há screenshots disponíveis.</p>
        )}
      </section>
    </section>
  );
}

export default GameDetails;
