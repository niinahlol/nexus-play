import { useEffect, useState } from "react";
import { buscarJogos } from "../../services/api";
import GameCard from "../../components/GameCard/GameCard";
import { Link } from "react-router-dom";

function Home() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const dados = await buscarJogos();

        setJogos(dados);
        setCarregando(false);
      } catch (error) {
        setCarregando(false);
        setErro("Não foi possível carregar os jogos.");
      }
    }

    carregarJogos();
  }, []);

  if (carregando) {
    return <p>Carregando jogos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  if (jogos.length === 0) {
    return <p>Nenhum jogo encontrado.</p>;
  }

  const jogoDestaque = jogos[0];

  const jogosDeAcao = jogos.filter((jogo) =>
    jogo.genres?.some((genero) => genero.name === "Action"),
  );

  return (
    <section className="home">
      <h1>Nexus Play</h1>
      <p> Descubra seu próximo jogo.</p>

      <section className="featured-game">
        <h2> Jogos em destaque</h2>

        <img
          src={jogoDestaque.background_image}
          alt={`Capa do jogo ${jogoDestaque.name}`}
        />

        <h3>{jogoDestaque.name}</h3>

        <p>{jogoDestaque.rating}</p>

        <p>Lançamento: {jogoDestaque.released}</p>
        <Link to={`/jogo/${jogoDestaque.id}`}>Ver Detalhes</Link>
      </section>

      <section className="home-section">
        <h2> Jogos de ação</h2>
        <div className="games-grid">
          {jogosDeAcao.slice(0, 6).map((jogo) => (
            <GameCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>Jogos Populares</h2>
        <div className="games-grid">
          {jogos.slice(1, 7).map((jogo) => (
            <GameCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;
