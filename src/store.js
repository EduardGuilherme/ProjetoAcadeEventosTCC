import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    favorites: [],
    inativeEvents: []
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    SET_INATIVESEVENTS(state, inativeEvents) {
      state.inativeEvents = inativeEvents;
    }
  },
  actions: {
    loadEvents({ commit }) {
      Axios.get("http://localhost:6002/events/status/1")
        .then(r => r.data)
        .then(events => {
          commit("SET_EVENTS", events);
          console.log(events)
        });
    },

    loadFavoriteEvents({ commit }) {
      Axios.post("http://localhost:6002/favorites", { user_id: localStorage.getItem("user_id") })
        .then(r => r.data)
        .then(favorites => {
          commit("SET_FAVORITES", favorites);
          console.log(favorites)
        });
    },

    loadInativesEvents({ commit }) {
      Axios.get(`http://localhost:6002/events/status/0`)
        .then(r => r.data)
        .then(inativeEvents => {
          commit("SET_INATIVESEVENTS", inativeEvents);
          console.log(inativeEvents)
        });
    }
  }
});
