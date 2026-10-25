import Image from "next/image";

export default function Home() {
  
  return (
    
   <div className="min-h-screen bg-background text-foreground font-hand">
      {/* ===== Top bar ===== */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-3xl font-bold text-primary">✎ Sketchy</span>
        <div className="hidden gap-8 text-xl md:flex">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#how" className="hover:text-primary">How it works</a>
        </div>
        <a href="/canvas/1" className="sketch-btn bg-primary text-primary-foreground">Open canvas</a>
      </nav>

      {/* ===== Hero ===== */}
      <header className="mx-auto max-w-6xl px-6 pt-12 pb-20 text-center">
        <h1 className="text-6xl font-bold leading-tight md:text-8xl">
          Whiteboard ideas,<br />
          <span className="scribble text-primary">hand-drawn.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground">
          A virtual whiteboard for sketching diagrams that feel like you drew them on paper. Free, open, and collaborative.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/signup" className="sketch-btn bg-primary text-primary-foreground text-2xl">Start drawing →</a>
          <a href="#features" className="sketch-btn bg-card text-2xl">Live collab</a>
        </div>

        {/* Demo drawing */}
        <div className="relative mx-auto mt-16 max-w-4xl sketch-card bg-card p-4">
          <div className="mb-3 flex justify-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground bg-accent text-lg">▢</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">◇</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">○</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">→</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">—</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">✎</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">A</span>
            <span className="grid h-10 w-10 place-items-center rounded-md border-2 border-foreground text-lg">🖼</span>
          </div>
          <svg viewBox="0 0 800 340" className="grid-paper w-full rounded-md">
            <g fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M62 82 Q60 60 84 62 L238 60 Q262 62 260 84 L262 156 Q260 178 236 178 L86 180 Q62 178 64 154 Z" fill="var(--sticky-yellow)" />
              <path d="M400 50 L480 120 L400 190 L320 120 Z" fill="var(--sticky-blue)" />
              <ellipse cx="660" cy="120" rx="90" ry="62" fill="var(--sticky-pink)" />
              <path d="M262 120 Q290 116 316 121 M306 112 L318 121 L305 130" />
              <path d="M482 120 Q520 124 566 119 M556 110 L568 119 L555 128" />
              <path d="M400 192 Q398 240 402 268 M393 258 L402 270 L410 257" />
              <path d="M300 270 L500 272 L498 318 L302 316 Z" fill="var(--sticky-green)" />
            </g>
            <g fontFamily="Caveat" fontSize="28" fill="var(--foreground)" textAnchor="middle">
              <text x="162" y="128">Idea</text>
              <text x="400" y="128">Sketch?</text>
              <text x="660" y="128">Share</text>
              <text x="400" y="302">Iterate</text>
            </g>
          </svg>
        </div>
      </header>

      {/* ===== Features ===== */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-5xl font-bold md:text-6xl">
          Everything you need to <span className="scribble">think visually</span>
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sketch-card bg-sticky-yellow -rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">Hand-drawn feel</h3>
            <p className="mt-2 font-body text-foreground/80">Every shape looks sketched by hand, so ideas stay loose and friendly.</p>
          </div>
          <div className="sketch-card bg-sticky-blue rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">Real-time collab</h3>
            <p className="mt-2 font-body text-foreground/80">Share a link and draw together. See every cursor live.</p>
          </div>
          <div className="sketch-card bg-sticky-pink -rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">End-to-end encrypted</h3>
            <p className="mt-2 font-body text-foreground/80">Your drawings are encrypted. Not even our servers can see them.</p>
          </div>
          <div className="sketch-card bg-sticky-green rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">Infinite canvas</h3>
            <p className="mt-2 font-body text-foreground/80">Zoom, pan and never run out of room for your thoughts.</p>
          </div>
          <div className="sketch-card bg-sticky-yellow -rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">Export anywhere</h3>
            <p className="mt-2 font-body text-foreground/80">PNG, SVG, or clipboard. Embed scenes right inside the image.</p>
          </div>
          <div className="sketch-card bg-sticky-blue rotate-1 p-6 transition-transform hover:rotate-0">
            <h3 className="text-3xl font-bold">Libraries</h3>
            <p className="mt-2 font-body text-foreground/80">Reuse shapes from community libraries or build your own.</p>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-5xl font-bold">Three steps. Zero sign-up.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-foreground bg-accent text-4xl font-bold">1</div>
            <p className="mt-4 text-3xl">Open the canvas</p>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-foreground bg-accent text-4xl font-bold">2</div>
            <p className="mt-4 text-3xl">Draw your idea</p>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-foreground bg-accent text-4xl font-bold">3</div>
            <p className="mt-4 text-3xl">Share the link</p>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section id="start" className="mx-auto max-w-4xl px-6 py-20">
        <div className="sketch-card bg-primary p-12 text-center text-primary-foreground">
          <h2 className="text-5xl font-bold md:text-6xl">Grab a pen. Start sketching.</h2>
          <p className="mt-4 font-body opacity-90">Free forever. No account required.</p>
          <a href="/canvas/1" className="sketch-btn mt-8 inline-block bg-card text-foreground text-2xl">Open the whiteboard</a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t-2 border-dashed border-border py-10 text-center text-xl text-muted-foreground">
        Made with a wobbly pen · © 2026 Sketchy
      </footer>
    </div>
  );
}
