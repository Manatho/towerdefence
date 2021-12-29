<template>
  <div v-if="tower != null" class="flex flex-col">
    <span>reload: {{ tower.reload + " / " + tower.nextShot.toFixed(1) }}</span>
    <span>range: {{ tower.range }}</span>
    <span>position: {{ tower.position.x + " " + tower.position.y }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "nuxt3/dist/app/compat/capi";
import { Tower } from "~~/game/tower/tower";

export default defineComponent({
  props: {
    tower: Object as PropType<Tower>,
  },
});
</script>
