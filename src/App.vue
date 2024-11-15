<template>
  <div id="app">
    <nav class="app-nav">

      <span class="app-title"> TravelAI </span>

      <span class="spacer"></span>

      <button @click="togglePreferences(false)" v-if="showPreferences">
        Assistant
      </button>
      <button @click="togglePreferences(true)" v-else>
        Preferences
      </button>
    </nav>

    <main class="app-content">
      <OnTrip v-show="!showPreferences" :preferences="preferences" />
      <PreferencesTab v-show="showPreferences" :preferences="preferences" @update-preferences="updatePreferences" />
    </main>

    <footer class="app-footer">
      <p>© 2024 Travel Assistant. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import OnTrip from './components/OnTrip.vue';
import PreferencesTab from './components/PreferencesTab.vue';

export default {
  name: 'App',
  components: {
    OnTrip,
    PreferencesTab
  },
  data() {
    return {
      showPreferences: false, // Toggle between the two components
      preferences: {
        natureVsCity: "50",
        budget: "2",
        culturalInterests: "50",
        resultCount: "3"
      }
    };
  },
  methods: {
    togglePreferences(value) {
      this.showPreferences = value;
    },
    updatePreferences(newPreferences) {
      this.preferences = { ...this.preferences, ...newPreferences };
    }
  }
};
</script>

<style>
html {
  margin: 0;
  padding: 0;
  font-family: jetbrains mono;
  background-color: #1C1C1C;
  color: #F7F7FF;
}

body {
  margin: 0
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
}

.main-img {
  width: 200px;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #F7F7FF;
}

.spacer {
  flex-grow: 1;
}

.app-nav {
  height: 2em;
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #444;
}

button {
  background: #F7F7FF;
  border-radius: 25px;
  color: #333;
  border: none;
  font-family: jetbrains mono;
  font-weight: bolder;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 0 10px;
}

button:hover {
  opacity: 0.8;
}

.app-content {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #121212;
}

.app-footer {
  background-color: #1F1F1F;
  padding: 1rem;
  text-align: center;
  color: #888;
}

.app-footer p {
  margin: 0;
}
</style>
