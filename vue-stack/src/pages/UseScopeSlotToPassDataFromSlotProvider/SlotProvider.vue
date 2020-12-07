<template>
  <div>
    <slot v-bind:n="42" v-bind:str="'hi'"></slot>
  </div>
</template>

<script>
export default {
  name: "SlotProvider"
};
</script>

<style scoped></style>
