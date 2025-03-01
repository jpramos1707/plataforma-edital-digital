
// Type declarations for modules without type definitions

declare module "react" {
  export default React;
  export const useState: typeof React.useState;
  export const useEffect: typeof React.useEffect;
  export const useCallback: typeof React.useCallback;
  export const useMemo: typeof React.useMemo;
  export const useContext: typeof React.useContext;
  export const useId: typeof React.useId;
  export const createContext: typeof React.createContext;
  export const forwardRef: typeof React.forwardRef;
  export type ReactNode = React.ReactNode;
  export type ComponentType<P = any> = React.ComponentType<P>;
  export type ReactElement<P = any> = React.ReactElement<P>;
  export type CSSProperties = React.CSSProperties;
  export type ElementRef<T> = React.ElementRef<T>;
  export type ComponentProps<T> = React.ComponentProps<T>;
  export type ComponentPropsWithoutRef<T> = React.ComponentPropsWithoutRef<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type HTMLAttributes<T = Element> = React.HTMLAttributes<T>;
  export type ButtonHTMLAttributes<T = Element> = React.ButtonHTMLAttributes<T>;
  export type ThHTMLAttributes<T = Element> = React.ThHTMLAttributes<T>;
  export type TdHTMLAttributes<T = Element> = React.TdHTMLAttributes<T>;
  export type TextareaHTMLAttributes<T = Element> = React.TextareaHTMLAttributes<T>;
}

declare module "react-router-dom" {
  export const BrowserRouter: React.ComponentType<any>;
  export const Routes: React.ComponentType<any>;
  export const Route: React.ComponentType<any>;
  export const useLocation: () => any;
  export const useNavigate: () => any;
}

declare module "sonner" {
  export const Toaster: React.ComponentType<any>;
  export const toast: {
    success: (message: string, options?: any) => void;
    error: (message: string, options?: any) => void;
    info: (message: string, options?: any) => void;
    warning: (message: string, options?: any) => void;
  };
}

declare module "@hookform/resolvers/zod" {
  export const zodResolver: (schema: any) => any;
}

declare module "react-hook-form" {
  export const useForm: <T extends Record<string, any> = Record<string, any>>(options?: any) => any;
  export const FormProvider: React.ComponentType<any>;
  export const useFormContext: () => any;
  export const Controller: React.ComponentType<any>;
  export type ControllerProps<T = any> = {
    name: any;
    control?: any;
    defaultValue?: any;
    rules?: any;
    render: any;
  };
  export type FieldPath<T = any> = any;
  export type FieldValues = Record<string, any>;
}

declare module "zod" {
  // Define the basic z object
  const z: {
    string: () => ZodString;
    number: () => ZodNumber;
    boolean: () => ZodBoolean;
    object: <T extends ZodRawShape>(shape: T) => ZodObject<T>;
  };

  // Zod types
  interface ZodString {
    min: (length: number, message?: string) => ZodString;
    max: (length: number, message?: string) => ZodString;
    email: (message?: string) => ZodString;
    optional: () => ZodOptional<this>;
  }

  interface ZodNumber {
    min: (value: number, message?: string) => ZodNumber;
    max: (value: number, message?: string) => ZodNumber;
    optional: () => ZodOptional<this>;
  }

  interface ZodBoolean {
    optional: () => ZodOptional<this>;
  }

  interface ZodOptional<T> {
    optional: () => ZodOptional<T>;
  }

  type ZodRawShape = Record<string, ZodTypeAny>;
  type ZodTypeAny = ZodString | ZodNumber | ZodBoolean | ZodObject<any> | ZodOptional<any>;

  interface ZodObject<T extends ZodRawShape> {
    shape: T;
    infer: any;
  }

  export { z };
}

