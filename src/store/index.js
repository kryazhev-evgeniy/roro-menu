import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isAuth: false
    },
    mutations:{},
    getters:{
        isAuth({isAuth}){
            return isAuth
        }
    }
})

export default store