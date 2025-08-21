import { Icons } from "@/components/icons";

export const projects = [
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
    video: "/malaysiahomefinder.mp4",
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
      },
      {
        type: "Source",
        href: "https://github.com/han669669/saas-search",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "/saasvibesearch.mp4",
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
    video: "/voice-mode.mp4",
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
      "Windsurf",
      "Vercel",
      "Google Gemini 2.0 Flash",
      "GPT-5 (medium reasoning)"
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
    video: "/han-portfolio.mp4",
  },
  {
    title: "CRUD React App w/ auth",
    href: "https://todo.craftedbyhan.xyz/",
    dates: "April 2025 - April 2025",
    active: true,
    description:
      "wanted to try out [Appwrite](https://appwrite.io/) backend as a service platform, built with roo code + deepseek v3 0324 / quasar alpha in vscode, used heroui chat to quickly generate frontend ui with landing page. \n\ntested working crud operations with drag and drop feature synced to database, appwrite auth for email+pw / email otp login or signup, hosted on vercel.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "HeroUI",
      "Appwrite",
      "Vercel",
      "Git",
      "Deepseek-v3-0324",
      "quasar-alpha",
      "VSCode",
      "Roo Code"
    ],
    links: [
      {
        type: "Website",
        href: "https://todo.craftedbyhan.xyz/",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/han669669/todo-app",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "/todo.mp4",
  },
  {
    title: "AI Chat Web App",
    href: "https://chatapp.craftedbyhan.xyz/",
    dates: "April 2025 - April 2025",
    active: true,
    description:
      "simple AI chat app with world's best-in-class multilingual language llm model (liquid/lfm-7b), gave agent [openrouter's](https://openrouter.ai/) docs via llms-full.txt to integrate their api into this chat web app. \n\nappwrite functions for hosting, used deepseek v3 0324 with roo code for development.",
    technologies: [
      "HTML",
      "CSS",
      "Javascript",
      "Appwrite",
      "liquid/lfm-7b",
      "Openrouter API",
      "VSCode",
      "Roo Code",
      "Deepseek-v3-0324"
    ],
    links: [
      {
        type: "Website",
        href: "https://chatapp.craftedbyhan.xyz/",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "",
    video: "/chatapp.mp4",
  },
  {
    title: "imHungryAF - Good Food Near You",
    href: "https://imhungryaf.pages.dev/",
    dates: "April 2025 - Present",
    active: true,
    description:
      "had this problem while traveling in kuala lumpur malaysia, made this location based food recommender to solve issue. spent 4 hrs 35 mins from idea concept to working mvp build, just wow 😯 \n\nworkflow goes like this, _qwen 2.5 max > write fsd > [deepsite](https://huggingface.co/spaces/enzostvs/deepsite) > vscode + roo code > cloudflare pages_ \n\ntop Youtube Food influencers approved recommendations in Singapore & Kuala Lumpur within a 60 minutes drive. Find best hawker stalls, mamak shops and hidden gems near you !",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Javascript",
      "DeepSite",
      "Qwen 2.5 Max",
      "Cloudflare",
      "Deepseek-v3-0324",
      "quasar-alpha",
      "VSCode",
      "Roo Code",
      "Git"
    ],
    links: [
      {
        type: "Website",
        href: "https://imhungryaf.pages.dev/",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/han669669/foodie-finds",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "/imhungryaf.mp4",
  },
  {
    title: "Argue w/ AI",
    href: "https://toxic-bot.netlify.app/",
    dates: "April 2025 - April 2025",
    active: true,
    description:
      "argue with an ai chatbot, made during Cerebras.ai & HuggingFace's [8 hours Hackathon](https://lu.ma/eihdh2gd) @ 12/13 april 2025. \n\napplied to hackathon and was granted access to cerebras.ai blazing fast ~2600 tokens/s Llama 4 Scout :O \n\n_qwen 2.5 max > write fsd > deepsite > windsurf + deepseek / gemini > netlify_",
    technologies: [
      "HTML",
      "CSS",
      "Javascript",
      "Tailwind CSS",
      "Qwen 2.5 Max",
      "DeepSite",
      "Cerebras API",
      "Llama 4 Scout",
      "Git",
      "Netlify",
      "Windsurf",
      "Deepseek-v3-0324",
      "Gemini 2.5 Pro"
    ],
    links: [
      {
        type: "Website",
        href: "https://toxic-bot.netlify.app/",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/han669669/toxic-bot",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "",
    video: "/toxic-bot.mp4",
  },
] as const;
