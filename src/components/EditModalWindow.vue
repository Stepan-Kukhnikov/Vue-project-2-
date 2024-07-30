<template>
  <div class="modalWindowEditBackgroung">
    <div class="modalWindowEdit">
      <div class="modalWindowEditHeader">
        <p class="modalWindowEditHeaderText">Редактировать вопрос</p>
        <button
          @click="$emit('close')"
          class="modalWindowEditHeaderCloseButton"
        >
          close
        </button>
      </div>
      <form>
        <div class="modalWindowEditContent">
          <label for="question" class="editLabel"> Вопрос: </label>
          <input
            type="text"
            id="question"
            v-model="EditItem.question"
            class="editInputSection"
          />
        </div>
        <div class="modalWindowEditContent">
          <label for="answer" class="editLabel"> Ответ: </label>
          <input
            type="text"
            id="answer"
            v-model="EditItem.answer"
            class="editInputSection editInputAnswerSection"
          />
        </div>
        <div class="pinElement">
          <input type="checkbox" id="pinned" class="checkboxElement" />
          <label for="pinned" class="checkboxElementText"
            >Закрепить наверху</label
          >
        </div>
        <button @click="onSaveClick" class="addOrEditQuestionButton">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddModalWindow",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      EditItem: { ...this.item },
    };
  },
  methods: {
    onSaveClick() {
      this.$emit("save", this.EditItem);
    },
  },
};
</script>

<style scoped>
.modalWindowEditBackgroung::before {
  content: "";
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: 9999;
}

.modalWindowEdit {
  position: fixed;
  z-index: 99999;
  opacity: 1;
  margin: 55px 10px 350px 10px;
  padding: 14px;
  background-color: #ffffff;
  inset: 0;
  border: 1px solid #000000;
  border-radius: 10px;
}

.modalWindowEditHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}

.modalWindowEditHeaderText {
  font-family: Arial, Inter;
  font-weight: 700;
  font-size: 14px;
  line-height: 12px;
  margin: 0;
  padding: 0;
}

.modalWindowEditHeaderCloseButton {
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  border: none;
  text-decoration: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.modalWindowEditContent {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 11px;
}

.editLabel {
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}

.editInputSection {
  border: 1px solid #6d6d6d;
  border-radius: 5px;
  height: 26px;
}

.editInputAnswerSection {
  height: 58px;
}

.pinElement {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 11px;
}

.checkboxElement {
  height: 1.3em;
  width: 1.3em;
  margin: 0;
  border: 1px solid #6d6d6d;
}

.checkboxElementText {
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}

.addOrEditQuestionButton {
  display: flex;
  align-self: center;
  justify-content: center;
  font-family: Arial, Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  background-color: #56a2e9;
  border: 1px solid #3384ce;
  width: 100%;
}
</style>
