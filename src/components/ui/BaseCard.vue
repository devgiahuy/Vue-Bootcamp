<script setup lang="ts">
interface Props {
  title: string
  description?: string
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: false
})
</script>

<template>
  <div :class="['card', { 'card--hoverable': hoverable }]">
    <h3 class="card__title">{{ title }}</h3>
    <p v-if="description" class="card__description">{{ description }}</p>
    <!-- Slot cho nội dung tùy chỉnh — sẽ học kỹ ở Bài 13 -->
    <slot />
  </div>
</template>
