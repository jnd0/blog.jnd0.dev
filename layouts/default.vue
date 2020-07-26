<template>
  <div class="font-mono dark:text-white dark:bg-gray-900 sepia:bg-orange-200">
    <nav-bar />
    <main class="container mx-auto min-h-screen px-4 lg:px-8 ">
      <div class="flex flex-wrap relative">

        <nuxt class="w-full lg:w-4/5"/>
      </div>
    </main>
    <FooterBar/>
  </div>
</template>


<script>
  import NavBar from "../components/navBar";
  import FooterBar from "../components/footerBar";

  export default {
    components: {FooterBar, NavBar}
  }
</script>

<style lang="postcss">
  .aside-title {
    @apply mb-3 text-gray-500 uppercase tracking-wide font-bold text-sm;
  }

  .dark-mode .aside-title {
    @apply text-gray-600;
  }

  @screen lg {
    .aside-title {
      @apply mb-2 text-xs;
    }
  }
  /*main {*/
  /*  min-height: 100vh;*/
  /*}*/
</style>

<!--
<style>
  html {
    margin: 0;
    height: 100%;
  }

  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

  }

  nuxt {
    flex: 1;
  }

</style>

-->
