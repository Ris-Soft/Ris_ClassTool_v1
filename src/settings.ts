import { createApp } from "vue";
import App from "./settings.vue";
import {
  provideFluentDesignSystem,
  fluentCard,
  fluentButton,
  fluentListbox,
  fluentOption,
  fluentAccordion,
  fluentAccordionItem,
  fluentTab,
  fluentTabPanel,
  fluentTabs,
} from "@fluentui/web-components";
provideFluentDesignSystem().register(
  fluentCard(),
  fluentButton(),
  fluentListbox(),
  fluentOption(),
  fluentAccordion(),
  fluentAccordionItem(),
  fluentTab(),
  fluentTabPanel(),
  fluentTabs()
);

const app = createApp(App);

app.mount("#app").$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
  });
});
