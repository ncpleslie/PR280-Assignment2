<template>
  <div id="app">
    <JumbotronComponent/>
    <DragDropComponent :calcCorrelation="calcCorrelation"/>
    <ManuallyEnteredComponent :calcCorrelation="calcCorrelation"/>
    <ResultComponent :result="result"/>
  </div>
</template>

<script>
import DragDropComponent from "./components/DragDropComponent";
import ManuallyEnteredComponent from "./components/ManuallyEnteredComponent";
import JumbotronComponent from "./components/JumbotronComponent";
import ResultComponent from "./components/ResultComponent";
import { MathCalculations } from "./main.js";

export default {
  name: "App",
  components: {
    DragDropComponent,
    ManuallyEnteredComponent,
    JumbotronComponent,
    ResultComponent
  },
  data() {
    return {
      result: null
    };
  },
  methods: {
    calcCorrelation(arrayOfTxt) {
      let mathCalculations = new MathCalculations(arrayOfTxt);
      mathCalculations.main();
      this.result = mathCalculations.getAllResults();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
