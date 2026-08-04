# 🚀 Vue.js Production Bootcamp — 24 Bài Từ Zero Đến Deploy

> **Dành cho**: Frontend Developer có nền tảng React/Next.js chuyển sang Vue.js
> **Tech Stack**: Vue 3 (Composition API) + TypeScript + Vite + Pinia + Vue Router
> **Mục tiêu cuối**: 2 project portfolio — Landing Page & Todo Dashboard (CRUD + API thật)
> **Project hiện tại**: [vue-project](file:///d:/Study/Vue.js/vue-project)

---

## 📋 Mục lục tổng quan

| Phase | Bài | Chủ đề | Độ khó |
|-------|-----|--------|--------|
| **Foundation** | 01–06 | Setup, Component, Reactivity, Template, Lifecycle, Styling | ⭐ |
| **Core Features** | 07–12 | Composables, Router, Pinia, Forms, API, Error Handling | ⭐⭐ |
| **Advanced** | 13–18 | Slots, Provide/Inject, Transition, Directive, Plugin, Testing | ⭐⭐⭐ |
| **Production** | 19–24 | Performance, SSR, i18n, Auth, Landing Page, Todo Dashboard | ⭐⭐⭐⭐ |

---

# PHASE 1: FOUNDATION (Bài 01–06)

---

## 📘 Bài 01: Khởi tạo Project và Cấu hình

### 🎯 Mục tiêu
- Hiểu cấu trúc thư mục chuẩn của một dự án Vue 3 + Vite + TypeScript
- Cấu hình ESLint, Prettier, EditorConfig cho team
- Thiết lập alias path `@/` và hiểu vì sao cần alias
- So sánh cách khởi tạo project giữa Vue và Next.js

### 📚 Kiến thức cần học

#### 1. Vite vs Next.js Build System

| Đặc điểm | Vite (Vue) | Next.js (React) |
|-----------|-----------|-----------------|
| Bundler | Rollup (prod) + esbuild (dev) | Turbopack / Webpack |
| Dev Server | Native ESM, HMR cực nhanh | HMR qua Webpack/Turbopack |
| Config file | `vite.config.ts` | `next.config.js` |
| SSR built-in | Không (cần Nuxt) | Có |
| Entry point | `index.html` → `main.ts` | `_app.tsx` / `layout.tsx` |

> **💡 Insight**: Vite không phải framework, nó là build tool. Vue + Vite ≈ React + Vite (cũng hoàn toàn khả thi). Next.js = React + Framework (routing, SSR, API routes...). Nuxt.js = Vue + Framework (tương đương Next.js).

#### 2. Cấu trúc thư mục chuẩn Production

```
src/
├── assets/          # Static assets (images, fonts, SVGs)
├── components/      # Reusable UI components
│   ├── ui/          # Primitive components (Button, Input, Modal...)
│   └── common/      # Shared business components (Header, Footer...)
├── composables/     # Custom hooks (tương đương React custom hooks)
├── constants/       # App-wide constants, enums
├── layouts/         # Layout wrappers (Default, Auth, Dashboard...)
├── pages/           # Route-level components (page views)
├── router/          # Vue Router configuration
├── services/        # API service layer (axios instances, API calls)
├── stores/          # Pinia stores (state management)
├── styles/          # Global styles, CSS variables, mixins
├── types/           # TypeScript type definitions
├── utils/           # Helper functions, formatters
├── views/           # Có thể dùng thay pages/ (convention khác nhau)
├── App.vue          # Root component
└── main.ts          # Application entry point
```

**So sánh với Next.js (App Router):**

```
app/                      ← Vue: pages/ hoặc views/
├── layout.tsx            ← Vue: layouts/DefaultLayout.vue
├── page.tsx              ← Vue: pages/HomePage.vue
├── about/page.tsx        ← Vue: pages/AboutPage.vue
components/               ← Vue: components/ (giống nhau)
hooks/                    ← Vue: composables/
lib/                      ← Vue: utils/ + services/
store/ (Redux/Zustand)    ← Vue: stores/ (Pinia)
types/                    ← Vue: types/ (giống nhau)
```

#### 3. File Entry Point — `main.ts`

```typescript
// Vue: main.ts — Phải tự tay wire mọi thứ
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())  // Plugin pattern — không có trong React
app.use(router)
app.mount('#app')
```

```tsx
// React/Next.js: _app.tsx hoặc layout.tsx — Framework tự wire
// Providers wrap component tree (Context pattern)
export default function RootLayout({ children }) {
  return (
    <Providers>       {/* Redux/Zustand Provider */}
      {children}
    </Providers>
  )
}
```

> **🔑 Khác biệt quan trọng**: Vue dùng **Plugin pattern** (`app.use()`), còn React dùng **Provider pattern** (Component wrapping). Plugin pattern gọn hơn nhưng ít explicit hơn.

#### 4. Single File Component (SFC) — Vũ khí đặc trưng của Vue

```vue
<!-- Vue SFC: 3 sections trong 1 file -->
<script setup lang="ts">
// Logic ở đây — tương đương function body của React component
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <!-- Template ở đây — tương đương JSX return -->
  <button @click="count++">{{ count }}</button>
</template>

<style scoped>
/* Style ở đây — scoped tự động, không cần CSS Modules */
button { color: blue; }
</style>
```

```tsx
// React equivalent: tách riêng hoặc dùng CSS Modules
import { useState } from 'react'
import styles from './Counter.module.css'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button className={styles.button} onClick={() => setCount(c => c + 1)}>
      {count}
    </button>
  )
}
```

> **🔑 SFC = HTML + JS + CSS cùng 1 file**, nhưng mỗi phần có scope riêng. `<style scoped>` tự động thêm attribute selector để CSS không leak ra ngoài. Không cần CSS Modules, không cần styled-components.

### 📝 Yêu cầu bài tập

1. ✅ Kiểm tra project đã chạy được (`npm run dev`)
2. ✅ Tìm hiểu từng file config: `vite.config.ts`, `tsconfig.json`, `eslint.config.ts`
3. ✅ Tạo cấu trúc thư mục chuẩn trong `src/` (đã có sẵn trong project)
4. ✅ Tạo file `src/styles/variables.css` với CSS custom properties
5. ✅ Xóa code template mặc định, thay bằng component `HelloWorld` đơn giản

### 🔧 Các bước thực hiện

**Bước 1**: Kiểm tra project chạy được
```bash
npm run dev
# Truy cập http://localhost:5173
```

**Bước 2**: Tạo file CSS variables
```css
/* src/styles/variables.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;

  /* Typography */
  --font-family: 'Inter', system-ui, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
}
```

**Bước 3**: Import vào `main.ts`
```typescript
import './styles/variables.css'
import './assets/main.css'
```

**Bước 4**: Clean up `App.vue`
```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: var(--font-family);
  color: var(--color-text);
  min-height: 100vh;
}
</style>
```

### 🏭 Tiêu chuẩn Production
- [ ] Không có code template mặc định còn sót
- [ ] CSS variables được tổ chức có hệ thống (design tokens)
- [ ] ESLint + Prettier chạy không lỗi: `npm run lint`
- [ ] TypeScript strict mode enabled
- [ ] Alias `@/` hoạt động chính xác
- [ ] `.editorconfig` thống nhất code style cho cả team

### ⚠️ Những lỗi thường gặp
1. **Quên import CSS variables** → Styles không nhận custom properties
2. **Alias `@/` không hoạt động** → Phải config cả trong `vite.config.ts` VÀ `tsconfig.app.json`
3. **ESLint conflict với Prettier** → Cần `eslint-config-prettier` để tắt rules xung đột
4. **Dùng `var()` trong `<style scoped>`** → Hoạt động bình thường vì CSS variables là global

### 🏆 Challenge nâng cao
- Thêm dark mode support bằng CSS variables + `prefers-color-scheme`
- Cấu hình `env` files (`.env.development`, `.env.production`) cho API URL
- Thêm `husky` + `lint-staged` để chạy lint trước mỗi commit

### ✅ Checklist hoàn thành
- [ ] Project chạy được tại `localhost:5173`
- [ ] Cấu trúc thư mục đầy đủ theo chuẩn
- [ ] CSS design tokens trong `variables.css`
- [ ] Lint pass: `npm run lint` không lỗi
- [ ] Build pass: `npm run build` không lỗi
- [ ] Hiểu được flow: `index.html` → `main.ts` → `App.vue` → `RouterView`

### 📌 Git commit đề xuất
```
feat: initialize project structure and design tokens

- Set up folder structure (components, pages, composables, stores, etc.)
- Add CSS design tokens in variables.css
- Clean up default template code
- Configure ESLint + Prettier
```

---

## 📘 Bài 02: Component, Props và Emits

### 🎯 Mục tiêu
- Tạo component theo chuẩn SFC (Single File Component)
- Truyền dữ liệu qua Props với TypeScript
- Gửi event từ child lên parent qua Emits
- Hiểu one-way data flow trong Vue (giống React)

### 📚 Kiến thức cần học

#### 1. Tạo Component — `<script setup>` vs React Function Component

```vue
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
  loading: false,
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
  <button
    :class="['btn', `btn--${variant}`]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__spinner" />
    <span v-else>{{ label }}</span>
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
```

```tsx
// React equivalent: BaseButton.tsx
interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent) => void
  onFocus?: () => void
}

export default function BaseButton({
  label,
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  onFocus,
}: Props) {
  function handleClick(event: React.MouseEvent) {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  }

  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      onClick={handleClick}
      onFocus={onFocus}
    >
      {loading ? <span className="btn__spinner" /> : <span>{label}</span>}
    </button>
  )
}
```

#### 2. So sánh chi tiết Props

| Khía cạnh | Vue 3 | React |
|-----------|-------|-------|
| Khai báo | `defineProps<Props>()` | Destructure từ params |
| Default values | `withDefaults()` | Default params `= value` |
| Required | Mặc định required (trừ `?`) | Dùng TypeScript `?` |
| Validation | Runtime + compile-time | Chỉ compile-time (TS) |
| Access trong template | Trực tiếp: `{{ label }}` | Phải qua variable |
| Reactivity | Props tự reactive | Props tự trigger re-render |

#### 3. So sánh Emits vs Callback Props

```vue
<!-- Vue: Parent sử dụng component -->
<template>
  <BaseButton
    label="Submit"
    variant="primary"
    @click="handleSubmit"
    @focus="handleFocus"
  />
</template>
```

```tsx
// React: Parent sử dụng component
<BaseButton
  label="Submit"
  variant="primary"
  onClick={handleSubmit}
  onFocus={handleFocus}
/>
```

> **🔑 Khác biệt cốt lõi**:
> - Vue dùng **event system** (`emit` + `@event`): child "phát" event, parent "lắng nghe"
> - React dùng **callback props** (`onClick`): parent truyền function xuống, child gọi function
> - Kết quả giống nhau, nhưng Vue tách biệt rõ ràng hơn giữa "dữ liệu đi xuống" (props) và "sự kiện đi lên" (emits)

#### 4. Template Directives — Thay thế JSX Logic

```vue
<!-- Vue: Dùng directives -->
<template>
  <!-- v-if / v-else-if / v-else = Conditional rendering -->
  <div v-if="status === 'loading'">Loading...</div>
  <div v-else-if="status === 'error'">Error!</div>
  <div v-else>{{ data }}</div>

  <!-- v-for = List rendering (phải có :key) -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>

  <!-- v-show = Toggle display (CSS display: none) -->
  <div v-show="isVisible">Visible content</div>

  <!-- v-bind = Dynamic attributes (shorthand :) -->
  <img :src="imageUrl" :alt="imageAlt" />

  <!-- v-on = Event listeners (shorthand @) -->
  <button @click="handleClick">Click me</button>

  <!-- v-model = Two-way binding (không có equivalent trực tiếp trong React) -->
  <input v-model="searchTerm" />
</template>
```

```tsx
// React equivalent
return (
  <>
    {/* Conditional: ternary hoặc && */}
    {status === 'loading' ? <div>Loading...</div>
     : status === 'error' ? <div>Error!</div>
     : <div>{data}</div>}

    {/* List: .map() */}
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>

    {/* Toggle: conditional render hoặc style */}
    {isVisible && <div>Visible content</div>}

    {/* Dynamic attributes */}
    <img src={imageUrl} alt={imageAlt} />

    {/* Events */}
    <button onClick={handleClick}>Click me</button>

    {/* Two-way binding: phải tự handle */}
    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
  </>
)
```

> **💡 v-model deep dive**: `v-model="x"` là syntactic sugar cho `:modelValue="x" @update:modelValue="x = $event"`. Tương đương việc bạn tự viết `value` + `onChange` trong React, nhưng Vue wrap lại cho gọn.

### 📝 Yêu cầu bài tập
1. Tạo component `BaseButton` với props: `label`, `variant`, `disabled`, `loading`
2. Tạo component `BaseInput` với `v-model` support
3. Tạo component `BaseCard` hiển thị title + description
4. Tạo page `ComponentsDemo.vue` sử dụng 3 components trên
5. Tất cả components phải có TypeScript interface cho props

### 🔧 Các bước thực hiện

**Bước 1**: Tạo `src/components/ui/BaseButton.vue` (code ở trên)

**Bước 2**: Tạo `src/components/ui/BaseInput.vue`
```vue
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
  disabled: false,
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
```

> **🔑 v-model trên custom component**: Khi parent dùng `<BaseInput v-model="name" />`, Vue tự động truyền prop `modelValue` và lắng nghe event `update:modelValue`. Đây chính là convention mà bạn cần follow.

**Bước 3**: Tạo `src/components/ui/BaseCard.vue`
```vue
<script setup lang="ts">
interface Props {
  title: string
  description?: string
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
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
```

**Bước 4**: Tạo demo page sử dụng các components
```vue
<!-- src/pages/ComponentsDemo.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const username = ref('')
const isLoading = ref(false)

function handleSubmit() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert(`Hello, ${username.value}!`)
  }, 1500)
}
</script>

<template>
  <div class="demo-page">
    <h1>Components Demo</h1>

    <BaseCard title="User Form" description="Try out the components">
      <BaseInput
        v-model="username"
        label="Username"
        placeholder="Enter your name..."
      />
      <BaseButton
        label="Submit"
        :loading="isLoading"
        @click="handleSubmit"
      />
    </BaseCard>
  </div>
</template>
```

### 🏭 Tiêu chuẩn Production
- [ ] Tên component dùng PascalCase và prefix `Base` cho UI primitives
- [ ] Props có TypeScript interface rõ ràng
- [ ] Emits được khai báo đầy đủ với type
- [ ] Component có style scoped, không leak CSS
- [ ] Có default values cho optional props

### ⚠️ Những lỗi thường gặp
1. **Quên `:key` khi dùng `v-for`** → Vue cảnh báo và performance kém
2. **Mutate props trực tiếp** → Vue sẽ warning. Phải emit event lên parent
3. **Dùng `v-if` cùng `v-for` trên cùng element** → `v-if` có priority cao hơn `v-for`, dễ gây bug
4. **Nhầm `v-show` với `v-if`** → `v-show` chỉ toggle CSS, element vẫn render. `v-if` destroy/create element thật

### 🏆 Challenge nâng cao
- Tạo component `BaseAvatar` hiển thị avatar từ URL hoặc initials
- Tạo component `BaseBadge` với các variant: info, success, warning, danger
- Implement `BaseButton` với icon support (left/right icon)

### ✅ Checklist hoàn thành
- [ ] 3 components UI hoạt động đúng
- [ ] Props typed đầy đủ với TypeScript
- [ ] v-model hoạt động trên BaseInput
- [ ] Emits khai báo rõ ràng
- [ ] Demo page hiển thị và tương tác được
- [ ] Không có TypeScript errors
- [ ] Style scoped, không CSS leak

### 📌 Git commit đề xuất
```
feat(ui): add BaseButton, BaseInput, BaseCard components

- BaseButton: supports variant, loading, disabled states
- BaseInput: supports v-model, validation error display
- BaseCard: basic card layout with slot support
- Add ComponentsDemo page for testing
```

---

## 📘 Bài 03: Reactivity System — ref, reactive, computed, watch

### 🎯 Mục tiêu
- Hiểu sâu hệ thống Reactivity của Vue 3
- Phân biệt `ref` vs `reactive` và khi nào dùng cái nào
- Sử dụng `computed` cho derived state
- Sử dụng `watch` và `watchEffect` cho side effects
- So sánh với `useState`, `useMemo`, `useEffect` của React

### 📚 Kiến thức cần học

#### 1. ref — Tương đương useState

```vue
<script setup lang="ts">
import { ref } from 'vue'

// Vue: ref wraps value trong .value
const count = ref(0)        // Ref<number>
const name = ref('Hùng')    // Ref<string>
const isOpen = ref(false)    // Ref<boolean>

// Trong <script>: truy cập qua .value
count.value++
console.log(count.value)  // 1

// Trong <template>: TỰ ĐỘNG unwrap, KHÔNG cần .value
</script>

<template>
  <p>{{ count }}</p>         <!-- Tự unwrap, không cần .value -->
  <button @click="count++"> <!-- Template cũng tự unwrap -->
    Increment
  </button>
</template>
```

```tsx
// React equivalent
const [count, setCount] = useState(0)
const [name, setName] = useState('Hùng')
const [isOpen, setIsOpen] = useState(false)

// React: phải gọi setter function
setCount(prev => prev + 1)

return (
  <p>{count}</p>
  <button onClick={() => setCount(c => c + 1)}>
    Increment
  </button>
)
```

> **🔑 Khác biệt cốt lõi**:
> - Vue `ref`: **mutable** — gán `.value` trực tiếp, Vue tự detect thay đổi nhờ Proxy
> - React `useState`: **immutable** — phải gọi setter, trigger re-render toàn component
> - Vue KHÔNG re-render toàn component, nó track dependency chính xác và chỉ update DOM cần thiết

#### 2. reactive — Object state (không cần .value)

```vue
<script setup lang="ts">
import { reactive } from 'vue'

// reactive: dùng cho object/array, KHÔNG cần .value
const form = reactive({
  username: '',
  email: '',
  password: '',
})

// Gán trực tiếp — Vue tự track
form.username = 'John'

// ⚠️ CẢNH BÁO: Không destructure reactive object!
const { username } = form  // ❌ Mất reactivity!
</script>

<template>
  <input v-model="form.username" />
  <input v-model="form.email" />
</template>
```

> **💡 ref vs reactive — Khi nào dùng?**
> - `ref`: Dùng cho primitive values (string, number, boolean) và khi cần reassign
> - `reactive`: Dùng cho object/array khi muốn syntax sạch hơn (không `.value`)
> - **Best practice production**: Dùng `ref` cho mọi thứ — consistent hơn, dễ refactor hơn
> - Lý do: `ref` có thể hold mọi type, còn `reactive` chỉ cho object, và không thể reassign root

#### 3. computed — Tương đương useMemo

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: 'Task 1', done: false },
  { id: 2, name: 'Task 2', done: true },
  { id: 3, name: 'Task 3', done: false },
])

