<template>
<div class="about">
    <h2>Album Description</h2>
    <p>This is an application for creating albums.</p>
    <h3>Usage</h3>
    <p>The names of potential albums and links to sites with images are added to the input line. You can remove each image.</p>
    <p>link to my <a href="https://taran-hermit-me.now.sh">website</a></p>
    <footer>
    </footer>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class Gallery extends Vue {}
</script>

<style scroped>
    .about{
        padding: 3rem 0;
        font-weight: 100;
        text-align: center;
    }
    h2,h3 {
        font-weight: 300;
    }
    a {
        color: #5FA8D3;
        text-decoration: none;
    }
</style>
