<template>
  <div>
    <div class="header">
      <div class="headerTitle">Вопросы и ответы</div>
      <button
        v-if="items.length !== 0"
        @click="editToggleFunction"
        class="headerEdit"
      >
        {{ editOrPreviewText }}
      </button>
      <button
        v-if="items.length === 0"
        @click="editToggleFunction"
        class="headerEdit"
      >
        edit
      </button>
    </div>
    <div v-for="(item, idx) in items" :key="idx">
      <div class="questionCard">
        <div class="cardHeaderSection">
          <p class="questionCardText">{{ item.question }}</p>
          <div class="buttonsElement">
            <div class="buttonsEditDeleteElement">
              <button
                @click="editItem(item)"
                v-if="editOrPreviewText === 'preview'"
                class="editButton"
              >
                edit
              </button>
              <button
                @click="removeItem(idx)"
                v-if="editOrPreviewText === 'preview'"
                class="deleteButton"
              >
                delete
              </button>
            </div>
            <button @click="answerToggleVisibility(idx)" class="openCardButton">
              {{ item.isVisible ? "-" : "+" }}
            </button>
          </div>
        </div>
        <div v-if="items[idx].isVisible" class="questionCardAnswerSection">
          <span class="questionCardAnswer">{{ item.answer }}</span>
          <button
            class="questionCardAnswerMoreDetails"
            @click="selectCard(idx)"
          >
            Подробнее...
          </button>
          <div v-if="items[idx].isOpened" class="cardElement">
            <div class="cardElementContent">
              <h2 @click="selectCard(idx)" class="cardElementHeader">
                &lt; На главную
              </h2>
              <div class="cardElementQuestion">{{ item.question }}</div>
              <div class="cardElementAnswer">{{ item.answer }}</div>
            </div>
            <div class="cardElementButtons">
              <button @click="editItem(item)" class="editButton">edit</button>
              <button @click="removeItem(idx)" class="deleteButton">
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="editOrPreviewText === 'preview' && this.items.length !== 0"
      @click="showModal = true"
      class="addOrEditQuestionButton"
    >
      Добавить +
    </button>
    <div v-if="this.items.length === 0" class="emptyQuestionList">
      <p class="emptyQuestionListText">
        Тут пока ничего нет.<br />Перейдите в
        <span @click="showModal = true" class="spanElement"
          >режим редактирования</span
        >
        <br />и добавьте свой первый вопрос
      </p>
    </div>
    <add-modal-window v-if="showModal" @close="showModal = false" />
    <edit-modal-window
      v-if="showModalEdit"
      :item="selectedItem"
      @close="closeEditModal"
      @save="saveChanges"
    />
  </div>
</template>

<script>
import AddModalWindow from "../components/AddModalWindow.vue";
import EditModalWindow from "../components/EditModalWindow.vue";
export default {
  name: "QestionListComponent",
  components: {
    AddModalWindow,
    EditModalWindow,
  },
  data() {
    return {
      showModalEdit: false,
      showModal: false,
      selectedItem: null,
      isEdit: true,
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    editOrPreviewText() {
      return this.isEdit ? "edit" : "preview";
    },
  },
  methods: {
    editToggleFunction() {
      this.isEdit = !this.isEdit;
    },
    answerToggleVisibility(idx) {
      this.$set(this.items[idx], "isVisible", !this.items[idx].isVisible);
      if (!this.items[idx].isVisible) {
        !this.items[idx].question;
      }
    },
    selectCard(idx) {
      this.$set(this.items[idx], "isOpened", !this.items[idx].isOpened);
      if (!this.items[idx].isOpened) {
        !this.items[idx];
      }
    },
    removeItem(idx) {
      this.$emit("remove", idx);
    },
    editItem(idx) {
      this.selectedItem = { ...idx };
      this.showModalEdit = true;
    },
    closeEditModal() {
      this.showModalEdit = false;
      this.selectedItem = null;
    },
    saveChanges(updatedItem) {
      this.$emit("update-item", updatedItem);
      this.closeEditModal();
    },
  },
};
</script>

<style lang="css">
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
}

.questionCardList {
  margin-top: 11px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.headerTitle {
  color: #000000;
  font-family: Arial, Inter;
  font-weight: 700;
  line-height: 12px;
  margin: 0;
}

.cardElement {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  background-color: #eeeeee;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 17px 11px;
}

.cardElementContent {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 14px;
}

.cardElementHeader {
  color: #000000;
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 18px;
  line-height: 12px;
}

.cardElementHeader:hover {
  cursor: pointer;
}

.cardElementQuestion {
  color: #000000;
  font-family: Arial, Inter;
  font-weight: 700;
  font-size: 18px;
  line-height: 12px;
}

.cardElementAnswer {
  color: #000000;
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}

.headerEdit {
  color: #1b85d1;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 12px;
  text-decoration: none;
  border: none;
}

button:hover {
  cursor: pointer;
}

.questionCard {
  display: flex;
  flex-direction: column;
}

.cardHeaderSection {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-right: 2px;
  display: flex;
  justify-content: space-between;
  background-color: #1b85d1;
}

.questionCardText {
  border-top-left-radius: 5px;
  padding: 10px;
  margin: 0px;
  background-color: #1b85d1;
  color: #ffffff;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 12px;
}
.cardElementButtons {
  display: flex;
  gap: 8px;
}

.buttonsEditDeleteElement {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
}

.buttonsElement {
  display: flex;
  justify-content: end;
  gap: 5px;
}

.editButton {
  background-color: #00b3ff;
  padding: 0 8px;
  height: 16px;
  border-radius: 5px;
  color: #ffffff;
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.5px;
  border: none;
}

.deleteButton {
  background-color: #d7435e;
  padding: 0 8px;
  border-radius: 5px;
  color: #ffffff;
  font-family: Arial, Inter;
  font-weight: 400;
  height: 16px;
  font-size: 12px;
  line-height: 14.5px;
  border: none;
}

.openCardButton {
  border-top-right-radius: 5px;
  background-color: #1b85d1;
  color: #ffffff;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 12px;
  border: inherit;
  display: flex;
  align-items: center;
}

.questionCardAnswerSection {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #ffffff;
}

.qustionOpen {
  display: flex;
}

.questionCardAnswer {
  color: #000000;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 1.2;
  padding-bottom: 8px;
}

.questionCardAnswerMoreDetails {
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  color: #1b85d1;
  background-color: transparent;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 12px;
  text-decoration: none;
  border: none;
}

.emptyQuestionList {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
}

.addOrEditQuestionButton {
  padding: 4px 0;
  display: flex;
  justify-content: center;
  border: 1px solid #3384ce;
  background-color: #56a2e9;
  color: #ffffff;
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-decoration: none;
  border-radius: 5px;
}

.spanElement {
  color: #1b85d1;
}

.emptyQuestionListText {
  margin-top: 34px;
  max-width: 275px;
  text-align: center;
  color: #777777;
  font-family: Arial, Inter;
  font-weight: 400;
  line-height: 18px;
  text-decoration: none;
}
</style>
