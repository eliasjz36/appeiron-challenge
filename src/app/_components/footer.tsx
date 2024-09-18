export default function Footer() {
  return (
    <footer className="flex flex-col items-center space-y-4 border-t border-border/60 bg-muted/40 py-6">
      <p className="text-sm">{`\u00A9 ${new Date().getFullYear()} Elias Jimenez. TMDb Challenge.`}</p>
    </footer>
  );
}
