import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