const searchTerm = ref('')

// computed: tự động re-calculate khi dependencies thay đổi
// Vue TỰ track dependencies — không cần dependency array như useMemo!
const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const completedCount = computed(() => {
  return items.value.filter(item => item.done).length
})

const progress = computed(() => {
  if (items.value.length === 0) return 0
  return Math.round((completedCount.value / items.value.length) * 100)
})
</script>
```

```tsx
// React equivalent: useMemo with dependency arrays
const filteredItems = useMemo(() => {
  return items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [items, searchTerm])  // ← Phải khai báo dependencies thủ công!

const completedCount = useMemo(() => {
  return items.filter(item => item.done).length
}, [items])

const progress = useMemo(() => {
  if (items.length === 0) return 0
  return Math.round((completedCount / items.length) * 100)
}, [items, completedCount])
```

> **🔑 Vue computed vs React useMemo**:
> - Vue: **Tự động track** dependencies, không cần dependency array → không bao giờ quên dependency
> - React: **Phải khai báo** dependency array → dễ miss dependency, gây stale data
> - Vue computed là **lazy & cached**: chỉ re-calculate khi dependency thực sự thay đổi VÀ khi được đọc
> - React useMemo tính lại mỗi render nếu dependency thay đổi

#### 4. watch & watchEffect — Tương đương useEffect

```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const searchTerm = ref('')
const selectedId = ref<number | null>(null)

// watch: theo dõi SOURCE cụ thể (like useEffect with deps)
watch(searchTerm, (newValue, oldValue) => {
  console.log(`Search changed: "${oldValue}" → "${newValue}"`)
  // Gọi API search, debounce, etc.
})

// watch với options
watch(selectedId, async (newId) => {
  if (newId !== null) {
    const data = await fetchItem(newId)
    // ...
  }
}, {
  immediate: true,  // Chạy ngay lần đầu (như useEffect chạy mount)
  // deep: true,     // Deep watch cho object/array
})

// watchEffect: tự track dependencies (like useEffect without deps array)
// Chạy ngay lần đầu, sau đó chạy lại khi bất kỳ dependency nào thay đổi
watchEffect(() => {
  document.title = `Search: ${searchTerm.value} | Vue Bootcamp`
  // Vue tự biết cần watch searchTerm vì ta đọc searchTerm.value
})
</script>
```

```tsx
// React equivalent
const [searchTerm, setSearchTerm] = useState('')
const [selectedId, setSelectedId] = useState<number | null>(null)

// useEffect with deps = watch
useEffect(() => {
  console.log(`Search changed to: "${searchTerm}"`)
}, [searchTerm])

// useEffect chạy mount + khi dep thay đổi = watch with immediate: true
useEffect(() => {
  if (selectedId !== null) {
    fetchItem(selectedId).then(data => { /* ... */ })
  }
}, [selectedId])

// useEffect without deps = mounted only (KHÁC với watchEffect!)
useEffect(() => {
  document.title = `Search: ${searchTerm} | React App`
}, [searchTerm]) // Phải list deps thủ công
```

> **🔑 watch vs watchEffect**:
> - `watch`: Explicit source, có access `oldValue`, lazy (không chạy lần đầu trừ khi `immediate: true`)
> - `watchEffect`: Tự track, chạy ngay, gọn hơn — dùng khi không cần `oldValue`
> - Cả hai đều **tự cleanup** khi component unmount (React phải return cleanup function)

### 📝 Yêu cầu bài tập
1. Tạo một Todo List đơn giản sử dụng `ref` cho state
2. Dùng `computed` để tính: filteredTodos, completedCount, progress percentage
3. Dùng `watch` để lưu todos vào localStorage khi thay đổi
4. Dùng `watchEffect` để cập nhật document title

### 🔧 Các bước thực hiện

**Tạo `src/pages/ReactivityDemo.vue`:**
```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

// State
const todos = ref<Todo[]>(
  JSON.parse(localStorage.getItem('todos') || '[]')
)
const newTodo = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')

// Computed — derived state
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.done)
    case 'completed':
      return todos.value.filter(t => t.done)
    default:
      return todos.value
  }
})

