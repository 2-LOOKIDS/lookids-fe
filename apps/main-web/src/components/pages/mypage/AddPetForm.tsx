'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { PetProfileSchema, PetProfileType } from '../../../types/user';
import {
  FormCustomField,
  FormInputField,
  FormTextAreaField,
} from '../../forms/FormFields';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form } from '@repo/ui/components/ui/form';
import { useForm } from 'react-hook-form';
import { registerPetProfile } from '../../../actions/user';
import { extractCommonUrl } from '../../../utils/media';
import ImageUpload from '../../forms/ImageUpload';

interface AddPetFormProps {
  setOpen: (open: boolean) => void;
}
export default function AddPetForm({ setOpen }: AddPetFormProps) {
  const basicImage = extractCommonUrl(
    process.env.NEXT_PUBLIC_BASIC_PET_PROFILE_IMAGE ?? ''
  );
  const form = useForm<PetProfileType>({
    resolver: zodResolver(PetProfileSchema),
    defaultValues: {
      image: basicImage,
      name: '',
      gender: undefined,
      age: 0,
      type: '',
      weight: 0,
      comment: '',
    },
  });

  const onSubmit = async (values: PetProfileType) => {
    const image = extractCommonUrl(values.image);

    const body = {
      name: values.name,
      image: image,
      gender: values.gender,
      age: values.age,
      type: values.type,
      weight: values.weight,
      comment: values.comment,
    };
    const response = await registerPetProfile(body);
    if (response.isSuccess) {
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormCustomField name="image">
          <ImageUpload
            onChange={(url) =>
              form.setValue('image', url, {
                shouldValidate: true,
              })
            }
            initialImage={basicImage}
          />
        </FormCustomField>

        <div className="w-4/5">
          <FormInputField
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div className="w-4/5">
          <FormCustomField name="gender" label="성별">
            <Select
              onValueChange={(value) =>
                form.setValue('gender', value as '수컷' | '암컷', {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="!mt-0">
                <SelectValue placeholder="성별을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="수컷">수컷</SelectItem>
                <SelectItem value="암컷">암컷</SelectItem>
              </SelectContent>
            </Select>
          </FormCustomField>
        </div>

        <div className="w-4/5">
          <FormInputField
            name="age"
            label="나이"
            placeholder="나이를 입력해주세요"
          />
        </div>

        <div className="w-4/5">
          <FormInputField
            name="type"
            label="동물종류"
            placeholder="예: 강아지, 고양이"
          />
        </div>

        <div className="w-4/5">
          <FormInputField
            name="weight"
            label="몸무게"
            type="number"
            placeholder="kg 단위로 입력해주세요"
          />
        </div>

        <div className="w-4/5">
          <FormTextAreaField
            name="comment"
            label="소개글"
            placeholder="소개를 간략하게 해주세요"
          />
        </div>

        <Button className="bg-lookids hover:bg-lookids/90" type="submit">
          등록
        </Button>
      </form>
    </Form>
  );
}
