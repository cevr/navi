import { createMemoryNavigation, route, mount } from '../src'

describe("ViewMatcher", () => {
  test("Matches URLs with trailing /", async () => {
    let nav = createMemoryNavigation({
      url: '/test/',
      routes: mount({
        '/test': route({}),
      }),
    })

    let r = await nav.getSteadyValue()
    
    expect(r.url.pathname).toBe('/test/')
  })

  test("Can specify payload using a function", async () => {
    let nav = createMemoryNavigation({
      url: '/test/',
      routes: mount({
        '/test': route(req => ({ data: { title: req.mountpath } })),
      }),
    })

    let r = await nav.getSteadyValue()
    
    expect(r.data.title).toBe('/test')
  })

  test("Matches URLs with no trailing /", async () => {
    let nav = createMemoryNavigation({
      url: '/test',
      routes: mount({
        '/test': route({}),
      }),
    })

    let r = await nav.getSteadyValue()
    
    expect(r.url.pathname).toBe('/test/')
  })
})