const completedCount = computed(() =>
  todos.value.filter(t => t.done).length
)

const progress = computed(() => {
  if (todos.value.length === 0) return 0
  return Math.round((completedCount.value / todos.value.length) * 100)
})

// Actions
function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    done: false,
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

// Watch — side effects
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

// watchEffect — auto-track
watchEffect(() => {
  document.title = `Todos (${completedCount.value}/${todos.value.length})`
})
</script>
```

### 🏭 Tiêu chuẩn Production
- [ ] Không dùng `reactive` cho primitive values
- [ ] `computed` cho mọi derived state (không tính trong template)
- [ ] `watch` có `deep: true` khi watch object/array
- [ ] Side effects nằm trong `watch`/`watchEffect`, không trong computed
- [ ] cleanup logic khi cần (ví dụ: cancel API call)

### ⚠️ Những lỗi thường gặp
1. **Quên `.value` trong `<script>`** → Code chạy nhưng không reactive
2. **Destructure reactive object** → Mất reactivity! Dùng `toRefs()` nếu cần destructure
3. **Dùng computed cho side effects** → computed chỉ dùng cho pure derived state
4. **watch không `deep: true` cho object** → Chỉ trigger khi reference thay đổi, không khi property thay đổi
5. **watchEffect chạy quá nhiều** → Nó track MỌI reactive ref được đọc bên trong

### 🏆 Challenge nâng cao
- Implement debounced search với `watchEffect` + `setTimeout`
- Tạo composable `useLocalStorage<T>(key, defaultValue)` wrap logic localStorage
- Implement undo/redo cho todo list bằng cách watch history

### ✅ Checklist hoàn thành
- [ ] Hiểu `ref` vs `reactive` và chọn đúng
- [ ] Dùng `computed` cho derived state
- [ ] `watch` lưu localStorage thành công
- [ ] `watchEffect` update document title
- [ ] Không có lỗi TypeScript
- [ ] Giải thích được tại sao Vue không cần dependency array

### 📌 Git commit đề xuất
```
feat(reactivity): add Todo list with computed, watch, watchEffect

- Implement CRUD operations with ref state
- Add computed for filtering and progress calculation
- Persist to localStorage via deep watch
- Auto-update document title via watchEffect
```

---

## 📘 Bài 04: Template Syntax Nâng Cao và Dynamic Rendering

### 🎯 Mục tiêu
- Master template syntax: v-bind, v-on, v-model modifiers
- Dynamic class và style binding
- Conditional và list rendering patterns nâng cao
- Template refs (truy cập DOM trực tiếp)
- So sánh với JSX patterns

### 📚 Kiến thức cần học

#### 1. Dynamic Class Binding

```vue
<template>
  <!-- Object syntax -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    Object syntax
  </div>

  <!-- Array syntax -->
  <div :class="[baseClass, isActive ? 'active' : '']">
    Array syntax
  </div>

  <!-- Computed class (RECOMMENDED cho logic phức tạp) -->
  <div :class="cardClasses">Computed class</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const baseClass = ref('card')

const cardClasses = computed(() => ({
  'card': true,
  'card--active': isActive.value,
  'card--error': hasError.value,
  'card--elevated': !hasError.value && isActive.value,
}))
</script>
```

```tsx
// React equivalent: className string manipulation hoặc clsx
import clsx from 'clsx'

<div className={clsx('card', {
  'card--active': isActive,
  'card--error': hasError,
})}>
```

> **💡 Vue không cần thư viện `clsx`** — object/array class binding built-in sẵn.

#### 2. v-model Modifiers

```vue
<template>
  <!-- .trim: tự xóa whitespace đầu/cuối -->
  <input v-model.trim="username" />

  <!-- .number: tự convert thành number -->
  <input v-model.number="age" type="number" />

  <!-- .lazy: update khi blur thay vì khi input -->
  <input v-model.lazy="search" />

  <!-- Kết hợp modifiers -->
  <input v-model.trim.lazy="comment" />
</template>
```

> **React không có equivalent built-in** — bạn phải tự trim, parseInt trong onChange handler.

#### 3. Event Modifiers

```vue
<template>
  <!-- .prevent = preventDefault() -->
  <form @submit.prevent="handleSubmit">

  <!-- .stop = stopPropagation() -->
  <button @click.stop="handleClick">

  <!-- .once = removeEventListener sau lần đầu -->
  <button @click.once="handleFirstClick">

  <!-- .self = chỉ trigger khi event.target === element chính -->
  <div @click.self="handleDivClick">

  <!-- Key modifiers -->
  <input @keyup.enter="submitSearch" />
  <input @keyup.esc="clearSearch" />
  <input @keydown.ctrl.s="saveDocument" />
