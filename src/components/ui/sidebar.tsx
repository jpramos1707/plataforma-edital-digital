import * as React from "react"
import {
  ChevronRight,
  LayoutDashboard,
  ListChecks,
  Settings,
  User,
  UserPlus,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-full w-[280px] flex-col border-r bg-background",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex-1 space-y-1 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Menu
            </h2>
            <div className="space-y-1">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  cn(
                    "group flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  cn(
                    "group flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                <ListChecks className="h-4 w-4" />
                <span>Admin Panel</span>
              </NavLink>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Settings
            </h2>
            <div className="space-y-1">
              <Collapsible className="w-full">
                <CollapsibleTrigger className="group flex w-full items-center justify-between space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-muted-foreground">
                  <span>Team</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  <NavLink
                    to="/settings/team/members"
                    className={({ isActive }) =>
                      cn(
                        "group flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <User className="h-4 w-4" />
                    <span>Members</span>
                  </NavLink>
                  <NavLink
                    to="/settings/team/invites"
                    className={({ isActive }) =>
                      cn(
                        "group flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Invites</span>
                  </NavLink>
                </CollapsibleContent>
              </Collapsible>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  cn(
                    "group flex w-full items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                <Settings className="h-4 w-4" />
                <span>General</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
