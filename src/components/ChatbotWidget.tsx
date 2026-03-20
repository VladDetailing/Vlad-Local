import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getChatbotReply } from './chatbotLogic';

type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  actions?: Array<{ label: string; href: string }>;
};

const phoneDisplay = '0771 133 128';
const phoneHref = 'tel:0771133128';

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const lastCategoryIdRef = useRef<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: makeId(),
      role: 'bot',
      text:
        'Salut! Sunt asistentul Vlad Detailing.\nÎntreabă-mă despre prețuri, program, locație sau un serviciu anume.\nDacă nu am informația pe site, îți recomand să ne suni.'
    }
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickQuestions = useMemo(
    () => [
      'Care este programul?',
      'Unde sunteți?',
      'Cât costă folia solară?',
      'Cât costă detailing interior?'
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [open, messages.length]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const pendingId = makeId();

    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: 'user', text: trimmed },
      { id: pendingId, role: 'bot', text: 'Se gândește...' }
    ]);
    setInput('');

    setSending(true);
    try {
      const reply = await getChatbotReply(trimmed, { lastCategoryId: lastCategoryIdRef.current });
      lastCategoryIdRef.current = reply.meta?.categoryId ?? lastCategoryIdRef.current;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                text: reply.text,
                actions: reply.actions
              }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                text: `Momentan nu pot răspunde.\nSună-ne la ${phoneDisplay} sau folosește formularul de evaluare.`,
                actions: [
                  { label: `Sună-ne: ${phoneDisplay}`, href: phoneHref },
                  { label: 'Cere evaluare', href: '#evaluare' }
                ]
              }
            : m
        )
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1100]">
      {open ? (
        <div className="w-[340px] max-w-[calc(100vw-2.5rem)] h-[520px] bg-black/90 backdrop-blur-md border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-300" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white">Asistent Vlad Detailing</div>
                <div className="text-xs text-gray-400">Răspunsuri din informațiile site-ului</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-300"
              aria-label="Închide chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="text-xs px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
                >
                  {q}
                </button>
              ))}
              <a
                href={phoneHref}
                className="text-xs px-3 py-2 rounded-full bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-200 inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Sună-ne
              </a>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-100 border border-white/10'
                  }`}
                >
                  <div>{m.text}</div>
                  {m.actions?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <a
                          key={`${m.id}-${a.href}-${a.label}`}
                          href={a.href}
                          className="text-xs px-3 py-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-gray-200"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <form
            className="p-3 border-t border-white/10 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrie o întrebare..."
              disabled={sending}
              className="flex-1 h-11 px-3 rounded-xl bg-black/50 border border-blue-500/20 focus:border-blue-500 focus:outline-none text-white placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={sending}
              className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-60 disabled:hover:bg-blue-600"
              aria-label="Trimite"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="px-4 pb-4 text-[11px] text-gray-500">
            Dacă preferi, sună direct: <a href={phoneHref} className="text-blue-300 hover:text-blue-200">{phoneDisplay}</a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl border border-blue-500/30 flex items-center justify-center"
          aria-label="Deschide chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