</template>
```

```tsx
// React: phải handle thủ công
<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
<button onClick={(e) => { e.stopPropagation(); handleClick(); }}>
<input onKeyUp={(e) => { if (e.key === 'Enter') submitSearch(); }}>
```

> **💡 Event modifiers** giúp template sạch hơn, tách logic "handle event" khỏi logic "business". Đây là một trong những điểm DX tốt nhất của Vue.

#### 4. Template Refs — Truy cập DOM

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Template ref: biến ref có cùng tên với ref="" trong template
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // DOM đã sẵn sàng
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" placeholder="Auto focused..." />
</template>
```

```tsx
// React equivalent: useRef
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

return <input ref={inputRef} />
```

> **🔑 Tên phải khớp**: `ref="inputRef"` trong template phải match `const inputRef = ref()` trong script. Vue tự liên kết.

### 📝 Yêu cầu bài tập
1. Tạo component `StatusBadge` sử dụng dynamic class binding
2. Tạo form với v-model modifiers (.trim, .number, .lazy)
3. Implement keyboard shortcuts bằng event modifiers
4. Sử dụng template ref để auto-focus input khi mount

### 🏆 Challenge nâng cao
- Tạo component `DataTable` với sortable columns (dùng computed + dynamic class)
- Implement `ClickOutside` behavior bằng template ref + event listener
- Tạo `Tooltip` component hiển thị theo vị trí mouse

### ✅ Checklist hoàn thành
- [ ] Hiểu 3 cách binding class: string, object, array
- [ ] Sử dụng v-model modifiers cho form input
- [ ] Dùng event modifiers thay vì handle thủ công
- [ ] Template ref hoạt động cho DOM access
- [ ] Có thể giải thích tại sao Vue không dùng JSX mặc định

### 📌 Git commit đề xuất
```
feat(template): advanced template syntax demo

- Dynamic class binding with object/array syntax
- Form with v-model modifiers (trim, number, lazy)
- Event modifiers for cleaner event handling
- Template refs for DOM access
```

---

## 📘 Bài 05: Lifecycle Hooks và Component Communication Patterns

### 🎯 Mục tiêu
- Hiểu lifecycle của Vue component
- Master các lifecycle hooks: onMounted, onUpdated, onUnmounted
- Component communication patterns: props down, events up
- So sánh với React lifecycle (useEffect cleanup)

### 📚 Kiến thức cần học

#### 1. Vue 3 Lifecycle Hooks

```
Component Created  ← <script setup> chạy tại đây
       ↓
  onBeforeMount    ← Trước khi render DOM
       ↓
    onMounted      ← DOM đã render xong ≈ useEffect(fn, [])
       ↓
  onBeforeUpdate   ← Trước khi re-render
       ↓
    onUpdated      ← Sau khi re-render
       ↓
  onBeforeUnmount  ← Trước khi destroy ≈ useEffect cleanup
       ↓
   onUnmounted     ← Đã destroy hoàn toàn
```

```vue
<script setup lang="ts">
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

// Script setup body ≈ React function body (chạy mỗi "render")
// NHƯNG trong Vue, nó chỉ chạy MỘT LẦN khi component được tạo!
console.log('Component created') // Chỉ chạy 1 lần

onBeforeMount(() => {
  console.log('Before mount — DOM chưa có')
})

onMounted(() => {
  console.log('Mounted — DOM đã sẵn sàng')
  // Fetch data, setup event listeners, khởi tạo thư viện bên ngoài
  window.addEventListener('resize', handleResize)
})

onUpdated(() => {
  console.log('Updated — DOM đã re-render')
  // Thận trọng: có thể gây infinite loop nếu update state ở đây
})

onBeforeUnmount(() => {
  console.log('Before unmount — cleanup sắp bắt đầu')
})

onUnmounted(() => {
  console.log('Unmounted — cleanup')
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  console.log('Window resized:', window.innerWidth)
}
</script>
```

```tsx
// React equivalent: tất cả gom vào useEffect
function MyComponent() {
  // Function body chạy MỖI LẦN render (khác Vue!)

  useEffect(() => {
    // ≈ onMounted
    console.log('Mounted')
    window.addEventListener('resize', handleResize)

    return () => {
      // ≈ onUnmounted (cleanup)
      console.log('Unmounted')
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
```

> **🔑 Khác biệt quan trọng nhất**:
> - Vue `<script setup>` body chạy **1 lần** (giống constructor)
> - React function body chạy **mỗi render** (vì thế cần useMemo, useCallback)
> - Vue có lifecycle hooks **riêng biệt** cho từng phase
> - React gom tất cả vào `useEffect` (mount + cleanup + update)

#### 2. Component Communication Patterns

```
┌─────────────────────────────────────────────┐
│  Grandparent                                │
│  ┌───────────────────────────────────────┐  │
│  │  Parent                               │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  Child                          │  │  │
│  │  │  Props ↓↓↓  Emits ↑↑↑          │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Props drilling qua nhiều level?            │
│  → Dùng Provide/Inject (Bài 14)            │
│  → Dùng Pinia store (Bài 10)               │
└─────────────────────────────────────────────┘
```

### 📝 Yêu cầu bài tập
1. Tạo component `Timer` với start/stop/reset, dùng `onMounted` + `onUnmounted` để cleanup
2. Tạo component `WindowSize` theo dõi kích thước window với cleanup event listener
3. Tạo demo page hiển thị cả hai components
4. Implement ẩn/hiện component để test unmount behavior

### ✅ Checklist hoàn thành
- [ ] Hiểu thứ tự lifecycle hooks
- [ ] Cleanup resources trong onUnmounted (intervals, event listeners)
- [ ] Giải thích được tại sao Vue script setup chỉ chạy 1 lần
- [ ] Biết khi nào dùng onMounted vs trực tiếp trong script setup

### 📌 Git commit đề xuất
```
feat(lifecycle): add Timer and WindowSize components

- Timer with proper interval cleanup
- WindowSize with resize event listener cleanup
- Demo toggle to test mount/unmount behavior
```

---

## 📘 Bài 06: CSS Scoped, CSS Modules và Styling Strategies

### 🎯 Mục tiêu
- Hiểu cách Vue xử lý scoped CSS
- So sánh các styling approaches: Scoped CSS, CSS Modules, Global CSS
- Deep selector `:deep()` cho child components
- Xây dựng design system cơ bản

### 📚 Kiến thức cần học

#### 1. Scoped CSS — Cách Vue ngăn CSS leak

```vue
<style scoped>
/* Vue thêm attribute selector tự động */
/* .btn → .btn[data-v-7ba5bd90] */
.btn {
  padding: 8px 16px;
}
</style>
```

> **So sánh với React**:
> - Vue Scoped CSS: Tự động, zero config, built-in
> - React CSS Modules: Phải tạo file `.module.css`, import styles object
> - React styled-components: Runtime overhead, CSS-in-JS
> - React Tailwind: Utility-first, khác paradigm hoàn toàn

#### 2. Deep Selector `:deep()`

```vue
<style scoped>
/* Style child component's internal elements */
.parent :deep(.child-class) {
  color: red;
}

/* Style slotted content */
:slotted(.slot-content) {
  font-weight: bold;
}

/* Global styles within scoped block */
:global(.some-global-class) {
  color: blue;
}
</style>
```

#### 3. v-bind trong CSS

```vue
<script setup lang="ts">
import { ref } from 'vue'
const themeColor = ref('#3b82f6')
</script>

<style scoped>
.dynamic-element {
  /* Dùng reactive value trực tiếp trong CSS! */
  color: v-bind(themeColor);
}
</style>
```

> **🔥 Đây là super power của Vue** — dynamic CSS từ JS state. React không có equivalent built-in (phải dùng CSS variables + inline style hoặc styled-components).

### 📝 Yêu cầu bài tập
1. Xây dựng `ThemeToggle` component với dark/light mode
2. Tạo design system với shared CSS variables
3. Sử dụng `v-bind()` trong CSS cho dynamic theming
4. Tạo `src/styles/` với tổ chức file hệ thống

### ✅ Checklist hoàn thành
- [ ] Hiểu scoped CSS mechanism
- [ ] Dùng `:deep()` khi cần style child components
- [ ] `v-bind()` trong CSS hoạt động
- [ ] Design system CSS variables có tổ chức
- [ ] Dark/Light mode toggle hoạt động

### 📌 Git commit đề xuất
```
feat(styles): implement theme system with dark mode

- Add ThemeToggle component with CSS v-bind
- Set up design tokens in variables.css
- Implement dark/light mode switching
```

---

# PHASE 2: CORE FEATURES (Bài 07–12)

---

## 📘 Bài 07: Composables — Custom Hooks của Vue

### 🎯 Mục tiêu
- Tạo composables (custom hooks) tái sử dụng
- Hiểu naming convention: `use` prefix
- Extract logic phức tạp ra khỏi components
- So sánh với React custom hooks

### 📚 Kiến thức cần học

#### 1. Composable Pattern

