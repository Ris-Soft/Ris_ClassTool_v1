<script>
import { ref, defineAsyncComponent } from 'vue';

const HomePage = defineAsyncComponent(() => import('./components/settings/home.vue'));
const ScheduelePage = defineAsyncComponent(() => import('./components/settings/schedule.vue'));
const WidgetsPage = defineAsyncComponent(() => import('./components/settings/widgets.vue'));

const categories = ref([
  { name: '首页', component: HomePage },
  { name: '课程', component: ScheduelePage },
  { name: '组件', component: WidgetsPage },
]);

const selectedCategory = ref(categories.value[0].component);

const selectCategory = (component) => {
  selectedCategory.value = component;
};

export default {
  setup() {
    return {
      categories,
      selectedCategory,
      selectCategory
    };
  }
};
</script>

<template>
  <div class="settings-container">
    <div class="settings-topbar">
      <div class="title">程序设置</div>
      <div class="version-info">
        <span>版本号: 1.0.0</span>
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-arrow-up-circle"></i> 升级
        </button>
      </div>
    </div>
    <div class="settings-sidebar">
      <ul>
        <li
          v-for="category in categories"
          :key="category.name"
          @click="selectCategory(category.component)"
          :class="{ active: selectedCategory === category.component }"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
    <div class="settings-content">
      <component :is="selectedCategory"></component>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css';

.settings-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0; /* 强制使用浅色背景 */
}

.settings-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #ffffff; /* 强制使用浅色背景 */
  border-bottom: 1px solid #ccc;
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

.settings-sidebar {
  width: 200px;
  border-right: 1px solid #ccc;
  background-color: #ffffff; /* 强制使用浅色背景 */
  color: black; /* 强制使用黑色文字 */
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
}

.settings-sidebar li:hover,
.settings-sidebar li.active {
  background-color: #e0e0e0;
}

.settings-sidebar li.active {
  font-weight: bold;
}

.settings-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 添加滚动条，防止内容溢出 */
  background-color: #f0f0f0; /* 强制使用浅色背景 */
  color: black; /* 强制使用黑色文字 */
}
</style>