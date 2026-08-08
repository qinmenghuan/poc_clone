import { Menu, X } from 'lucide-react'
import { AuthActions } from '@/components/navigation/auth-actions'
import { NavigationLinks } from '@/components/navigation/navigation-links'

type MobileNavigationProps = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: (isOpen: boolean) => void
  onSignIn: () => void
  pathname: string
}

export function MobileNavigation({
  isOpen,
  onClose,
  onOpenChange,
  onSignIn,
  pathname,
}: MobileNavigationProps) {
  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        className="rounded-md p-2 text-gray-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        onClick={() => onOpenChange(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-14 border-t border-white/10 bg-gray-900/95 px-4 pb-4 pt-3 shadow-lg backdrop-blur-lg">
          <div className="space-y-1">
            <NavigationLinks pathname={pathname} variant="mobile" onNavigate={onClose} />
          </div>
          <AuthActions
            variant="mobile"
            onSignIn={() => {
              onClose()
              onSignIn()
            }}
            onSignedOut={onClose}
          />
        </div>
      ) : null}
    </div>
  )
}
