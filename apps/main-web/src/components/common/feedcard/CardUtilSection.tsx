import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

export default function CardUtilSection() {
  return (
    <div className="py-2">
      <div className="flex flex-row justify-between">
        <section className="flex flex-row gap-2">
          <Heart size={28} />
          <MessageCircle size={28} />
          <Send size={28} />
        </section>
        <section className="flex">
          <Bookmark size={28} />
        </section>
      </div>
    </div>
  );
}
