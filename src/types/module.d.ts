
// Type declarations for modules without type definitions

declare module "react" {
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useContext: any;
  export const useId: any;
  export const createContext: any;
  export const forwardRef: any;
  export type ReactNode = any;
  export type ComponentType<P = any> = any;
  export type ReactElement = any;
  export type CSSProperties = any;
  export type ElementRef<T> = any;
  export type ComponentProps<T> = any;
  export type ComponentPropsWithoutRef<T> = any;
  export type KeyboardEvent = any;
  export type HTMLAttributes<T = any> = any;
  export type ButtonHTMLAttributes<T = any> = any;
  export type ThHTMLAttributes<T = any> = any;
  export type TdHTMLAttributes<T = any> = any;
  export type TextareaHTMLAttributes<T = any> = any;
}

declare module "react-router-dom" {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const useLocation: any;
  export const useNavigate: any;
}

declare module "sonner" {
  export const Toaster: any;
  export const toast: any;
}

declare module "@hookform/resolvers/zod" {
  export const zodResolver: any;
}

declare module "react-hook-form" {
  export const useForm: any;
  export const FormProvider: any;
  export const useFormContext: any;
  export const Controller: any;
  export type ControllerProps<T = any> = any;
  export type FieldPath<T = any> = any;
  export type FieldValues = any;
}

declare module "zod" {
  export const z: any;
}
