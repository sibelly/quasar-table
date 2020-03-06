<template>
  <q-page padding>
    <movies-select-multiple></movies-select-multiple>
    <q-separator></q-separator>
    <movies-table></movies-table>
  </q-page>
</template>

<script>
import MoviesTable from '../components/MoviesTable.vue'
import MoviesSelectMultiple from '../components/MoviesSelectMultiple.vue'

export default {
  name: 'MoviePage',
  components: {
    MoviesTable,
    MoviesSelectMultiple
  }

}
</script>

<style>
</style>
