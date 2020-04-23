<template>
    <form @submit="alrt_image">
        <input type="text" name="url" autocomplete="off" v-model="input" required />
        <label for="url" class="label-url">
            <span class="content-url">Links</span>
        </label>
    </form>
</template>

<script lang="ts">
import getUrls from 'get-urls';
import axios from 'axios';
import { remove } from 'lodash';

import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Form extends Vue {

    private input = '';
    private hostname = this.$store.state.hostname;

    protected alrt_image(event: Event): void {
        event.preventDefault();

        let input = this.input;
        input = input.replace(new RegExp('www.'), '');

        const urls = Array.from( getUrls(this.input) );

        for (const url of urls) {
            input = input.replace(new RegExp(url), '');
        }

        input = input.replace(/\//gi, '');

        const names = input.split(' ');
        remove(names, (item: string) => item === '');

        axios.post(`${this.hostname}/api`, {
            url: this.input,
            names,
        });

        this.$store.dispatch('fetchAbumNames');
        this.input = '';
    }
}
</script>

<style scoped>
    form {
        font-family: sans-serif;
        width: 30%;
        position: relative;
        height: 50px;
        margin: 150px auto;
        overflow: hidden;
    }

    form input {
        width: 100%;
        height: 100%;
        color: #595f6e;
        padding-top: 20px;
        border: none;
        padding: 0;
        padding-top: 10px;
        outline: none;
    }

    form label {
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        pointer-events: none;
        border-bottom: 1px solid black;
    }

    form label::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 100%;
        width: 100%;
        border-bottom: 3px solid #5fa8d3;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }

    .content-url {
        position: absolute;
        bottom: 5px;
        left: 0;
        transition: all 0.3s ease;
    }

    form input:valid + .label-url .content-url,
    form input:focus + .label-url .content-url {
        transform: translateY(-150%);
        font-size: 14px;
        color: #5fa8d3;
    }

    form input:focus + .label-url::after {
        transform: translateX(0%);
    }

</style>
