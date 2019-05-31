<template>
  <div>
    <div v-if="this.result">
      <b-modal id="modal-1" title="BootstrapVue">
        <b-list-group class="listGroup">
          <b-list-group-item variant="primary">
            <h1>Regression</h1>
          </b-list-group-item>
          <b-list-group-item variant="success">Beta1: {{ this.result.regression.beta1 }}</b-list-group-item>
          <b-list-group-item variant="success">Beta0: {{ this.result.regression.beta0 }}</b-list-group-item>
          <b-list-group-item variant="primary">
            <h1>Correlation</h1>
          </b-list-group-item>
          <b-list-group-item variant="success">{{ this.result.correlation }}</b-list-group-item>
        </b-list-group>
      </b-modal>
      <b-list-group class="listGroup2">
        <b-list-group-item variant="primary">
          <h1>Regression</h1>
        </b-list-group-item>
        <b-list-group-item variant="success">Beta1: {{ this.result.regression.beta1 }}</b-list-group-item>
        <b-list-group-item variant="success">Beta0: {{ this.result.regression.beta0 }}</b-list-group-item>
        <b-list-group-item variant="primary">
          <h1>Correlation</h1>
        </b-list-group-item>
        <b-list-group-item variant="success">{{ this.result.correlation }}</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsComponent",
  props: {
    result: Object
  }
};
</script>

<style scoped>
.listGroup {
  margin: 0 auto;
  max-width: 100%;
}
.listGroup2 {
  margin: 0 auto;
  margin-bottom: 2rem;
  max-width: 70%;
}
</style>


