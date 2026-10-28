export default function Brand({
  contracting = false,
}: {
  contracting?: boolean;
}) {
  return (
    <span
      className="brand"
      aria-label={`Rising Tide ${
        contracting ? "Contracting" : "Capital Partners"
      }`}
    >
      <span className="brand-symbol" aria-hidden="true">
        <img src="/rising-tide-wave.svg" alt="" width={68} height={46} />
      </span>
      <span className="brand-type">
        RISING TIDE
        <span>{contracting ? "CONTRACTING" : "CAPITAL PARTNERS"}</span>
      </span>
    </span>
  );
}
