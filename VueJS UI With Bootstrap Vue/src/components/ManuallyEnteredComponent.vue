<template>
  <div>
    <b-button v-b-toggle.collapse-1 variant="primary" class="collapseButton">Manually Enter Numbers?</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card title="Manually Enter Numbers" class="mb-3 manualComponent">
        <b-card-text>Each seperated by a space or comma</b-card-text>
        <b-form-input
          @keypress.enter="addNumbersToArray"
          v-model="inputValue"
          placeholder="Push enter to continue"
          class="formInput"
        ></b-form-input>
        <b-button
          v-b-modal.modal-1
          variant="primary"
          v-if="files.length >= 2"
          @click="submitFiles"
        >Submit Files</b-button>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { DataInput } from "../../model/model";

export default {
  name: "DragDropComponent",
  props: {
    calcCorrelation: Function
  },
  data() {
    return {
      files: [],
      inputValue: null
    };
  },
  methods: {
    addNumbersToArray(event) {
      let dataInput = new DataInput(event.target.value);
      if (this.files.length < 2) {
        dataInput.formatNumbers();
        this.files.push(dataInput.getNumbers());
      }
      this.inputValue = null;
      console.log(this.files);
    },
    submitFiles() {
      this.calcCorrelation(this.files);
    }
  }
};
</script>

<style scoped>
.manualComponent {
  margin: 0 auto;
  max-width: 20rem;
}

.formInput {
  margin: 1rem auto;
}

.collapseButton {
  margin-bottom: 2rem;
}
</style>


