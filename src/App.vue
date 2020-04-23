<template>
  <div id="app">
    <Nav />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue, Component } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav,
  },
  async beforeCreate() {
    const hostname = window.location.protocol + '//' + window.location.host;
    this.$store.commit('getHost', hostname);
    await this.$store.commit('getAlbumNames');
  },
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
body::-webkit-scrollbar {
  position: static;
  width: 0.25rem;
}
body::-webkit-scrollbar-thumb {
  position: static;
  background: #55525277;
  border-radius: 3px;
}
body::-webkit-scrollbar-track {
  position: static;
  background: var(--bg-color);
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1.5s, transform 1.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30%);
}
</style>
