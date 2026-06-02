<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  slot?: string
  format?: string
  layoutKey?: string
  minHeight?: number
}>(), {
  format: 'auto',
  minHeight: 120,
})

const isMounted = ref(false)
const adSlot = computed(() => props.slot?.trim())
const canRender = computed(() => isMounted.value && !!adSlot.value)

onMounted(() => {
  isMounted.value = true
})

watch(canRender, (enabled) => {
  if (!enabled)
    return

  queueMicrotask(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
    catch {
      // Ad blockers or unfilled inventory should not break navigation.
    }
  })
}, { immediate: true })
</script>

<template>
  <div v-if="canRender" class="bd-adsense" :style="{ minHeight: `${minHeight}px` }">
    <span class="bd-adsense-label">广告</span>
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-8880838852405341"
      :data-ad-slot="adSlot"
      :data-ad-format="format"
      :data-ad-layout-key="layoutKey"
      data-full-width-responsive="true"
    />
  </div>
</template>
