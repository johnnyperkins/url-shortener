<template>
  <form class="form" @submit.prevent="submit">
    <p v-if="error" class="error">{{ error }}</p>

    <div class="inputWrap">
      <input
        v-model="url"
        data-test="urlInput"
        type="text"
        placeholder="Enter URL"
      >

      <button
        type="submit"
        data-test="submitBtn"
        :disabled="isLoading"
      >
        Shorten
      </button>
    </div>
  </form>
</template>

<script>
import { createShortUrl } from '@/services'

export default {
  name: 'ShortUrlForm',

  data () {
    return {
      url: '',
      isLoading: false,
      error: null
    }
  },

  methods: {
    async submit () {
      if (!this.url) return

      this.isLoading = true
      this.error = null

      try {
        const shortUrl = await createShortUrl(this.url)

        this.$emit('success', {
          shortUrl,
          longUrl: this.url
        })

        this.url = ''
      } catch (error) {
        this.error = error.message
        this.$emit('fail', error)
        // log error
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;

  .inputWrap {
    display: flex;
    flex-wrap: nowrap;

    > input {
      width: 100%;
    }

    > button {
      margin-left: 8px;
    }
  }

  .error {
    color: red;
  }
}
</style>
