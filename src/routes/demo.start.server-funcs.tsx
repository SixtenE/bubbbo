import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

function readCount() {
  return 1
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async () => {})

export const Route = createFileRoute('/demo/start/server-funcs')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => {
          updateCount({ data: 1 }).then(() => {
            router.invalidate()
          })
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Add 1 to {state}?
      </button>
    </div>
  )
}
