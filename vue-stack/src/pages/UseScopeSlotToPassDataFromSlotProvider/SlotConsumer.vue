<template>
  <SlotProvider>
    <template v-slot:default="data">
      {{ data.n }}
      {{ data.str }}
    </template>
  </SlotProvider>
</template>

<script>
import SlotProvider from "@/pages/UseScopeSlotToPassDataFromSlotProvider/SlotProvider";
export default {
  name: "SlotConsumer",
  components: { SlotProvider }
};
</script>

<style scoped></style>
