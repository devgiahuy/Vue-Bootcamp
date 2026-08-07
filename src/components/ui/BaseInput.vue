<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  error?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="input-group">
    <label v-if="label" class="input-group__label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input-group__input', { 'input-group__input--error': error }]"
      @input="handleInput"
    />
    <span v-if="error" class="input-group__error">{{ error }}</span>
  </div>
</template>
