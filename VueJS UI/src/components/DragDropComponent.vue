<template>
  <div>
    <form ref="uploadFileBox" @click="openInputFile">
      <input type="file" class="inputFile" ref="inputFile" @change="addFiles" multiple>
      <span v-if="files.length === 0" class="dropbox">Drop two .txt files here, or click</span>
      <span v-else class="dropbox">{{ files.length }} file(s) added</span>
    </form>
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
      files: []
    };
  },
  methods: {
    submitFiles() {
      console.log(this.files);
      this.calcCorrelation(this.files);
    },
    openInputFile() {
      this.$refs["inputFile"].click();
    },
    addFiles(e) {
      for (let aFile of e.target.files) {
        if (aFile.type === "text/plain") {
          let dataInput = new DataInput(aFile); // Return one array
          Promise.resolve(dataInput.convertTextToArrays()).then(value => {
            this.files.push(value);
          });
        }
      }
    }
  },
  mounted() {
    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ].forEach(dragType => {
      this.$refs.uploadFileBox.addEventListener(dragType, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    this.$refs.uploadFileBox.addEventListener("drop", e => {
      for (let aFile of e.dataTransfer.files) {
        if (aFile.type === "text/plain") {
          let dataInput = new DataInput(aFile); // Return one array
          Promise.resolve(dataInput.convertTextToArrays()).then(value => {
            this.files.push(value);
          });
        }
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: block;
  height: 12rem;
  width: 80%;
  margin: 4rem auto;
  line-height: 12rem;
  background: #ccc;
  border-style: dashed;
  border-radius: 5px;
}

.inputFile {
  display: none;
}

form:hover {
  background: #ddd;
  cursor: pointer;
}
</style>
