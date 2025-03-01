
// Declare modules that TypeScript is having trouble finding
declare module 'react' {
  export * from 'react';
  export interface LegacyRef<T> {}
  export interface ForwardedRef<T> {}
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type CSSProperties = React.CSSProperties;
  export interface HTMLAttributes<T> extends React.HTMLAttributes<T> {}
  export interface ButtonHTMLAttributes<T> extends React.ButtonHTMLAttributes<T> {}
  export interface TextareaHTMLAttributes<T> extends React.TextareaHTMLAttributes<T> {}
  export interface ThHTMLAttributes<T> extends React.ThHTMLAttributes<T> {}
  export interface TdHTMLAttributes<T> extends React.TdHTMLAttributes<T> {}
  export interface ComponentProps<T extends React.ElementType> extends React.ComponentProps<T> {}
  export interface ElementRef<T extends React.ElementType> extends React.ElementRef<T> {}
  export interface ComponentPropsWithoutRef<T extends React.ElementType> extends React.ComponentPropsWithoutRef<T> {}
  export interface ComponentType<P = any> extends React.ComponentType<P> {}
  export interface ClassAttributes<T> extends React.ClassAttributes<T> {}
  export interface KeyboardEvent<T = Element> extends React.KeyboardEvent<T> {}
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
    ref?: React.Ref<any>;
  }
  
  export interface AccordionTriggerProps {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }
  
  export interface AccordionContentProps {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }
  
  export interface AccordionHeaderProps {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
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
    ref?: React.Ref<any>;
  }
  
  export interface DialogContentProps {
    className?: string;
    children?: React.ReactNode;
    forceMount?: boolean;
    ref?: React.Ref<any>;
  }
  
  export interface DialogTitleProps {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }
  
  export interface DialogDescriptionProps {
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }
}

declare module '@radix-ui/react-sheet' {
  export interface SheetContentProps {
    className?: string;
    children?: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    ref?: React.Ref<any>;
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
    ref?: React.Ref<any>;
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
    ref?: React.Ref<any>;
  }
  
  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<any>;
  }
}

declare module 'recharts' {
  export const ResponsiveContainer: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<TooltipProps>;
  export const Legend: React.ComponentType<LegendProps>;
  
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
    size?: "default" | "sm" | "lg";
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
