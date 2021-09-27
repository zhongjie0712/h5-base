<template>
  <div id="app">
    <keep-alive :max="4">
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    const loading = document.getElementById('Loading')
    if (loading != null) {
      loading.parentNode.removeChild(loading)
    }
  }
}
</script>
<style lang="scss">
#app {
  color: #333333;
  font-size: 28px;
}
</style>
