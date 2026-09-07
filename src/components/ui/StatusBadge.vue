<script setup lang="ts">
import { computed } from 'vue'

type BadgeStatus = 'online' | 'offline' | 'busy' | 'away'
type BadgeSize = 'sm' | 'md' | 'lg'

interface Props {
  status: BadgeStatus
  size?: BadgeSize
  pulse?: boolean
  outline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  pulse: false,
  outline: false
})

// 💡 Best Practice: Dùng computed class cho logic phức tạp để template gọn gàng
const badgeClasses = computed(() => {
  return [
    'status-badge',
    `status-badge--${props.size}`,
    `status-badge--${props.status}`,
    {
      'status-badge--pulse': props.pulse && props.status === 'online',
      'status-badge--outline': props.outline
    }
  ]
})
</script>

<template>
  <!-- Render class động bằng Computed Array/Object -->
  <span :class="badgeClasses">
    <span class="status-badge__dot" />
    <span class="status-badge__label">
      <slot>{{ status }}</slot>
    </span>
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: var(--radius-full, 9999px);
  font-weight: 500;
  text-transform: capitalize;
  transition: all var(--transition-fast, 150ms ease);
}

/* Sizes */
.status-badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.status-badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
.status-badge--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

/* Status variants */
.status-badge--online {
  background-color: #dcfce7;
  color: #15803d;
}
.status-badge--online .status-badge__dot {
  background-color: #22c55e;
}

.status-badge--offline {
  background-color: #f1f5f9;
  color: #64748b;
}
.status-badge--offline .status-badge__dot {
  background-color: #94a3b8;
}

.status-badge--busy {
  background-color: #fee2e2;
  color: #b91c1c;
}
.status-badge--busy .status-badge__dot {
  background-color: #ef4444;
}

.status-badge--away {
  background-color: #fef3c7;
  color: #b45309;
}
.status-badge--away .status-badge__dot {
  background-color: #f59e0b;
}

/* Modifier: Outline style */
.status-badge--outline {
  background-color: transparent;
  border: 1px solid currentColor;
}

/* Modifier: Pulse animation cho online status */
.status-badge__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  position: relative;
}

.status-badge--pulse .status-badge__dot::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background-color: inherit;
  opacity: 0.75;
  animation: pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  70% {
    transform: scale(2.2);
    opacity: 0;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}
</style>
