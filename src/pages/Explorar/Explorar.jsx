import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard/GameCard";
import { buscarJogos } from "../../services/api";

function Explorar() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    async function carregarJogos() {
      try {
        const dados = await buscarJogos();

        setJogos(dados);
        setCarregando(false);
      } catch (error) {
        setCarregando(false);
        setErro(
          "Não foi possível carregar os jogos. Tente novamente mais tarde.",
        );
      }
    }

    carregarJogos();
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  const jogosFiltrados = jogos.filter((jogo) => {
    const correspondeBusca = jogo.name
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeGenero =
      genero === "" || jogo.genres.some((g) => g.name === genero);

    return correspondeBusca && correspondeGenero;
  });

  return (
    <section className="explore">
      <h1>Explorar jogos</h1>
      <p className="explore-description">
        Encontre seu próximo jogo por nome ou gênero.
      </p>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar Jogos..."
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />

      <select
        className="genre-select"
        value={genero}
        onChange={(event) => setGenero(event.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        <option value="Action">Ação</option>
        <option value="Adventure">Aventura</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Estratégia</option>
        <option value="Sports">Esportes</option>
        <option value="Racing">Corrida</option>
      </select>

      <div className="games-grid">
        {jogosFiltrados.length === 0 ? (
          <p> Nenhum jogo encontrado.</p>
        ) : (
          jogosFiltrados.map((jogo) => <GameCard key={jogo.id} jogo={jogo} />)
        )}
      </div>
    </section>
  );
}

export default Explorar;
