import Home from './Home.vue'
import { mount } from '@vue/test-utils'
import * as api from '@/services/api'
import ShortUrlResult from '@/components/ShortUrlResult.vue'

let locationReplaceMock = jest.fn()
delete window.location
window.location = { replace: locationReplaceMock }

const flushPromises = () => new Promise(setImmediate)

describe('Home.vue', () => {
  afterEach(() => {
    locationReplaceMock.mockClear()
  })

  it('correctly fetches original url on mount if shortUrl param', async () => {
    const shortUrl = '369'
    const getOriginalUrlSpy = jest.spyOn(api, 'getOriginalUrl')
      .mockImplementation(() => true)

    const $route = {
      path: '/',
      params: {
        shortUrl
      }
    }

    mount(Home, {
      global: {
        mocks: {
          $route
        }
      }
    })

    expect(getOriginalUrlSpy).toBeCalledWith(shortUrl)
  })

  it('routes to the original url', async () => {
    const shortUrl = '369'
    const originalUrl = 'http://www.woot.com/long-url'
    jest.spyOn(api, 'getOriginalUrl')
      .mockImplementation(() => originalUrl)

    const $route = {
      path: '/',
      params: {
        shortUrl
      }
    }

    const { vm } = mount(Home, {
      global: {
        mocks: {
          $route
        }
      }
    })

    await vm.$nextTick()

    expect(locationReplaceMock).toBeCalledWith(originalUrl)
  })

  it('lists newly created urls', async () => {
    const generatedUrls = [
      {
        shortUrl: '369',
        longUrl: 'http://x.io/1'
      },
      {
        shortUrl: '36963',
        longUrl: 'http://x.io/2'
      }
    ]

    const $route = {
      path: '/',
      params: {
        shortUrl: false
      }
    }

    const wrapper = mount(Home, {
      global: {
        mocks: {
          $route
        }
      }
    })

    generatedUrls.forEach(generatedUrl =>
      wrapper.vm.onSubmitSucces(generatedUrl))

    await wrapper.vm.$nextTick()

    const ShortUrlResults = wrapper.findAllComponents(ShortUrlResult)

    generatedUrls.forEach((generatedUrl, i) =>
      expect(ShortUrlResults[i].props())
        .toStrictEqual(generatedUrls[i]))
  })

  it('displays error from fetching original url', async () => {
    const shortUrl = '369'
    const mockError = new Error('fail')

    jest.spyOn(api, 'getOriginalUrl')
      .mockRejectedValue(mockError)

    const $route = {
      path: '/',
      params: {
        shortUrl
      }
    }

    const wrapper = mount(Home, {
      global: {
        mocks: {
          $route
        }
      }
    })

    await wrapper.vm.$nextTick()
    await flushPromises()

    expect(wrapper.text()).toContain(mockError.message)
  })
})
