<template>
  <header>
    <nav
      class="top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-black sepia:bg-orange-300"
      @click="scrollToTop"
    >
      <div class="container mx-auto px-4 lg:px-8 flex-1">
        <div class="flex items-center justify-between h-16">
          <div class="w-1/6">
            <nuxt-link to="/">blog.jnd0.dev</nuxt-link>
          </div>
          <div class="hidden flex-1 lg:flex justify-center ml-4 mr-2 lg:mx-8 w-4/6">
            <SearchBox/>
          </div>
          <div class="flex items-center justify-end w-1/6">
            <ColorSwitcher/>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import SearchBox from "./searchBox";
  import ColorSwitcher from "./ColorSwitcher"

  export default {
    name: "navBar",
    components: {SearchBox, ColorSwitcher},
    methods: {
      scrollToTop() {
        if (window.innerWidth >= 1280) {
          return
        }
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<!--
<style scoped>
#nav{
  display: flex;
  justify-content: space-around;
}
</style>
-->
