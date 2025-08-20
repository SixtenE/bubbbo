import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-react-start/server'

export type List = {
  id: string
  title: string
  userId: string
}

export const fetchLists = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    const { userId } = await getAuth(getWebRequest())

    if (!userId) {
      throw new Error('User not authenticated')
    }

    return [
      {
        id: data,
        title: `List ${data}`,
        userId,
      },
    ]
  })

export const listsQueryOptions = (listId: string) =>
  queryOptions({
    queryKey: ['lists', listId],
    queryFn: () =>
      fetchLists({
        data: listId,
      }),
  })
