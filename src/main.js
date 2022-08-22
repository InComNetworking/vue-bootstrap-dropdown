import { createApp } from "vue";

import App from "./App.vue";

window.APP = createApp(App);

import DropdownComponent from "../index";
console.log(DropdownComponent);

window.APP.use(DropdownComponent);

window.APP.mount("#app");
