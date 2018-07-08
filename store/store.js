import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//定义模块
const distribution = {
    state: {
        distribution: {},
        detail: {},
    },
    mutations: {
        distribution(state,distribution) {
            state.distribution = distribution;
        },
        distributionDetail(state,detail) {
            state.detail = detail;
        },
    }
}

 
export default new Vuex.Store({
    state : {
        operationType: 0,
    },
    mutations: {
        operationType(state, operationType) {
            state.operationType = operationType;
        }
    },
    modules : {
        distribution : distribution
    }
});