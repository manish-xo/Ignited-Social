// Plain page background behind the dashboard cards.
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-canvas" />
  );
}
