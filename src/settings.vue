<script>
import { ref, defineAsyncComponent } from "vue";

const categories = ref([
  { name: "课堂工具", component: "home", icon: "bi-house" },
  // { name: "课程", component: "schedule", icon: "bi-calendar" },
  { name: "桌面整理", component: "desktop", icon: "bi-archive-fill" },
  { name: "侧栏设置", component: "sidebar", icon: "bi-layout-sidebar-inset" },
  // { name: "外观", component: "appearance", icon: "bi-palette" },
  // { name: "数据", component: "data", icon: "bi-bar-chart" },
  // { name: "时间", component: "time", icon: "bi-clock" },
  // { name: "扩展", component: "plugin", icon: "bi-plugin" },
  // { name: "安全", component: "security", icon: "bi-shield-lock" },
  { name: "关于软件", component: "about", icon: "bi-info-circle" },
]);

const selectedCategory = ref(defineAsyncComponent(() =>
  import(`./components/settings/${categories.value[0].component}.vue`)
));

const selectCategory = (component) => {
  selectedCategory.value = defineAsyncComponent(() =>
    import(`./components/settings/${component}.vue`)
  );
};

export default {
  setup() {
    return {
      categories,
      selectedCategory,
      selectCategory,
    };
  },
};
</script>

<template>
  <div class="settings-container">
    <div class="settings-topbar">
      <div class="title">程序设置</div>
      <div class="version-info">
        <span>1.0.0</span>
      </div>
    </div>
    <div class="settings-body">
      <div class="settings-sidebar">
        <fluent-listbox>
          <fluent-option v-for="category in categories" :key="category.name" @click="selectCategory(category.component)"
            :class="{ selected: selectedCategory === category.component }" aria-selected="true">
            <i :class="`bi ${category.icon}`"></i> {{ category.name }}
          </fluent-option>
        </fluent-listbox>
      </div>
      <div class="settings-content">
        <component :is="selectedCategory"></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons.css";

fluent-listbox {
  width: 100%;
  outline: none;
  border: none;
  gap: 3px;
}

fluent-listbox fluent-option {
  background-color: transparent;
}

fluent-listbox fluent-option:hover {
  background-color: rgba(223, 223, 223, 0.445);
}

fluent-listbox fluent-option.selected {
  background-color: rgba(223, 223, 223, 0.692);
}

.settings-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  /* 强制使用浅色背景 */
}

.settings-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  background-color: rgb(243, 243, 243);
  /* 强制使用浅色背景 */
}

.settings-topbar .title {
  font-size: 18px;
  font-weight: bold;
}

.settings-topbar .version-info {
  display: flex;
  align-items: center;
}

.settings-topbar .version-info span {
  margin-right: 10px;
}

.settings-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.settings-sidebar {
  width: 200px;
  background-color: rgb(243, 243, 243);
  /* 强制使用浅色背景 */
  color: black;
  /* 强制使用黑色文字 */
}

.settings-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.settings-sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.settings-sidebar li i {
  margin-right: 10px;
}

.settings-sidebar li:hover {
  background-color: #eeeeee;
}

.settings-sidebar li.active {
  background-color: #e0e0e0;
}

.settings-sidebar li.active {
  font-weight: bold;
}

.settings-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  /* 添加滚动条，防止内容溢出 */
  background-color: rgb(246, 246, 246);
  /* 强制使用浅色背景 */
  border-radius: 10px 0 0 0;
  /* 圆角边框 */
  color: black;
  /* 强制使用黑色文字 */
  border: 1px solid #e3e3e3;
}
</style>
