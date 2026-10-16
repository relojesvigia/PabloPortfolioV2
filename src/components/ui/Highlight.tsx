import { Fragment } from 'react';

interface HighlightProps {
  text: string;
  /** Phrases to emphasise (case-insensitive). */
  terms?: string[];
  className?: string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Renders `text` with every phrase in `terms` wrapped in <strong>. */
export function Highlight({ text, terms = [], className = 'font-semibold text-ink' }: HighlightProps) {
  const phrases = terms.filter(Boolean);
  if (phrases.length === 0) return <>{text}</>;

  // A capture group keeps matches in the split result, at odd indices.
  const parts = text.split(new RegExp(`(${phrases.map(escapeRegExp).join('|')})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={className}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
