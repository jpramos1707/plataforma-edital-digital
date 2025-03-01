import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsed?: boolean
    className?: string
  }
>(({ className, collapsed, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative flex h-screen flex-col border-r bg-secondary/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-50",
      collapsed ? "w-[5rem]" : "w-[18rem]",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-[4rem] items-center justify-between px-3",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-[4rem] items-center px-3", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      className={cn(
        "absolute right-0 top-0 rounded-none border-y border-l bg-background p-1.5 text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-secondary/50",
        className
      )}
      aria-expanded={!isCollapsed}
      aria-label="Toggle sidebar"
      onClick={() => setIsCollapsed(!isCollapsed)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

function getSidebarItemStyles({
  active = false,
  collapsed = false,
  variant = "default",
  size = "default",
}: {
  active?: boolean
  collapsed?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
} = {}): string {
  return cn(
    "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted/60",
    {
      "cursor-pointer": true,
      "justify-center": collapsed,
      "bg-muted/50": active,
      "px-2 py-1": size === "sm",
      "px-4 py-3": size === "lg",
      "border": variant === "outline",
    }
  )
}

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ScrollArea ref={ref} className={cn("flex-1 space-y-0.5 p-2", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref as React.Ref<HTMLElement>}
    className={cn(
      "flex h-full flex-col gap-4 overflow-hidden p-2",
      className
    )}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("m-0 list-none p-0", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarSubMenu = React.forwardRef<
  HTMLDetailsElement,
  React.HTMLAttributes<HTMLDetailsElement>
>(({ className, ...props }, ref) => (
  <details ref={ref} className={cn("group [&_summary::-webkit-details-marker]:hidden", className)} {...props} />
))
SidebarSubMenu.displayName = "SidebarSubMenu"

const SidebarSubMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <summary
    ref={ref}
    className={cn(
      "flex cursor-pointer items-center justify-between gap-2 py-1.5 transition-all hover:pl-1",
      className
    )}
    {...props}
  />
))
SidebarSubMenuTrigger.displayName = "SidebarSubMenuTrigger"

const SidebarSubMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ml-4 mt-1 space-y-1 border-l pl-4 [&:not([hidden])]:animate-in [&:not([hidden])]:fade-in-0",
      className
    )}
    {...props}
  />
))
SidebarSubMenuContent.displayName = "SidebarSubMenuContent"

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    href?: string
    title?: string
    icon?: React.ReactNode
    endIcon?: React.ReactNode
    badge?: string
    badgeVariant?: "default" | "outline"
    external?: boolean
    variant?: "default" | "outline" | string
    collapsed?: boolean
  }
>(
  (
    {
      className,
      active,
      href,
      title,
      icon,
      endIcon,
      badge,
      badgeVariant = "default",
      external,
      variant = "default",
      collapsed,
      children,
      ...props
    },
    ref
  ) => {
    const itemContent = (
      <>
        {icon}
        {!collapsed && (
          <>
            <span>{title || children}</span>
            {endIcon && <span className="ml-auto">{endIcon}</span>}
            {badge && (
              <Badge
                variant={badgeVariant as "default" | "outline"}
                className="ml-auto"
              >
                {badge}
              </Badge>
            )}
          </>
        )}
      </>
    )

    return (
      <div
        ref={ref}
        className={cn(
          getSidebarItemStyles({
            active,
            collapsed,
            variant: variant as "default" | "outline",
          }),
          className
        )}
        {...props}
      >
        {href ? (
          external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-2"
            >
              {itemContent}
            </a>
          ) : (
            <Link to={href} className="flex w-full items-center gap-2">
              {itemContent}
            </Link>
          )
        ) : (
          itemContent
        )}
      </div>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

export {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarContent,
  SidebarNav,
  SidebarMenu,
  SidebarSubMenu,
  SidebarSubMenuTrigger,
  SidebarSubMenuContent,
  SidebarItem,
}