```typescript
// src/composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const doubleCount = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return {
    count,        // Ref — reactive
    doubleCount,  // ComputedRef — derived
    isPositive,
    increment,    // Functions — actions
    decrement,
    reset,
  }
}
```

```tsx
// React equivalent: hooks/useCounter.ts
import { useState, useMemo, useCallback } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const doubleCount = useMemo(() => count * 2, [count])
  const isPositive = useMemo(() => count > 0, [count])

  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, doubleCount, isPositive, increment, decrement, reset }
}
```

> **🔑 Vue composables vs React hooks**:
> - Vue: Không cần `useCallback`, `useMemo` cho optimization — functions không re-create mỗi render
> - Vue: Return `ref` objects — consumer có thể watch chúng
> - Vue: Chạy 1 lần khi setup, không có dependency array issues
> - React: Phải wrap mọi thứ trong `useMemo`/`useCallback` để tránh re-create

#### 2. Practical Composables cho Production

```typescript
// src/composables/useLocalStorage.ts
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}
```

```typescript
// src/composables/useFetch.ts
import { ref, watchEffect, toValue } from 'vue'
import type { Ref, MaybeRefOrGetter } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  loading: Ref<boolean>
  refetch: () => Promise<void>
}

export function useFetch<T>(url: MaybeRefOrGetter<string>): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(toValue(url))
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading, refetch: fetchData }
}

// Sử dụng trong component:
// const { data: users, loading, error } = useFetch<User[]>('/api/users')
// const userId = ref(1)
// const { data: user } = useFetch<User>(() => `/api/users/${userId.value}`)
// ↑ Khi userId thay đổi → tự động re-fetch!
```

```typescript
// src/composables/useDebounce.ts
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}
```

### 📝 Yêu cầu bài tập
1. Tạo `useLocalStorage` composable
2. Tạo `useFetch` composable với loading/error states
3. Tạo `useDebounce` composable
4. Tạo `useWindowSize` composable (kết hợp Bài 05)
5. Tạo demo page sử dụng tất cả composables

### ✅ Checklist hoàn thành
- [ ] Composables follow naming convention `use*`
- [ ] Return type rõ ràng với TypeScript
- [ ] Cleanup logic trong composable (clearTimeout, removeEventListener)
- [ ] Composables reusable, không coupled với specific component
- [ ] Hiểu tại sao Vue không cần useCallback/useMemo

### 📌 Git commit đề xuất
```
feat(composables): add useLocalStorage, useFetch, useDebounce

- useLocalStorage: reactive localStorage wrapper with deep watch
- useFetch: generic data fetching with loading/error states
- useDebounce: debounce reactive values
- useWindowSize: reactive window dimensions
```

---

## 📘 Bài 08: Vue Router — Routing & Navigation

### 🎯 Mục tiêu
- Cấu hình Vue Router với TypeScript
- Dynamic routes, nested routes, route guards
- Programmatic navigation
- So sánh với Next.js App Router

### 📚 Kiến thức cần học

#### 1. Vue Router vs Next.js Router

| Khía cạnh | Vue Router | Next.js App Router |
|-----------|-----------|-------------------|
| Config | File-based HOẶC programmatic | File-based (bắt buộc) |
| Dynamic route | `/user/:id` | `/user/[id]` |
| Nested routes | `children: []` | Folder nesting |
| Layout | Manual (components) | `layout.tsx` convention |
| Guards | `beforeEach`, `beforeEnter` | Middleware |
| Navigate | `router.push()` | `router.push()` (giống) |
| Link | `<RouterLink>` | `<Link>` |

