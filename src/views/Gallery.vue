<template>
  <div class="gallery">
      <img v-for="img_url in img_urls"  :key="img_url.key" :src="img_url.url"/>    
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class Gallery extends Vue {
  private show = true;
  private img_urls = this.$store.state.img_urls;
}
</script>

<style scroped>

  .gallery {
    display: flex;
    /* margin: 0 auto; */
  }

  img {
    margin: 1rem;
    min-width: 300px;
  }

</style>
