import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

export default async function page() {
  const data = await getServerSession(options);
  console.log(data);
  return (
    <div className="mt-20">
      마이페이지
      <p>{data?.user.name}</p>
    </div>
  );
}
