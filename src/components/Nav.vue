<template>
    <div id="nav">
      <router-link to="/">Form</router-link>
      <router-link v-for="name in names" :key="name" :to="'/gallery/'+name">{{ ` ${name} ` }}</router-link>
    </div>
</template>

<script lang="ts">
import fileDownload from 'js-file-download';
import axios from 'axios';

import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';

@Component({})
export default class Nav extends Vue {
  private names = this.$store.state.albumList;
  @Watch('names')
  public async albumNmaesChange(from: string[], to: string[]): Promise<void> {
    await this.$store.dispatch('fetchAbumNames');
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