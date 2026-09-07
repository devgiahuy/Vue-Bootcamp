<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

// State
const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
const newTodo = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')

// Computed - derived state
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.done)
    case 'completed':
      return todos.value.filter(t => t.done)
    case 'all':
    default:
      return todos.value
  }
})

const completedCount = computed(() => todos.value.filter(t => t.done).length)

const progress = computed(() => {
  if (todos.value.length === 0) return 0
  return Math.round((completedCount.value / todos.value.length) * 100)
})

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    done: false
  })
  newTodo.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}

watch(
  todos,
  newTodos => {
    localStorage.setItem('todos', JSON.stringify(newTodos))
  },
  { deep: true }
)

watchEffect(() => {
  document.title = `Todo (${completedCount.value}/${todos.value.length})`
})
</script>

<template>
  <div class="reactivity-demo">
    <header class="demo-header">
      <h1>Reactivity Demo (Bài 03)</h1>
      <p class="subtitle">Quản lý State với ref, computed, watch và watchEffect</p>
    </header>

    <!-- Progress card -->
    <div class="card progress-card">
      <div class="progress-info">
        <span>Tiến độ hoàn thành</span>
        <strong>{{ completedCount }}/{{ todos.length }} ({{ progress }}%)</strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <!-- Add todo input -->
    <form class="todo-form" @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Nhập công việc cần làm..."
        class="todo-input"
      />
      <button type="submit" class="btn-primary" :disabled="!newTodo.trim()">
        Thêm việc
      </button>
    </form>

    <!-- Filters -->
    <div class="filters">
      <button
        type="button"
        class="filter-btn"
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        Tất cả ({{ todos.length }})
      </button>
      <button
        type="button"
        class="filter-btn"
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Chưa xong ({{ todos.length - completedCount }})
      </button>
      <button
        type="button"
        class="filter-btn"
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Đã xong ({{ completedCount }})
      </button>
    </div>

    <!-- Todo list -->
    <ul class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item"
        :class="{ done: todo.done }"
      >
        <label class="todo-label">
          <input
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo(todo.id)"
          />
          <span class="todo-text">{{ todo.text }}</span>
        </label>
        <button
          type="button"
          class="btn-delete"
          title="Xóa công việc"
          @click="removeTodo(todo.id)"
        >
          ✕
        </button>
      </li>

      <li v-if="filteredTodos.length === 0" class="empty-state">
        Không có công việc nào trong danh sách.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.reactivity-demo {
  max-width: 580px;
  margin: 2rem auto;
  padding: 1.75rem;
  background: var(--color-background-soft, #ffffff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}

.demo-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.demo-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: 0.875rem;
  color: #64748b;
}

.card {
  padding: 1rem;
  border-radius: 8px;
  background: var(--color-background-mute, #f8fafc);
  border: 1px solid var(--color-border, #e2e8f0);
  margin-bottom: 1.25rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
}

.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.todo-input {
  flex: 1;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--color-border, #cbd5e1);
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  background: var(--color-background, #fff);
  color: inherit;
}

.todo-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.btn-primary {
  padding: 0.65rem 1.25rem;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-btn {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--color-border, #cbd5e1);
  border-radius: 6px;
  background: transparent;
  font-size: 0.825rem;
  cursor: pointer;
  color: inherit;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: var(--color-background-mute, #f1f5f9);
}

.filter-btn.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 6px;
  background: var(--color-background, #fff);
  transition: border-color 0.2s;
}

.todo-item:hover {
  border-color: #cbd5e1;
}

.todo-item.done {
  opacity: 0.75;
}

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  flex: 1;
}

.btn-delete {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  line-height: 1;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #94a3b8;
  font-size: 0.9rem;
}
</style>
