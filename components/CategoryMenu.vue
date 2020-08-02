<template>
  <div class="category-menu-wrapper">
    <div class="category-menu">
      <div class="category-menu-header d-flex">
        <strong class="flex-grow-1">Категории</strong>
        <span :style="{ cursor: 'pointer' }" @click="toggle"
          ><b-icon-chevron-up v-if="!collapsed" /><b-icon-chevron-down
            v-if="collapsed"
        /></span>
      </div>
      <ul v-if="!collapsed">
        <li v-for="category in categories" :key="category.category_id">
          <nuxt-link :to="{ path: '/catalog/' + category.url }">{{
            category.name
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
import { ACTIONS } from '~/store'

@Component({
  components: {
    BIconChevronDown,
    BIconChevronUp,
  },
  props: ['path', 'parentId'],
})
export default class CategoryMenu extends Vue {
  collapsed = false
  categories = []

  toggle() {
    this.collapsed = !this.collapsed
  }

  async beforeMount() {
    let parentId = null
    if (this.$props.path !== '') {
      const category = await this.$store.dispatch(
        ACTIONS.FIND_CATEGORY_BY_PATH,
        this.$props.path
      )
      if (category !== null) {
        parentId = category.category_id
      }
    }
    if (this.$props.parentId) {
      parentId = this.$props.parentId
    }
    this.$store
      .dispatch(ACTIONS.GET_CHILD_CATEGORIES, parentId)
      .then((categories) => {
        this.categories = categories
      })
  }
}
</script>

<style>
.category-menu-wrapper {
  background: #f5f5f5;
  padding: 5px;
  width: 350px;
}
.category-menu-wrapper > .category-menu {
  background: #fff;
  border-radius: 5px;
}
.category-menu-header {
  padding: 15px 15px;
}
</style>

<style scoped>
div {
  text-align: left;
}
ul,
li {
  display: block;
  padding: 0;
  margin: 0;
  list-style: none;
}
li {
}
a {
  color: #666;
  display: block;
  padding: 8px 15px;
}
a:hover {
  text-decoration: none;
  background: #f4f4f4;
}
a.nuxt-link-active {
  color: #111;
  background: #ddd;
}
</style>
