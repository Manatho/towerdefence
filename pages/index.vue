<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col text-center max-w-sm gap-2">
      <DefaultButton @click="goto('/game')">Start game</DefaultButton>
      <DefaultButton :disabled="true">Options</DefaultButton>
    </div>
  </div>
</template>

<script lang="ts">
import { createApp } from "vue";
import DefaultButton from "~~/components/common/buttons/DefaultButton.vue";

export default {
  components: { DefaultButton },

  methods: {
    goto(path: string) {
      this.$router.push(path);
    },
  },
};
</script>
