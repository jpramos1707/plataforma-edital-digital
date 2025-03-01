
import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { cn } from "@/lib/utils";

type FormFieldContext = {
  id: string;
};

const FormFieldContext = React.createContext<FormFieldContext>({
  id: "",
});

export const FormField = ({
  children,
  control,
  name,
}: {
  children: React.ReactNode;
  control: any;
  name: string;
}) => {
  const id = React.useId();
  return (
    <FormFieldContext.Provider value={{ id }}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => children}
      />
    </FormFieldContext.Provider>
  );
};

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  );
});
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormFieldContext);

  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      htmlFor={id}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { id } = React.useContext(FormFieldContext);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            ...child.props,
            id,
          });
        }
        return child;
      })}
    </div>
  );
});
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formState } = useFormContext();
  const { id } = React.useContext(FormFieldContext);

  const errorMessage = formState.errors[id]?.message as string;

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-500", className)}
      {...props}
    >
      {errorMessage}
    </p>
  );
});
FormMessage.displayName = "FormMessage";
