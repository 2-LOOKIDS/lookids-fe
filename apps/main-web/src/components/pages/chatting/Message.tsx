import { Message } from '../../../types/chatting/ChattingType';

interface MessageSectionProps {
  messages: Message[];
}

const MessageSection: React.FC<MessageSectionProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-5">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.messageType === 'sent' ? 'justify-end' : 'justify-start'}`}
        >
          {message.messageType === 'received' && (
            <div className="flex max-w-[75%] flex-col gap-2">
              <div className="flex items-center gap-2">
                {message.avatar && (
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 sm:h-9 sm:w-9">
                    <img
                      src={message.avatar}
                      alt={message.senderId}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm font-medium">{message.senderId}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="inline-block rounded-lg rounded-tl-none border border-[#E5EBEF] bg-[#FBFBFD] px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-sm font-medium text-[#161616]">
                    {message.message}
                  </p>
                </div>
                <span className="text-xs text-[#869AA9]">
                  {message.createdAt}
                </span>
              </div>
            </div>
          )}
          {message.messageType === 'sent' && (
            <div className="flex max-w-[75%] flex-col items-end gap-1">
              <div className="inline-block rounded-lg rounded-tr-none bg-[#FD9340] px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-sm font-medium text-white">
                  {message.message}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#869AA9]">
                  {message.createdAt}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 8L7 11L12 5" stroke="#F1674A" strokeWidth="1" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSection;
