<template>
  <div>
    <p>Alternatively</p>
    <h3>Manually Enter Numbers</h3>
    <p>Each seperated by a space or comma</p>
    <input @keypress.enter="addNumbersToArray" :value="inputValue">
    <button v-if="files.length >= 2" @click="submitFiles">Submit Files</button>
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
</style>


