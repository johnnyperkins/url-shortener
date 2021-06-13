<template>
  <div class="wrap">
    <div class="link">
      <label for="longUrl">Original URL</label>
      <a
        id="longUrl"
        data-test="longUrl"
        :href="longUrl"
        target="_blank"
      >
        {{ longUrl }}
      </a>
    </div>

    <div class="link">
      <label for="shortUrl">Short URL</label>
      <a
        id="shortUrl"
        data-test="shortUrl"
        :href="shortUrl"
        target="_blank"
      >
        {{ shortUrl }}
      </a>
    </div>

      <button
        data-test="copyBtn"
        type="submit"
        @click="copyShortUrl"
      >
        Copy shortened URL
      </button>
  </div>
</template>

<script>
export default {
  name: 'ShortUrlResult',

  props: {
    /**
     * The original url that has been shortened
     * @example 'www.somedomain.com/very-long/and/stuff'
     */
    longUrl: {
      type: String,
      default: '',
      required: true
    },

    /**
     * The generated short url
     * @example 'urlshortener.com/1'
     */
    shortUrl: {
      type: String,
      default: '',
      required: true
    }
  },

  methods: {
    // Not checking for clipboard permissions
    async copyShortUrl () {
      try {
        await navigator.clipboard.writeText(this.shortUrl)
      } catch (err) {
        alert('Failed to copy URL')
        // log error
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/css/sizes.scss';

.wrap {
  padding: $space-md;
  box-shadow: 3px 3px 8px #aaa;
  text-align: start;

  .link {
    display: flex;
    flex-direction: column;

    &:first-of-type {
      margin-bottom: $space-md;
    }
  }

  button {
    margin-top: $space-md;
  }
}
</style>
