import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

import ClerkProvider from '../integrations/clerk/provider.tsx'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <ClerkProvider>
        <SignedOut>
          <div className="flex h-screen w-screen items-center justify-center">
            <SignIn />
          </div>
        </SignedOut>
        <SignedIn>
          <Outlet />
          <TanStackRouterDevtools />

          <TanStackQueryLayout />
        </SignedIn>
      </ClerkProvider>
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="light">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
