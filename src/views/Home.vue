<template>
  <div class="home">
    <h1>{{ name }}</h1>    
    <Form />
  </div>
</template>

<script lang="ts">
import Form from '@/components/Form.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Form,
  },
})
export default class extends Vue {
  private name = 'Input Form';
}
</script>

<style scoped>
  .home {
    margin: 8rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-weight: 300;
  }
</style>
