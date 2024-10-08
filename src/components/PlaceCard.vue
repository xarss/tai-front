<template>
    <div class="card">
        <a :href="place.googleMapsUri">
            <img :src="getPlacePhoto(place)" target="_blank" alt="Place Image" class="card-img" />
            <div class="place-details">
                <h3>{{ place.displayName.text }}</h3>
                <p v-if="place.primaryTypeDisplayName"><b> {{ place.primaryTypeDisplayName.text }}</b></p>
                <p>{{ place.formattedAddress }}</p>
                <p v-if="place.rating">Rating: {{ place.rating }} ({{ place.userRatingCount }} reviews)</p>
                <p v-if="place.currentOpeningHours" class="open-status" :style="{backgroundColor:place.currentOpeningHours.openNow ? 'green' : 'red'}">
                    {{ place.currentOpeningHours.openNow ? 'Open Now' : 'Closed' }}
                </p>
                <p v-else  class="open-status" :style="{backgroundColor:'gray'}">
                    Unkown
                </p>
            </div>
        </a>
    </div>
</template>

<script>
const MAPS_API_KEY = 'AIzaSyC4cCmQZbKylUvOFhg0Fbh1qZPgchJuXzs';

export default {
    props: {
        place: {
            type: Object,
            required: true
        }
    },
    methods: {
        getPlacePhoto(place) {
            try {
                if (place.photos !== null && place.photos.length) {
                return `https://places.googleapis.com/v1/${place.photos[0].name}/media?&key=${MAPS_API_KEY}&max_height_px=1000`;
            }
             // Fallback placeholder image if no photo available
            } catch (error) {
                return "https://via.placeholder.com/100"; 
            }
            
        }
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    /* Ensures the card stays in the flow when scaling */
    transform-origin: center;
}

.card:hover {
    transform: scale(1.05);
    /* Increases size by 5% */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    /* Slightly deeper shadow on hover */
}

.card-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.place-details {
    padding: 16px;
    background-color: #292929;
}

.place-details h3 {
    margin: 0 0 8px;
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
    padding: 5px;
    padding-top: 5px !important;
    margin: 10px 0 0 0;
    width: fit-content;
    border-radius: 16px;
    height: 16px;
}
</style>