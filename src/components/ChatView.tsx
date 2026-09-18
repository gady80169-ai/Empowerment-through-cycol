import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Calendar,
  Sparkles,
  Info,
  Check,
  CheckCheck,
  MapPin,
  Heart,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { ChatThread, PartnerProfile, ChatMessage } from '../types';

interface ChatViewProps {
  chatThreads: Record<string, ChatThread>;
  activePartnerId: string | null;
  setActivePartnerId: (id: string) => void;
  partners: PartnerProfile[];
  onSendMessage: (partnerId: string, text: string) => void;
  onAcceptDateProposal: (partnerId: string, messageId: string) => void;
  onViewPartner: (partner: PartnerProfile) => void;
  onOpenDateModal: (partner: PartnerProfile) => void;
}

export function ChatView({
  chatThreads,
  activePartnerId,
  setActivePartnerId,
  partners,
  onSendMessage,
  onAcceptDateProposal,
  onViewPartner,
  onOpenDateModal,
}: ChatViewProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const threadList = Object.values(chatThreads);
  const currentPartner = partners.find((p) => p.id === activePartnerId) || partners[0];
  const activeThread = activePartnerId ? chatThreads[activePartnerId] : threadList[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim() || !activePartnerId) return;
    const text = inputText.trim();
    setInputText('');
    onSendMessage(activePartnerId, text);

    // Simulate partner replying after 1.8 seconds with realistic thoughtful response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I love how thoughtful you are! That sounds wonderful. Let's make sure we find time for that.",
        "That put such a smile on my face. It's rare to meet someone who looks at life with that kind of genuine warmth.",
        "Count me in! I've been wanting to explore that exact spot. Does Saturday or Sunday morning work better for you?",
        "That's so fascinating! I completely agree with your perspective. What led you to discover that?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      onSendMessage(activePartnerId, `[partner_reply]:${randomResponse}`);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendQuickPrompt = (promptText: string) => {
    if (!activePartnerId) return;
    onSendMessage(activePartnerId, promptText);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 h-[calc(100vh-5rem)]">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl h-full flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col bg-stone-900/60 shrink-0">
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-stone-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-rose-400" />
              Your Partner Connections
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-medium">
              {threadList.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-800/60">
            {threadList.length === 0 ? (
              <div className="p-6 text-center text-stone-400 space-y-2">
                <Heart className="w-8 h-8 text-stone-600 mx-auto" />
                <p className="text-xs">No active conversations yet.</p>
                <p className="text-[11px] text-stone-500">
                  Like candidate profiles in Discover to start connecting!
                </p>
              </div>
            ) : (
              threadList.map((thread) => {
                const isSelected = thread.partnerId === activePartnerId;
                const partnerObj = partners.find((p) => p.id === thread.partnerId);
                const lastMsg = thread.messages[thread.messages.length - 1];

                return (
                  <div
                    key={thread.partnerId}
                    id={`chat-thread-${thread.partnerId}`}
                    onClick={() => setActivePartnerId(thread.partnerId)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-stone-800/90 text-white'
                        : 'hover:bg-stone-800/40 text-stone-300'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={thread.partnerPhoto}
                        alt={thread.partnerName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-stone-700"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-stone-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-serif font-bold text-sm text-stone-100 truncate">
                          {thread.partnerName}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">
                          {thread.updatedAt}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs text-stone-400 truncate">
                          {lastMsg ? lastMsg.text : 'Connected! Say hello.'}
                        </p>
                        {partnerObj && (
                          <span className="text-[10px] font-semibold text-rose-400 shrink-0">
                            {partnerObj.compatibilityScore}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Window */}
        {activePartnerId && activeThread && currentPartner ? (
          <div className="flex-1 flex flex-col h-full bg-stone-950/40">
            {/* Chat Header */}
            <div className="p-4 border-b border-stone-800 bg-stone-900/80 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentPartner.photos[0]}
                    alt={currentPartner.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-700"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-stone-900" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    {currentPartner.name}, {currentPartner.age}
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {currentPartner.compatibilityScore}% Match
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    {currentPartner.occupation} • {currentPartner.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="chat-plan-meetup-btn"
                  onClick={() => onOpenDateModal(currentPartner)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Propose Meetup</span>
                </button>

                <button
                  id="chat-view-profile-btn"
                  onClick={() => onViewPartner(currentPartner)}
                  className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
                  title="View Partner Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Mutual Connection Greeting Card */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-center max-w-md mx-auto space-y-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 mx-auto flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-stone-200">
                  You and {currentPartner.name} are mutually connected!
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Both of you prioritize{' '}
                  <span className="text-stone-300 font-medium">{currentPartner.values[0]}</span> and share{' '}
                  <span className="text-stone-300 font-medium">{currentPartner.intent}</span>.
                </p>
              </div>

              {/* Chat Thread Messages */}
              {activeThread.messages.map((msg) => {
                const isUserMsg = msg.isUser;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUserMsg ? 'items-end' : 'items-start'}`}
                  >
                    {/* Date Proposal Card */}
                    {msg.isDateProposal && msg.dateDetails ? (
                      <div className="max-w-sm rounded-2xl p-4 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/40 shadow-xl space-y-3 my-2">
                        <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                          <Calendar className="w-4 h-4" />
                          <span>Meetup Proposal</span>
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-white text-sm">
                            {msg.dateDetails.title}
                          </h5>
                          <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            {msg.dateDetails.location}
                          </p>
                          <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            {msg.dateDetails.time}
                          </p>
                        </div>

                        {msg.dateDetails.accepted ? (
                          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
                            <CheckCheck className="w-4 h-4" />
                            <span>Date Confirmed & Added to Calendar!</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAcceptDateProposal(activePartnerId, msg.id)}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-semibold text-xs transition-all shadow-md active:scale-98"
                          >
                            Accept & Confirm Date ✨
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Regular Chat Bubble */
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUserMsg
                            ? 'bg-rose-600 text-white rounded-tr-none'
                            : 'bg-stone-800 border border-stone-700/70 text-stone-100 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    <span className="text-[10px] text-stone-500 mt-1 px-1 flex items-center gap-1">
                      {msg.timestamp}
                      {isUserMsg && <Check className="w-3 h-3 text-stone-400" />}
                    </span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-stone-400 text-xs italic animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>{currentPartner.name} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Icebreakers suggestions */}
            <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-900/40 overflow-x-auto flex items-center gap-2">
              <span className="text-[11px] text-stone-400 font-medium shrink-0">
                Suggestions:
              </span>
              {currentPartner.icebreakers.map((ib, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuickPrompt(ib)}
                  className="shrink-0 px-3 py-1 rounded-full text-xs text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700/80 transition-colors truncate max-w-xs"
                >
                  "{ib}"
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-900">
              <div className="flex items-center gap-2">
                <input
                  id="chat-input-field"
                  type="text"
                  placeholder={`Write a thoughtful message to ${currentPartner.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-3 rounded-2xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-stone-100 placeholder-stone-500 text-xs sm:text-sm"
                />
                <button
                  id="chat-send-btn"
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`p-3 rounded-2xl transition-all shadow-md ${
                    inputText.trim()
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40 active:scale-95'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
            <MessageCircle className="w-12 h-12 text-stone-600" />
            <p className="text-sm font-medium text-stone-300">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
