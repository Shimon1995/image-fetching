<template>
<div class="albums">
  <div class="gallery">
    <transition name="popup">
      <div v-if="imageOpen" class="image_close">
        <img :src="imageSrc" @click="closeImage" v-if="imageOpen" />
      </div>
    </transition>
    <div class="img" v-for="img in images" :key="img" >
      <img class="images" :src="img" @click="openImage" />
      <button id="remove_image" @click="removeImage">Remove</button>
    </div>
  </div>
  <button id="remove_album" @click="removeAlbum">REMOVE ALBUM</button>
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
  public imageOpen = false;
  private hostname = this.$store.state.hostname;
  private images: string[] = this.$store.state.data;

  @Watch('images')
  public onEmptyAlbum(to: string[], from: string[]): void {
    if (this.images.length === 0) {
      this.removeAlbum();
    }
  }

  @Watch('images')
  public onImagesChange(to: string[], from: string[]): void {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  @Watch('$route')
  public async onRouteChanged(to: any, from: any): Promise<void> {
    this.$store.dispatch('fetchAlbum', this.$route.params.album_name);
  }

  public increaseImage(event: any): void {
    this.imageOpen = !this.imageOpen;
    this.imageSrc = event.target.src;
  }

  private openImage(event: any): void {
    this.imageSrc = event.target.src;
    this.imageOpen = true;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0.25rem';
  }

  private closeImage(): void {
    this.imageOpen = false;
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0rem';
      }, 1000);
  }

  private removeAlbum(): void {
    const name = this.$route.params.album_name;
    axios.delete(`${this.hostname}/api/delete_album/${name}`);
    this.$router.push('/');
  }
  private removeImage(event: any): void {

    let src: string = event.target.parentElement.firstChild.src;
    src = src.replace(new RegExp(`${this.hostname}/api/images/${this.$route.params.album_name}/image`), '');
    src = src.replace(/\.[^]*/gi, '');

    const name = this.$route.params.album_name;

    axios.delete(`${this.hostname}/api/${name}`, {data: {
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 110vh;
  }
  .gallery {
    padding: 0;
    margin: 5rem 18rem;
    margin-bottom: 22rem;

    display: grid;

    /* gap: 12rem; */
    row-gap: 6rem;

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
    justify-items: center;
    justify-content: center;
    height: 520px;
  }

  .images {
    max-width: 240px;
    position: relative;
    margin: 0;
    padding: 0;
    z-index: 2;
  }

  button {
    border: none;
    color: white;
    height: 2.8rem;
    width: 8rem;
    border-radius: 4px;
  }

  #remove_image {
    margin-top: 0.4rem;
    background: #5FA8D3;
    transition: 1s;
  }
  #remove_image:hover {
    box-shadow: 0 0 12px 1px #5FA8D3;
  }

  #remove_album {
    transition: 1.2s;
    background: rgb(255, 35, 64);
    margin: 4rem auto;
    margin-top: auto;
  }
  #remove_album:hover {
    box-shadow: 0 0 12px 3px rgb(255, 35, 64);
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
