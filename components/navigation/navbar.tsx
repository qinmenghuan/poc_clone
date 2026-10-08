'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInModal } from '@/components/auth/sign-in-modal'
import { AuthActions } from '@/components/navigation/auth-actions'
import { MobileNavigation } from '@/components/navigation/mobile-navigation'
import { NavigationLinks } from '@/components/navigation/navigation-links'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function openSignIn() {
    setIsSignInOpen(true)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-surface-base/55 backdrop-blur-xl">
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex h-[68px] items-center justify-between md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link
            href="/"
            aria-label="BlockEstate home"
            className="text-[22px] font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Block<span className="font-display italic font-medium text-brand">Estate</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <NavigationLinks pathname={pathname} />
          </div>

          <div className="hidden items-center justify-self-end gap-2 md:flex">
            {/* Keep the homepage control immediately before the desktop sign-in action. */}
            {pathname === '/' ? <ThemeToggle /> : null}
            <AuthActions onSignIn={openSignIn} />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {/* On smaller screens the compact control remains reachable beside the menu trigger. */}
            {pathname === '/' ? <ThemeToggle /> : null}
            <MobileNavigation
              isOpen={isMobileMenuOpen}
              onClose={closeMobileMenu}
              onOpenChange={setIsMobileMenuOpen}
              onSignIn={openSignIn}
              pathname={pathname}
            />
          </div>
        </div>
      </div>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </nav>
  )
}
