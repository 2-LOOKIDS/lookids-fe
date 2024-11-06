import { getServerSession } from "next-auth";
import { options } from "../../app/api/auth/[...nextauth]/options";

export const getFeedCardList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
};

export const uploadToS3 = async (file: File) => {
  const session = await getServerSession(options);
  const user_uuid = session?.user?.uuid;
  // const formData = new FormData();
  // formData.append("file", file);
  // const res = await fetch("https://image.lookids.online", {
  //   method: "POST",
  //   body: formData,
  // });
  // const data = await res.json();
  // return data.url;
  return "";
};
