<template>
    <div class="row">
        <div class="question-container">
            <div class="question">{{ answer.question }}</div>
        </div>

        <div class="answer">
            <b style="">Assistant: </b>
            <span :style="answer.success ? {} : { color: 'crimson' }">
                {{ answer.text }}
            </span>
        </div>
        <div class="cards-container">
            <PlaceCard v-for="place in answer.topPlaces(resultCount)" :key="place.id" :place="place" />
        </div>
    </div>
</template>

<script>
import PlaceCard from './PlaceCard.vue';

export default {
    props: ['answer', 'resultCount'],
    components: {
        PlaceCard
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

.answer {
    margin: 1em 0;
    font-size: 1em;
}
</style>