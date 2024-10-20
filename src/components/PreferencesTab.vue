<template>
  <div class="container">
    <h1>Preferences</h1>
    <label>Nature vs City</label>
    <input type="range" min="0" max="100" v-model="natureVsCity" />

    <label>Budget (0 = Low, 4 = High)</label>
    <input type="range" min="0" max="4" v-model="budget" />

    <label>Cultural Interests</label>
    <input type="range" min="0" max="100" v-model="culturalInterests" />
    
    <label>Result count</label>
    <input type="range" min="1" max="5" v-model="resultCount" />

    <br>
    <button @click="savePreferences">Save</button>
  </div>
</template>

<script>
export default {
  props: ['preferences'],
  data() {
    return {
      natureVsCity: "50",
      budget: "2",
      culturalInterests: "50",
      resultCount: "3"
    };
  },
  methods: {
    savePreferences() {
      const preferences = {
        natureVsCity: this.natureVsCity,
        budget: this.budget,
        culturalInterests: this.culturalInterests,
        resultCount: this.resultCount
      };
      this.$emit('update-preferences', preferences);
    }
  }
};
</script>

<style scoped>
.container {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container label {
  padding: 10px 0;
}
</style>