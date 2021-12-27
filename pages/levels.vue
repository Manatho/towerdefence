<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col text-center max-w-sm gap-2">
      <DefaultButton @click="goto(1)">Level 1</DefaultButton>
      <DefaultButton @click="goto(2)">Level 2</DefaultButton>
      <DefaultButton @click="back()">Back</DefaultButton>
    </div>
  </div>
</template>

<script lang="ts">
import DefaultButton from "~~/components/common/buttons/DefaultButton.vue";

export default defineComponent({
  components: { DefaultButton },

  methods: {
    goto(level: number) {
      localStorage.setItem("level", (level - 1).toString());
      this.$router.push("game");
    },
    back() {
      this.$router.push("/");
    },
  },
});
</script>
