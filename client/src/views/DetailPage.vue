<template>
  <div class="m-4">
    <img :src=link alt="" >
    <p>Name : {{name}}</p>
    <p>Height : {{height}} m</p>
    <p>Weight : {{weight}} Kg</p>
    <span>type :</span><span v-for="(type, index) in types" :key="index" style="padding:0.1cm; background-color: aqua; margin: 2px;">{{type}}</span>
    <br><br>
    <button class="btn btn-danger">add to favourite</button><br>
    <button class="btn btn-info" @click="backHome()">Back</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapWritableState } from 'pinia';
import { usePokeStore } from '../stores/poke';

export default {
  name: "DetailPage",
  data: () => {
    return {
      name: "",
      types: [],
      height: 0,
      weight: 0,
      id : 0
    }
  },
  methods: {
    getDetails(){
      let id = this.$route.query.id
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(({data}) => {
        data.types.forEach(el => {
          this.types.push(el.type.name)
          console.log(el.type.name);
        });
        this.name = data.name
        this.height = data.height/10
        this.weight = data.weight/10
        this.id = data.id

        console.log(data);
      })
    },

    backHome(){
      if (this.pageType === "Home") {
        this.$router.push(`/?page=${+this.page}`)
        // this.$router.push('/detail')
      } else if (this.pageType === "Type"){
        this.$router.push(`/type?id=${+this.typeNumber}`)
      }
    }
  },

  computed: {
    ...mapWritableState(usePokeStore, ['page', 'pageType', 'typeNumber']),
    link(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`
    }
  },

  created(){
    this.getDetails()
  }
}
</script>

<style>

</style>