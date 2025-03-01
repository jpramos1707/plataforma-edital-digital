
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
  export type Ref<T> = React.Ref<T>;
  
  // Add missing React utilities
  export const Children: {
    map<T, C>(children: C | C[], fn: (child: C, index: number) => T): T[];
    forEach<C>(children: C | C[], fn: (child: C, index: number) => void): void;
    count(children: any): number;
    only<C>(children: C): C;
    toArray<C>(children: C | C[]): C[];
  };
  export function isValidElement(object: any): boolean;
  export function cloneElement<P>(
    element: React.ReactElement<P>,
    props?: Partial<P> & React.Attributes,
    ...children: React.ReactNode[]
  ): React.ReactElement<P>;
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
  export interface ControllerProps<T = any> {
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
  }
  
  export interface NavLinkProps {
    children?: React.ReactNode;
    to: string;
    className?: string | ((props: { isActive: boolean }) => string);
    end?: boolean;
  }
  
  export const NavLink: React.ComponentType<NavLinkProps>;
}

// Add type definitions for component props that are causing errors
declare module '@radix-ui/react-accordion' {
  export const Root: React.ComponentType<any>;
  export const Item: React.ComponentType<AccordionItemProps>;
  export const Trigger: React.ComponentType<AccordionTriggerProps>;
  export const Content: React.ComponentType<AccordionContentProps>;
  export const Header: React.ComponentType<AccordionHeaderProps>;
  
  export interface AccordionItemProps {
    value: string;
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface AccordionTriggerProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface AccordionContentProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface AccordionHeaderProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-dialog' {
  export const Root: React.ComponentType<any>;
  export const Trigger: React.ComponentType<any>;
  export const Portal: React.ComponentType<any>;
  export const Close: React.ComponentType<any>;
  export const Overlay: React.ComponentType<DialogOverlayProps>;
  export const Content: React.ComponentType<DialogContentProps>;
  export const Title: React.ComponentType<DialogTitleProps>;
  export const Description: React.ComponentType<DialogDescriptionProps>;
  export const Header: React.ComponentType<any>;
  export const Footer: React.ComponentType<any>;
  
  export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
  }
  
  export interface DialogOverlayProps {
    className?: string;
    children?: React.ReactNode;
    forceMount?: boolean;
  }
  
  export interface DialogContentProps {
    className?: string;
    children?: React.ReactNode;
    forceMount?: boolean;
  }
  
  export interface DialogTitleProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface DialogDescriptionProps {
    className?: string;
    children?: React.ReactNode;
  }
}

declare module '@radix-ui/react-sheet' {
  export interface SheetContentProps {
    className?: string;
    children?: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
  }
}

declare module '@radix-ui/react-toggle-group' {
  export const Root: React.ComponentType<ToggleGroupSingleProps | ToggleGroupMultipleProps>;
  export const Item: React.ComponentType<ToggleGroupItemProps>;
  
  export interface ToggleGroupSingleProps {
    type: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    rovingFocus?: boolean;
    orientation?: "horizontal" | "vertical";
    dir?: "ltr" | "rtl";
    loop?: boolean;
    children?: React.ReactNode;
    className?: string;
  }
  
  export interface ToggleGroupMultipleProps {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    disabled?: boolean;
    rovingFocus?: boolean;
    orientation?: "horizontal" | "vertical";
    dir?: "ltr" | "rtl";
    loop?: boolean;
    children?: React.ReactNode;
    className?: string;
  }
  
  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
}

declare module 'recharts' {
  export const ResponsiveContainer: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const Legend: React.ComponentType<any>;
  
  export interface LegendProps {
    payload?: any[];
    verticalAlign?: string;
    children?: React.ReactNode;
  }
  
  export interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: any;
    labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name: string, props: any, index: number, payload: any) => React.ReactNode;
  }
}

declare module '@/components/ui/badge' {
  export const Badge: React.FC<BadgeProps>;
  
  export interface BadgeProps {
    children?: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "destructive";
  }
}

declare module '@radix-ui/react-command' {
  export interface CommandDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    shouldFilter?: boolean;
    filter?: (value: string, search: string) => boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
  }
}