#### 2. Cấu hình Router

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
        meta: { title: 'Home' },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/pages/AboutPage.vue'),
        meta: { title: 'About' },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { title: 'Login', requiresGuest: true },
      },
    ],
  },
  {
    // Dynamic route — tương đương [id] trong Next.js
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('@/pages/users/UserDetailPage.vue'),
    meta: { title: 'User Detail', requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// Navigation Guard — tương đương Next.js middleware
router.beforeEach((to, from) => {
  // Update document title
  document.title = `${to.meta.title || 'App'} | Vue Bootcamp`

  // Auth check
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
```

#### 3. Sử dụng trong Components

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()   // Read-only route info (giống usePathname, useParams)
const router = useRouter() // Navigation methods (giống useRouter)

// Dynamic params
const userId = route.params.id           // string
const page = route.query.page            // string | undefined

// Programmatic navigation
function goToUser(id: number) {
  router.push({ name: 'user-detail', params: { id } })
}

function goBack() {
  router.back()
}
</script>

<template>
  <!-- Declarative navigation -->
  <RouterLink to="/">Home</RouterLink>
  <RouterLink :to="{ name: 'user-detail', params: { id: 1 } }">
    User 1
  </RouterLink>

  <!-- Active class tự động (Next.js phải tự check) -->
  <RouterLink to="/about" active-class="nav--active">
    About
  </RouterLink>
</template>
```

### 📝 Yêu cầu bài tập
1. Cấu hình router với: Home, About, Users (list), User Detail (dynamic)
2. Tạo `DefaultLayout` với navigation bar
3. Implement lazy loading cho pages (`() => import(...)`)
4. Thêm navigation guard cho auth routes
5. Tạo `NotFoundPage` cho 404

### ✅ Checklist hoàn thành
- [ ] Routes lazy-loaded
- [ ] Nested routes với layout system
- [ ] Dynamic routes hoạt động
- [ ] Navigation guard redirect chính xác
- [ ] 404 page cho unknown routes
- [ ] RouterLink active class hoạt động

### 📌 Git commit đề xuất
```
feat(router): configure Vue Router with layouts and guards

- Set up route config with lazy loading
- Add DefaultLayout with navigation
- Implement auth navigation guard
- Add 404 NotFoundPage
```

---

## 📘 Bài 09: Pinia — State Management

### 🎯 Mục tiêu
- Setup và sử dụng Pinia store
- So sánh với Redux Toolkit / Zustand
- Store organization patterns
- DevTools integration

### 📚 Kiến thức cần học

#### 1. Pinia vs Redux/Zustand

| Khía cạnh | Pinia | Redux Toolkit | Zustand |
|-----------|-------|---------------|---------|
| Boilerplate | Rất ít | Trung bình | Rất ít |
| TypeScript | First-class | Tốt nhưng verbose | Tốt |
| DevTools | Vue DevTools | Redux DevTools | Middleware |
| Mutations | Không cần | Reducers/Mutations | Không cần |
| Store definition | `defineStore()` | `createSlice()` | `create()` |
| Composition | Import trực tiếp | Selectors | Selectors |

#### 2. Pinia Store — Setup Style (Recommended)

```typescript
// src/stores/useTodoStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Setup store — giống viết composable!
export const useTodoStore = defineStore('todo', () => {
  // State — ref()
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters — computed()
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active': return todos.value.filter(t => !t.done)
      case 'completed': return todos.value.filter(t => t.done)
      default: return todos.value
    }
  })

  const totalCount = computed(() => todos.value.length)
  const completedCount = computed(() => todos.value.filter(t => t.done).length)

  // Actions — functions
  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      todos.value = await response.json()
    } catch (err) {
      error.value = 'Failed to fetch todos'
    } finally {
      loading.value = false
    }
  }

  function addTodo(text: string) {
    todos.value.push({
      id: Date.now(),
      text,
      done: false,
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function removeTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function setFilter(newFilter: typeof filter.value) {
    filter.value = newFilter
  }

  return {
    // State
    todos, filter, loading, error,
    // Getters
    filteredTodos, totalCount, completedCount,
    // Actions
    fetchTodos, addTodo, toggleTodo, removeTodo, setFilter,
  }
})
```

```tsx
// Redux Toolkit equivalent (nhiều boilerplate hơn)
const todoSlice = createSlice({
  name: 'todo',
  initialState: { todos: [], filter: 'all', loading: false, error: null },
  reducers: {
    addTodo: (state, action) => { state.todos.push(action.payload) },
    toggleTodo: (state, action) => { /* ... */ },
    removeTodo: (state, action) => { /* ... */ },
    setFilter: (state, action) => { state.filter = action.payload },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => { state.loading = true })
    // ... rất nhiều cases
  },
})
```

> **🔑 Pinia setup store** = viết composable + `defineStore()` wrap. Nếu bạn biết viết Vue composable, bạn đã biết viết Pinia store. Không có mutations, reducers, action creators — chỉ có `ref`, `computed`, `function`.

### 📝 Yêu cầu bài tập
1. Tạo `useTodoStore` với CRUD operations
2. Tạo `useAuthStore` với login/logout
3. Tạo `useUIStore` cho theme, sidebar state
4. Sử dụng stores trong components

### ✅ Checklist hoàn thành
- [ ] Stores tổ chức theo feature (todo, auth, ui)
- [ ] Dùng Setup style cho stores (composition API)
- [ ] Actions async với loading/error states
- [ ] Stores hoạt động với Vue DevTools
- [ ] TypeScript types đầy đủ

### 📌 Git commit đề xuất
```
feat(stores): add Pinia stores for todo, auth, and UI

- useTodoStore: CRUD + API integration
- useAuthStore: login/logout flow
- useUIStore: theme and sidebar management
```

---

## 📘 Bài 10: Forms và Validation

### 🎯 Mục tiêu
- Xây dựng form phức tạp với Vue
- Implement validation thủ công (production pattern)
- v-model trên custom components
- Học cách tổ chức form state

### 📚 Kiến thức cần học

#### 1. Form Pattern chuẩn Production

```vue
<script setup lang="ts">
import { reactive, computed } from 'vue'

interface FormState {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const form = reactive<FormState>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive<FormErrors>({})
const touched = reactive<Record<string, boolean>>({})

function validate(): boolean {
  const newErrors: FormErrors = {}

  if (!form.username.trim()) {
    newErrors.username = 'Username is required'
  } else if (form.username.length < 3) {
    newErrors.username = 'Username must be at least 3 characters'
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Invalid email format'
  }

  if (!form.password) {
    newErrors.password = 'Password is required'
  } else if (form.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const isValid = computed(() => {
  return form.username.length >= 3
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    && form.password.length >= 8
    && form.password === form.confirmPassword
})

function handleSubmit() {
  if (validate()) {
    console.log('Form submitted:', { ...form })
  }
}

function handleBlur(field: string) {
  touched[field] = true
  validate()
}
</script>
```

### 📝 Yêu cầu bài tập
1. Tạo registration form với validation
2. Implement real-time validation khi blur
3. Tạo reusable `FormField` component
4. Disable submit khi form invalid

### ✅ Checklist hoàn thành
- [ ] Form validation hoạt động
- [ ] Error messages hiển thị chính xác
- [ ] Touch tracking cho UX tốt
- [ ] Submit disabled khi invalid
- [ ] Tất cả inputs accessible (label, aria attributes)

### 📌 Git commit đề xuất
```
feat(forms): add registration form with validation

- Reactive form state with FormState interface
- Real-time validation on blur
- Reusable FormField component
- Accessible form with proper labels
```

---

## 📘 Bài 11: API Integration và Services Layer

### 🎯 Mục tiêu
- Tổ chức API layer chuyên nghiệp
- Tạo service layer với Axios/Fetch
- Error handling patterns
- Loading states và optimistic updates

### 📚 Kiến thức cần học

#### 1. Service Layer Architecture

```
src/services/
├── api.ts              # Axios instance + interceptors
├── auth.service.ts     # Auth-related API calls
├── todo.service.ts     # Todo CRUD API calls
└── user.service.ts     # User API calls
```

```typescript
// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const token = localStorage.getItem('token')

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/auth/login'
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  get<T>(endpoint: string) { return this.request<T>(endpoint) }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient(BASE_URL)
```

```typescript
// src/services/todo.service.ts
import { api } from './api'
import type { Todo, CreateTodoDTO, UpdateTodoDTO } from '@/types/todo'

export const todoService = {
  getAll: () => api.get<Todo[]>('/todos?_limit=20'),
  getById: (id: number) => api.get<Todo>(`/todos/${id}`),
  create: (data: CreateTodoDTO) => api.post<Todo>('/todos', data),
  update: (id: number, data: UpdateTodoDTO) => api.put<Todo>(`/todos/${id}`, data),
  delete: (id: number) => api.delete<void>(`/todos/${id}`),
}
```

### 📝 Yêu cầu bài tập
1. Tạo `ApiClient` class hoặc module
2. Tạo `todoService` với CRUD methods
3. Integrate với Pinia store
4. Implement loading/error states trong component
5. Tạo `.env` files cho API URL

### ✅ Checklist hoàn thành
- [ ] Service layer tách biệt khỏi components
- [ ] Error handling centralized
- [ ] Auth token auto-inject
- [ ] Environment variables cho API URL
- [ ] TypeScript types cho request/response

### 📌 Git commit đề xuất
```
feat(services): add API client and todo service

- Create generic ApiClient with interceptors
- Add todoService with CRUD methods
- Set up .env for API configuration
- Integrate with Pinia store
```

---

## 📘 Bài 12: Error Handling và Loading States

### 🎯 Mục tiêu
- Global error handling
- Error boundary component pattern
- Loading skeleton / spinner patterns
- Toast notification system

### 📚 Kiến thức cần học

#### 1. Error Handling Patterns

```vue
<!-- src/components/common/AsyncState.vue -->
<script setup lang="ts">
interface Props {
  loading: boolean
  error: string | null
}

defineProps<Props>()
</script>

<template>
  <div v-if="loading" class="async-state__loading">
    <slot name="loading">
      <div class="spinner" />
    </slot>
  </div>

  <div v-else-if="error" class="async-state__error">
    <slot name="error" :error="error">
      <p>{{ error }}</p>
      <button @click="$emit('retry')">Retry</button>
    </slot>
  </div>

  <slot v-else />
</template>
```

```vue
<!-- Sử dụng -->
<AsyncState :loading="loading" :error="error" @retry="refetch">
  <template #loading>
    <SkeletonCard v-for="i in 3" :key="i" />
  </template>

  <TodoList :todos="todos" />
</AsyncState>
```

> **So sánh React**: React dùng Error Boundary (class component) hoặc Suspense. Vue không có Error Boundary built-in, nhưng pattern trên achieve kết quả tương tự với Composition API.

### 📝 Yêu cầu bài tập
1. Tạo `AsyncState` wrapper component
2. Tạo `SkeletonCard` loading placeholder
3. Implement toast notification composable `useToast()`
4. Global error handler trong `main.ts`

### ✅ Checklist hoàn thành
- [ ] AsyncState component reusable
- [ ] Loading skeletons cho mọi async content
- [ ] Toast notifications hoạt động
- [ ] Global error handler catch unhandled errors
- [ ] Retry mechanism cho failed requests

### 📌 Git commit đề xuất
```
feat(error-handling): add AsyncState, SkeletonCard, and Toast system

- AsyncState wrapper with loading/error/success states
- Skeleton loading placeholders
- Toast notification composable
- Global error handler in main.ts
```

---

# PHASE 3: ADVANCED (Bài 13–18)

---

## 📘 Bài 13: Slots — Content Distribution System

### 🎯 Mục tiêu
- Master Vue Slots: default, named, scoped
- So sánh với React children / render props
- Xây dựng flexible layout components

### 📚 Kiến thức cần học

#### 1. Slot Types

```vue
<!-- Vue: Default Slot = React children -->
<template>
  <div class="card">
    <slot />   <!-- == {children} trong React -->
  </div>
</template>

<!-- Vue: Named Slots = Không có direct equivalent trong React -->
<template>
  <div class="modal">
    <header><slot name="header" /></header>
    <main><slot /></main>                    <!-- default slot -->
    <footer><slot name="footer" /></footer>
  </div>
</template>

<!-- Sử dụng named slots -->
<Modal>
  <template #header>
    <h2>Title</h2>
  </template>

  <p>Body content (default slot)</p>

  <template #footer>
    <button>Close</button>
  </template>
</Modal>
```

```tsx
// React: phải dùng props cho "named slots"
<Modal
  header={<h2>Title</h2>}
  footer={<button>Close</button>}
>
  <p>Body content (children)</p>
</Modal>
```

#### 2. Scoped Slots — Render Props equivalent

```vue
<!-- Vue: Scoped Slot = React Render Props -->
<script setup lang="ts">
// DataList.vue — component expose data cho parent qua scoped slot
import { ref, onMounted } from 'vue'

const items = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  items.value = await fetchItems()
  loading.value = false
})
</script>

<template>
  <div>
    <slot
      :items="items"
      :loading="loading"
      :count="items.length"
    />
  </div>
</template>
```

```vue
<!-- Sử dụng scoped slot -->
<DataList v-slot="{ items, loading, count }">
  <p>Total: {{ count }}</p>
  <ul v-if="!loading">
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</DataList>
```

```tsx
// React Render Props equivalent
<DataList render={({ items, loading, count }) => (
  <>
    <p>Total: {count}</p>
    {!loading && (
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    )}
  </>
)} />
```

> **🔑 Vue Slots** linh hoạt hơn React children vì có named slots (nhiều insertion points) và scoped slots (truyền data ngược lên).

### 📝 Yêu cầu bài tập
1. Tạo `BaseModal` với named slots: header, default, footer
2. Tạo `DataTable` component với scoped slot cho custom cell rendering
3. Tạo `Accordion` component với slot-based content

### ✅ Checklist hoàn thành
- [ ] Default slot hoạt động (fallback content)
- [ ] Named slots cho multi-area layout
- [ ] Scoped slots truyền data cho parent
- [ ] Components flexible và reusable

### 📌 Git commit đề xuất
```
feat(slots): add Modal, DataTable with slot-based content

- BaseModal with named slots (header, default, footer)
- DataTable with scoped slots for custom rendering
- Accordion component with expandable sections
```

---

## 📘 Bài 14: Provide/Inject — Dependency Injection

### 🎯 Mục tiêu
- Hiểu Provide/Inject pattern (tương đương React Context)
- Tránh props drilling
- Type-safe provide/inject với InjectionKey
- Khi nào dùng Provide/Inject vs Pinia

### 📚 Kiến thức cần học

```vue
<!-- Parent: Provide -->
<script setup lang="ts">
import { provide, ref } from 'vue'
import type { InjectionKey } from 'vue'

// Type-safe injection key
export const ThemeKey: InjectionKey<{
  theme: Ref<'light' | 'dark'>
  toggleTheme: () => void
}> = Symbol('theme')

const theme = ref<'light' | 'dark'>('light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide(ThemeKey, { theme, toggleTheme })
</script>
```

```vue
<!-- Deep Child: Inject (không cần props drilling!) -->
<script setup lang="ts">
import { inject } from 'vue'
import { ThemeKey } from '@/providers/theme'

const themeContext = inject(ThemeKey)
// themeContext?.theme.value === 'light'
</script>
```

```tsx
// React Context equivalent
const ThemeContext = createContext<{...} | null>(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}                    {/* Phải wrap children */}
    </ThemeContext.Provider>
  )
}

// Consumer
const { theme, toggleTheme } = useContext(ThemeContext)
```

> **🔑 Vue Provide/Inject** không cần wrapper component (Provider). Chỉ cần gọi `provide()` trong parent, và `inject()` trong bất kỳ child nào.

### 📝 Yêu cầu bài tập
1. Tạo Theme provider với provide/inject
2. Tạo Notification provider
3. Implement type-safe InjectionKey pattern

### 📌 Git commit đề xuất
```
feat(di): add Provide/Inject for theme and notifications
```

---

## 📘 Bài 15: Transition và Animation

### 🎯 Mục tiêu
- Vue `<Transition>` và `<TransitionGroup>` components
- CSS transitions và JavaScript hooks
- Animation patterns cho production UI
- So sánh với React Transition Group / Framer Motion

### 📚 Kiến thức cần học

```vue
<!-- Vue: Built-in Transition component -->
<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <p v-if="show">Hello! Tôi sẽ fade in/out</p>
  </Transition>
</template>

<style>
/* Vue tự thêm classes theo convention */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

```vue
<!-- TransitionGroup cho list animations -->
<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>
```

> **Vue built-in `<Transition>`** là feature rất mạnh mà React không có equivalent built-in. React cần Framer Motion hoặc react-transition-group.

### 📝 Yêu cầu bài tập
1. Implement fade, slide, scale transitions
2. List animation cho todo items (add/remove)
3. Page transition giữa routes
4. Modal animation (enter/leave)

### 📌 Git commit đề xuất
```
feat(transitions): add page, modal, and list animations
```

---

## 📘 Bài 16: Custom Directives

### 🎯 Mục tiêu
- Tạo custom directives
- Hiểu directive lifecycle hooks
- Production use cases: click-outside, intersection observer, tooltip

### 📚 Kiến thức cần học

```typescript
// src/directives/vClickOutside.ts
import type { Directive } from 'vue'

export const vClickOutside: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    el._clickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  },
}

// Sử dụng:
// <div v-click-outside="closeDropdown">
```

> **React không có directives** — phải dùng custom hooks + refs để achieve tương tự. Vue directives là cách declarative để thao tác DOM.

### 📝 Yêu cầu bài tập
1. Tạo `v-click-outside` directive
2. Tạo `v-focus` directive (auto-focus khi mount)
3. Tạo `v-intersection` directive (lazy loading)

### 📌 Git commit đề xuất
```
feat(directives): add click-outside, focus, intersection directives
```

---

## 📘 Bài 17: Plugins và App-level Configuration

### 🎯 Mục tiêu
- Tạo Vue plugin
- Global components, directives, provides
- Plugin architecture cho scalable apps

### 📚 Kiến thức cần học

```typescript
// src/plugins/ui.ts
import type { App } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { vClickOutside } from '@/directives/vClickOutside'

export const UIPlugin = {
  install(app: App) {
    // Register global components
    app.component('BaseButton', BaseButton)
    app.component('BaseInput', BaseInput)
    app.component('BaseCard', BaseCard)

    // Register global directives
    app.directive('click-outside', vClickOutside)

    // Provide global config
    app.provide('app-config', {
      apiUrl: import.meta.env.VITE_API_URL,
      version: '1.0.0',
    })
  },
}

// main.ts
app.use(UIPlugin)
```

### 📝 Yêu cầu bài tập
1. Tạo UI Plugin đăng ký global components
2. Tạo Logger Plugin
3. Tổ chức plugins trong `src/plugins/`

### 📌 Git commit đề xuất
```
feat(plugins): add UI and Logger plugins
```

---

## 📘 Bài 18: Testing — Unit Tests và Component Tests

### 🎯 Mục tiêu
- Setup Vitest + Vue Test Utils
- Unit test composables
- Component testing patterns
- So sánh với React Testing Library

### 📚 Kiến thức cần học

```typescript
// Vitest + Vue Test Utils
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders label correctly', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me' },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me', disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
```

```typescript
// Test composable
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('starts with initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments correctly', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })
})
```

### 📝 Yêu cầu bài tập
1. Setup Vitest trong project
2. Test BaseButton, BaseInput components
3. Test useCounter, useLocalStorage composables
4. Test Pinia store

### 📌 Git commit đề xuất
```
test: add unit and component tests

