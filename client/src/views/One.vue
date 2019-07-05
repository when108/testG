<template>
  <div class="home">
    <One />
  </div>
</template>

<script>
// @ is an alias to /src
import One from '@/components/testOne.vue'

export default {
  name: 'one',
  components: {
    One
  }
}
</script>
