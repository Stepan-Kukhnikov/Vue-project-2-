<template>
  <div class="container">
    <qestion-list-component
      class="questionCardList"
      @remove="removeItem"
      @update-item="updateItem"
      :items="currentCardsElements"
    />
  </div>
</template>

<script>
import QestionListComponent from "./components/QuestionListComponent.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    QestionListComponent,
  },

  data() {
    return {
      page: 1,
      n: 10,
    };
  },

  computed: {
    ...mapGetters({
      cardsList: "getQestionList",
    }),

    currentCardsElements() {
      return this.$store.getters.getQestionList.slice(
        this.n * (this.page - 1),
        this.n * (this.page - 1) + this.n
      );
    },
  },

  methods: {
    ...mapMutations({
      setData: "setQuestionsListData",
      addData: "addCardToList",
      addDataPinned: "addCardToListPinned",
    }),
    ...mapActions(["fetchData"]),
    removeItem(index) {
      this.$store.getters.getQestionList.splice(index, 1);
    },
    updateItem(updatedItem) {
      const index = this.$store.getters.getQestionList.findIndex(
        (item) => item.name === updatedItem.name
      );
      if (index !== -1) {
        this.$set(this.$store.getters.getQestionList, index, updatedItem);
      }
    },
  },

  created() {
    this.fetchData(1);
  },
};
</script>

<style lang="css">
.container {
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
}
</style>
