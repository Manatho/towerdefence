<template>
  <div
    class="
      p-4
      rounded-md
      bg-primary-normal
      text-on-primary
      cursor-pointer
      hover:shadow-md hover:opacity-90
      transform-gpu
      transition-all
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    disabled: Boolean,
  },

});
</script>
