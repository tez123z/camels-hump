import MusicPlayer from "./MusicPlayer";

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4">
      <MusicPlayer />
      <footer className="text-center mt-12 pb-8">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          In loving memory of Duane Evans
        </p>
      </footer>
    </div>
  );
}
