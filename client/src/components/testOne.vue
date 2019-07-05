<template>
  <div class="hello" >
        <router-link to="/">
           Go back
          </router-link>
    <div class="wrap-head">
      <h3>{{test.name}}</h3>
      <h3>{{test.location}}</h3>
      <h3>{{test.currency}}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
       da: this.$route.params.id,
      }
    },
    created() {
      this.getTest()
    },
    computed: {
      ...mapGetters({
        test: 'getTest',
      })
      },
      methods: {
        getTest() {
          this.$store.dispatch('getTest', this.da)
        }

    }
  }
</script>

<style scoped>
  .wrap-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    margin: 0 auto;
  }
  a {
    text-decoration: navajowhite;
    color: #12438d;
  }

</style>
