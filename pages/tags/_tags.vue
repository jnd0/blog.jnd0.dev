<template>
  <div>
    <h1 class="text-3xl font-black mb-4 pb-1 border-b">
      Articles tagged #{{ currentTag }}
    </h1>

    <ul>
      <li v-for="article in tagArticles" :key="article.slug" class="py-2">
        <span class="text-gray-500 dark:text-gray-400">{{ formatDate(article.date) }}</span>
        <nuxt-link :to="`/posts/${article.slug}`" class="ml-2 text-teal-500 hover:underline">
          {{ article.title }}
        </nuxt-link>
      </li>
    </ul>

    <nuxt-link to="/" class="text-teal-500 hover:underline mt-4 inline-block">
      ← Back to all posts
    </nuxt-link>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        tagArticles: []
      }
    },
    async asyncData({$content, params}) {
      const tagArticles = await $content("posts").where({tags: {$contains: params.tags}}).fetch();
      return {
        tagArticles,
        currentTag: params.tags
      }
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    }
  }
</script>
