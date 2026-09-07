<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'

// 1. Template Ref: Để truy cập phần tử DOM
const titleInputRef = ref<HTMLInputElement | null>(null)

// 2. Form state để demo v-model modifiers
const profileForm = reactive({
  username: '', // Sẽ dùng .trim
  age: 18, // Sẽ dùng .number
  bio: '' // Sẽ dùng .lazy
})

// 3. Quick Note State để demo Event Modifiers
const quickNote = ref('')
const noteList = ref<string[]>([])
const saveStatusMessage = ref('')

// Auto-focus vào input khi component được mount vào DOM
onMounted(() => {
  titleInputRef.value?.focus()
})

function handleFocusClick() {
  titleInputRef.value?.focus()
}

// Xử lý thêm ghi chú khi ấn Enter
function handleAddNote() {
  if (!quickNote.value.trim()) return
  noteList.value.push(quickNote.value.trim())
  quickNote.value = ''
}

// Xử lý xóa ghi chú đang gõ khi ấn Esc
function handleClearNote() {
  quickNote.value = ''
}

// Xử lý phím tắt Ctrl + S (hoặc Cmd + S trên Mac)
function handleQuickSave() {
  saveStatusMessage.value = `Đã lưu thành công lúc ${new Date().toLocaleTimeString()}!`
  setTimeout(() => {
    saveStatusMessage.value = ''
  }, 2500)
}

function handleSubmitProfile() {
  alert(`Dữ liệu gửi lên:
- Username: "${profileForm.username}" (type: ${typeof profileForm.username})
- Age: ${profileForm.age} (type: ${typeof profileForm.age})
- Bio: "${profileForm.bio}"`)
}
</script>

<template>
  <div class="template-demo" @keydown.ctrl.s.prevent="handleQuickSave">
    <h1>Template Syntax Nâng Cao (Bài 04)</h1>
    <p class="hint">
      💡 Mẹo: Bấm
      <kbd>Ctrl</kbd>
      +
      <kbd>S</kbd>
      ở bất kỳ đâu trên trang để thử Event Modifier!
    </p>

    <div v-if="saveStatusMessage" class="toast-alert">
      {{ saveStatusMessage }}
    </div>

    <!-- PHẦN 1: DYNAMIC CLASS BINDING DEMO -->
    <section class="card">
      <h2>1. Dynamic Class Binding (StatusBadge)</h2>
      <div class="badge-list">
        <StatusBadge status="online" pulse size="sm">Online (Small + Pulse)</StatusBadge>
        <StatusBadge status="online" size="md">Online (Medium)</StatusBadge>
        <StatusBadge status="busy" size="md">Busy</StatusBadge>
        <StatusBadge status="away" outline size="md">Away (Outline)</StatusBadge>
        <StatusBadge status="offline" size="lg">Offline (Large)</StatusBadge>
      </div>
    </section>

    <!-- PHẦN 2: TEMPLATE REF DEMO -->
    <section class="card">
      <h2>2. Template Ref (Truy cập DOM trực tiếp)</h2>
      <div class="row">
        <input
          ref="titleInputRef"
          type="text"
          class="input-field"
          placeholder="Ô này được tự động Focus khi load trang..."
        />
        <button class="btn btn--secondary" @click="handleFocusClick">🎯 Focus lại vào ô</button>
      </div>
    </section>

    <!-- PHẦN 3: V-MODEL MODIFIERS DEMO -->
    <section class="card">
      <h2>3. v-model Modifiers (.trim, .number, .lazy)</h2>
      <form class="form" @submit.prevent="handleSubmitProfile">
        <!-- .trim: Tự cắt space thừa -->
        <div class="form-group">
          <label>Username (.trim):</label>
          <input
            v-model.trim="profileForm.username"
            type="text"
            class="input-field"
            placeholder="Thử gõ cách đầu và đuôi:   admin   "
          />
          <small>
            Giá trị thực tế:
            <code>"{{ profileForm.username }}"</code>
          </small>
        </div>

        <!-- .number: Tự parse sang số thay vì chuỗi -->
        <div class="form-group">
          <label>Tuổi (.number):</label>
          <input v-model.number="profileForm.age" type="number" class="input-field" />
          <small>
            Kiểu dữ liệu JS:
            <code>{{ typeof profileForm.age }}</code>
            (Giá trị: {{ profileForm.age }})
          </small>
        </div>

        <!-- .lazy: Chỉ update khi blur ra ngoài (change event) -->
        <div class="form-group">
          <label>Bio (.lazy):</label>
          <input
            v-model.lazy="profileForm.bio"
            type="text"
            class="input-field"
            placeholder="Gõ xong và click chuột ra ngoài mới cập nhật..."
          />
          <small>
            State hiện tại:
            <code>"{{ profileForm.bio }}"</code>
          </small>
        </div>

        <button type="submit" class="btn btn--primary">Gửi Form (@submit.prevent)</button>
      </form>
    </section>

    <!-- PHẦN 4: EVENT KEY MODIFIERS DEMO -->
    <section class="card">
      <h2>4. Key Modifiers (@keyup.enter, @keyup.esc)</h2>
      <div class="form-group">
        <label>Thêm ghi chú nhanh:</label>
        <input
          v-model="quickNote"
          type="text"
          class="input-field"
          placeholder="Nhập ghi chú rồi ấn [Enter] để thêm, [Esc] để xóa trắng..."
          @keyup.enter="handleAddNote"
          @keyup.esc="handleClearNote"
        />
        <small>
          Bấm
          <b>Enter</b>
          để add vào list, bấm
          <b>Esc</b>
          để clear ô nhập.
        </small>
      </div>

      <ul class="note-list">
        <li v-for="(note, index) in noteList" :key="index">📌 {{ note }}</li>
        <li v-if="noteList.length === 0" class="empty-note">
          Chưa có ghi chú nào. Hãy nhập và ấn Enter!
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.template-demo {
  max-width: 750px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: var(--font-family, sans-serif);
}

.hint {
  color: var(--color-text-muted, #64748b);
  margin-bottom: 1.5rem;
}

kbd {
  background-color: #e2e8f0;
  color: #1e293b;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
  border: 1px solid #cbd5e1;
}

.toast-alert {
  background-color: #22c55e;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md, 0.5rem);
  margin-bottom: 1rem;
  font-weight: 500;
  animation: fadeIn 200ms ease;
}

.card {
  background: var(--color-bg-card, #ffffff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--radius-md, 0.5rem);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
}

.card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.15rem;
  color: var(--color-text-main, #0f172a);
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.row {
  display: flex;
  gap: 0.5rem;
}

.input-field {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border, #cbd5e1);
  border-radius: var(--radius-md, 0.375rem);
  outline: none;
  font-size: 0.95rem;
}

.input-field:focus {
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group small {
  color: var(--color-text-muted, #64748b);
  font-size: 0.8rem;
}

.form-group code {
  color: #d946ef;
  background: #fdf4ff;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md, 0.375rem);
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: opacity var(--transition-fast, 150ms ease);
}

.btn--primary {
  background-color: var(--color-primary, #3b82f6);
  color: #fff;
}

.btn--secondary {
  background-color: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}

.btn:hover {
  opacity: 0.9;
}

.note-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0 0;
}

.note-list li {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border, #f1f5f9);
}

.empty-note {
  color: var(--color-text-muted, #94a3b8);
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
