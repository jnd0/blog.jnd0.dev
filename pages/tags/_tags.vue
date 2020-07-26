<template>
  <div>

    <h2>Articles containing {{ currentTag }} </h2>

    <ul>
      <li v-for="article in tagArticles" :key="article.tags">
        {{ article.title }}
      </li>
    </ul>

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
    }
  }
</script>
