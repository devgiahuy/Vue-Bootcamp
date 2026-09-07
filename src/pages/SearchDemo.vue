<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const isSearching = ref(false)

// Debounce bằng watchEffect & onCleanup
watchEffect(onCleanup => {
  // Đánh dấu đang gõ
  if (searchQuery.value !== debouncedSearchQuery.value) {
    isSearching.value = true
  }

  // Khởi tạo timer trì hoãn 500ms
  const timer = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value
    isSearching.value = false
    console.log('🔍 Trigger search for:', searchQuery.value)
  }, 500)

  // Đăng ký hàm cleanup: nếu searchQuery thay đổi TRƯỚC 500ms -> Hủy timer cũ
  onCleanup(() => {
    clearTimeout(timer)
  })
})
</script>

<template>
  <input v-model="searchQuery" placeholder="Type to search..." />
  <p>Searching: {{ isSearching }}</p>
  <p>Debounced: {{ debouncedSearchQuery }}</p>
</template>
