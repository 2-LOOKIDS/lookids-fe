import { ImageIcon, Paperclip, Send, Smile } from 'lucide-react';

interface InputSectionProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
}) => {
  return (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="focus:border-lookids w-full rounded-full border border-gray-300 px-4 py-2 text-[16px]  focus:outline-none"
          />
        </div>
        <div className="flex gap-4 sm:gap-6">
          <button aria-label="Add image">
            <ImageIcon className="h-5 w-5 text-[#869AA9] sm:h-6 sm:w-6" />
          </button>
          <button aria-label="Attach file">
            <Paperclip className="h-5 w-5 text-[#869AA9] sm:h-6 sm:w-6" />
          </button>
          <button aria-label="Add emoji">
            <Smile className="h-5 w-5 text-[#869AA9] sm:h-6 sm:w-6" />
          </button>
        </div>
        <button
          onClick={onSendMessage}
          className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#FD6B22] to-[#FFD381] p-2 sm:h-9 sm:w-9"
          aria-label="Send message"
        >
          <Send className="h-4 w-4 -rotate-45 text-white" />
        </button>
      </div>
    </div>
  );
};

export default InputSection;
