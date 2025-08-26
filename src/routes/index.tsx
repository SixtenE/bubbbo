import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { listsQueryOptions } from '@/utils/lists'
import { UserButton } from '@clerk/clerk-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Lock, Plus, Users } from 'lucide-react'
import { motion } from 'motion/react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(listsQueryOptions())
  },
})

function RouteComponent() {
  const { data } = useSuspenseQuery(listsQueryOptions())

  return (
    <main className="relative container mx-auto flex flex-col px-4 pt-16 pb-32">
      <header className="bg-background fixed top-0 left-0 z-10 flex w-full items-center justify-between px-8 py-2">
        <h1 className="text-3xl font-medium">Mina listor</h1>
        <UserButton />
      </header>

      <section className="mt-0">
        <div className="flex justify-end">
          <Button className="rounded-full" size="lg">
            <Plus />
            Ny lista
          </Button>
        </div>
      </section>

      <section className="mt-6">
        <ul className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          {data.map((list) => (
            <motion.li key={list.id}>
              <Link to="/lists/$listId" params={{ listId: list.id }}>
                <motion.article
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Card className="bg-muted relative flex flex-col gap-y-0 p-4 font-sans shadow-none">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-wrap">
                        {list.title}
                      </h3>
                      <ArrowRight className="h-4 w-4" />
                    </div>

                    <p className="text-muted-foreground">19 föremål</p>
                    <div className="mt-4 flex gap-2 font-mono">
                      {Math.random() > 0.5 ? (
                        <Badge>
                          <Users />4 medlemmar
                        </Badge>
                      ) : (
                        <Badge>
                          <Lock />
                          Privat
                        </Badge>
                      )}
                      <Badge variant="outline">
                        Uppdaterad för 2 dagar sedan
                      </Badge>
                    </div>
                  </Card>
                </motion.article>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </main>
  )
}
