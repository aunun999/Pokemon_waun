<template>
  <div class="container my-4">
    <h3 class="text-center my-4">List Pokemon</h3>
    <div class="row" v-if="search">
      <PokeCard v-for="(card, index) in filteredPoke" :key="index" :card="card" />
    </div>
    <div class="row" v-else>
      <PokeCard v-for="(card, index) in dataPoke" :key="index" :card="card" />
    </div>
    <div style="display: flex; justify-content: center;" v-if="!search">
      <Pagination />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { usePokeStore } from '../stores/poke';
import PokeCard from '../components/PokeCard.vue';
import Pagination from '../components/PageControl.vue';

export default {
    name: "HomePage",
    data: () => {
      return {
        
      }
    },
    computed: {
        ...mapWritableState(usePokeStore, ["pageType","limit", "offset", "page", 'dataPoke', 'typeNumber']),
        ...mapState(usePokeStore, ["filteredPoke", "search"])
    },
    methods: {
        ...mapActions(usePokeStore, ["getPok", "getPokeType", 'getPokAll'])
    },
    created() {
      console.log(this.$route.query.page);
      this.page = this.$route.query.page || 1
      this.getPok(this.page);
      this.getPokAll()
      // console.log(this.dataPoke);
    },
    components: { PokeCard, Pagination }
}
</script>

<style>

</style>