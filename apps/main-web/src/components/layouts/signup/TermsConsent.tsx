"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  TermsConsentSchema,
  TermsConsentType,
} from "../../../types/auth/signup";

import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface TermsConsentProps {
  onNext: (terms: TermsConsentType) => void;
}

const termList: Array<{
  name: keyof TermsConsentType["terms"];
  content: string;
}> = [
  { name: "term1", content: "약관 1에 동의합니다." },
  { name: "term2", content: "약관 2에 동의합니다." },
  { name: "term3", content: "약관 3에 동의합니다." },
  { name: "term4", content: "약관 4에 동의합니다." },
  { name: "term5", content: "약관 5에 동의합니다." },
];

export default function TermsConsent({ onNext }: TermsConsentProps) {
  const form = useForm<TermsConsentType>({
    resolver: zodResolver(TermsConsentSchema),
    defaultValues: {
      terms: {
        term1: false,
        term2: false,
        term3: false,
        term4: false,
        term5: false,
      },
    },
  });

  const onSubmit: SubmitHandler<TermsConsentType> = (values) => {
    onNext(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {termList.map((term, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`terms.${term.name}`}
            render={({ field }) => (
              <FormItem>
                <span>{term.content}</span>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                {form.formState.errors.terms?.[term.name] && <FormMessage />}
              </FormItem>
            )}
          ></FormField>
        ))}
        <Button type="submit">Next</Button>
      </form>
    </FormProvider>
  );
}
