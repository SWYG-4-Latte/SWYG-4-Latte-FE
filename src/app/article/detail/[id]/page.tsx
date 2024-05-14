'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'


export default function ArticlesDetailPage() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div> {pathname}</div>
  )
}
