<template>
  <div class="col-3 mb-3">
    <div class="card p-1 rounded-3">
      <!-- <div class="card" style="width: 18rem;"> -->
      <img :src='this.url' class="card-img-top" alt="..." >
      <div class="card-body">
        <h5 class="card-title">{{this.pokeName}}</h5>
        <a href="#" class="btn btn-primary" @click.prevent="handleDetail()">Detail</a>
      </div>
    </div>
    <div>
      <span class="star glyphicon glyphicon-star-empty"></span>
    </div>

    <br />

    <div>
      <i class="heart fa fa-heart-o"></i>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from 'pinia';
import { usePokeStore } from '../stores/poke';
  export default {
    name: "PokeCard",
    props: ["card"],
    computed: {
      ...mapState(usePokeStore, ["pageType", "search"]),
      url(){
        // console.log(this.pageType);
        if (this.pageType === "Type") {
          let arr = this.card.pokemon.url.split("/")
          let angka = arr[arr.length - 2]
          // console.log(angka);
          return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${angka}.png`
        } else if (this.pageType === "Home") {
          // console.log(this.card.url);
          let arr = this.card.url.split("/")
          let angka = arr[arr.length - 2]
          return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${angka}.png`
        }
      },
      pokeName(){
        if (this.pageType === "Home") {
          let name = this.card.name[0].toUpperCase() + this.card.name.substring(1)
          return name
        } else if (this.pageType === "Type") {
          let name = this.card.pokemon.name[0].toUpperCase() + this.card.pokemon.name.substring(1)
          return name
        }
      }
    },
    methods: {
      handleDetail(){
        let arr = []
        if (this.pageType === "Home") {
          arr = this.card.url.split("/")
        } else if (this.pageType === "Type"){
          arr = this.card.pokemon.url.split("/")
        }
        let angka = arr[arr.length - 2]
        this.$router.push('/detail?id=' + angka)
      }
    },
    created(){
      // console.log(this.$route.param);
    }
  }
</script>

<style>

</style>