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
        <img
          src="/rising-tide-logo-reference.png"
          alt=""
          width={271}
          height={59}
        />
      </span>
      <span className="brand-type">
        RISING TIDE
        <span>{contracting ? "CONTRACTING" : "CAPITAL PARTNERS"}</span>
      </span>
    </span>
  );
}
