<script setup lang="ts">
import { useFetchRestaurants } from '~/composables/restaurants';
import { averageRating } from "~/services/utils";

const { data: restaurants, isError } = useFetchRestaurants();

let filteredRestaurants = ref([restaurants]);

function updateFilter(note: number) {
  if (note === 0) {
    filteredRestaurants.value = restaurants.value;
  } else {
    const filtered = restaurants.value.filter(restaurant => {
      const average = averageRating(restaurant.reviews, 'rating');
      if (note === 1) return average < note+1
      return average >= note && average < note+1;
    });

    filteredRestaurants.value = filtered;
  }
}

</script>

<template>
  <div>
    <RatingFilter @updateFilter="updateFilter" class="mb-4"/>
    <LoadingError v-if="isError" />
    <div v-else-if="filteredRestaurants"
      class="card_container"
    >
      <RestaurantCard
        v-for="restaurant of filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
        class="card"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card_container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media screen and (min-width: 601px) {
    flex-direction: row;
    flex-wrap: wrap;
    .card {
      flex: 1 1 32%;
    }
  }
}
</style>