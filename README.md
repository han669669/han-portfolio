# Portfolio

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployable to Vercel with a single click. This is a portfolio template that you can use to showcase your work and skills. 

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 15, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Migration to Next.js 15

The project has been successfully migrated to Next.js 15. The following changes were made:

- Updated `next` and `eslint-config-next` dependencies in `package.json` to version `^15.0.0`.
- Updated the type definitions in `src/app/blog/[slug]/page.tsx` to explicitly define the `PageProps` type and await the `params` object.

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local Server:

   ```bash
   npm run dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
