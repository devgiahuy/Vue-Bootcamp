<script setup lang="ts">
interface Props {
  label?: string
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
  pill?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'info',
  size: 'md',
  dot: false,
  pill: true
})
</script>

<template>
  <span :class="['badge', `badge--${variant}`, `size-${size}`, { 'badge--pill': pill }]">
    <span v-if="dot" class="badge__dot" />
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
.badge--pill {
  border-radius: var(--radius-full, 9999px);
}
/* Sizes */
.badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
/* Variants */
.badge--info {
  background-color: #e0f2fe;
  color: #0369a1;
}
.badge--success {
  background-color: #dcfce7;
  color: #15803d;
}
.badge--warning {
  background-color: #fef3c7;
  color: #b45309;
}
.badge--danger {
  background-color: #fee2e2;
  color: #b91c1c;
}
.badge--neutral {
  background-color: #f1f5f9;
  color: #475569;
}
/* Dot Indicator */
.badge__dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: currentColor;
}
</style>
