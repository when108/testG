<template>
    <div>
        <span v-if="!addForm" class="add" @click="addForm = true">update</span>
        <div v-if="addForm" >
         
          <form class="form" >
               <p v-if="success" class="success">{{success}}</p>
               <p v-if="error" class="error">{{error}}</p>
                    <div>
                        <p  class='error' v-if="errorName">{{errorName}}</p>
                        <input class="effect" type="text" v-model="name" placeholder="name"/>
                       
                    </div>
                    <div >
                       <p class='error' v-if="errorLocation">{{errorLocation}}</p>
                        <input class="effect" type="text" v-model="location" placeholder="location"/>
                       
                    </div>
                    <div >
                      <p class='error' v-if="errorCurrency">{{errorCurrency}}</p>
                        <input class="effect" v-model.number="currency" type="number" placeholder="currency" />
                        
                    </div>
                    <div class="">
                      <span class="add" @click="close">Close</span>
                          <input class="add" type="submit" @click.prevent="checkForm" value="Update"> 
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
        'nameTest',
        'locationTest',
        'currencyTest',
        'idTest'
    ],
  data() {
    return {
      addForm: false,
      name: this.nameTest,
      location: this.locationTest,
      currency: this.currencyTest,
      errorName: '',
      errorLocation: '',
      errorCurrency: ''
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
           this.errorName = null
           this.errorLocation = null
           this.errorCurrency = null
          this.addForm = false
          this.$store.dispatch('setMessage')
          this.$store.dispatch('getTests')
        },
        checkForm: function (e) {
          if (this.name && this.location && this.currency ) {
           this.errorName = null
           this.errorLocation = null
           this.errorCurrency = null
           this.$store.dispatch('updateTest', { id: this.idTest, name: this.name, location: this.location, currency: this.currency } )
          }
          if (!this.name) {
            this.errorName = 'Name is required';
          }else {
            this.errorName = null
          }
          if (!this.location) {
            this.errorLocation = 'Location is required';
          }else {
            this.errorLocation = null
          }
          if (!this.currency) {
            this.errorCurrency = 'Currency is required - just numders';
          }else {
            this.errorCurrency = null
          }
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
  .add {
    background: rgb(235, 138, 28);
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
  .effect{
    border: 0; 
    padding: 15px; 
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    min-width: 200px;
    }
  .add:hover {
    background: rgb(91, 131, 192);
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
    background: rgb(244, 255, 183);
  }
</style>