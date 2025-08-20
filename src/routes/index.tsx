import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UserButton } from '@clerk/clerk-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ChevronRight, Plus } from 'lucide-react'
import { motion } from 'motion/react'

interface List {
  id: string
  title: string
  totalItems: number
  completedItems: number
}

const getLists = createServerFn({ method: 'GET' }).handler(
  async (): Promise<List[]> => {
    //await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      { id: 'eskader', title: 'Eskader', totalItems: 24, completedItems: 7 },
      {
        id: 'pappas-lista',
        title: 'Pappas lista',
        totalItems: 12,
        completedItems: 3,
      },
      {
        id: 'sean-von-schollenberg',
        title: 'Sean von Schollenberg',
        totalItems: 58,
        completedItems: 14,
      },
      {
        id: 'sista-listan',
        title: 'Sista listan',
        totalItems: 42,
        completedItems: 21,
      },
      {
        id: 'test-lista',
        title: 'Test lista',
        totalItems: 10,
        completedItems: 5,
      },
      {
        id: 'min-annan-lista',
        title: 'Min andra lista',
        totalItems: 30,
        completedItems: 15,
      },
      {
        id: 'min-tredje-lista',
        title: 'Min tredje lista',
        totalItems: 20,
        completedItems: 10,
      },
      {
        id: 'min-fjärde-lista',
        title: 'Min fjärde lista',
        totalItems: 15,
        completedItems: 5,
      },
    ]
  },
)

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => await getLists(),
})

function OverviewSection({ lists }: { lists: List[] }) {
  return (
    <motion.section aria-labelledby="overview">
      <Card className="bg-muted mt-4 gap-y-2 px-4 py-6 shadow-none">
        <div className="flex items-center justify-between">
          <h2 id="overview" className="text-lg font-medium">
            Översikt
          </h2>
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <Button
              variant="ghost"
              className="text-md text-muted-foreground"
              type="button"
              aria-label="Öppna inställningar"
            >
              Inställningar
              <ChevronRight />
            </Button>
          </motion.div>
        </div>
        <p className="text-5xl font-bold" aria-live="polite">
          {lists.length} listor
        </p>
        <div className="mt-10 flex w-full justify-end px-2">
          <motion.div>
            <Button
              className="rounded-full"
              size="lg"
              type="button"
              aria-label={'Skapa ny lista'}
            >
              Ny
              <Plus className="" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.section>
  )
}

function ListsGrid({ lists }: { lists: List[] }) {
  return (
    <section aria-labelledby="your-lists" className="mt-16">
      <h2 id="your-lists" className="sr-only">
        Dina listor
      </h2>
      <ul className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {lists.map((list) => (
          <motion.li key={list.id}>
            <Link to="/lists/$listId" params={{ listId: list.id }}>
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Card
                  role="article"
                  className="bg-muted relative flex h-52 flex-col gap-y-2 px-4 py-6 shadow-none"
                >
                  <Badge className="rounded-full font-mono font-bold">{`${list.completedItems}/${list.totalItems}`}</Badge>

                  <h3 className="h-24 w-full overflow-y-hidden text-2xl font-medium break-all">
                    {list.title}
                  </h3>
                  <p className="text-muted-foreground mt-auto text-xs font-medium">
                    Uppdaterad <time dateTime="PT3M">3 min</time> sedan
                  </p>
                </Card>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function RouteComponent() {
  const lists = Route.useLoaderData() as List[]

  return (
    <main className="relative container mx-auto flex flex-col px-4 pb-32">
      <header className="bg-background fixed top-0 left-0 z-10 flex w-full items-center justify-between px-4 py-2">
        <motion.h1 className="pl-1 text-3xl font-medium">Mina listor</motion.h1>
        <UserButton />
      </header>

      <ListsGrid lists={lists} />
    </main>
  )
}
