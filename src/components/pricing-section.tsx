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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricing.tiers.map((tier, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">{tier.name}</h4>
              <ul className="mt-2 pl-5 space-y-1.5 list-disc text-sm text-gray-700 dark:text-gray-300">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-400">{feature}</li>
                ))}
              </ul>
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
