<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';
import { averageRating } from "~/services/utils";

const props = defineProps<{
  restaurant: Restaurant
}>();
const average = averageRating(props.restaurant.reviews, 'rating')
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant?.name }}
    </VCardTitle>
    <v-rating
      half-increments
      hover
      readonly
      :length="5"
      :size="32"
      :model-value="average"
      active-color="primary"
      class="mx-3"
    />
    <VCardText>
      <RestaurantLocation :location="restaurant?.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant?.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
