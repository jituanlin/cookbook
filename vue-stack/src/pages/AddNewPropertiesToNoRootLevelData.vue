<template>
  <div>
    <div>
      {{ this.jsonStr }}
    </div>
    <div>
      {{this.notRootLevelData.newProps}}
    </div>
    <div>
      <p>
        <button @click="addNewPropsByDirectlyAssign">
          addNewPropsByDirectlyAssign
        </button>
      </p>
      <p>
        <button @click="addNewPropsByObjectDotAssign">
          addNewPropsByObjectDotAssign
        </button>
      </p>
      <p>
        <button @click="addNewPropsByObjectDotAssignToNewObject">
          addNewPropsByObjectDotAssignToNewObject
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewPropertiesToNoRootLevelData",
  data() {
    return {
      notRootLevelData: {}
    };
  },
  methods: {
    addNewPropsByDirectlyAssign() {
      this.notRootLevelData.newProps = 42;
    },
    addNewPropsByObjectDotAssign() {
      Object.assign(this.notRootLevelData, { newProps: 42 });
    },
    addNewPropsByObjectDotAssignToNewObject() {
      this.notRootLevelData = Object.assign({}, this.notRootLevelData, {
        newProps: 42
      });
    }
  },
  computed: {
    jsonStr() {
      return JSON.stringify(this.notRootLevelData);
    }
  }
};
</script>

<style scoped></style>
