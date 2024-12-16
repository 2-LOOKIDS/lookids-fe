'use client';

import {
  FormCustomField,
  FormInputField,
  FormTextAreaField,
} from '../../forms/FormFields';
import { PetInfo, PetProfileSchema, PetProfileType } from '../../../types/user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { extractCommonUrl, getMediaUrl } from '../../../utils/media';

import { Button } from '@repo/ui/components/ui/button';
import { Form } from '@repo/ui/components/ui/form';
import ImageUpload from '../../forms/ImageUpload';
import { updatePetProfile } from '../../../actions/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditPetFormProps {
  setOpen: (open: boolean) => void;
  petCode: string;
  defaultValues: PetInfo;
}

export default function EditPetForm({
  setOpen,
  petCode,
  defaultValues,
}: EditPetFormProps) {
  const defaultImage = extractCommonUrl(defaultValues.image);

  const form = useForm<PetProfileType>({
    resolver: zodResolver(PetProfileSchema),
    defaultValues: {
      image: defaultImage,
      name: defaultValues.name,
      gender: defaultValues.gender,
      age: defaultValues.age,
      type: defaultValues.type,
      weight: defaultValues.weight,
      comment: defaultValues.comment,
    },
  });
  const onSubmit = async (values: PetProfileType) => {
    const image = extractCommonUrl(values.image);

    const body = {
      petCode: petCode,
      name: values.name,
      comment: values.comment,
      gender: values.gender,
      age: values.age,
      type: values.type,
      weight: values.weight,
      image: image,
    };
    const response = await updatePetProfile(body);
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
            initialImage={defaultImage}
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
                <SelectValue placeholder={defaultValues.gender} />
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
            type="number"
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
          수정
        </Button>
      </form>
    </Form>
  );
}
