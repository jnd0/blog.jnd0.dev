<template>
  <div>
    <h1 class="text-3xl font-black mb-4 pb-1 border-b"> Posts </h1>
    <ul>
      <li v-for="article in articles" :key="article.title">
        {{formatDate(article.date)}}
        <nuxt-link :to="article.path"> {{ article.title }}</nuxt-link>
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
      formatDate(date){
        return new Date(date).toLocaleDateString();

      }
    }
  }
</script>
