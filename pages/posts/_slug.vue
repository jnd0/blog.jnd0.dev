<template>
  <div class="flex flex-wrap-reverse">
    <ArticleToc v-if="article.toc && article.toc.length" :toc="article.toc"/>

    <div
      class="w-full lg:w-3/4 py-4 lg:pt-8 lg:pb-4 dark:border-gray-800"
      :class="{ 'lg:border-r': article.toc && article.toc.length }"
    >
      <article class="lg:px-8">
        <h1 class="text-4xl font-black mb-4  leading-none"> {{ article.title }}</h1>

        <div class="flex">
          <IconCalendar class="w-5"/>
          <p class="p-2">{{ formatDate(article.date) }} </p></div>
        <div class="flex">
          <IconTag class=" w-5"/>
          <ul class="flex">
            <li v-for="tag in generateTags()" class="p-2">
              <nuxt-link :to="`/tags/${tag}`"
                         class="px-1 text-gray-600 dark:text-white dark-hover:text-black hover:text-black bg-gray-200 dark:bg-gray-600 rounded-md">
                #{{ tag }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <nuxt-content :document="article"/>
      </article>
      <div class="flex justify-between">
        <nuxt-link v-if="prev" :to="prev.slug"><span class="text-3xl"> &#8678; </span> Previous post</nuxt-link>
        <nuxt-link v-if="next" :to="next.slug"> Next post <span class="text-3xl"> &#8680; </span></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.article.title
      }
    },
    async asyncData({$content, params}) {
      const article = await $content(`posts/${params.slug}` || 'index').fetch();

      // Go go next, previous functionality
      const [prev, next] = await $content("posts")
        .only(["title", "slug"])
        .sortBy("createdAt", "asc")
        .surround(params.slug, {before: 1, after: 1})
        .fetch();

      return {article, prev, next}
    },
    methods: {
      getEstimatedReadingTime() {
        return this.article.length;
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      generateTags() {
        return this.article.tags.split(' ');
      }
    }
  }
</script>


