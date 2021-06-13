<template>
  <div class="wrap">
    <label for="longUrl">Original URL</label>
    <input
      id="longUrl"
      data-test="longUrl"
      type="text"
      readonly
      :value="longUrl"
    />

    <label for="shortUrl">Short URL</label>
    <div class="shortUrlWrap">
      <input
        id="shortUrl"
        data-test="shortUrl"
        type="text"
        readonly
        :value="shortUrl"
      />

      <button
        data-test="copyBtn"
        type="submit"
        @click="copyShortUrl"
      >
        Copy
      </button>
    </div>
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

  input {
    width: 100%;
  }

  > input {
    margin-bottom: $space-md;
  }

  .shortUrlWrap {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

    > button {
      margin-left: $space-sm;
    }
  }
}
</style>
