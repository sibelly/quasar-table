import axios from 'axios'

// https://developers.themoviedb.org/3/search/search-movies - docs
// https://api.themoviedb.org/3/genre/movie/list?api_key=2ed54a614803785fce2d7fe401cc3b21

const apiKey = '2ed54a614803785fce2d7fe401cc3b21'

export function index ({ commit }, payload) {
  return axios.get('https://api.themoviedb.org/3/discover/movie?', {
    params: {
      api_key: apiKey,
      sort_by: payload.sort_by,
      page: payload.page
    }
  })
    .then((response) => {
      if (response.status === 200) {
        commit('setMovies', response.data)
      } else {
        return false
      }
    }).catch((error) => {
      console.log('### error', error)
      return false
    })
}

export function filter ({ commit }, payload) {
  return axios.get('https://api.themoviedb.org/3/search/movie?', {
    params: {
      api_key: apiKey,
      query: payload.filter
    }
  })
    .then((response) => {
      if (response.status === 200) {
        commit('setMoviesFiltered', response.data)
      } else {
        return false
      }
    }).catch((error) => {
      console.log('### error', error)
      return false
    })
}
