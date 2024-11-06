"use client";

import "./styles.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
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
  { name: "term1", title: "[필수] 이용 약관 동의", content: <Term1 /> },
  {
    name: "term2",
    title: "[필수] 개인정보처리방침 동의",
    content: <Term2 />,
  },
  {
    name: "term3",
    title: "[필수] 위치기반 서비스 동의",
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {termList.map((term, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`terms.${term.name}`}
              render={({ field }) => (
                <FormItem className="flex flex-col mx-7">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="signup-checkbox"
                        />
                      </FormControl>
                      <p className="text-[13px]">{term.title}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild className="!mt-0">
                        <p className="text-[12px]">약관 보기</p>
                      </DialogTrigger>
                      <DialogContent
                        className="w-4/5 rounded-sm"
                        aria-describedby={undefined}
                      >
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          <div className="max-h-96 overflow-y-auto">
                            {term.content}
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
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
