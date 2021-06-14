import ShortUrlForm from './ShortUrlForm.vue'
import { mount } from '@vue/test-utils'
import * as api from '@/services/api'

describe('ShortUrlForm.vue', () => {
  it('triggers form submit on button click', async () => {
    const wrapper = mount(ShortUrlForm)
    const vm = wrapper.vm
    const submitSpy = jest.spyOn(vm, 'submit')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')
    await submitBtn.trigger('submit')
    expect(submitSpy).toBeCalled()
  })

  it('does not call api on submit if no URL input', async () => {
    const urlInputValue = ''
    const createShortUrlSpy = jest.spyOn(api, 'createShortUrl')

    const wrapper = mount(ShortUrlForm)
    const urlInput = wrapper.get('[data-test="urlInput"]')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')

    await urlInput.setValue(urlInputValue)
    await submitBtn.trigger('submit')

    expect(createShortUrlSpy).toHaveBeenCalledTimes(0)
  })

  it('correctly calls create url api on submit', async () => {
    const urlInputValue = 'http://www.testurl.com/some-long-url/mock'
    const createShortUrlSpy = jest.spyOn(api, 'createShortUrl')

    const wrapper = mount(ShortUrlForm)
    const urlInput = wrapper.get('[data-test="urlInput"]')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')

    await urlInput.setValue(urlInputValue)
    await submitBtn.trigger('submit')

    expect(createShortUrlSpy).toHaveBeenCalledWith(urlInputValue)
  })

  it('emits correct value on submit success', async () => {
    const urlInputValue = 'http://www.testurl.com/some-long-url/mock'
    const mockCreateShortUrlResponse = {
      shortUrl: 'http://urlshortener.com/1',
      longUrl: urlInputValue
    }

    jest.spyOn(api, 'createShortUrl')
      .mockImplementation(() => mockCreateShortUrlResponse)

    const wrapper = mount(ShortUrlForm)
    const urlInput = wrapper.get('[data-test="urlInput"]')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')

    await urlInput.setValue(urlInputValue)
    await submitBtn.trigger('submit')

    expect(wrapper.emitted().success[0][0])
      .toStrictEqual(mockCreateShortUrlResponse)
  })

  it('emits error on submit failure', async () => {
    const mockError = new Error('fail')

    jest.spyOn(api, 'createShortUrl')
      .mockRejectedValue(mockError)

    const wrapper = mount(ShortUrlForm, {
      data() {
        return {
          url: 'exists'
        }
      }
    })
    await wrapper.vm.submit()

    expect(wrapper.emitted().fail[0][0])
      .toBe(mockError)
  })

  it('displays error message on submit failure', async () => {
    const mockError = new Error('fail')

    jest.spyOn(api, 'createShortUrl')
      .mockRejectedValue(mockError)

    const wrapper = mount(ShortUrlForm, {
      data() {
        return {
          url: 'exists'
        }
      }
    })
    await wrapper.vm.submit()

    expect(wrapper.text()).toContain(mockError.message)
  })

  it('disables submit button while loading', async () => {
    const wrapper = mount(ShortUrlForm, {
      data() {
        return {
          isLoading: true
        }
      }
    })

    const submitBtn = wrapper.get('[data-test="submitBtn"]')
    const disabledAttribute = { disabled: '' }
    expect(submitBtn.attributes()).toMatchObject(disabledAttribute)
  })

  it('clears url input on submit success', async () => {
    const urlInputValue = 'http://www.testurl.com/some-long-url/mock'

    jest.spyOn(api, 'createShortUrl')
      .mockImplementation(() => true)

    const wrapper = mount(ShortUrlForm)
    const urlInput = wrapper.get('[data-test="urlInput"]')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')

    await urlInput.setValue(urlInputValue)
    await submitBtn.trigger('submit')

    expect(urlInput.element.value).toBe('')
  })

  it('does not clear url input on submit failure', async () => {
    const urlInputValue = 'http://www.testurl.com/some-long-url/mock'

    jest.spyOn(api, 'createShortUrl')
      .mockRejectedValue(new Error('x'))

    const wrapper = mount(ShortUrlForm)
    const urlInput = wrapper.get('[data-test="urlInput"]')
    const submitBtn = wrapper.get('[data-test="submitBtn"]')

    await urlInput.setValue(urlInputValue)
    await submitBtn.trigger('submit')

    expect(urlInput.element.value).toBe(urlInputValue)
  })
})
