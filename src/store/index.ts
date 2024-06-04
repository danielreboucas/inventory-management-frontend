import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

interface User {
  access_token: string;
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface State {
  user: User | null;
}

export default createStore<State>({
  state: {
    user: null,
  },
  getters: {
    getStoreUser: (state: State) => {
      return state.user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  mutations: {
    setUser(state: State, user: User) {
      state.user = user;
    },
  },
  plugins: [vuexLocal.plugin],
});
