import ShortUrlResult from './ShortUrlResult.vue'
import { mount } from '@vue/test-utils'

describe('ShortUrlResult.vue', () => {
  it('displays the long URL', () => {
    const longUrl = 'test.com/woot'

    const wrapper = mount(ShortUrlResult, {
      props: {
        longUrl,
        shortUrl: ''
      }
    })

    const input = wrapper.find('[data-test="longUrl"]')
    expect(input.element.value).toBe(longUrl)
  })

  it('displays the shortened URL', () => {
    const shortUrl = 'test.com/woot'

    const wrapper = mount(ShortUrlResult, {
      props: {
        longUrl: '',
        shortUrl
      }
    })

    const input = wrapper.find('[data-test="shortUrl"]')
    expect(input.element.value).toBe(shortUrl)
  })

  it('copies the short URL to the clipboard', async () => {
    const shortUrl = 'test.com/woot'
    const writeText = jest.fn().mockImplementation(text => text)

    Object.assign(navigator, {
      clipboard: { writeText }
    })

    const wrapper = mount(ShortUrlResult, {
      props: {
        longUrl: '',
        shortUrl
      }
    })

    const copyBtn = wrapper.find('[data-test="copyBtn"]')
    await copyBtn.trigger('click')
    expect(writeText).toBeCalledWith(shortUrl)
  })

  it('displays an error on failed clipboard write', async () => {
    const shortUrl = 'test.com/woot'
    const writeText = jest.fn().mockRejectedValue(new Error('fail'))

    Object.assign(navigator, {
      clipboard: { writeText }
    })

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    const wrapper = mount(ShortUrlResult, {
      props: {
        longUrl: '',
        shortUrl
      }
    })

    const copyBtn = wrapper.find('[data-test="copyBtn"]')
    await copyBtn.trigger('click')
    expect(alertSpy).toBeCalled()
  })
})
