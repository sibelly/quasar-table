<template>
  <div class="q-layout-padding">
    <div class="q-gutter-y-sm q-pa-md" style="max-width: 300px">
      <h6 style="font-weight: 400">Movies Multiple Select</h6>
      <!-- <q-select
        v-model="city"
        label="City"
        :options="cityOptions"
        autocomplete="address-level2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select> -->

      <q-select
        v-model="moviesSelected"
        label="Movies"
        :options="filteredMovieOptions"
        use-input
        @filter="filterMovieOptions"
        multiple
        option-value="title"
        option-label="title"
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
          console.log('44444444444444444444 ', this.$store.state.movie.movies)
          this.movieOptions = this.$store.state.movie.movies.results
        }
      }).catch((err) => {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Ops... Something went wrong!'
        })
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
                console.log('44444444444444444444 ', this.$store.state.movie.movies)
                this.movieOptions = this.$store.state.movie.moviesFiltered.results
              }
            }).catch((err) => {
              this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Ops... Something went wrong!'
              })
              console.error(err)
            })
        }
      })
    }
  }
}
</script>
