<template>
<div class="albums">
  <div class="gallery">
    <transition name="popup">
      <div v-if="imageClose" class="image_close">
        <img :src="imageSrc" @click="imageClose = !imageClose" v-if="imageClose" />
      </div>
    </transition>
    <div class="img" v-for="img in images" :key="img" >
      <img class="images" :src="img" @click="increaseImage" />
      <button @click="removeImage">Remove</button>
    </div>
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

  public imageSrc: string = '';
  public imageClose = false;
  private images = this.$store.state.data;

  public increaseImage(event: any): void {
    this.imageClose = !this.imageClose;
    this.imageSrc = event.target.src;
  }

  @Watch('images')
  public onImagesChange(to: string[], from: string[]): void {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  @Watch('$route')
  public async onRouteChanged(to: any, from: any): Promise<void> {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  private removeImage(event: any) {

    let src: string = event.target.parentElement.firstChild.src;
    src = src.replace(new RegExp(`http://localhost:3000/api/images/${this.$route.params.album_name}/image`), '');
    src = src.replace(/\.[^]*/gi, '');

    axios.delete(`http://192.168.1.117:3000/api/${this.$route.params.album_name}`, {data: {
      imagenumber: src,
    }});
  }
}
</script>

<style scroped>
  .image_close {
    position: fixed;
    background: rgba(52, 62, 63, 0.363);
    left: -50%;
    top: -140%;
    width: 200%;
    height: 300%;
    z-index: 7;
    display: grid;
	  place-items: start center;
  }

  .image_close>img {
    position: relative;
    top: 50%;
    min-width: 400px;
    min-height: 500px;
    max-width: 1200px;
    max-height: 800px;
  }

  .albums {
    overflow: hidden;
    min-height: 110vh;
  }
  .gallery {
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

  .images {
    max-width: 240px;
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 2;
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

  .popup-enter-active,
  .popup-leave-active {
    transition: opacity 1s, transform 1.5s;
  }

  .popup-enter{
    opacity: 0;
    transform: scale(1.5);
  }
  .popup-leave-to {
    opacity: 0;
    transform: scale(0.7);
  }
</style>
