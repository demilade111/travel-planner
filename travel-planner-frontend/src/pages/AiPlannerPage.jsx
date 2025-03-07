import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function AiPlannerPage() {
  // Your state...
  
  // Add form controller
  const form = useForm({
    defaultValues: {
      destination: "",
      tripStyle: "balanced",
      budget: 500,
      // other form values...
    }
  });

  // In your JSX where you have forms:
  return (
    <div>
      {/* Other components */}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerate)}>
          <FormField
            name="destination"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Where would you like to go?"
                    onChange={(e) => {
                      setDestination(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Other form fields... */}
        </form>
      </Form>
    </div>
  );
} 