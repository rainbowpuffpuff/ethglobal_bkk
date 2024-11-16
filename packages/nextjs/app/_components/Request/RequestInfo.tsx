"use client";

import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form type
type FormValues = {
  requesterRequest: string;
  codeRequest: string;
  rewardInEth: string;
};

const formSchema = z.object({
  requesterRequest: z.string().min(2, {
    message: "Requester/Research request must be at least 2 characters.",
  }),
  codeRequest: z.string().min(10, {
    message: "Code request must be at least 10 characters.",
  }),
  rewardInEth: z.string()
    .min(1, { message: "Reward amount is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Reward must be a non-negative number",
    }),
});

const RequestInfo = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      requesterRequest: "",
      codeRequest: "",
      rewardInEth: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Code requests</CardTitle>
        <CardDescription>Read and accept code requests on your data</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="requesterRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requester / Research request</FormLabel>
                  <FormControl>
                    <Input placeholder="neuroresearcher.eth / Use TenSEAL for training model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code request</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your code here..."
                      className="min-h-[120px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rewardInEth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward in ETH</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.15" 
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onKeyDown={(e) => {
                        if (!/[\d.]/.test(e.key) && 
                            !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                          e.preventDefault();
                        }
                        // Prevent multiple decimal points
                        if (e.key === "." && field.value.includes(".")) {
                          e.preventDefault();
                        }
                      }}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 justify-end">
              <Button variant="outline" type="button">
                Reject
              </Button>
              <Button type="submit" className="bg-black text-white rounded-lg hover:bg-black/80">
                Accept
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RequestInfo;