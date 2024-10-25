import ChatSender from "../../../components/ChatSender";
import ChatView from "../../../components/ChatView";

export interface ChatRoomProps {
  roomId: string;
}

export interface ChatMessage {
  messageType: string;
  message: string;
  roomId: string;
  senderId: string;
}

export default async function page() {
  async function newChat(formData: FormData) {
    "use server";
    const payload = {
      messageType: formData.get("messageType"),
      message: formData.get("message"),
      roomId: formData.get("roomId"),
      senderId: formData.get("senderId"),
    };

    const res = await fetch("http://10.10.10.156:9000/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  }
  return (
    <main className="flex flex-col h-[100vh] w-full max-w-4xl bg-white mx-auto overflow-hidden">
      <ChatView />
      <div className="border-t border-gray-200" />
      <ChatSender newChat={newChat} />
    </main>
  );
}