- Configure Vitest with Vue Test Utils
- Test UI components (BaseButton, BaseInput)
- Test composables (useCounter, useLocalStorage)
- Test Pinia stores
```

---

# PHASE 4: PRODUCTION (Bài 19–24)

---

## 📘 Bài 19: Performance Optimization

### 🎯 Mục tiêu
- Lazy loading components và routes
- `v-once`, `v-memo` directives
- `defineAsyncComponent` pattern
- `shallowRef` / `shallowReactive` cho large data
- Bundle analysis và code splitting

### 📚 Kiến thức cần học

```vue
<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue'

// Lazy load component (code splitting)
const HeavyChart = defineAsyncComponent({
  loader: () => import('@/components/HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,       // Hiện loading sau 200ms
  timeout: 10000,   // Timeout sau 10s
})

// shallowRef: chỉ track .value reassign, không deep track
// Dùng cho large arrays/objects mà bạn replace toàn bộ
const bigList = shallowRef<Item[]>([])

// v-once: render 1 lần, không bao giờ update (static content)
// v-memo: cache render result, chỉ re-render khi deps thay đổi
</script>

<template>
  <!-- v-once: static, never updates -->
  <footer v-once>
    <p>© 2024 Vue Bootcamp. All rights reserved.</p>
  </footer>

  <!-- v-memo: chỉ re-render khi item.id hoặc selected thay đổi -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id, selected === item.id]">
    {{ item.name }}
  </div>
</template>
```

> **React equivalent**: `React.lazy()`, `React.memo()`, `useMemo()`. Vue `v-memo` tương tự React.memo nhưng ở template level, fine-grained hơn.

### 📝 Yêu cầu bài tập
1. Implement lazy loading cho heavy components
2. Sử dụng `shallowRef` cho large datasets
3. Analyze bundle size với `vite-bundle-analyzer`
4. Optimize re-renders với `v-memo`

### 📌 Git commit đề xuất
```
perf: optimize bundle size and rendering performance
```

---

## 📘 Bài 20: SSR Concepts và Nuxt.js Introduction

### 🎯 Mục tiêu
- Hiểu SSR/SSG concepts
- So sánh Vue + Vite (SPA) vs Nuxt.js (SSR/SSG) vs Next.js
- Khi nào cần SSR, khi nào SPA là đủ
- Giới thiệu Nuxt.js basics

### 📚 Kiến thức cần học

```
SPA (Vite + Vue)        SSR (Nuxt.js)           SSG (Nuxt generate)
┌──────────────┐     ┌──────────────┐        ┌──────────────┐
│ Client only  │     │ Server first │        │ Build time   │
│ JS renders   │     │ HTML ready   │        │ HTML pre-gen │
│ Bad SEO      │     │ Good SEO     │        │ Best SEO     │
│ Fast nav     │     │ Full reload  │        │ Static files │
│ Dashboard ✓  │     │ Marketing ✓  │        │ Blog ✓       │
└──────────────┘     └──────────────┘        └──────────────┘

Vue + Vite = Create React App (SPA)
Nuxt.js    = Next.js (SSR/SSG framework)
```

### 📝 Yêu cầu bài tập
1. Hiểu sự khác biệt SPA vs SSR vs SSG
2. Tìm hiểu Nuxt.js documentation
3. Lập danh sách khi nào chọn approach nào

### 📌 Git commit đề xuất
```
docs: add SSR/SSG comparison and decision guide
```

---

## 📘 Bài 21: Internationalization (i18n)

### 🎯 Mục tiêu
- Setup vue-i18n cho multi-language
- Tổ chức translation files
- Language switcher component
- Date/Number formatting theo locale

### 📚 Kiến thức cần học

```typescript
// src/i18n/index.ts
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import vi from './locales/vi.json'

export const i18n = createI18n({
  legacy: false,  // Composition API mode
  locale: 'vi',
  fallbackLocale: 'en',
  messages: { en, vi },
})
```

```vue
<!-- Sử dụng trong component -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<template>
  <h1>{{ t('home.title') }}</h1>
  <button @click="locale = locale === 'vi' ? 'en' : 'vi'">
    {{ t('common.switchLanguage') }}
  </button>
