<!-- Vue: BaseButton.vue -->
<script setup lang="ts">
// defineProps và defineEmits là compiler macros
// Không cần import, Vue compiler tự hiểu
interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: []
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button :class="['btn', `btn--${variant}`]" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="btn__spinner"></span>

    <template v-else>
      <span v-if="$slots['left-icon']" class="btn__icon">
        <slot name="'left-icon'"></slot>
      </span>

      <span class="btn__content">{{ label }}</span>

      <span v-if="$slots['right-icon']" class="btn__icon">
        <slot name="'right-icon'"></slot>
      </span>
    </template>
  </button>
</template>

<style scoped>
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
