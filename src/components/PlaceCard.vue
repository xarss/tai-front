<template>
    <div class="card">
        <img :src="placePhotoUrl" target="_blank" alt="Place Image" class="card-img" />
        <div class="place-details">
            <h3>{{ place.name }}<a :href="place.mapsUri" target="_blank"
                    class="material-symbols-rounded">open_in_new</a></h3>
            <span class="spacer"></span>
            <p v-if="place.type" class="type-name"> {{ place.type }}</p>

            <span class="spacer"></span>
            <p v-if="place.rating">Rating: {{ place.rating }} ({{ place.ratingCount }} reviews)</p>
            <span class="spacer"></span>
            <div class="card-bottom">
                <p class="open-status" :style="{ backgroundColor: place.open ? 'green' : 'red' }">
                    {{ place.open ? 'Open' : 'Closed' }}
                </p>
                <span class="spacer"></span>
                <button @click="generateOverview">Overview</button>
                <!-- <p class="score"> {{ place.score }} </p> -->
            </div>
        </div>
    </div>
</template>

<script>
import Answer from '@/classes/Answer';
import { fetchPlaceOverview, fetchPlacePhoto } from '@/services/placesService';

export default {
    props: ['place'],
    data() {
        return {
            placePhotoUrl: null, // Reactive property to store the photo URL
        };
    },
    mounted() {
        this.loadPlacePhoto();
    },
    methods: {
        async loadPlacePhoto() {
            try {
                if (this.place.photoRef) {
                    const data = await fetchPlacePhoto(this.place.photoRef)

                    this.placePhotoUrl = data.url; // Set the photo URL
                } else {
                    // Use a placeholder if no photo is available
                    this.placePhotoUrl = 'https://via.placeholder.com/100';
                }
            } catch (error) {
                this.placePhotoUrl = 'https://via.placeholder.com/100'; // Fallback
            }
        },
        async generateOverview() {
            this.$emit("update-loading", true);
            try {
                const data = await fetchPlaceOverview(this.place);

                this.$emit("add-answer", new Answer(`Generate overview for ${this.place.name}`, data.message, [], data.success));
            } catch (err) {
                this.$emit("add-answer", new Answer(this.prompt, "Something went wrong", [], false));
            } finally {
                this.$emit("update-loading", false);
            }
        },
    },
};
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    width: 500px;
    flex-grow: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background-color: #292929;
    /* Ensures the card stays in the flow when scaling */
    transform-origin: center;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.place-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 16px;
}

.place-details h3 {
    margin: 0;
    display: flex;
    font-size: 1.2em;
}

.place-details p {
    margin: 4px 0;
    font-size: 0.9em;
}

a {
    text-decoration: none;
    color: white;
}

.open-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    padding-top: 5px !important;
    margin: 10px 0 0 0;
    width: fit-content;
    border-radius: 16px;
    height: 16px;
}

.type-name {
    font-weight: bold;
    font-size: 1em;
}

.card-bottom {
    display: flex;
    width: 100%;
    align-items: center;
}
</style>