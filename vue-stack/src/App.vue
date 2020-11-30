<template>
  <div id="app">
    <div class="router">
      <ul>
        <li v-for="route of routes" :key="route.path">
          <router-link :to="route.path">{{ route.component.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { routes } from "./router";

export default {
  name: "App",
  data() {
    return {
      routes
    };
  }
};
</script>

<style lang="css">
.router {
  display: flex;
  background: #ddd3d3;
}
.page {
  margin-top: 120px;
}
</style>
