export function KanjiText({ title, pronun }) {
  return (
    <ruby>
      {title}
      <rt style={{ fontSize: "35%", textAlign: "center" }}>{pronun}</rt>
    </ruby>
  );
}

export function ExtendedKanjiText({ text }) {
  const regex = /{([^{}]+)}/g;
  const arrStr = text.split(regex);
  const result = arrStr.map((part) => {
    if (part.includes("*")) {
      const [text, pronun] = part.split("*");
      return { text, pronun, type: "kanji" };
    } else {
      return { text: part, type: "hira" };
    }
  });

  return (
    <>
      {result.map((word, index) => {
        if (word.type === "kanji") {
          return <KanjiText title={word.text} pronun={word.pronun}></KanjiText>;
        } else {
          return <>{word.text}</>;
        }
      })}
    </>
  );
}