</template>
```

### 📝 Yêu cầu bài tập
1. Setup vue-i18n
2. Tạo translation files cho EN và VI
3. Implement LanguageSwitcher component
4. Apply i18n cho tất cả text trong app

### 📌 Git commit đề xuất
```
feat(i18n): add multi-language support (EN/VI)
```

---

## 📘 Bài 22: Authentication Flow

### 🎯 Mục tiêu
- Implement full auth flow: login, register, logout
- JWT token management
- Protected routes
- Auth state persistence

### 📚 Kiến thức cần học

```typescript
// src/stores/useAuthStore.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: LoginDTO) {
    const response = await authService.login(credentials)
    token.value = response.token
    user.value = response.user
    localStorage.setItem('token', response.token)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  async function checkAuth() {
    if (!token.value) return
    try {
      user.value = await authService.getProfile()
    } catch {
      logout()
    }
  }

  return { user, token, isAuthenticated, login, logout, checkAuth }
})
```

### 📝 Yêu cầu bài tập
1. Tạo `useAuthStore` với full auth flow
2. Tạo Login/Register pages
3. Implement navigation guards cho protected routes
4. Auto-login khi refresh page

### 📌 Git commit đề xuất
```
feat(auth): implement full authentication flow

- Auth store with JWT management
- Login/Register pages
- Navigation guards for protected routes
- Auto-login on page refresh
```

---

## 📘 Bài 23: Project 1 — Landing Page

### 🎯 Mục tiêu
- Xây dựng Landing Page hoàn chỉnh, responsive, production-ready
- Apply tất cả kiến thức từ Bài 01–22
- Focus: Aesthetics, Performance, SEO, Accessibility

### 📝 Yêu cầu bài tập

#### Sections cần xây dựng:
1. **Hero Section**: Headline, CTA button, hero image/animation
2. **Features Section**: 3-4 features với icons
3. **Testimonials**: Carousel/slider
4. **Pricing**: 3 pricing plans
5. **FAQ**: Accordion
6. **Contact Form**: Với validation
7. **Footer**: Links, social media, copyright

#### Yêu cầu kỹ thuật:
- Responsive (mobile-first)
- Smooth scroll navigation
- Intersection Observer animations (scroll reveal)
- Meta tags cho SEO
- Performance: Lighthouse score > 90

### Component Architecture:
```
src/
├── pages/
│   └── LandingPage.vue          # Page container
├── components/
│   └── landing/
│       ├── HeroSection.vue
│       ├── FeaturesSection.vue
│       ├── TestimonialsSection.vue
│       ├── PricingSection.vue
│       ├── FAQSection.vue
│       ├── ContactSection.vue
│       └── LandingFooter.vue
```

### ✅ Checklist hoàn thành
- [ ] Tất cả 7 sections hoàn chỉnh
- [ ] Responsive trên mobile, tablet, desktop
- [ ] Animations smooth và professional
- [ ] SEO meta tags
- [ ] Lighthouse Performance > 90
- [ ] Accessible (keyboard navigation, screen reader)
- [ ] Code clean, components modular

### 📌 Git commit đề xuất
```
feat(landing): build production-ready landing page

- 7 responsive sections with scroll animations
- SEO optimized with meta tags
- Lighthouse score > 90
- Accessible and mobile-first design
```

---

## 📘 Bài 24: Project 2 — Todo Dashboard (CRUD + Real API)

### 🎯 Mục tiêu
- Xây dựng Todo Dashboard application hoàn chỉnh
- CRUD operations với API thật (JSONPlaceholder hoặc custom API)
- Full stack: Router, Pinia, Services, Composables, Error Handling
- Deploy lên Vercel/Netlify

### 📝 Yêu cầu bài tập

#### Features cần implement:
1. **Auth**: Login/Logout (mock hoặc thật)
2. **Dashboard**: Overview statistics (total, completed, pending)
3. **Todo List**: Filter, search, sort, pagination
4. **CRUD**: Create, Read, Update, Delete todo items
5. **Categories**: Organize todos by category
6. **Dark Mode**: Theme toggle
7. **Responsive**: Sidebar layout cho desktop, bottom nav cho mobile

#### Architecture:
```
src/
├── layouts/
│   └── DashboardLayout.vue      # Sidebar + main content
├── pages/
│   ├── dashboard/
│   │   ├── DashboardPage.vue    # Overview stats
│   │   ├── TodosPage.vue        # Todo list + CRUD
│   │   └── SettingsPage.vue     # User settings
│   └── auth/
│       └── LoginPage.vue
├── components/
│   └── dashboard/
│       ├── StatCard.vue
│       ├── TodoItem.vue
│       ├── TodoForm.vue
│       ├── TodoFilters.vue
│       └── Sidebar.vue
├── stores/
│   ├── useTodoStore.ts
│   ├── useAuthStore.ts
│   └── useUIStore.ts
├── services/
│   ├── api.ts
│   └── todo.service.ts
├── composables/
│   ├── useFetch.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
```

### Yêu cầu kỹ thuật:
- TypeScript strict
- Pinia stores cho state management
- Service layer cho API calls
- Composables cho reusable logic
- Error handling + loading states
- Transitions cho UI smoothness
- Responsive design
- Dark mode support

### 🚀 Deploy
```bash
# Build production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
npx vercel

# Deploy to Netlify
npx netlify deploy --prod --dir dist
```

### ✅ Checklist hoàn thành
- [ ] Full CRUD operations hoạt động
- [ ] Auth flow (login/logout/guard)
- [ ] Dashboard stats hiển thị chính xác
- [ ] Filter, search, sort todos
- [ ] Dark mode toggle
- [ ] Responsive layout
- [ ] Error handling cho tất cả API calls
- [ ] Loading states cho async operations
- [ ] Transitions smooth
- [ ] TypeScript no errors
- [ ] ESLint no warnings
- [ ] Build thành công
- [ ] Deploy lên Vercel/Netlify
- [ ] Lighthouse Performance > 85

### 📌 Git commits đề xuất
```
feat(dashboard): set up dashboard layout and routing
feat(todos): implement todo CRUD with API integration
feat(auth): add authentication flow
feat(ui): add dark mode and responsive design
feat(polish): add transitions and error handling
chore: deploy to production
```

---

# 📊 Bảng So Sánh Tổng Hợp: Vue 3 vs React

| Concept | Vue 3 | React | Ghi chú |
|---------|-------|-------|---------|
| Component | SFC (`.vue`) | Function (`.tsx`) | Vue có template + style trong cùng file |
| State | `ref()`, `reactive()` | `useState()` | Vue mutable, React immutable |
| Derived State | `computed()` | `useMemo()` | Vue auto-track deps |
| Side Effects | `watch()`, `watchEffect()` | `useEffect()` | Vue tách rõ source |
| Props | `defineProps<T>()` | Destructure params | Vue có runtime validation |
| Events | `emit()` + `@event` | Callback props | Vue tách data/events |
| Context | `provide()` / `inject()` | `createContext()` | Vue không cần Provider wrapper |
| Router | Vue Router (config-based) | React Router / Next.js | Vue manual, Next.js file-based |
| State Mgmt | Pinia | Redux / Zustand | Pinia ít boilerplate hơn |
| Styling | Scoped CSS built-in | CSS Modules / styled-comp | Vue zero-config |
| Animation | `<Transition>` built-in | Framer Motion | Vue built-in, React cần lib |
| Directives | `v-if`, `v-for`, custom | JSX expressions | Vue declarative, React programmatic |
| Lifecycle | Named hooks | `useEffect()` | Vue explicit, React combined |
| SSR Framework | Nuxt.js | Next.js | Tương đương nhau |
| Build Tool | Vite | Vite / Turbopack | Cùng dùng Vite được |
| Two-way binding | `v-model` | Manual value+onChange | Vue syntactic sugar |

---

# 🎯 Lộ trình thực hiện đề xuất

| Tuần | Bài | Thời gian/bài | Focus |
|------|-----|--------------|-------|
| 1 | 01–04 | 2-3 giờ | Foundation: Setup, Components, Reactivity, Template |
| 2 | 05–08 | 2-3 giờ | Core: Lifecycle, Styling, Composables, Router |
| 3 | 09–12 | 3-4 giờ | Features: Pinia, Forms, API, Error Handling |
| 4 | 13–16 | 3-4 giờ | Advanced: Slots, Provide/Inject, Transition, Directives |
| 5 | 17–20 | 3-4 giờ | Production: Plugins, Testing, Performance, SSR |
| 6 | 21–24 | 5-6 giờ | Projects: i18n, Auth, Landing Page, Todo Dashboard |

> **💡 Tips**: Không cần rush. Mỗi bài hãy code thật, commit thật, review thật. Chất lượng quan trọng hơn tốc độ.

---

# 📚 Tài liệu tham khảo

- [Vue.js Official Docs](https://vuejs.org/guide/introduction)
- [Pinia Official Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [VueUse — Collection of Composables](https://vueuse.org/)
- [Nuxt.js (Vue SSR Framework)](https://nuxt.com/)
- [Vite Documentation](https://vite.dev/)

---

> **🚀 Bắt đầu từ Bài 01, làm từng bước, và đến Bài 24 bạn sẽ có portfolio Vue.js production-ready!**
>
> Khi hoàn thành mỗi bài, hãy gửi lại cho mentor để code review. Mình sẽ review theo chuẩn production và đưa feedback chi tiết.
