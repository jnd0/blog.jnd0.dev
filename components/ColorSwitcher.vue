<template>
<div class="tooltip">
  <button
    class="rounded-md hover:text-green-500 focus:outline-none transition ease-in-out duration-150 focus:outline-none"
    aria-label="Color Mode"
    @click="changeCurrentColor()"
  >
    <client-only>
      <IconSystem v-if="$colorMode.preference === 'system'" class="w-6 h-6"/>
      <IconSun v-if="$colorMode.preference === 'light'" class="w-6 h-6"/>
      <IconMoon v-if="$colorMode.preference === 'dark'" class="w-6 h-6"/>
      <IconSepia v-if="$colorMode.preference === 'sepia'" class="w-6 h-6"/>
    </client-only>
  </button>

  <span class='tooltip-text bg-gray-300 ml-2 px-1 rounded-md dark:bg-gray-800'>{{$colorMode.preference}}</span>

</div>
</template>

<script>
  export default {
    data() {
      return {
        colors: ['system', 'light', 'dark', 'sepia'],
        color: ''
      }
    },
    methods: {
      getClasses(color) {
        // Does not set classes on ssr preference is system (because we know them on client-side)
        if (this.$colorMode.unknown) {
          return {}
        }
        return {
          preferred: color === this.$colorMode.preference,
          selected: color === this.$colorMode.value
        }
      },
      getCurrentColor() {
        return this.$colorMode.preference;
      },
      changeCurrentColor() {
        const color = this.getCurrentColor();
        console.log(color);
        if (color === 'system') {
          this.$colorMode.preference = 'light';
        }else if (color === 'light') {
          this.$colorMode.preference = 'dark';
        } else if (color === 'dark') {
          this.$colorMode.preference = 'sepia';
        } else if (color === 'sepia') {
          this.$colorMode.preference = 'system';
        }

      }

    },

  }
</script>
<style scoped>
  .tooltip .tooltip-text {
    visibility: hidden;
    text-align: center;
    padding: 5px 0;
    position: absolute;
    z-index: 100;
  }
  .tooltip:hover .tooltip-text {
    visibility: visible;
  }
</style>
