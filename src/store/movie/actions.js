import axios from 'axios'

// https://developers.themoviedb.org/3/search/search-movies - docs
// https://api.themoviedb.org/3/genre/movie/list?api_key=2ed54a614803785fce2d7fe401cc3b21

const apiKey = '2ed54a614803785fce2d7fe401cc3b21'

export function index ({ commit }, payload) {
  console.log('payload do action do movie ====> ', payload)

  return axios.get('https://api.themoviedb.org/3/discover/movie?', {
    params: {
      api_key: apiKey,
      sort_by: payload.sort_by,
      page: payload.page
    }
  })
    .then((response) => {
      console.log('response => ', response)
      console.log('payload => ', payload)
      if (response.status === 200) {
        console.log('FAZENDO UM COMMITIM MAROTOOOO', response)
        commit('setMovies', response.data)
      } else {
        console.log('DEU RUIMMMMMMMMMMMM')
        return false
      }
    }).catch((error) => {
      console.log('asdasd', error)
      return false
    })
}

export function filter ({ commit }, payload) {
  console.log('payload do action do movie ====> ', payload)

  return axios.get('https://api.themoviedb.org/3/search/movie?', {
    params: {
      api_key: apiKey,
      query: payload.filter
    }
  })
    .then((response) => {
      console.log('response => ', response)
      console.log('payload => ', payload)
      if (response.status === 200) {
        commit('setMoviesFiltered', response.data)
      } else {
        console.log('DEU RUIMMMMMMMMMMMM')
        return false
      }
    }).catch((error) => {
      console.log('asdasd', error)
      return false
    })
}
