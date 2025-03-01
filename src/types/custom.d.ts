
// Declare modules that TypeScript is having trouble finding
declare module 'react' {
  export * from 'react';
  export type LegacyRef<T> = React.LegacyRef<T>;
  export type ForwardedRef<T> = React.ForwardedRef<T>;
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type CSSProperties = React.CSSProperties;
  export type HTMLAttributes<T> = React.HTMLAttributes<T>;
  export type ButtonHTMLAttributes<T> = React.ButtonHTMLAttributes<T>;
  export type TextareaHTMLAttributes<T> = React.TextareaHTMLAttributes<T>;
  export type ThHTMLAttributes<T> = React.ThHTMLAttributes<T>;
  export type TdHTMLAttributes<T> = React.TdHTMLAttributes<T>;
  export type ComponentProps<T extends React.ElementType> = React.ComponentProps<T>;
  export type ElementRef<T extends React.ElementType> = React.ElementRef<T>;
  export type ComponentPropsWithoutRef<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;
  export type ComponentType<P = any> = React.ComponentType<P>;
  export type ClassAttributes<T> = React.ClassAttributes<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
}

declare module 'react-dom' {
  export * from 'react-dom';
}

declare module '@hookform/resolvers/zod' {
  export * from '@hookform/resolvers/zod';
}

declare module 'react-hook-form' {
  export * from 'react-hook-form';
  
  // Add explicit types for Controller and related types
  export interface ControllerProps {
    name: string;
    control?: any;
    defaultValue?: any;
    rules?: any;
    render: (props: any) => React.ReactElement;
  }
}

declare module 'zod' {
  export * from 'zod';
}

declare module 'sonner' {
  export * from 'sonner';
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
  
  // Add explicit types for components that are causing errors
  export interface BrowserRouterProps {
    children?: React.ReactNode;
    basename?: string;
  }
  
  export interface NavLinkProps {
    children?: React.ReactNode;
    to: string;
    className?: string | ((props: { isActive: boolean }) => string);
    end?: boolean;
  }
}

// Add type definitions for component props that are causing errors
declare module '@radix-ui/react-accordion' {
  interface AccordionItemProps {
    children?: React.ReactNode;
    className?: string;
    value: string;
  }
  
  interface AccordionTriggerProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AccordionContentProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface AccordionHeaderProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-dialog' {
  interface DialogOverlayProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  interface DialogTitleProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  interface DialogDescriptionProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-sheet' {
  interface SheetContentProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-toggle-group' {
  interface ToggleGroupSingleProps {
    children?: React.ReactNode;
    className?: string;
  }
  
  interface ToggleGroupMultipleProps {
    children?: React.ReactNode;
    className?: string;
  }
}

declare module 'recharts' {
  interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: any;
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name: string, props: any, index: number, payload: any) => React.ReactNode;
  }
}

declare module '@/components/ui/badge' {
  interface BadgeProps {
    children?: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "destructive";
    size?: string;
  }
}
