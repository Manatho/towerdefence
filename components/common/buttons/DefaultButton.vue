<template>
  <div
    class="rounded-md text-on-primary transform-gpu transition-all select-none"
    :class="{
      'p-1': dense,
      'p-4': !dense,
      'hover:shadow-md hover:opacity-90 bg-primary-normal cursor-pointer':
        !disabled,
      'bg-primary-light cursor-auto': disabled,
    }"
    @click="click"
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

  methods: {
    click(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
  emits: ["click"],
});
</script>
