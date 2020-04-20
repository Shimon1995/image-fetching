<template>
  <div class="gallery">
    <div class="img" v-for="img in images" :key="img" >
      <img :src="img" />
      <button @click="removeImage">Remove</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  mounted() {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  },
})
export default class Gallery extends Vue {

  private images = this.$store.state.data;

  @Watch('images')
  public onImagesChange(to: string[], from: string[]): void {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  @Watch('$route')
  public async onRouteChanged(to: string, from: string): Promise<void> {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  private removeImage(event: any) {

    let src: string = event.target.parentElement.firstChild.src;
    src = src.replace(new RegExp(`http://localhost:3000/${this.$route.params.album_name}/image`), '');
    src = src.replace(/\.[^]*/gi, '');

    axios.delete(`http://192.168.1.117:3000/${this.$route.params.album_name}`, {data: {
      imagenumber: src,
    }});
  }
}
</script>

<style scroped>

  .gallery {
    /* width: 50%; */
    padding: 0;
    margin: 5rem 18rem;

    display: grid;

    gap: 4rem;

    grid-template-columns: repeat(3, minmax(240px, 1fr));
    grid-auto-rows: 350px;

    align-content: stretch;
  }

  .card-tall {
    grid-row: span 2 / auto;
  }

  .card-wide {
    grid-column: span 2 / auto;
  }

  .img{ 
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 480px;
  }

  img {
    max-width: 240px;
    /* height: 240px; */
    position: relative;
    margin: 0;
    padding: 0;
  }

  button {
    margin-top: 0.2rem;
    border: none;
    background: #5FA8D3;
    color: white;
    height: 2.8rem;
    width: 8rem;
    border-radius: 4px;
  }

  @media only screen and (max-width: 600px) {
    .gallery {
      margin: 0;
      padding: 0 25%;
    }
  }
</style>
