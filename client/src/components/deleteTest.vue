<template>
    <div>
        <span v-if="!addForm" class="add" @click="addForm = true">delete</span>
        <div v-if="addForm" >
          <form class="form" >
            <p v-if="success" class="success">{{success}}</p>
            <p v-if="error" class="error">{{error}}</p>
                    <h3>Do you want to delete?</h3>
                    <h3>{{nameTest}}</h3>
                    <div class="">
                      <span class="close" @click="close">Close</span>
                          <input class="add" type="submit" @click.prevent="checkForm(idTest)" value="Delete"> 
                    </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Tests',
    props: [
        'idTest',
        'nameTest'
    ],
  data() {
    return {
      addForm: false,
      }
    },
      computed: {
      ...mapGetters({
        success: 'success',
        error: 'error',
      })
    },
    methods: {
      close() {
          this.addForm = false
          this.$store.dispatch('setMessage')
          this.$store.dispatch('getTests')
      },
        checkForm: function (value) {
        this.$store.dispatch('deleteTest', value )
        e.preventDefault();
      }
    }
    
  }
</script>
<style scoped>
  .error {
    background: rgb(235, 138, 28);
    color: #eee;
    max-width: 200px;
    padding: 10px;
    margin: 3px auto;
  }
  .success {
    background: rgb(40, 221, 101);
    color: #eee;
    max-width: 200px;
    padding: 10px;
    margin: 3px auto;
  }
  .add, .close {
    background: rgb(235, 69, 28);
    color: #FFF;
    padding: 10px 10px;
    max-width: 100px;
    border-radius: 4px;
    margin-top: 5px;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
    border: none;
    font-size: 14px;
  }
  .close {
    background: rgb(34, 189, 28) !important;
  }
  .effect{
    border: 0; 
    padding: 15px; 
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    min-width: 200px;
    }
  .add:hover {
    background: rgb(187, 34, 7);
  }
  .form {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgb(255, 214, 180);
  }
</style>