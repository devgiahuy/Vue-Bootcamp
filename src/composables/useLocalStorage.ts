// src/composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // 1. Đọc dữ liệu ban đầu từ localStorage (nếu có)
  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : defaultValue
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error)
      return defaultValue
    }
  }

  // 2. Khởi tạo reactive state
  const data = ref<T>(readValue()) as Ref<T>

  // 3. Tự động ghi vào localStorage khi data thay đổi
  watch(
    data,
    newValue => {
      try {
        if (newValue === undefined || newValue === null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      } catch (error) {
        console.warn(`[useLocalStorage] Error writing key "${key}":`, error)
      }
    },
    { deep: true } // Deep watch để theo dõi thay đổi bên trong Object/Array
  )

  return data
}
