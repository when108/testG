import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const ip = 'http://192.168.1.206:4000'
export default new Vuex.Store({
  state: {
    tests: [],
    test: '',
    message: '',
    error: ''
  },
  mutations: {
    SET_TESTS(state, data) {
      state.tests = data
    },
    SET_TEST(state, data) {
      state.test = data
    },
    SET_MESSAGE(state, data) {
      state.message = data
    },
    SET_ERROR(state, data) {
      state.error = data
    },
  },
  actions: {
    setMessage({commit, state}, data ) {
      commit('SET_MESSAGE',  '')
      commit('SET_ERROR',  '')
    },
    getTest({commit}, data) {
      return axios(ip,{
           method: "POST",
           data: {
               query: `
                   {
                    test(id: "${data}") {
                        id,
                        name,
                        location,
                        currency
                       }
                   }
               `
           }
       }).then(res => {
         if(res.data.data.test) {
           commit('SET_TEST',  res.data.data.test)
         } else {
           commit('SET_ERROR',  "Error: Can't get test")
         }
       }
       ).catch(err => console.log(err));  
    },
    async getTests({commit}) {
      await axios(ip,{
           method: "POST",
           data: {
               query: `
                   {
                    tests {
                        id,
                        name,
                        location,
                        currency
                       }
                   }
               `
           }
       }).then(res => {
         if(res.data.data.tests) {
           commit('SET_TESTS',  res.data.data.tests)
         } else {
           commit('SET_ERROR',  "Error: Can't get tests")
         }
       }
       ).catch(err => console.log(err));  
    },
    addTest({commit, state}, data ) {
      return axios(ip,{
          method: "POST",
          data: { 
            query: `
            mutation ger($name: String!, $location: String, $currency: Int) {
              createTest(name: $name, location: $location, currency: $currency) {
                      name
                      location
                      currency
                    }
              }
            `,
              variables: {
                name: data.name,
                location: data.location,
                currency: data.currency,
              },
            }
            }).then(result => {
              if(result.data.data.createTest) {
                commit('SET_MESSAGE',  "Test added")
              } else {
                commit('SET_ERROR',  "Error: Can't add test")
              }
            })
    },
    updateTest({commit, state}, data ) {
      return axios(ip,{
        method: "POST",
        data: { 
          query: `
          mutation ger($id: ID!, $name: String!, $location: String, $currency: Int) {
            updateTest(id: $id, name: $name, location: $location, currency: $currency) {
                    name
                  }
            }
          `,
            variables: {
              id: data.id,
              name: data.name,
              location: data.location,
              currency: data.currency,
            },
          }
          }).then(result => {
            if(result.data.data.updateTest || result.data.data ) {
              commit('SET_MESSAGE',  "Test updated")
            } else {
              commit('SET_ERROR',  "Error: Can't update test")
            }
          })
    },
    deleteTest({commit, state}, data ) {
      return axios(ip,{
          method: "POST",
          data: { 
            query: `
              mutation ger($id: ID!) {
                  delete(id: $id) {
                          name
                        }
                  }
                `,
                variables: {
                  id: data,
              },
            }
            }).then(result => {
              if(result.data.data.delete) {
                commit('SET_MESSAGE',  "Test deleted")
              } else {
                commit('SET_ERROR',  "Error: Can't delete test")
              }
            })
    },

  },
  getters: {
    getTests: state => state.tests,
    getTest: state => state.test,
    success: state => state.message,
    error: state => state.error,
    getTestsName(state) {
      return _.orderBy(state.tests, 'name')
    },
    getTestsLocation(state) {
      return _.orderBy(state.tests, 'location')
    },
    getTestsCurrency (state) {
      return _.orderBy(state.tests, 'currency', 'asc')
    },
  }
})
