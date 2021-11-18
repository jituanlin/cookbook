<template>
  <div>
    <div>
      {{ this.jsonStr }}
    </div>
    <div>
      {{ this.rootLevelData.newProps }}
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
      <p>
        <button @click="addNewPropsByAssignTwice">
          addNewPropsByAssignTwice
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
      // "root level" mean define in `data` option
      rootLevelData: {}
    };
  },
  methods: {
    // NOT WORK
    addNewPropsByDirectlyAssign() {
      this.rootLevelData.newProps = 42;
    },
    // NOT WORK
    addNewPropsByObjectDotAssign() {
      Object.assign(this.rootLevelData, { newProps: 42 });
    },
    // WORK
    addNewPropsByObjectDotAssignToNewObject() {
      this.rootLevelData = Object.assign({}, this.rootLevelData, {
        newProps: 42
      });
    },
    // NOT WORK
    addNewPropsByAssignTwice() {
      this.rootLevelData.newProps = 0;
      this.rootLevelData.newProps = 42;
    }
  },
  computed: {
    jsonStr() {
      return JSON.stringify(this.rootLevelData);
    }
  }
};
</script>

<style scoped></style>
