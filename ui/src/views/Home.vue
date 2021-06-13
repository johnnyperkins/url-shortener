<template>
  <div class="home">
    <h1>URL Shortener</h1>

    <short-url-form @success="onSubmitSucces" />

    <short-url-result
      v-for="url in generatedUrls"
      :key="url.shortUrl"
      class="result"
      :longUrl="url.longUrl"
      :shortUrl="url.shortUrl"
    />
  </div>
</template>

<script>
import ShortUrlForm from '@/components/ShortUrlForm.vue'
import ShortUrlResult from '@/components/ShortUrlResult.vue'

export default {
  name: 'Home',

  data () {
    return {
      generatedUrls: []
    }
  },

  methods: {
    onSubmitSucces (generatedUrlResponse) {
      this.generatedUrls.push(generatedUrlResponse)
    }
  },

  components: {
    ShortUrlForm,
    ShortUrlResult
  }
}
</script>

<style scoped lang="scss">
@import '@/css/sizes.scss';

.home {
  width: 100%;
  max-width: 700px;

  .result {
    width: 100%;
    margin-top: $space-lg;
  }
}
</style>
