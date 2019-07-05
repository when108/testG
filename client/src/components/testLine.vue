<template>
    <div>
        <div class="total"> Total: ${{totalAmount}} </div>
        <div class="test" v-for="(test, index) in data" :key="test.id">
        <div class="id">
          {{index}}
        </div>
        <div class="name">
          <router-link :to="`/test/${test.id}`">
           {{test.name}}
          </router-link>
        </div>
        <div class="location">
          {{test.location}}
        </div>
        <div class="currency">
           ${{test.currency }}
        </div>
        <div class="edit">
           <update :idTest="test.id" :nameTest="test.name" :locationTest="test.location" :currencyTest="test.currency" />
           <deleteTest :idTest="test.id" :nameTest="test.name" />
        </div>
      </div>
    </div>
</template>
<script>
import update from '@/components/updateTest.vue';
import deleteTest from '@/components/deleteTest.vue';

export default {
    props: [
        'data'
    ],
    components: {
        update,
        deleteTest
    },
     computed: {
        totalAmount: function () {
            var sum = 0;
            this.data.forEach(e => {
                sum += e.currency;
            });
            return sum
        }
    }
}
</script>

<style scoped>
.total {
    position: absolute;
    top: 98px;
    right: 25%;
    background: #eee;
    padding: 10px 15px;
    border-radius: 5px;
}
.name a {
  text-decoration: navajowhite;
  color: #12438d;
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
    display: flex;
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
</style>

