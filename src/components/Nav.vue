<template>
    <nav>
      <h2 id="logo">
        <router-link to="/about">
          ABOUT
        </router-link>
      </h2>
      <div id="nav">
        <div class="album">
          <router-link to="/">Form</router-link>
          <a href="" @click="changeAlbumListState" class="a">
            Albums
          </a>
        </div>
        <span class="dropdown">
          <router-link v-for="name in names" :key="name" :to="'/gallery/'+name">{{ ` ${name} ` }}</router-link>
        </span>
      </div>
    </nav>
</template>

<script lang="ts">
import axios from 'axios';
import anime from 'animejs';

import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator';

@Component({
  mounted() {
    this.$store.commit('start');
  },
})
export default class Nav extends Vue {

  private showAlbumsList = true;
  private names: string[] = this.$store.state.albumList;

  public changeAlbumListState(event: any): void {
    event.preventDefault();

    this.showAlbumsList = !this.showAlbumsList;

    const span = document.querySelector('span') as HTMLElement | null;
    if (span !== null) {
      const listWidth = span.offsetWidth;

      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 3000,
      });
      if (this.showAlbumsList) {
        tl
        .add({
          targets: '.album',
          translateX: -listWidth / 23,
        })
        .add({
          targets: '.dropdown',
          translateX: -listWidth / 20,
        }, '-=2500');
      } else {
        tl
          .add({
            targets: '.dropdown',
            translateX: listWidth * 1.2,
          })
        .add({
          targets: '.album',
          translateX: listWidth,
        }, '-=2500');
      }
    }
  }

  @Watch('names')
  public async albumNmaesChange(from: string[], to: string[]): Promise<void> {
    await this.$store.dispatch('fetchAbumNames');
  }
}
</script>

<style scoped>
#logo {
  margin: auto 5rem;
  color: black;
  font-weight: lighter;
}

nav{ 
  width: 99%;
  background: white;
  display: flex;
  margin: 0 1rem;
  border-bottom: solid 1px rgba(121, 121, 121, 0.342);
}
#nav {
  display: flex;
  padding: 30px;
  margin-left: auto;
  overflow: hidden;
  font-weight: normal;
}
.album {
  display: flex;
}
a {
  color: rgb(90, 90, 90);
  text-decoration: none;
  padding: 0 1rem;
}
a.router-link-exact-active {
    color: #5FA8D3;
}
</style>