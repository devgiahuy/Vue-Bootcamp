<!-- src/pages/ComponentsDemo.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseAvatar from '@/components/ui/BaseAvatar.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

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
  <div class="demo-page" style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem">
    <h1>Components Demo</h1>

    <!-- 1. Form & BaseCard Demo -->
    <BaseCard title="User Form" description="Thử nghiệm UI Components">
      <BaseInput v-model="username" label="Username" placeholder="Enter your name..." />

      <div style="margin-top: 1rem; display: flex; gap: 0.5rem">
        <!-- Button với Left Icon bằng slot -->
        <BaseButton label="Submit Form" :loading="isLoading" @click="handleSubmit">
          <template #left-icon>🚀</template>
        </BaseButton>

        <!-- Button với Right Icon -->
        <BaseButton label="Cancel" variant="danger">
          <template #right-icon>✖</template>
        </BaseButton>
      </div>
    </BaseCard>

    <!-- 2. BaseBadge Demo -->
    <BaseCard title="Badges Demo">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <BaseBadge variant="info" do t>Active</BaseBadge>
        <BaseBadge variant="success">Completed</BaseBadge>
        <BaseBadge variant="warning" dot>Pending</BaseBadge>
        <BaseBadge variant="danger">Failed</BaseBadge>
        <BaseBadge variant="neutral">Draft</BaseBadge>
      </div>
    </BaseCard>

    <!-- 3. BaseAvatar Demo -->
    <BaseCard title="Avatars Demo">
      <div style="display: flex; gap: 1rem; align-items: center">
        <!-- Initials Fallback từ tên -->
        <BaseAvatar name="Nguyen Van A" size="sm" />
        <BaseAvatar name="John Doe" size="md" />
        <BaseAvatar name="Frontend Developer" size="lg" />

        <!-- Ảnh URL thật -->
        <BaseAvatar src="https://i.pravatar.cc/150?img=3" name="User Test" size="xl" />
        <!-- URL hỏng -> Tự rớt về initials "BT" -->
        <BaseAvatar src="https://broken-url.example/404.jpg" name="Broken Test" size="lg" />
      </div>
    </BaseCard>
  </div>
</template>
