import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import Image from "next/image";
export default function LoginForm() {
  return (
    <div className="bg-white p-8 rounded-lg  w-96 mx-auto mt-2">
      <form className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="userEmail">이메일</Label>
          <Input
            id="userEmail"
            placeholder="이메일을 입력하세요"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" placeholder="********" type="password" />
        </div>
        <Button
          className="w-full bg-[#FD9340] hover:bg-[#FC703F] text-white"
          type="submit"
        >
          로그인
        </Button>
      </form>

      <div className="flex justify-around items-center rounded-md mt-2 py-3 gap-x-4">
        <button>
          <Image src="/signin/google.png" width={50} height={50} alt={""} />
        </button>
        <button>
          <Image src="/signin/kakao.png" width={50} height={50} alt={""} />
        </button>
        <button>
          <Image src="/signin/naver.png" width={50} height={50} alt={""} />
        </button>
      </div>
    </div>
  );
}
