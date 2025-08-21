import { DATA } from "@/data/resume";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function PricingSection() {
  const { pricing } = DATA;

  return (
    <section className="pt-6">
      <h2 className="text-xl font-bold">pricing</h2>
      <ReactMarkdown
        className="mt-2 prose max-w-full text-pretty font-sans text-base leading-relaxed text-muted-foreground dark:prose-invert"
        rehypePlugins={[rehypeRaw]}
      >
        {pricing.valueProposition}
      </ReactMarkdown>
      
      {/* Main pricing table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tier</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {pricing.tiers.map((tier, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{tier.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tier.price}</td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{tier.description}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tier.for}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Feature lists */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pricing.tiers.map((tier, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900/60 border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5 md:p-6">
                <h4 className="font-medium text-gray-900 dark:text-white">{tier.name}</h4>
                <ul className="mt-3 pl-6 space-y-2 list-disc text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-400">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold text-sm px-3 py-1.5 shadow-md hover:from-green-700 hover:to-emerald-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Get Started
        </button>
      </div>
    </section>
  );
}
