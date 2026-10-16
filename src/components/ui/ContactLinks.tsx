import { contact } from '@/data/portfolioData';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.75 13.56L3 21l4.56-1.2A9 9 0 1 0 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 7.9c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.4.8-.6.4-1.5.6-2.4.3-2.3-.8-4.1-2.6-4.9-4.9-.3-.9-.1-1.8.2-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Pill button that opens WhatsApp. */
export function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-ink transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 ${className}`}
    >
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      {contact.whatsappLabel}
    </a>
  );
}

const linkUnderline =
  'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]';

/** Email, phone and WhatsApp — used in the Experience box and the Contact section. */
export function ContactLinks({ align = 'start' }: { align?: 'start' | 'center' | 'spread' }) {
  const centered = align === 'center';
  const layout =
    align === 'center'
      ? 'items-center sm:justify-center'
      : align === 'spread'
        ? 'items-start sm:justify-between'
        : 'items-start';
  return (
    <ul className={`flex flex-col gap-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-6 ${layout}`}>
      <li>
        <a href={`mailto:${contact.email}`} className={`group block ${centered ? 'text-center' : ''}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-label text-taupe">Email</span>
          <span className={`mt-1.5 inline-block break-all text-[15px] font-medium text-ink ${linkUnderline}`}>
            {contact.email}
          </span>
        </a>
      </li>
      <li>
        <a href={contact.phoneHref} className={`group block ${centered ? 'text-center' : ''}`}>
          <span className="block text-[10px] font-semibold uppercase tracking-label text-taupe">Phone</span>
          <span className={`mt-1.5 inline-block text-[15px] font-medium tabular-nums text-ink ${linkUnderline}`}>
            {contact.phone}
          </span>
        </a>
      </li>
      <li>
        <WhatsAppButton />
      </li>
    </ul>
  );
}
