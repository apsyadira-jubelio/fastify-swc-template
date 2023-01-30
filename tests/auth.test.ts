import { app } from '../src/server'

import 'jest'

describe('Dashboard Test', () => {
  it('should return success', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/dashboard',
    })

    expect(response.statusCode).toBe(200)
  })
})
