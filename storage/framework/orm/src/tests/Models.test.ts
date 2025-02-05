import { beforeEach, describe, expect, it } from 'bun:test'
import { DB } from '@stacksjs/orm'
import { refreshDatabase } from '@stacksjs/testing'
import User from '../models/User'

beforeEach(async () => {
  await refreshDatabase()
})

describe('Models test', () => {
  it('should fetch a single record in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const result = await User.create(user)

    const model = await User.find(result.id as number)

    expect(model?.email).toBe(user.email)
  })

  it('should store records in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const result = await User.create(user)

    expect(result?.email).toBe(user.email)
  })

  it('should update records in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const model = await User.create(user)

    expect(model?.email).toBe(user.email)

    const updatedModel = await model.update({ job_title: 'Open Source Developer' })

    expect(updatedModel?.job_title).toBe('Open Source Developer')
  })

  it('should delete records in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const model = await User.create(user)

    expect(model?.email).toBe(user.email)

    await model.delete()

    const userDeleted = await User.find(model?.id as number)

    expect(userDeleted).toBeUndefined()
  })

  it('should remove records in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const model = await User.create(user)

    expect(model?.email).toBe(user.email)

    await User.remove(model.id!)

    const deletedUser = await User.find(model.id!)

    expect(deletedUser).toBeUndefined()
  })

  it('should fetch the first record in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    await User.create(user)

    const firstModel = await User.first()

    expect(firstModel?.email).toBe(user.email)
  })

  it('should fetch a record by ID in models', async () => {
    const user = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const model = await User.create(user)

    const foundModel = await User.findOrFail(model.id as number)

    expect(foundModel?.email).toBe(user.email)
  })

  it('should throw an exception when record is not found by ID in models', async () => {
    await expect(User.findOrFail(99999)).rejects.toThrowError('No UserModel results for 99999')
  })

  it('should fetch the last record in models', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    await User.create(user1)
    await User.create(user2)

    const lastModel = await User.last()

    expect(lastModel?.email).toBe(user2.email)
  })

  it('should fetch records ordered by a specific column in models', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    await User.create(user1)
    await User.create(user2)

    const orderedModels = await User.orderBy('name', 'asc').get()

    expect(orderedModels[0]?.email).toBe(user1.email)
    expect(orderedModels[1]?.email).toBe(user2.email)
  })

  it('should fetch distinct records in models', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    const user3 = {
      name: 'Jane Doe',
      job_title: 'Data Scientist',
      email: 'jane@stacks.com',
      password: '101112',
    }

    await User.create(user1)
    await User.create(user2)
    await User.create(user3)

    const distinctModels = await User.distinct('job_title').get()

    expect(distinctModels.length).toBe(2)
    expect(distinctModels.map((model: UserModel) => model.job_title)).toEqual(['Open Sourceror', 'Data Scientist'])
  })

  it('should fetch records ordered in ascending order in models', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    await User.create(user1)
    await User.create(user2)

    const orderedModelsAsc = await User.orderByAsc('name').get()

    expect(orderedModelsAsc[0]?.email).toBe(user1.email)
    expect(orderedModelsAsc[1]?.email).toBe(user2.email)
  })

  it('should fetch records ordered in descending order in models', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    await User.create(user1)
    await User.create(user2)

    const orderedModelsDesc = await User.orderByDesc('name').get()

    expect(orderedModelsDesc[0]?.email).toBe(user2.email)
    expect(orderedModelsDesc[1]?.email).toBe(user1.email)
  })

  it('should fetch records with where clause', async () => {
    const user1 = {
      name: 'Chris Breuer',
      job_title: 'Open Sourceror',
      email: 'chris@stacksjs.org',
      password: '123456',
    }

    const user2 = {
      name: 'John Doe',
      job_title: 'Data Scientist',
      email: 'john@stacks.com',
      password: '789012',
    }

    await User.create(user1)
    await User.create(user2)

    const results = await User.where('job_title', 'Data Scientist').get()

    expect(results.length).toBe(1)
    expect(results[0]?.email).toBe(user2.email)
  })

  it('should fetch records with multiple where clauses', async () => {
    const testUser = [
      {
        name: 'Chris Breuer',
        job_title: 'Developer',
        email: 'chris@stacksjs.org',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Developer',
        email: 'john@stacks.com',
        password: '789012',
      },
    ]

    await Promise.all(testUser.map(user => User.create(user)))

    const results = await User
      .where('job_title', 'Developer')
      .where('name', 'John Doe')
      .get()

    expect(results[0]?.email).toBe(testUser[1]!.email)

    expect(results.length).toBe(1)
  })

  it('should fetch records with whereIn clause', async () => {
    const users = [
      {
        name: 'Chris Breuer',
        job_title: 'Developer',
        email: 'chris@stacksjs.org',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Designer',
        email: 'john@stacks.com',
        password: '789012',
      },
      {
        name: 'Jane Smith',
        job_title: 'Manager',
        email: 'jane@stacks.com',
        password: '345678',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .whereIn('job_title', ['Developer', 'Designer'])
      .get()

    expect(results.length).toBe(2)
    expect(results.map(r => r.job_title).sort()).toEqual(['Designer', 'Developer'])
  })

  it('should paginate with default options', async () => {
  // Create 15 users for basic pagination test
    const users = Array.from({ length: 15 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const result = await User.paginate()

    expect(result.data.length).toBe(10) // Default limit
    expect(result.paging.page).toBe(1)
    expect(result.paging.total_records).toBe(15)
    expect(result.paging.total_pages).toBe(2)
    expect(result.next_cursor).not.toBeNull()
  })

  it('should handle last page with custom limit', async () => {
  // Create 12 users to test partial page
    const users = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const result = await User.paginate({ limit: 10, page: 2 })

    expect(result.data.length).toBe(2) // Only 2 records on last page
    expect(result.paging.page).toBe(2)
    expect(result.paging.total_records).toBe(12)
    expect(result.paging.total_pages).toBe(2)
    expect(result.next_cursor).toBeNull()
  })

  it('should handle last page with fewer records', async () => {
  // Create 18 users
    const users = Array.from({ length: 18 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const result = await User.paginate({ limit: 10, page: 2 })

    expect(result.data.length).toBe(8) // Only 8 records on last page
    expect(result.paging.page).toBe(2)
    expect(result.paging.total_records).toBe(18)
    expect(result.paging.total_pages).toBe(2)
    expect(result.next_cursor).toBeNull() // No next cursor on last page
  })

  it('should handle empty result set', async () => {
    const result = await User.paginate()

    expect(result.data.length).toBe(0)
    expect(result.paging.page).toBe(1)
    expect(result.paging.total_records).toBe(0)
    expect(result.paging.total_pages).toBe(0)
    expect(result.next_cursor).toBeNull()
  })

  it('should handle custom offset', async () => {
  // Create 30 users
    const users = Array.from({ length: 30 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const result = await User.paginate({ limit: 10, offset: 5 })

    expect(result.data.length).toBe(10)
    expect(result.data[0]!.name).toBe('User 1') // First user after offset
    expect(result.paging.total_records).toBe(30)
    expect(result.next_cursor).not.toBeNull()
  })

  it('should count total records', async () => {
    const users = Array.from({ length: 5 }, (_, i) => ({
      name: `User ${i}`,
      job_title: 'Developer',
      email: `user${i}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const count = await User.count()

    expect(count).toBe(5)
  })

  it('should perform where like queries', async () => {
    const users = [
      {
        name: 'Chris Breuer',
        job_title: 'Senior Developer',
        email: 'chris@stacksjs.org',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Junior Developer',
        email: 'john@stacks.com',
        password: '789012',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .whereLike('job_title', '%Developer%')
      .get()

    expect(results.length).toBe(2)
  })

  it('should fetch records with OR conditions', async () => {
    const users = [
      {
        name: 'Chris',
        job_title: 'Developer',
        email: 'chris@test.com',
        password: '123456',
      },
      {
        name: 'John',
        job_title: 'Designer',
        email: 'john@test.com',
        password: '123456',
      },
      {
        name: 'Jane',
        job_title: 'Manager',
        email: 'jane@test.com',
        password: '123456',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .orWhere(
        ['job_title', 'Developer'],
        ['job_title', 'Designer'],
      )
      .get()

    expect(results.length).toBe(2)
    expect(results.map(r => r.job_title).sort()).toEqual(['Designer', 'Developer'])
  })

  it('should perform whereNotIn queries', async () => {
    const users = [
      {
        name: 'Chris Breuer',
        job_title: 'Developer',
        email: 'chris@stacksjs.org',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Designer',
        email: 'john@stacks.com',
        password: '789012',
      },
      {
        name: 'Jane Smith',
        job_title: 'Manager',
        email: 'jane@stacks.com',
        password: '345678',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .whereNotIn('job_title', ['Developer', 'Designer'])
      .get()

    expect(results.length).toBe(1)
    expect(results[0]?.job_title).toBe('Manager')
  })

  it('should perform whereBetween queries', async () => {
    const users = Array.from({ length: 5 }, (_, i) => ({
      name: `User ${i}`,
      job_title: 'Developer',
      email: `user${i}@stacks.com`,
      password: '123456',
      age: 20 + i * 5,
    }))

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .whereBetween('id', [1, 3])
      .get()

    expect(results.length).toBe(3)
  })

  it('should perform advanced where clause combinations', async () => {
    const users = [
      {
        name: 'Chris Breuer',
        job_title: 'Senior Developer',
        email: 'chris@stacksjs.org',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Junior Developer',
        email: 'john@stacks.com',
        password: '789012',
      },
      {
        name: 'Jane Smith',
        job_title: 'Senior Designer',
        email: 'jane@stacks.com',
        password: '345678',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .whereLike('job_title', 'Junior%')
      .get()

    expect(results.length).toBe(1)
    expect(results[0]?.email).toBe('john@stacks.com')
  })

  it('should perform aggregation functions (min, max, avg, sum)', async () => {
    const users = Array.from({ length: 5 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    const maxId = await User.max('id')
    const minId = await User.min('id')
    const avgId = await User.avg('id')
    const totalId = await User.sum('id')

    expect(maxId).toBe(5) // Last created user's id
    expect(minId).toBe(1) // First created user's id
    expect(avgId).toBe(3) // Average of ids 1,2,3,4,5
    expect(totalId).toBe(15) // Sum of ids 1,2,3,4,5
  })

  it('should handle chunk processing of records', async () => {
    // Create 25 users
    const users = Array.from({ length: 25 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456',
    }))

    await Promise.all(users.map(user => User.create(user)))

    let processedCount = 0
    let chunkedCount = 0
    const chunkSize = 5

    await User.chunk(chunkSize, async (models) => {
      chunkedCount++
      processedCount += models.length
    })

    expect(processedCount).toBe(25)
    expect(chunkedCount).toBe(5)
  })

  it('should handle pluck operation for specific fields', async () => {
    const users = [
      {
        name: 'Chris Breuer',
        job_title: 'Developer',
        email: 'chris@test.com',
        password: '123456',
      },
      {
        name: 'John Doe',
        job_title: 'Designer',
        email: 'john@test.com',
        password: '123456',
      },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const emails = await User.pluck('email')
    expect(emails).toContain('chris@test.com')
    expect(emails).toContain('john@test.com')
    expect(emails.length).toBe(2)
  })

  it('should handle firstOrCreate operation', async () => {
    const userData = {
      name: 'Chris Breuer',
      job_title: 'Developer',
      email: 'chris@test.com',
      password: '123456',
    }

    // First creation
    const firstUser = await User.firstOrCreate(
      { email: 'chris@test.com' },
      userData,
    )

    // Attempt to create the same user
    const existingUser = await User.firstOrCreate(
      { email: 'chris@test.com' },
      {
        name: 'Different Name',
        job_title: 'Different Job',
        email: 'chris@test.com',
        password: '789012',
      },
    )

    expect(firstUser.id).toBe(existingUser.id!)
    expect(existingUser.name).toBe('Chris Breuer')
  })

  it('should handle updateOrCreate operation', async () => {
    const initialData = {
      name: 'Chris Breuer',
      job_title: 'Developer',
      email: 'chris@test.com',
      password: '123456',
    }

    const updatedData = {
      name: 'Chris B',
      job_title: 'Senior Developer',
      email: 'chris@test.com',
      password: '789012',
    }

    // First creation
    const created = await User.updateOrCreate(
      { email: 'chris@test.com' },
      initialData,
    )

    // Update the existing record
    const updated = await User.updateOrCreate(
      { email: 'chris@test.com' },
      updatedData,
    )

    expect(created.id).toBe(updated.id!)
    expect(updated.job_title).toBe('Senior Developer')
    expect(updated.name).toBe('Chris B')
  })

  it('should handle model state tracking (isDirty, isClean, wasChanged)', async () => {
    const user = await User.create({
      name: 'Chris Breuer',
      job_title: 'Developer',
      email: 'chris@test.com',
      password: '123456',
    })

    expect(user.isDirty()).toBe(false)
    expect(user.isClean()).toBe(true)

    user.name = 'Chris B'
    expect(user.isDirty('name')).toBe(true)
    expect(user.isClean('job_title')).toBe(true)

    await user.save()
    // expect(user.wasChanged('name')).toBe(true)
    // expect(user.wasChanged('job_title')).toBe(false)
  })

  it('should handle join operations', async () => {
    // First create a user
    const user = await User.create({
      name: 'Chris Breuer',
      job_title: 'Developer',
      email: 'chris@test.com',
      password: '123456',
    })

    // Create some posts for the user
    await DB.instance.insertInto('posts').values([
      { user_id: user.id, title: 'Post 1' },
      { user_id: user.id, title: 'Post 2' },
    ]).execute()

    const results = await User
      .join('posts', 'users.id', 'posts.user_id')
      .where('users.id', '=', user.id)
      .get()

    expect(results.length).toBeGreaterThan(0)
    expect(results[0]!.name).toBe('Chris Breuer')
  })

  it('should handle groupBy and having operations', async () => {
    // Create users with different job titles
    const users = [
      { name: 'User 1', job_title: 'Developer', email: 'user1@test.com', password: '123456' },
      { name: 'User 2', job_title: 'Developer', email: 'user2@test.com', password: '123456' },
      { name: 'User 3', job_title: 'Designer', email: 'user3@test.com', password: '123456' },
    ]

    await Promise.all(users.map(user => User.create(user)))

    const results = await User
      .groupBy('job_title')
      .having('id', '>', 0)
      .get()

    expect(results.length).toBe(2) // Should have two groups: Developer and Designer
  })

  it('should handle fill and forceFill operations', async () => {
    const user = new User({})

    user.fill({
      name: 'Chris Breuer',
      job_title: 'Developer',
      email: 'chris@test.com',
      password: '123456',
    })

    expect(user.name).toBe('Chris Breuer')

    // Try to fill a guarded attribute
    user.forceFill({
      id: 999,
      name: 'Changed Name',
    })

    expect(user.id).toBe(999) // Should work with forceFill
  })

  it('should handle inRandomOrder query', async () => {
    const users = Array.from({ length: 10 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456'
    }))
    await Promise.all(users.map(user => User.create(user)))

    const randomResults1 = await User.inRandomOrder().get()
    const randomResults2 = await User.inRandomOrder().get()

    expect(randomResults1.length).toBe(10)
    expect(randomResults2.length).toBe(10)
    // Check if orders are different (there's a small chance they could be the same)
    const areDifferent = randomResults1.some((user, index) => user.id !== randomResults2[index]?.id)
    expect(areDifferent).toBe(true)
  })

  it('should handle whereNull queries', async () => {
    await User.create({
      name: 'User 1',
      email: 'user1@test.com',
      job_title: 'Designer',
      password: '123456'
    })
    await User.create({
      name: 'User 2',
      job_title: 'Developer',
      email: 'user2@test.com',
      password: '123456'
    })

    const nullResults = await User.whereNull('updated_at').get()
    expect(nullResults.length).toBe(2)
  })

  it('should handle skip and take operations', async () => {
    const users = Array.from({ length: 5 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@stacks.com`,
      password: '123456'
    }))
    await Promise.all(users.map(user => User.create(user)))

    const results = await User.skip(2).take(2).get()
    expect(results.length).toBe(2)
    expect(results[0]?.name).toBe('User 3')
    expect(results[1]?.name).toBe('User 4')
  })

  it('should handle whereColumn comparison', async () => {
    await User.create({
      name: 'Same Name',
      job_title: 'Same Name',
      email: 'test1@test.com',
      password: '123456'
    })
    await User.create({
      name: 'Different',
      job_title: 'Not Same',
      email: 'test2@test.com',
      password: '123456'
    })

    const results = await User.whereColumn('name', '=', 'job_title').get()
    expect(results.length).toBe(1)
    expect(results[0]?.name).toBe('Same Name')
  })

  it('should handle when conditional queries', async () => {
    await Promise.all([
      User.create({ name: 'User 1', job_title: 'Developer', email: 'user1@test.com', password: '123456' }),
      User.create({ name: 'User 2', job_title: 'Designer', email: 'user2@test.com', password: '123456' })
    ])

    const condition = true
    const results = await User
      .when(condition, query => query.where('job_title', '=', 'Developer'))
      .get()

    expect(results.length).toBe(1)
    expect(results[0]?.name).toBe('User 1')
  })

  it('should track original attributes and changes', async () => {
    const user = await User.create({
      name: 'Original Name',
      job_title: 'Developer',
      email: 'test@test.com',
      password: '123456'
    })

    const original = user.getOriginal('name')
    user.name = 'New Name'
    const changes = user.getChanges()

    expect(original).toBe('Original Name')
    expect(changes.name).toBe('New Name')
  })

  it('should handle findMany operation', async () => {
    const createdUsers = await Promise.all([
      User.create({ name: 'User 1', job_title: 'Developer', email: 'user1@test.com', password: '123456' }),
      User.create({ name: 'User 2', job_title: 'Designer', email: 'user2@test.com', password: '123456' })
    ])

    const ids = createdUsers.map(user => user.id) as number[]
    const foundUsers = await User.findMany(ids)

    expect(foundUsers.length).toBe(2)
    expect(foundUsers.map(user => user.name).sort()).toEqual(['User 1', 'User 2'])
  })

  it('should handle exists check', async () => {
    await User.create({
      name: 'Test User',
      job_title: 'Developer',
      email: 'test@test.com',
      password: '123456',
    })

    const exists = await User.where('email', '=', 'test@test.com').exists()
    const notExists = await User.where('email', '=', 'nonexistent@test.com').exists()

    expect(exists).toBe(true)
    expect(notExists).toBe(false)
  })

  it('should handle latest and oldest queries', async () => {
    const users = Array.from({ length: 3 }, (_, i) => ({
      name: `User ${i + 1}`,
      job_title: 'Developer',
      email: `user${i + 1}@test.com`,
      password: '123456',
    }))
    await Promise.all(users.map(user => User.create(user)))

    const latest = await User.latest()
    const oldest = await User.oldest()

    expect(latest?.name).toBe('User 3')
    expect(oldest?.name).toBe('User 1')
  })

  it('should handle createMany operation', async () => {
    const usersToCreate = Array.from({ length: 3 }, (_, i) => ({
      name: `Batch User ${i + 1}`,
      job_title: 'Developer',
      email: `batch${i + 1}@test.com`,
      password: '123456',
    }))

    await User.createMany(usersToCreate)
    const allUsers = await User.get()

    expect(allUsers.length).toBe(3)
    expect(allUsers.map(user => user.name)).toContain('Batch User 1')
  })
})
