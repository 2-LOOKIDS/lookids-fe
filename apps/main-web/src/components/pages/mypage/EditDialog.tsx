import { DefaultValues, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { ZodSchema, ZodType, z } from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { PencilLine } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditDialogProps {
  // <
  //   TShape extends z.ZodRawShape,
  //   TKey extends z.UnknownKeysParam,
  //   TType extends z.ZodTypeAny,
  //   TObject extends z.ZodObject<TShape, TKey, TType>,
  // >
  userNickname?: string;
  userDescription?: string;
  petName?: string;
  petDescription?: string;
  // schema: TObject | z.ZodEffects<TObject>;
  // defaultValues: DefaultValues<z.infer<z.ZodObject<TShape, TKey, TType>>>;
}

export default function EditDialog<T, S>({
  userNickname,
  userDescription,
  petName,
  petDescription,
  // schema,
}: EditDialogProps) {
  const fields = [
    { id: 0, label: '닉네임', value: userNickname },
    { id: 1, label: '유저 소개글', value: userDescription },
    { id: 2, label: '펫 이름', value: petName },
    { id: 3, label: '펫 소개글', value: petDescription },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-lookids hover:bg-lookids/90 border-lookids flex h-7 items-center justify-center gap-1 rounded border bg-[rgba(255,233,221,0.2)] px-1 py-[6px] hover:text-white"
        >
          <PencilLine className="h-4 w-4" />
          <p className="text-sm">수정</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-sm">
        <ul className="flex w-[90%] flex-col items-end gap-4 pt-4">
          {fields.map(
            (field) =>
              field.value !== undefined && (
                <li key={field.id} className="flex items-center gap-4">
                  <Label htmlFor={field.label} className="w-[50px] text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.label}
                    defaultValue={field.value}
                    className="w-[90%]"
                  />
                </li>
              )
          )}
        </ul>
        <DialogFooter className="flex w-[90%] justify-end">
          <Button
            className="bg-lookids hover:bg-lookids/90 w-1/5"
            type="submit"
          >
            수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
