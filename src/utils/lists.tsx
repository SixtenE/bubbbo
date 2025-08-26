import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-react-start/server'

export type List = {
  id: string
  title: string
  totalItems: number
  completedItems: number
  isPrivate: boolean
}

const mockLists: List[] = [
  {
    id: '6f1d2b4e-1a9b-4d7c-9e8a-3a2b1c4d5e6f',
    title: 'Eskader',
    totalItems: 24,
    completedItems: 7,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: '2a7c9f31-b5e4-4c2d-8f0a-91b2c3d4e5f6',
    title: 'Pappas lista',
    totalItems: 12,
    completedItems: 3,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: '9b8a7c6d-5e4f-3a2b-1c0d-efab12345678',
    title: 'Sean von Schollenberg',
    totalItems: 58,
    completedItems: 14,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: '0c1d2e3f-4a5b-6c7d-8e9f-a0b1c2d3e4f5',
    title: 'Sista listan',
    totalItems: 42,
    completedItems: 21,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test lista',
    totalItems: 10,
    completedItems: 5,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: '89abcdef-0123-4567-89ab-cdef01234567',
    title: 'Min andra lista',
    totalItems: 30,
    completedItems: 15,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: 'fedcba98-7654-3210-fedc-ba9876543210',
    title: 'Min tredje lista',
    totalItems: 20,
    completedItems: 10,
    isPrivate: Math.random() > 0.5,
  },
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
    title: 'Min fjärde lista',
    totalItems: 15,
    completedItems: 5,
    isPrivate: Math.random() > 0.5,
  },
]

const fetchListById = createServerFn({ method: 'GET' })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const listId = ctx.data
    const list = mockLists.find((list) => list.id === listId)
    if (!list) throw new Error('List not found')
    return list
  })

export const listByIdQueryOptions = (listId: string) =>
  queryOptions({
    queryKey: ['lists', listId],
    queryFn: () =>
      fetchListById({
        data: listId,
      }),
  })

const fetchLists = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest())

  if (!userId) {
    throw new Error('User not authenticated')
  }

  return mockLists
})

export const listsQueryOptions = () =>
  queryOptions({
    queryKey: ['lists'],
    queryFn: () => fetchLists(),
  })
