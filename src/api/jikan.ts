const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchPopularAnime = async (page: number = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?page=${page}&limit=25`);
    if (!response.ok) {
      throw new Error('Failed to fetch anime data');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    throw error;
  }
};

export const searchAnime = async (query: string, page: number = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=25`);
    if (!response.ok) {
      throw new Error('Failed to search anime');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export async function fetchAnimeList(query: string, page = 1) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch anime list');
  const data = await res.json();
  return data.data; // array of anime
}

export async function fetchAnimeById(id: string) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) throw new Error('Failed to fetch anime details');
  const data = await res.json();
  return data.data; // single anime object
}

