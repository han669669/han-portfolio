import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/optimized-image";
import { DATA } from "@/data/resume";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import { hackathons } from "@/data/hackathons";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { PricingSection } from "@/components/pricing-section"; 
import HighlightsSection from "@/components/highlights-section";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`hey ! I'm ${DATA.name.split(" ")[0]} 😊`}
              />
              <BlurFadeText
                className="mt-3 max-w-[600px] md:text-lg italic"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">about</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <ReactMarkdown
            className="mt-2 prose max-w-full text-pretty font-sans text-base leading-relaxed text-muted-foreground dark:prose-invert"
            rehypePlugins={[rehypeRaw]}
          >
            {DATA.summary}
          </ReactMarkdown>
        </BlurFade>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <PricingSection />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
        <HighlightsSection />
      </BlurFade>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold">education</h2>
          </BlurFade>
          {education.map((edu, id) => (
            <BlurFade
              key={edu.school}
              delay={BLUR_FADE_DELAY * 7 + id * 0.05}
            >
              <ResumeCard
                key={edu.school}
                href={edu.href}
                logoUrl={edu.logoUrl}
                altText={edu.school}
                title={edu.school}
                subtitle={edu.degree}
                period={`${edu.start} - ${edu.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3 mb-10">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 11 + id * 0.01}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <BlurFade delay={BLUR_FADE_DELAY * 9}><div className="border-t-2 border-dashed border-gray-300 mx-auto w-1/2"></div></BlurFade>
      
      <section id="projects">
        <div className="space-y-12 w-full pt-8 pb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  worked on a variety of projects, from simple
                  websites to complex web applications. a few of my
                  favorites !
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 11 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY * 12}><div className="border-t-2 border-dashed border-gray-300 mx-auto w-1/2"></div></BlurFade>

      <section id="hackathons">
        <div className="space-y-12 w-full pt-9 pb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  quickly make stuff happen.
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  new to hackathons and still learning the ropes.<br />
                  i&#39;ve only ever attended {hackathons.length}+ hackathons so far, but i&#39;m
                  excited to learn more, build more, and gain more experience.<br />
                  as being part of a community that&#39;s able to build such incredible, useful products in such a short time span of 1 to 3 days is really
                  inspiring, extremely eager to continue learning and growing !
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {hackathons.map((hackathon, id) => (
                <BlurFade
                  key={hackathon.title + hackathon.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={hackathon.title}
                    description={hackathon.description}
                    location={hackathon.location}
                    dates={hackathon.dates}
                    image={hackathon.image}
                    links={hackathon.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY * 16}><div className="border-t-2 border-dashed border-gray-300 mx-auto w-1/2"></div></BlurFade>

      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full pt-8 pb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                lets talk about ur project !
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                want to chat? just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter(x)
                </Link>{" "}
                and i will do my best to respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <BlurFade delay={BLUR_FADE_DELAY * 18}>
        <footer className="w-full py-6 text-center text-sm text-muted-foreground">
          <small>
            © {new Date().getFullYear()} {DATA.name}. all rights reserved.
          </small>
        </footer>
      </BlurFade>
    </main>
  );
}
