import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const LocalStorage = {
  page1: [
    {
      id: 1,
      question: "Первый вопрос",
      answer: "Текст ответа 1",
      isVisible: true,
      isOpened: false,
    },
    {
      id: 2,
      question: "Второй вопрос",
      answer: "Текст ответа 2",
      isVisible: true,
      isOpened: false,
    },
    {
      id: 3,
      question: "Третий вопрос",
      answer:
        "Текст ответа на третий вопрос может быть очень очень очень очень очень очень очень очень длинным ",
      isVisible: true,
      isOpened: false,
    },
  ],
  page2: [],
};

export default new Vuex.Store({
  state: {
    cardsList: [],
    cardsListIDS: [],
  },
  mutations: {
    setQuestionsListData(state, payload) {
      const newUniqIdsObj = payload.filter((item) => {
        return state.cardsListIDS.indexOf(item.id) < 0;
      });
      const uniqIds = newUniqIdsObj.map((obj) => obj.id);
      state.cardsList.push(...newUniqIdsObj);
      state.cardsListIDS.push(...uniqIds);
    },
    addCardToList(state, data) {
      state.cardsList.push(data);
    },
    addCardToListPinned(state, data) {
      state.cardsList.unshift(data);
    },
  },
  actions: {
    async fetchData({ commit }, page) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          const items = LocalStorage[`page${page}`];
          resolve(items);
        }, 0);
      });
      commit("setQuestionsListData", res);
    },
  },
  getters: {
    getQestionList: (state) => state.cardsList,
  },
  modules: {},
});
