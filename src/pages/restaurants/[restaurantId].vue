<script setup lang="ts">
import { reactive } from "vue";
import { averageRating } from "~/services/utils";
import { useFetchRestaurant } from '~/composables/restaurants';


const { params } = useRoute();

const state = reactive({
  restaurant: {},
  averageRating: "",
});

onMounted(async () => {
  const { data } = await useFetchRestaurant({ restaurantId: params.restaurantId });
  const restaurant = data.value;
  console.log("restaurant", restaurant)

  if (restaurant) {
    const reviews = restaurant?.reviews;
    const average = averageRating(reviews, 'rating');

    state.restaurant = restaurant;
    state.averageRating = average;
  }
});
</script>


<template>
  <div class="grid grid-cols-[minmax(0,_1fr)_16rem] gap-6 sm-16">
    <VCard v-if="state.restaurant">
      <VImg
        v-for="photo in state.restaurant.photos"
        :key="photo"
        :src="state.restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ state.restaurant.name }}
        </VCardTitle>
        <v-rating
          half-increments
          hover
          readonly
          :length="5"
          :size="32"
          :model-value="state.averageRating"
          active-color="primary"
          class="mx-3"
        />
      </VImg>
      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="state.restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ state.restaurant.phone }}
              <VAlert type="warning">
                ↑ TODO: we would like to display the formatted phone
              </VAlert>
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside>
      <VAlert type="warning">
        TODO: this should go under the company card on small device
      </VAlert>
      <ul class="pa-0">
        <RestaurantReview />
      </ul>
    </aside>
  </div>
</template>
