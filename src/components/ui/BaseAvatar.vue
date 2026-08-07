<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  src?: string
  name?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  name: 'User',
  alt: 'User avatar',
  size: 'md',
  shape: 'circle'
})

// State quản lý lỗi load ảnh
const hasImageError = ref(false)

// Reset lại trạng thái lỗi khi prop src thay đổi
watch(
  () => props.src,
  () => {
    hasImageError.value = false
  }
)

// xử lí sự keienj khi img bị 404/lỗi
function handleImageError() {
  hasImageError.value = true
}

// Hàm tính chữ cái đại diện (Initials) từ tên
// Ví dụ: "Nguyen Van A" -> "NA", "John Doe" -> "JD"
const Initials = computed(() => {
  if (!props.name) return '?'
  const words = props.name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
})
</script>

<template>
  <div :class="[`avatar-size-${size}`, `avatar-shape-${shape}`]">
    <img
      v-if="src && !hasImageError"
      :src="src"
      :alt="alt"
      class="avatar__img"
      @error="handleImageError"
    />
    <span v-else class="avatar__initials">{{ Initials }}</span>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  overflow: hidden;
  background-color: var(--color-primary);
  color: #ffffff;
  font-weight: 600;
  flex-shrink: 0;
}
/* Shapes */
.avatar--circle {
  border-radius: var(--radius-full, 9999px);
}
.avatar--square {
  border-radius: var(--radius-md, 0.5rem);
}
/* Sizes */
.avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}
.avatar--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.875rem;
}
.avatar--lg {
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
}
.avatar--xl {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}
.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
