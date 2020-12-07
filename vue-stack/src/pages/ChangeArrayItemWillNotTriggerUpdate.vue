<template>
  <div>
    <p>{{ JSON.stringify(xs) }}</p>
    <div>
      <p>
        <button @click="changeItemByIndex">changeItemByIndex</button>
      </p>
      <p>
        <button @click="changeItemInnerProps">changeItemInnerProps</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeArrayItemWillNotTriggerUpdate",
  data: function() {
    return {
      xs: [{ n: 1 }, { n: 2 }, { n: 3 }],
      JSON
    };
  },
  methods: {
    // NOT WORK
    changeItemByIndex() {
      this.xs[0] = { n: 0 };
    },
    // WORK
    changeItemInnerProps() {
      this.xs[0].n = 0;
    }
  }
};
</script>

<style scoped></style>
