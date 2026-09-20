const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const BASE_URL = "https://api.rawg.io/api";

export async function buscarJogos() {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=20`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os jogos.");
  }
  const data = await response.json();

  return data.results;
}

export async function buscarJogosPorId(id) {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar o jogo.");
  }
  const data = await response.json();

  return data;
}

export async function buscarScreenshots(id) {
  const response = await fetch(
    `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar as screenshots.");
  }
  const data = await response.json();

  return data.results;
}
