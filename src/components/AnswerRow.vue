<template>
    <div class="row">
        <div class="question-container">
            <div class="question">{{ answer.question }}</div>
        </div>

        <div class="answer-container">
            <div class="answer">
                <span class="material-symbols-rounded" style="padding-right: 1em;"> robot_2 </span>
                <span v-html="formattedMarkdown" :style="answer.success ? {} : { color: 'crimson' }">
                </span>
            </div>
            <button @click="deleteAnswer" class="delete-button material-symbols-rounded">delete</button>
        </div>

        <div class="cards-container">
            <PlaceCard @update-loading="updateLoading" @add-answer="addAnswer" v-for="place in answer.topPlaces(resultCount)" :key="place.id"
                :place="place" />
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';
import PlaceCard from './PlaceCard.vue';
// import marked from 'marked';

export default {
    props: ['answer', 'resultCount'],
    components: {
        PlaceCard
    },
    methods: {
        addAnswer(answer) {
            this.$emit("add-answer", answer);
        },
        deleteAnswer() {
            this.$emit('delete-answer', this.answer.id);
        },
        updateLoading(state) {
            this.$emit("update-loading", state);
        }
    },
    computed: {
        formattedMarkdown() {
            return marked(this.answer.text);
        }
    }
};
</script>

<style scoped>
.row {
    width: 80%;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
}

.delete-button {
    color: crimson;
    background-color: transparent;
}

.cards-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.cards-container .card+.card {
    margin-left: 20px;
}

.question-container {
    background-color: transparent;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.question {
    max-width: 70%;
    background-color: #333;
    min-height: 1em;
    padding: 0.5em 1em;
    border-radius: 2em;
    font-size: 1em;
}

.answer-container {
    width: 100%;
    display: flex;
}

.answer {
    align-items: center;
    display: flex;
    flex-grow: 1;
    margin: 1em 0;
    font-size: 1em;
}
</style>