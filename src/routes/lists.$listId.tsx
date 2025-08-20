import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { listsQueryOptions } from '@/utils/lists'

export const Route = createFileRoute('/lists/$listId')({
  component: TanStackQueryDemo,
  loader: async ({ context, params: { listId } }) => {
    await context.queryClient.ensureQueryData(listsQueryOptions(listId))
  },
})

function TanStackQueryDemo() {
  const params = Route.useParams()
  const { data } = useSuspenseQuery(listsQueryOptions(params.listId))

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">Lists</h1>
      <ul>
        {data.map((person) => (
          <li key={person.id} className="mb-2">
            <strong>{person.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
