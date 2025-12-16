export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5 py-8 text-center text-xs text-neutral-500 dark:text-neutral-400 space-y-2">
      <p>© {new Date().getFullYear()} Cash. All rights reserved.</p>
      <p>
        <a
          href="https://sujilament.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          powered by SUJI
        </a>
      </p>
    </footer>
  );
}
