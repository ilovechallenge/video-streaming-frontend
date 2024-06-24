export const EntryDetailContainer = ({
  className = '',
  wordHtml,
}: {
  className?: string;
  wordHtml: string;
}) => (
  <div
    id="entry_detail"
    className={`exp ${className}`}
    dangerouslySetInnerHTML={{ __html: wordHtml || '' }}
  />
);
