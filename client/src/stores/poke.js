import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokeStore = defineStore('poke', {
  state: () => {
    return {
      page: 1,
      limit: 24,
      offset: 0,
      dataPoke: [],
      dataPokeAll: [],
      pokeType: [],
      pokeTypeAll: [],
      totalData: 0,
      pageType: "Home",
      typeNumber: 0,
      status: "Logout",
      search: ""
    }
  },
  getters: {
    filteredPoke(){
      if (this.pageType === 'Home') {
        return this.dataPokeAll.filter((data) => {return data.name.includes(this.search)})
      } else if (this.pageType === 'Type') {
        return this.pokeTypeAll.filter((data) => {return data.pokemon.name.includes(this.search)})
      }
    }
  },
  actions: {
    getPok(page = 1){
      this.pageType = "Home"

      if(page){
        this.page = +page
        this.offset = this.limit * (page - 1)
      }
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
      .then(({data}) => {
        let {results, previous, next, count} = data
        this.totalData = count
        this.dataPoke = results
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    getPokAll(){
      // this.pageType = "Home"

      // if(page){
      //   this.page = +page
      //   this.offset = this.limit * (page - 1)
      // }
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1154&offset=0`)
      .then(({data}) => {
        let {results, previous, next, count} = data
        // this.totalData = count
        this.dataPokeAll = results
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    getPokeType(num, page){
      console.log("masuk getPokeType");
      this.pageType = "Type"
      if (page) {
        this.page = page
      }
      axios.get(`https://pokeapi.co/api/v2/type/${num}`)
      .then(({data}) => {
        console.log("pokeType berhasil");
        // console.log(this.pokeType);
        // console.log(data.pokemon);
        let off = 0
        let lim = 24
        
        if (page) {
          off = (page-1) * this.limit
          lim = off + this.limit
        }

        this.pokeType = data.pokemon.slice(off,  lim)
        this.totalData = data.pokemon.length
        
        console.log(data.pokemon.slice(24, 48));
        // console.log(data.pokemon.slice(off,lim));
      })
      .catch((error) => {
        console.log(error);
      })
    },

    getPokeTypeAll(num){
      console.log("masuk getPokeTypeAll");
      this.pageType = "Type"
      
      axios.get(`https://pokeapi.co/api/v2/type/${num}`)
      .then(({data}) => {
        console.log("pokeType berhasil");
        this.pokeTypeAll = data.pokemon
        
        console.log(data.pokemon);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    nextPage(){
      console.log(this.page + 1);
      // this.getPok(this.page+1)
    },

    previousPage(){
      this.getPok(this.page+1)
    }
    
  }
})
