<template>
  <div class="flex">
    <DefaultButton
      class="ml-1"
      v-for="i in [0, 1, 2, 4]"
      dense
      :disabled="disabled"
      @click="$emit('selected', i)"
      >{{ i }}</DefaultButton
    >
  </div>
</template>

<script lang="ts">
import DefaultButton from "./common/buttons/DefaultButton.vue";

export default defineComponent({
  components: {
    DefaultButton,
  },

  props: {
    disabled: Boolean,
  },
});
</script>
