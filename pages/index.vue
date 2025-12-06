<template>
  <div class="py-8">
    <h1 class="text-3xl font-black mb-6 pb-2 border-b dark:border-gray-800">Posts</h1>

    <ul class="space-y-4">
      <li v-for="article in articles" :key="article.slug" 
          class="pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
        <nuxt-link :to="article.path" class="block group">
          <h2 class="text-xl font-semibold text-teal-600 dark:text-teal-400 group-hover:underline">
            {{ article.title }}
          </h2>
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(article.date) }}
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articles: []
      }
    },
    async fetch() {
      this.articles = await this.$content('posts')
        .sortBy('date', 'desc')
        .fetch()
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    }
  }
</script>
