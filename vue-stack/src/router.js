import VueRouter from "vue-router";
import * as components from "./pages";

export const routes = Object.entries(components).map(
  ([componentName, component]) => ({
    path: `/${componentName}`,
    component
  })
);

console.log(routes);

export const router = new VueRouter({
  routes
});
