import Image from "next/image";

const LINE_URL = "https://line.me/R/ti/p/@154cxzgk?oat_content=url";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Saiens-%E5%B1%B1%E6%81%A9-61563602324496/",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/saiens.tw/",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@saienstaiwan/featured",
    icon: YouTubeIcon,
  },
  {
    label: "LINE",
    href: LINE_URL,
    icon: LineIcon,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--white) text-(--black)">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 sm:px-10">
        <Image
          src="/images/26e0957c-b1be-47b8-a31a-275504f344dd/logo+black.png"
          alt="Saiens"
          width={120}
          height={21}
        />

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-(--black) transition-colors hover:text-(--dark-accent)"
            >
              <Icon />
            </a>
          ))}
        </div>

        <p className="text-xs tracking-wide text-(--dark-accent)">
          &copy; {year} Saiens Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.6 4.3c-2.13 0-3.6 1.3-3.6 3.68v2.06H8.44v2.96h2.56V21h2.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2s-.2-1.5-.85-2.16c-.8-.85-1.7-.86-2.12-.9C15.6 4 12 4 12 4h0s-3.6 0-6.63.24c-.42.04-1.31.05-2.12.9C2.6 5.8 2.4 7.2 2.4 7.2S2.2 8.9 2.2 10.6v1.6c0 1.7.2 3.4.2 3.4s.2 1.5.85 2.16c.8.85 1.86.82 2.33.92 1.7.16 7.42.24 7.42.24s3.6 0 6.63-.24c.42-.04 1.31-.05 2.12-.9.65-.66.85-2.16.85-2.16s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.4-.2-3.4ZM9.94 14.1V8.5l5.7 2.8-5.7 2.8Z" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3.6c-5.3 0-9.6 3.5-9.6 7.9 0 3.9 3.4 7.2 8 7.8.3.1.7.2.8.5.1.3 0 .7 0 1l-.13.8c0 .2-.17.9.75.5.9-.4 5-3 6.8-5.1 1.25-1.4 1.85-2.8 1.85-4.5-.02-4.4-4.32-7.9-9.63-7.9Zm-4.2 10h-1.9a.4.4 0 0 1-.4-.4V9.9a.4.4 0 0 1 .8 0v2.9h1.5a.4.4 0 0 1 0 .8Zm2.15 0a.4.4 0 0 1-.4-.4V9.9a.4.4 0 0 1 .8 0v3.3a.4.4 0 0 1-.4.4Zm4.6 0a.4.4 0 0 1-.34-.18l-1.66-2.26v2.04a.4.4 0 0 1-.8 0V9.9a.4.4 0 0 1 .74-.2l1.66 2.26V9.9a.4.4 0 0 1 .8 0v3.3a.4.4 0 0 1-.4.4Zm3.5-2.1a.4.4 0 0 1 0 .8h-1.1v.9h1.1a.4.4 0 0 1 0 .8h-1.5a.4.4 0 0 1-.4-.4V9.9a.4.4 0 0 1 .4-.4h1.5a.4.4 0 0 1 0 .8h-1.1v.9h1.1Z" />
    </svg>
  );
}
