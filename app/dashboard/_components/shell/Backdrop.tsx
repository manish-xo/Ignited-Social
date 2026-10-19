// Soft purple light behind the glass. Plain gradients (no blur filters), and
// the drift only runs on tablet/desktop so phones don't re-blur every frame.
export default function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas"
    >
      <div className="absolute -left-[12%] -top-[18%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(126,115,231,0.32),transparent)] md:animate-cta-drift" />
      <div
        className="absolute -right-[10%] top-[18%] h-[65vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(218,214,242,0.9),transparent)] md:animate-cta-drift"
        style={{ animationDelay: "-7s", animationDuration: "24s" }}
      />
      <div
        className="absolute -bottom-[25%] left-[25%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,214,186,0.45),transparent)] md:animate-cta-drift"
        style={{ animationDelay: "-13s", animationDuration: "28s" }}
      />
      {/* faint dot grid for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(34,31,27,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
  );
}
