import React from "react";
import { Form, FormItem, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const FormWrapper = ({ children, defaultValues = {}, onSubmit = () => {} }) => {
  const form = useForm({
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Wrap with a FormField for safety if needed */}
        {React.Children.map(children, (child) => {
          // If already a FormField, return as is
          if (child?.type?.name === 'FormField') {
            return child;
          }
          
          // Otherwise wrap in a safe context
          return (
            <FormItem>
              {child}
            </FormItem>
          );
        })}
      </form>
    </Form>
  );
};

export default FormWrapper; 