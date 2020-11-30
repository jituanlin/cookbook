import VueRouter from "vue-router";
import ReassignArrayTriggerUpdate from "./pages/ReassignArrayTriggerUpdate";
import AddNewPropertiesToNoRootLevelData from "./pages/AddNewPropertiesToNoRootLevelData";

export const routes = [
  {
    path: "/ReassignArrayTriggerUpdate",
    component: ReassignArrayTriggerUpdate
  },
  {
    path: "/AddNewPropertiesToNoRootLevelData",
    component: AddNewPropertiesToNoRootLevelData
  }
];

export const router = new VueRouter({
  routes
});
