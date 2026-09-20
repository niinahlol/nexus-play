export function salvarFavoritos(favoritos) {
  localStorage.setItem("nexusPlayFavoritos", JSON.stringify(favoritos));
}

export function buscarFavoritos() {
  const favoritos = localStorage.getItem("nexusPlayFavoritos");

  if (!favoritos) {
    return [];
  }

  return JSON.parse(favoritos);
}
