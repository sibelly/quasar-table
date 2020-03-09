<template>
  <div class="q-layout-padding">
    <div class="q-gutter-y-sm q-pa-md" style="max-width: 300px">
      <h6 style="font-weight: 400">Movies Multiple Select</h6>
      <q-select
        v-model="moviesSelected"
        label="Movies"
        :options="filteredMovieOptions"
        use-input
        @filter="filterMovieOptions"
        multiple
        :option-value="(m) => m.id"
        :option-label="(m) => m.title"
        debounce="300"
        @add="(value) => { addSelectedMovie(value) }"
        clearable
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      moviesSelected: [],
      movieOptions: [],
      filteredMovieOptions: []
    }
  },
  beforeCreate () {
    this.$store.dispatch('movie/index',
      {
        page: 1
      })
      .then((success) => {
        if (this.$store.state.movie.movies) {
          console.log('### beforeCreate', this.$store.state.movie.movies)
          this.movieOptions = this.$store.state.movie.movies.results
        }
      }).catch((err) => {
        console.error(err)
      })
  },
  methods: {
    filterMovieOptions (val, update) {
      update(() => {
        if (val === '') {
          this.filteredMovieOptions = this.movieOptions
        } else {
          this.$store.dispatch('movie/filter',
            {
              filter: val
            })
            .then((success) => {
              if (this.$store.state.movie.moviesFiltered) {
                console.log('### filterMovieOptions ', this.$store.state.movie.movies)
                this.filteredMovieOptions = this.$store.state.movie.moviesFiltered.results
              }
              val = ''
            }).catch((err) => {
              console.error(err)
            })
        }
      })
    },
    addSelectedMovie (value) {
      console.log('====================', value)
    }
  }
}
</script>
