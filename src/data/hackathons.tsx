import { Icons } from "@/components/icons";

export const hackathons = [
  {
    title: "Bolt.new Build a Hackathon Landing Page Competition 2025",
    dates: "March 19th - March 22nd, 2025",
    location: "Worldwide, Online",
    description: "built an old school style hackathon landing page for the competition, won 200 USD equivalent in prizes.",
    image: "/boltnew.png",
    win: "Participation Prize",
    links: [
      {
        title: "deployed website",
        icon: <Icons.globe className="h-4 w-4" />,
        href: "https://bolt-new-hackathon-2025-oldschool.craftedbyhan.xyz/",
      },
      {
        title: "submission tweet",
        icon: <Icons.x className="h-4 w-4" />,
        href: "https://x.com/bbqbbq669/status/1903184286301507773?s=46",
      },
      {
        title: "prizes tweet",
        icon: <Icons.x className="h-4 w-4" />,
        href: "https://x.com/boltdotnew/status/1904928557480231158?s=46",
      },
      {
        title: "source code",
        icon: <Icons.github className="h-4 w-4" />,
        href: "https://github.com/han669669/bolt-new-hackathon-2025",
      },
    ],
  },
  {
    title: "(24 hours) Build Competition 2025 by Lovable x Anthropic x Supabase x Sentry x ElevenLabs x EQT Ventures",
    dates: "March 29th 8am - March 30th 8am, 2025",
    location: "Worldwide, Online",
    description: "built a monthly software tracker web app with database, auth, error monitoring, and user feedback collection. confirmed as 1 of 3000+ accepted participants builders for this hackathon (confirmed by Talisha White community lead), integrates with supabase for data storage and authentication, matched with sentry.io the apm tool for error tracking and collecting user feedback. won a 30 usd merchandise gift card from sentry.io one of the sponsors of the hackathon.",
    image: "/lovable.png",
    win: "Participation Prize",
    links: [
      {
        title: "deployed website",
        icon: <Icons.globe className="h-4 w-4" />,
        href: "https://software-tracker.lovable.app/",
      },
      {
        title: "source code",
        icon: <Icons.github className="h-4 w-4" />,
        href: "https://github.com/han669669/software-tracker",
      },
      {
        title: "submission tweet",
        icon: <Icons.x className="h-4 w-4" />,
        href: "https://x.com/bbqbbq669/status/1906129036121981178",
      },
      {
        title: "hackathon landing page",
        icon: <Icons.globe className="h-4 w-4" />,
        href: "https://build-launch-win.lovable.app/",
      },
      {
        title: "hackathon invitation page",
        icon: <Icons.globe className="h-4 w-4" />,
        href: "https://lu.ma/r70gxc42",
      },
    ],
  },
] as const;
