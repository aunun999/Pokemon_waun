<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" @click.prevent="backHome()">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" width="100"
        height="30" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Type
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click="handleType(1)">Normal</a>
            <a class="dropdown-item" href="#" @click="handleType(2)">Fighting</a>
            <a class="dropdown-item" href="#" @click="handleType(3)">Flying</a>
            <a class="dropdown-item" href="#" @click="handleType(4)">Poison</a>
            <a class="dropdown-item" href="#" @click="handleType(5)">Ground</a>
            <a class="dropdown-item" href="#" @click="handleType(6)">Rock</a>
            <a class="dropdown-item" href="#" @click="handleType(7)">Bug</a>
            <a class="dropdown-item" href="#" @click="handleType(8)">Ghost</a>
            <a class="dropdown-item" href="#" @click="handleType(9)">Steel</a>
            <a class="dropdown-item" href="#" @click="handleType(10)">Fire</a>
            <a class="dropdown-item" href="#" @click="handleType(11)">Water</a>
            <a class="dropdown-item" href="#" @click="handleType(12)">Grass</a>
            <a class="dropdown-item" href="#" @click="handleType(13)">Electric</a>
            <a class="dropdown-item" href="#" @click="handleType(14)">Psychic</a>
            <a class="dropdown-item" href="#" @click="handleType(15)">Ice</a>
            <a class="dropdown-item" href="#" @click="handleType(16)">Dragon</a>
            <a class="dropdown-item" href="#" @click="handleType(17)">Dark</a>
            <a class="dropdown-item" href="#" @click="handleType(18)">Fairy</a>
            <!-- <a class="dropdown-item" href="#">Another action</a> -->
          </div>
        </li>
        <li class="nav-item" @click="myFavouritePage()" v-if="status === 'Login'">
          <!-- <button type="button" class="btn btn-danger">Danger</button> -->
          <a class="nav-link" href="#">My Favourite</a>
        </li>
        <li class="nav-item" @click="handleLogout()" v-if="status === 'Login'">
          <!-- <button type="button" class="btn btn-danger">Danger</button> -->
          <a class="nav-link" href="#">Logout</a>
        </li>
        <li class="nav-item" @click="handleLogoin()" v-if="status === 'Logout'">
          <!-- <button type="button" class="btn btn-danger">Danger</button> -->
          <a class="nav-link" href="#">Login</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" v-show="$route.path !== '/login' && $route.path !== '/register'">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
        <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
      </form>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { usePokeStore } from '../stores/poke'
  export default {
    name: "CustomNavbar",
    computed: {
      ...mapState(usePokeStore, []),
      ...mapWritableState(usePokeStore, ["typeNumber", "pageType", "page", "status", "search", "dataPoke"]),
      
    },
    methods: {
      ...mapActions(usePokeStore, ['getPokeType']),
      handleType(number){
        this.page = 1
        this.pageType = "Type"
        this.typeNumber = +number
        this.getPokeType(number)
        this.$router.push("/type?id=" + number)
      },
      backHome(){
        this.$router.push('/')
      },
      handleLogoin(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style>

</style>