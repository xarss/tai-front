<template>
  <div class="assistant-container">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!--Answers List-->
    <div class="answers">
      <AnswerRow @update-loading="updateLoading" @add-answer="addAnswer" @delete-answer="deleteAnswer"
        v-for="answer in answers" :key="answer.id" :answer="answer" :resultCount="preferences.resultCount" />
    </div>

    <span v-if="answers.length > 0" class="spacer"></span>

    <!--Textboxes-->
    <div v-if="answers.length === 0" class="questions-container">
      <h1>What is your question?</h1>
      <label style="font-size: larger;">
        <input type="checkbox" v-model="useCurrentLocation" /> Use Current Location
      </label><br>
      <div class="textarea-container">
        <textarea @input="resizeTextarea" ref="textarea" @keydown="handleKeyDown" class="bottom-textarea" rows="1"
          v-model="prompt" placeholder="Ask Assistant"></textarea>
        <button @click="getPlaces" class="run-button material-symbols-rounded">
          play_arrow
        </button>
      </div>
    </div>
    <div v-else class="bottom-question">
      <div class="textarea-container">
        <textarea @input="resizeTextarea" ref="textarea" @keydown="handleKeyDown" class="bottom-textarea" rows="1"
          v-model="prompt" placeholder="Ask Assistant"></textarea>
        <button @click="getPlaces" class="run-button material-symbols-rounded">
          play_arrow
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import { fetchPlaces } from '@/services/placesService';
import AnswerRow from './AnswerRow.vue';
import Answer from '@/classes/Answer';

export default {
  props: ['preferences'],
  components: {
    AnswerRow
  },
  data() {
    return {
      useCurrentLocation: false,
      locationInput: '',
      prompt: '',
      loading: false,
      error: null,
      success: false,
      answers: []
    };
  },
  computed() {
    this.localPreferences = this.preferences;
  },
  methods: {
    updateLoading(state) {
      this.loading = state;
    },
    handleKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        // Prevents a new line from being added
        event.preventDefault();
        this.getPlaces(); // Call getPlaces if only Enter is pressed
      }
    },
    resizeTextarea() {
      const textarea = this.$refs.textarea;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight - 20}px`;
    },
    async getPlaces() {
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
          longitude: position ? position.longitude : null,
          preferences: this.preferences
        };
        const data = await fetchPlaces(payload);

        this.answers.push(
          new Answer(this.prompt, data.message, data.places, data.success)
        )
      } catch (err) {
        this.answers.push(
          new Answer(this.prompt, "Something went wrong", [], false)
        )
      } finally {
        this.loading = false;
        this.prompt = "";
      }
    },
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position)
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
    },
    deleteAnswer(answerId) {
      this.answers = this.answers.filter(answer => answer.id !== answerId);
    },
    addAnswer(answer) {
      this.answers.push(answer);
    }
  }
};
</script>

<style scoped>
.initial-textarea {
  overflow: hidden;
  margin: 30px;
  padding: 10px;
  width: 50%;
  min-height: 30%;
  resize: none;
  border-radius: 10px;
  border: none;
  background-color: #333;
  color: #F7F7FF;
  font-size: xx-large;
}

.bottom-textarea {
  overflow: hidden;
  width: 80%;
  padding: 10px 1em;
  resize: none;
  border-radius: 1.5em;
  border: none;
  background-color: #333;
  color: #F7F7FF;
  font-size: xx-large;
}

textarea:focus {
  outline: none;
}

.cards-container {
  width: 100%;
  padding-top: 30px;
}

.cards-container *+* {
  padding-top: 20px;
}

.answers {
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100% - 2em);
}

.questions-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.bottom-question {
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.assistant-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #333;
  border-top: 6px solid #F7F7FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Spinner Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.textarea-container {
  display: flex;
  position: relative;
  width: 80%;
}

.bottom-textarea {
  width: 100%;
  padding: 10px 1em;
  padding-right: 3em;
  /* Extra space for button */
  resize: none;
  border-radius: 1.5em;
  border: none;
  background-color: #333;
  color: #F7F7FF;
  font-size: xx-large;
}

.run-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #F7F7FF;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  outline: none;
  margin: 0;
  transition: opacity 0.5s;
}

.run-button:hover {
  opacity: 0.7;
}
</style>