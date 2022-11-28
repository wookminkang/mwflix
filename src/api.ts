
export const API_KEY = "b831870e438178d83b5508dbe5e07d3f";
const BASE_PATH = "https://api.themoviedb.org/3"
const LANGUAGE = "ko-KR";

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
  
  export interface IGetMoviesResult {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
  }


export interface IGetDetailMovie {
    adult: boolean,
    backdrop_path: string,
    genres: {
        id: number,
        name: string
    }[],
    original_title: string,
    overview: string,
    vote_average: number
}


// 지금 상영 중인 영화
export async function getMovies() {
  return await (
    await fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=1&region=kr`
    )
  ).json();
}

// 지금 인기 있는 영화
export function getPopularMovies() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=1&region=kr`)
  .then((response) => response.json());
}

// 지금 인기 있는 영화
export function getTopratedMovies() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=1&region=kr`)
  .then((response) => response.json());
}


// 영화를 클릭했을 때 
export function FetchMovieDetail(id:number) {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json());
}




export function FetchSearchResults(keyword: string, type: string) {
  return fetch(`${BASE_PATH}/search/${type}?api_key=${API_KEY}&language=${LANGUAGE}&page=1&region=kr&query=${keyword}`)
  .then(res => res.json())
}

export function FetchMovieVideo(id: number) {
  return fetch(`${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}`)
      .then(res => res.json());
}