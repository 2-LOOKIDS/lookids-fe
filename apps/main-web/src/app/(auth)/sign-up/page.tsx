import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

import { Button } from "@repo/ui/components/ui/button";

export default function page() {
  return (
    <main>
      <Button>버튼!!!!!</Button>
      <p className="text-blue-500">하이</p>
      sign-up page
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </main>
  );
}
