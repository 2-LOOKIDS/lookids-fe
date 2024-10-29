import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";

export default function LoginForm() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto mt-8">
      <form className="space-y-6">
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

      <div className="mt-6 space-y-4">
        <Button
          className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
          variant="outline"
        >
          Google로 로그인
        </Button>
        <Button className="w-full bg-[#FEE500] text-black hover:bg-[#FDD800]">
          Kakao로 로그인
        </Button>
        <Button className="w-full bg-[#03C75A] text-white hover:bg-[#02B350]">
          Naver로 로그인
        </Button>
      </div>
    </div>
  );
}
