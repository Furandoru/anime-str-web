export async function fetchAnimeList(query: string, page = 1) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch anime list');
  const data = await res.json();
  return data.data; // array of anime
}

export async function fetchPopularAnime(page = 1) {
  const res = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch popular anime');
  const data = await res.json();
  return data.data; // array of anime
} 

export async function fetchAnimeById(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) throw new Error('Failed to fetch anime details');
  const data = await res.json();
  return data.data; // single anime object
}

