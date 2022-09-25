<template>
  <div class="container my-4">
    <h3 class="text-center my-4">List Pokemon</h3>
    <div class="row" v-if="search">
      <PokeCard v-for="(card, index) in filteredPoke" :key="index" :card="card" />
    </div>
    <!-- <div class="row"> -->
    <div class="row" v-else>
      <PokeCard v-for="(card, index) in pokeType" :key="index" :card="card" />
    </div>
    <!-- <button @click="print()">klik</button> -->
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
    name: "TypePage",
    data: () => {
      return {
        
      }
    },
    computed: {
        ...mapWritableState(usePokeStore, ["pageType","limit", "offset", "page", 'pokeType', 'typeNumber']),
        ...mapState(usePokeStore, ['filteredPoke', "search"])
        
    },
    methods: {
        ...mapActions(usePokeStore, ["getPokeType", 'getPokeTypeAll']),
        print(){
          console.log(this.pokeType);
        }
    },
    components: { PokeCard, Pagination },
    created() {
      this.typeNumber = this.$route.query.id
      this.getPokeType(this.typeNumber, this.page)
      this.getPokeTypeAll(this.typeNumber)
      // console.log(this.pokeType);
    }
}
</script>

<style>

</style>