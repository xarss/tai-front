<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">Travel Assistant</h1>
    </header>
    
    <nav class="app-nav">
      <!-- Toggle between components with buttons -->
      <button @click="showPreferences = false">On Trip</button>
      <button @click="showPreferences = true">Preferences</button>
    </nav>

    <main class="app-content">
      <!-- Conditionally render components based on state -->
      <OnTrip v-show="!showPreferences" />
      <PreferencesTab v-show="showPreferences" />
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
      showPreferences: false // Toggle between the two components
    };
  }
};
</script>

<style>
/* Dark Theme and Modern Look */
html {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #121212;
  color: #E0E0E0;
}

body {
  margin: 0
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #1F1F1F;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.app-title {
  color: #FFEB3B;
  margin: 0;
}

.app-nav {
  background-color: #333;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #444;
}

button {
  background-color: #FFEB3B;
  color: #121212;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin: 0 10px;
}

button:hover {
  background-color: #FFC107;
}

.app-content {
  flex: 1;
  padding: 2rem;
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
