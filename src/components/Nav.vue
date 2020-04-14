<template>
    <div id="nav">
      <router-link to="/">Form</router-link> |
      <router-link to="/gallery">Gallery</router-link>
      <br />
      <a href="" @click="download_images">Download</a>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import fileDownload from 'js-file-download';
@Component({})
export default class Nav extends Vue {
  private download_images(event: Event): void {
    event.preventDefault();
    this.$store.commit('download');
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
  text-align: center;
}
a {
font-weight: bold;
color: #2c3e50;
}
a.router-link-exact-active {
    color: #5fa8d3;
}
</style>