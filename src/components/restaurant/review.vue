<script setup lang="ts">
defineProps({
  reviews: Array,
})
</script>

<template>
  <VCard
    class="va-company-review mb-4 last:mb-0"
    tag="li"
    v-for="review of reviews"
    :key="review.id"
  >
    <v-rating
      half-increments
      hover
      readonly
      :length="5"
      :size="32"
      :model-value="review.rating"
      active-color="primary"
      class="mt-3 ml-3"
    />
    <VCardText>
      {{ review.text }}
    </VCardText>
  </VCard>
</template>
