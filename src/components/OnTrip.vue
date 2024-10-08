<template>
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <h1>On Trip Page</h1>
    <textarea rows="4" v-model="prompt" placeholder="Ask something..."></textarea>
    <label style="font-size: larger;">
      <input  type="checkbox" v-model="useCurrentLocation" /> Use Current Location
    </label><br>
    <button @click="sendPrompt">Send</button>
    <div v-if="loading">Loading...</div>
    <div style="color: crimson;" v-if="error">{{ error }}</div>
    <div v-if="places !== null">
      <div class="cards-container">
        <PlaceCard v-for="place in places" :key="place.id" :place="place" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PlaceCard from './PlaceCard.vue';

export default {
  components: {
    PlaceCard
  },
  data() {
    return {
      useCurrentLocation: false,
      locationInput: '',
      prompt: '',
      loading: false,
      error: null,
      places: []
    };
  },
  methods: {
    async sendPrompt() {
      this.loading = true;
      this.error = null;
      try {
        let position = null;
        if (this.useCurrentLocation) {
          position = await this.getCurrentLocation();
        }

        const payload = {
          prompt: this.prompt,
          currentLocation: this.useCurrentLocation,
          latitude: position ? position.latitude : null,
          longitude: position ? position.longitude : null
        };

        const response = await axios.post('http://localhost:3000/api/sendPrompt', payload);

        // Check for success in response
        if (response.data.success) {
          // Proceed with further Maps API calls
          this.places = response.data.places // await this.getPlaces(response.data.keywords, response.data.primary_types);
        } else {
          this.error = response.data.message;
        }
      } catch (err) {
        this.error = 'Something went wrong';
      } finally {
        this.loading = false;
      }
    },
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  }
};
</script>

<style scoped>
textarea {
  margin: 30px;
  padding: 10px;
  width: 50%;
  min-height: 30%;
  resize: vertical;
  border-radius: 10px;
  border: none;
  background-color: #00000052;
  color: white;
  font-size: xx-large;
}

textarea:focus {
  outline: none;
}

.cards-container {
  width: 100%;
  padding-top: 30px;
}

.cards-container * + * {
  padding-top: 20px;
}
</style>