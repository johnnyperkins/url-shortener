<template>
  <p v-if="isLoading">
    Loading...
  </p>
  <div v-else class="home">
    <h1>URL Shortener</h1>

    <p v-if="fetchUrlError" class="error">
      {{ fetchUrlError }}
    </p>

    <short-url-form
      @success="onSubmitSucces"
      @fail="onSubmitFail"
    />

    <short-url-result
      v-for="(longUrl, shortUrl) in generatedUrls"
      :key="shortUrl"
      class="result"
      :longUrl="longUrl"
      :shortUrl="shortUrl"
    />
  </div>
</template>

<script>
import ShortUrlForm from '@/components/ShortUrlForm.vue'
import ShortUrlResult from '@/components/ShortUrlResult.vue'
import { getOriginalUrl } from '@/services'

export default {
  name: 'Home',

  data () {
    return {
      generatedUrls: {},
      fetchUrlError: null,
      isLoading: false
    }
  },

  mounted () {
    const shortUrl = this.$route.params.shortUrl
    if (shortUrl) this.fetchOriginalUrl(shortUrl)
  },

  methods: {
    async fetchOriginalUrl (shortUrl = '') {
      this.isLoading = true
      this.fetchUrlError = null

      try {
        const originalUrl = await getOriginalUrl(shortUrl)
        this.routeToUrl(originalUrl)
      } catch (error) {
        this.fetchUrlError = error.message
        this.isLoading = false
      }
    },

    routeToUrl (url = '') {
      window.location.replace(url)
    },

    onSubmitSucces (generatedUrlResponse) {
      this.generatedUrls[generatedUrlResponse.shortUrl] = generatedUrlResponse.longUrl
      this.clearFetchUrlError()
    },

    onSubmitFail () {
      this.clearFetchUrlError()
    },

    clearFetchUrlError () {
      this.fetchUrlError = null
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

  .error {
    color: red;
  }
}
</style>
