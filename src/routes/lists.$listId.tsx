import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { listByIdQueryOptions } from '@/utils/lists'

export const Route = createFileRoute('/lists/$listId')({
  component: TanStackQueryDemo,
  loader: async ({ context, params: { listId } }) => {
    await context.queryClient.ensureQueryData(listByIdQueryOptions(listId))
  },
})

function TanStackQueryDemo() {
  const { listId } = Route.useParams()
  const { data } = useSuspenseQuery(listByIdQueryOptions(listId))

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
