<template>
  <div>
    <p v-for="n of ns" :key="n">
      {{ n }}
    </p>
    <button @click="reAssign">reAssign</button>
  </div>
</template>

<script>
export default {
  name: "ReassignArrayTriggerUpdate",
  data() {
    return {
      ns: []
    };
  },
  methods: {
    reAssign() {
      this.ns = [1, 2, 3];
    }
  }
};
</script>

<style scoped></style>
