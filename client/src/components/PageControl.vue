<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination" v-if="pageType === 'Type'">
      <li class="page-item" @click="handleBack(page - 1)" v-if="page !== 1"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item" v-for="num in pages" :key="num" @click="handleBack(num)"><a class="page-link" href="#">{{num}}</a></li>
      <li class="page-item" @click="handleBack(page + 1)" v-if="page !== pages[pages.length-1]"><a class="page-link" href="#">Next</a></li>
    </ul>
    <ul class="pagination" v-else-if="pageType === 'Home'" >
      <li class="page-item" @click="handleBack(page - 1)"><a class="page-link" href="#" v-if="page !== 1">Previous</a></li>
      <li class="page-item" v-for="num in pages.slice(page-1, page+2)" :key="num" @click="handleBack(num)"><a class="page-link" href="#">{{num}}</a></li>
      <li class="page-item" v-if="page < 47"><a class="page-link" href="#">...</a></li>
      <li class="page-item" v-if="page < 45" @click="handleBack(47)"><a class="page-link" href="#">47</a></li>
      <li class="page-item" v-if="page < 46" @click="handleBack(48)"><a class="page-link" href="#">48</a></li>
      <li class="page-item" v-if="page < 47" @click="handleBack(49)"><a class="page-link" href="#">49</a></li>
      <li class="page-item" @click="handleBack(page + 1)" v-if="page !== pages[pages.length-1]"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapWritableState, mapState } from 'pinia'
import { usePokeStore } from '../stores/poke'
export default {
  name: "PageControl",
  computed:{
    ...mapWritableState(usePokeStore, ['page']),
    ...mapState(usePokeStore, ['totalData', "limit", "pageType", "typeNumber"]),
    pages(){
      let pages = []
      let banyak = Math.ceil(this.totalData/this.limit)
      for (let i = 1; i <= banyak; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    ...mapActions(usePokeStore, ['getPok', 'getPokeType']),
    handleBack(hal){
      console.log(this.pages);
      if (this.pageType === "Home") {
        this.getPok(hal)
      } else if (this.pageType === 'Type') {
        console.log("masuk page type next");
        console.log(hal);
        this.getPokeType(this.typeNumber, hal)
      }
    }
  }
}
</script>

<style>

</style>