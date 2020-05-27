import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      {id: 1, name: 'Nombre1 Apellido1', ranking: 4.5},
      {id: 2, name: 'Nombre2 Apellido2', ranking: 3.5},
      {id: 3, name: 'Nombre3 Apellido3', ranking: 4.0},
      {id: 4, name: 'Nombre4 Apellido4', ranking: 1.5},
      {id: 5, name: 'Nombre5 Apellido5', ranking: 2.0},
      {id: 6, name: 'Nombre6 Apellido6', ranking: 4.1},
      {id: 7, name: 'Nombre7 Apellido7', ranking: 3.2},
      {id: 8, name: 'Nombre8 Apellido9', ranking: 4.9},
      {id: 9, name: 'Nombre9 Apellido9', ranking: 1.2},
      {id: 10, name: 'Nombre10 Apellido10', ranking: 0.5},
      {id: 11, name: 'Nombre11 Apellido11', ranking: 2.8},
      {id: 12, name: 'Nombre12 Apellido12', ranking: 3.9}
    ]
  },

  mutations: {

  },

  actions: {

  },

  modules: {
    
  }
})
