<template>
  <div id="app">
    <h1>VueJS Interface</h1>
    <DragDropComponent :calcCorrelation="calcCorrelation"/>
    <ManuallyEnteredComponent :calcCorrelation="calcCorrelation"/>
    <div v-if="this.result">
      <h1>Regression</h1>
      <p>Beta1: {{ this.result.regression.beta1 }}</p>
      <p>Beta0: {{ this.result.regression.beta0 }}</p>
      <h1>Correlation</h1>
      <p>{{ this.result.correlation }}</p>
    </div>
  </div>
</template>

<script>
import DragDropComponent from "./components/DragDropComponent";
import ManuallyEnteredComponent from "./components/ManuallyEnteredComponent";
import { MathCalculations } from "./main.js";

export default {
  name: "App",
  components: {
    DragDropComponent,
    ManuallyEnteredComponent
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
  margin-top: 60px;
}
</style>
