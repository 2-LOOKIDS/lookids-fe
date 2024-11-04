"use client";

import "./styles.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  TermsConsentSchema,
  TermsConsentType,
} from "../../../types/auth/signup";

import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import ProgressBar from "./ProgressBar";
import React from "react";
import Term1 from "./TermList/Term1";
import Term2 from "./TermList/Term2";
import Term3 from "./TermList/Term3";
import { zodResolver } from "@hookform/resolvers/zod";

interface TermsConsentProps {
  onNext: (terms: TermsConsentType) => void;
}

const termList: Array<{
  name: keyof TermsConsentType["terms"];
  title: string;
  content: React.ReactNode;
}> = [
  { name: "term1", title: "lookids(루키즈) 이용 약관", content: <Term1 /> },
  {
    name: "term2",
    title: "lookids(루키즈) 개인정보처리방침",
    content: <Term2 />,
  },
  {
    name: "term3",
    title: "lookids(루키즈) 위치기반 서비스 이용약관",
    content: <Term3 />,
  },
];

export default function TermsConsent({ onNext }: TermsConsentProps) {
  const form = useForm<TermsConsentType>({
    resolver: zodResolver(TermsConsentSchema),
    defaultValues: {
      terms: {
        term1: false,
        term2: false,
        term3: false,
      },
    },
  });

  const onSubmit: SubmitHandler<TermsConsentType> = (values) => {
    onNext(values);
  };

  return (
    <>
      <ProgressBar step={0} totalStep={3} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {termList.map((term, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`terms.${term.name}`}
              render={({ field }) => (
                <FormItem className="mb-8 mx-8">
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <h1>{term.title}</h1>
                      <div className="max-h-40 overflow-y-auto">
                        {term.content}
                      </div>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className="signup-checkbox"
                      />
                    </FormControl>
                  </div>
                  {form.formState.errors.terms?.[term.name] && <FormMessage />}
                </FormItem>
              )}
            ></FormField>
          ))}
          <div className="flex justify-center">
            <Button type="submit" className="signup-button">
              다음
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
