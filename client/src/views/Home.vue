<template>
  <div class="home">
    <Tests />
  </div>
</template>

<script>
// @ is an alias to /src
import Tests from '@/components/Tests.vue'

export default {
  name: 'home',
  components: {
    Tests
  }
}
</script>
