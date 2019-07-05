<template>
  <div class="hello" >
    <div class="wrap-head">
        <div class="search-wrapper">
            <input type="text" v-model="search" placeholder="Search name.."/>
        </div>
            <addTest />
        </div>
    <div class="wrap">
      <div class="filters">
        <div class="id" >
          #
        </div>
        <div class="name" @click="Filter(data === 'name' ? '' : 'name')">
          name
        </div>
        <div class="location" @click="Filter(data === 'location' ? '' : 'location')">
          location
        </div>
        <div class="currency" @click="Filter(data === 'currency' ? '' : 'currency')">
          currency 
        </div>
        <div class="edit" >
          edit
        </div>
      </div>
      <TestsLine :data="filterData" />
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import add from '@/components/addTest.vue'
import TestsLine from '@/components/testLine.vue'
import addTest from '@/components/addTest.vue'

export default {
  name: 'Tests',
  data() {
    return {
      data: '',
      search: ''
      }
    },
    components: {
        add,
        TestsLine,
        addTest
    },
    created() {
      this.getTests()
    },
    computed: {
      ...mapGetters({
        tests: 'getTests',
        testsName: 'getTestsName',
        testsLocation: 'getTestsLocation',
        testsCurrency: 'getTestsCurrency'
      }),
      filterData(){
        if(this.search) {
          const searchC = this.search.toLowerCase().trim();
        if (!searchC) return this.tests;
          return this.tests.filter(c => c.name.toLowerCase().indexOf(searchC) > -1);
        }
        if(this.data === 'name'){
          return this.testsName
        }
        if(this.data === 'location'){
          return this.testsLocation
        }
        if(this.data === 'currency'){
          return this.testsCurrency
        }
        return this.tests
      }
      
      },
      methods: {
      ...mapActions({
        getTests: 'getTests'
      }),
      Filter(data){
       this.data = data
      }
    }
  }
</script>

<style scoped>
  .wrap-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80vw;
    margin: 0 auto;
  }
  .search-wrapper {
    margin-bottom: 20px;
  }
  .wrap {
    background: rgb(247, 251, 255);
    width: 80vw;
    margin: 0 auto;
    outline: 1px solid rgb(160, 198, 255);
    outline-offset: -20px;
    padding: 20px 20px;
    border-radius: 5px;
   }
  .test {
    display: flex;
    flex-direction: wrap;
    justify-content: center;
    align-items: center;
  }
  .test:nth-child(even) {
    background: rgb(190, 216, 255);
  }
  .filters {
    display: flex;
    flex-direction: wrap;
    justify-content: center;
    align-items: center;
    background: #12438d;
    color: #eee;
  }
    .name {
    padding: 10px;
    width: 37%;
  }
  .edit {
    padding: 10px;
    width: 15%;
  }
  .id {
    width: 3%;
    text-align: left;
    padding: 5px;
  }
  .location {
    width: 25%;
    padding: 10px;
  }
  .currency {
    width: 20%;
    padding: 10px;
  } 
  .name:hover {
    background: #5a7caf;
    cursor: pointer;
  }
  .location:hover {
    background: #5a7caf;
    cursor: pointer;
  }
  .currency:hover {
    background: #5a7caf;
    cursor: pointer;
  }
</style>
