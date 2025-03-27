<p align="center">
  Take a look at a brief demo of the portfolio:
</p>

<p align="center">
  <img src="./public/han-portfolio.gif" alt="Portfolio Demo">
</p>

# Portfolio

A personal portfolio template built with Next.js, designed to showcase your work, skills, and experience. It includes a blog and is optimized for different devices and deployment platforms. The template also comes with a responsive layout, and support for both light and dark mode. The template is easy to customize and comes with a set of pre-built components and utilities to help you quickly build your portfolio website.

## Tech Stack

-   [Next.js](https://nextjs.org/) 15: React framework for building performant web applications.
-   [React](https://reactjs.org/): JavaScript library for building user interfaces.
-   [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that adds static typing.
-   [shadcn/ui](https://ui.shadcn.com/): Reusable components built using Radix UI and Tailwind CSS.
-   [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
-   [Framer Motion](https://www.framer.com/motion/): Production-ready motion library for React.
-   [Magic UI](https://magicui.design/): A set of UI components.

## Features

-   **Easy Setup:** Configuration is done through a single file (`src/data/resume.tsx`).
-   **Blog:** Integrated blog functionality to share your thoughts and ideas.
-   **Responsive Design:** Adapts to different screen sizes and devices.
-   **Optimized for Next.js and Vercel:** Designed for performance and easy deployment.

## Migration to Next.js 15

This project has been migrated to Next.js 15. Key updates include:

-   `next` and `eslint-config-next` dependencies updated to version `^15.2.2` in `package.json`.
-   Type definitions in `src/app/blog/[slug]/page.tsx` explicitly define the `PageProps` type and await the `params` object.

## Getting Started Locally

1.  Clone the repository:

    ```bash
    git clone https://github.com/han669669/han-portfolio
    ```

2.  Navigate to the project directory:

    ```bash
    cd portfolio
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Start the development server:

    ```bash
    npm run dev
    ```

5.  Customize the portfolio by editing `src/data/resume.tsx`.

## Credits

This project is inspired by and incorporates elements from [dillionverma/portfolio](https://github.com/dillionverma/portfolio).

## License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
