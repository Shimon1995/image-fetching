<template>
  <div id="app">
    <Nav />
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';
@Component({
  components: {
    Nav,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>
