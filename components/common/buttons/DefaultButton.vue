<template>
  <div
    class="
      rounded-md
      bg-primary-normal
      text-on-primary
      cursor-pointer
      hover:shadow-md hover:opacity-90
      transform-gpu
      transition-all
    "
    :class="{ 'p-1': dense, 'p-4': !dense }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    disabled: Boolean,
    dense: Boolean,
  },
});
</script>
