import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Han Lin Chong",
  initials: "Han",
  url: "https://www.craftedbyhan.xyz/",
  location: "Singapore / Kuala Lumpur",
  locationLink: "https://www.google.com/maps/place/singapore",
  description:
    "building cool stuff with AI 🛠️ and helping others out 🤝",
  summary:
    "i help entrepreneurs and business owners **build a strong online presence** 🌐 \n\ndrive more **leads and sales** 📈 \n\nestablish a **professional online profile** 💼 \n\nhelping you to **earn more money** 💸 \n\nand have more time to **focus on the things you love** ❤️",
  avatarUrl: "/me(edited).JPG",
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "Typescript",
    "Bootstrap",
    "React",
    "Vite",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "npm",
    "Tailwind CSS",
    "Magic UI",
    "Shadcn",
    "React Query",
    "Framer Motion",
    "API",
    "Three.js",
    "Lucide React",
    "Cloudflare",
    "Render",
    "Vercel",
    "Porkbun.com",
    "Imgur API",
    "Git",
    "Github",
    "PostgreSQL",
    "OpenRouter API",
    "Claude Sonnet 3.5 / 3.7",
    "Meta AI Llama 3.1 / 3.3",
    "Deepseek R1 / V3",
    "Google Gemini 2.0 / 2.5",
    "liquid/lfm-7b",
    "Windsurf AI Code Editor",
    "VSCode",
    "Cline",
    "Roo Code",
    "Bolt.new",
    "v0.dev",
    "Nebius AI Studio API",
    "Github Copilot",
    "Replit"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "contact@craftedbyhan.xyz",
    tel: "+65 82116596",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/han669669",
        icon: Icons.github,

        navbar: true,
      },
      // LinkedIn: {
      //   name: "LinkedIn",
      //   url: "https://dub.sh/dillion-linkedin",
      //   icon: Icons.linkedin,

      //   navbar: true,
      // },
      X: {
        name: "X",
        url: "https://x.com/intent/follow?screen_name=bbqbbq669",
        icon: Icons.x,

        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:contact@craftedbyhan.xyz",
        icon: Icons.email,

        navbar: true,
      },
    },
  },
  education: [
    {
      school: "DeepLearning.AI",
      href: "https://learn.deeplearning.ai/accomplishments/63711fc4-b69f-410e-aa5d-07982ea43e62",
      degree: "AI Vibe Coding 101 with Replit in collaboration with Andrew Ng",
      logoUrl: "/deeplearning.svg",
      start: "2025",
      end: "2025",
    },
    {
      school: "Coursera ",
      href: "/ai-and-gen-ai-completion.png",
      degree: "AI & Generative AI For Everyone by former Stanford Professor Andrew Ng",
      logoUrl: "/coursera.svg",
      start: "2025",
      end: "2025",
    },
    {
      school: "Udemy",
      href: "https://www.udemy.com/certificate/UC-2KAXYRQI/",
      degree: "Vue JS 2.0 - Mastering Web Apps",
      logoUrl: "/udemy.svg",
      start: "2018",
      end: "2018",
    },
    {
      school: "Udemy ",
      href: "https://www.udemy.com/certificate/UC-HZG7I58J/",
      degree: "The Web Developer Bootcamp",
      logoUrl: "/udemy.svg",
      start: "2018",
      end: "2018",
    },
    {
      school: "freeCodeCamp",
      href: "https://www.freecodecamp.org/hanlinc",
      degree: "Full Stack Web Development Certification",
      logoUrl: "/freecodecamp.svg",
      start: "2017",
      end: "2017",
    },
    {
      school: "NovoEd",
      href: "https://deloitte.novoed.com/#!/courses/cognitive-technology-2016a/statements/1078274",
      degree: "Cognitive Technologies: The real opportunities for business",
      logoUrl: "/novoed.svg",
      start: "2016",
      end: "2016",
    },
    {
      school: "Coursera",
      href: "https://www.coursera.org/learner/han669",
      degree: "Learning How to Learn: Powerful mental tools to help you master tough subjects",
      logoUrl: "/coursera.svg",
      start: "2015",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Malaysia Home Finder",
      href: "https://malaysiahomefinder.craftedbyhan.xyz/",
      dates: "Dec 2024 - Present",
      active: true,
      description:
        "Integrating [Windsurf AI Code Editor](https://codeium.com/windsurf) into my workflow. \n\ndecided to build a modern, high-performance web application for showcasing luxury condos and serviced apartments, built with cutting-edge web technologies. \n\naiming to build a platform that's super easy to use, where people can browse through beautiful properties and discover their perfect homes.",
      technologies: [
        "React",
        "Typescript",
        "Vite",
        "TailWindCSS",
        "React Query",
        "Framer Motion",
        "Lucide React",
        "Windsurf",
        "Claude Sonnet 3.5",
        "Meta AI Llama 3.1",
        "Cloudflare"
      ],
      links: [
        {
          type: "Website",
          href: "https://malaysiahomefinder.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "/malaysiahomefinder.mp4",
    },
    {
      title: "SaaS Recommendation Engine",
      href: "https://saasvibesearch.craftedbyhan.xyz/",
      dates: "March 2025 - Present",
      active: true,
      description:
        "objective: Ultilize AI model [_(liquid/lfm-7b)_](https://openrouter.ai/liquid/lfm-7b) via OpenRouter API in a web application to recommend SaaS solutions based on user queries. \n\nThe engine uses natural language processing (NLP) and AI to analyze user queries, identify relevant categories, and recommend software from a large database. \n\nIt's built for scalability with efficient search algorithms and AI-driven ranking for fast and accurate suggestions.",
      technologies: [
        "HTML",
        "CSS",
        "Javascript",
        "Express.js",
        "Node.js",
        "compromise(nlp package)",
        "minisearch(text search engine)",
        "OpenRouter API",
        "liquid/lfm-7b",
        "VSCode",
        "Cline",
        "Vercel",
        "Gemini 2.0",
      ],
      links: [
        {
          type: "Website",
          href: "https://saasvibesearch.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },        {
          type: "Source",
          href: "https://github.com/han669669/saas-search",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "/saasvibesearch.mp4",
    },
    {
      title: "Photography Showcase",
      href: "https://chonghanlin.craftedbyhan.xyz/",
      dates: "May 2024 - June 2024",
      active: true,
      description:
        "Showcasing my photography journey in Singapore, capturing the beauty of the city-state through my lens. \n\nBuilt with simplicity in mind, and also features an appointment scheduling section, allowing users to book a photoshoot with me directly. \n\nPhotos are fetched using the [Imgur API](https://apidocs.imgur.com/). ",
      technologies: [
        "HTML",
        "CSS",
        "Javascript",
        "Bootstrap",
        "VSCode",
        "Codeium",
        "Git",
        "Imgur API",
        "Render"
      ],
      links: [
        {
          type: "Website",
          href: "https://chonghanlin.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/han669669/personal-portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/photography-portfolio.mp4",
    },
    {
      title: "LLM Leaderboard",
      href: "https://webdevllmleaderboard.craftedbyhan.xyz/",
      dates: "March 2025 - Present",
      active: true,
      description:
        "This project recreates the [WebDev Arena Leaderboard](https://web.lmarena.ai/leaderboard) to provide a more comprehensive comparison of Large Language Models (LLMs) based on their web development performance. \n\nThe recreated leaderboard includes input and output costs, providing a more detailed assessment of LLMs' performance.",
      technologies: [
        "Next.js",
        "React",
        "Typescript",
        "TailwindCSS",
        "Radix UI",
        "Lucide React",
        "Vercel",
        "v0.dev",
        "Gemini 2.0",
        "VSCode",
        "Cline"
      ],
      links: [
        {
          type: "Website",
          href: "https://webdevllmleaderboard.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/han669669/webdev-arena-llm-leaderboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/webdev-arena-llm-leaderboard.mp4",
    },
    {
      title: "Voice Visualizer",
      href: "https://voicemode.craftedbyhan.xyz/",
      dates: "March 2025 - March 2025",
      active: true,
      description:
        "A mesmerizing voice-controlled particle visualizer that transforms your voice input into a dynamic and interactive visual experience. Using WebGL and [Three.js](https://threejs.org/), \n\nthe application creates a sphere of particles that react to the amplitude of your voice. \n\nThe particles dance and shift in real-time, responding to your every word and sound.",
      technologies: [
        "HTML",
        "CSS",
        "Javascript",
        "Three.js",
        "WebGL",
        "Web Audio API",
        "VSCode",
        "Cline",
        "Render",
        "Google Gemini 2.0 Flash"
      ],
      links: [
        {
          type: "Website",
          href: "https://voicemode.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/han669669/voice-mode",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "/voice-mode.mp4",
    },
    {
      title: "Personal Portfolio",
      href: "https://www.craftedbyhan.xyz/",
      dates: "March 2025 - Present",
      active: true,
      description:
        "A personal portfolio website that includes a blog and is optimized for different devices and deployment platform. The website has a responsive layout and supports both light and dark mode. \n\nIt is designed for performance and easy deployment to [vercel](https://vercel.com/), making it a great starting point for anyone looking to build a fast and scalable portfolio with a blog. ",
      technologies: [
        "Next.js",
        "React",
        "Typescript",
        "shadcn",
        "Radix UI",
        "Lucide React",
        "Tailwind CSS",
        "Framer Motion",
        "Magic UI",
        "VSCode",
        "Cline",
        "Vercel",
        "Google Gemini 2.0 Flash"
      ],
      links: [
        {
          type: "Website",
          href: "https://www.craftedbyhan.xyz/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/han669669/han-portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "/han-portfolio.mp4",
    },
  ],
  hackathons: [
    {
      title: "Bolt.new Build a Hackathon Landing Page Competition 2025",
      dates: "March 19th - 22nd, 2025",
      location: "Worldwide, Online",
      description: "built an old school style hackathon landing page for the competition, won 200 USD equivalent in prizes.",
      image:
        "/boltnew.png",
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
  ],
} as const;
