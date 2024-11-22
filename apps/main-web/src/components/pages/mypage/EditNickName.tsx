import EditDialog from './EditDialog';
import { UserNicknameSchema } from '../../../types/user';

interface EditNickNameProps {
  nickname: string;
  tag: string;
}
export default function EditNickName({ nickname, tag }: EditNickNameProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      <p className="font-semibold">
        {nickname}#{tag}
      </p>
      <EditDialog
        fields={[{ label: '닉네임', field: nickname }]}
        schema={UserNicknameSchema}
        defaultValues={{
          nickname: nickname,
        }}
      />
    </div>
  );
}
