import { useState } from 'react';

interface PricingTier {
  title: string;
  basePrice: {
    monthly: number;
    annually: number;
  };
  features: string[];
  href: string;
  cta: string;
}

interface PricingData {
  title: string;
  tiers: PricingTier[];
}

const pricingData: PricingData = {
  title: "Our Pricing",
  tiers: [
    {
      title: "Starter",
      basePrice: {
        monthly: 0,
        annually: 0,
      },
      features: ["Email Support", "API access", "Plugin", "30k monthly requests"],
      href: "https://app.crawlora.com?cta=main_starter",
      cta: "Get Started",
    },
    {
      title: "Premium",
      basePrice: {
        monthly: 999,
        annually: 9990,
      },
      features: ["Premium Email Support", "API access", "Unlimited requests", "Fast and reliable web proxy"],
      href: "https://form.jotform.com/241921441318047?cta=main_starter",
      cta: "Get Premium",
    },
    {
      title: "Enterprise",
      basePrice: {
        monthly: 0,
        annually: 0,
      },
      features: ["Premium Email Support", "API access", "Unlimited requests", "Fast and reliable web proxy"],
      href: "https://form.jotform.com/241921441318047?cta=main_starter",
      cta: "Get Enterprise",
    },
  ],
};

type BillingCycle = 'monthly' | 'annually';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [activeUsers, setActiveUsers] = useState<number>(10);

  const milestones = [10, 50, 100, 200, 300];

  const handleCycleChange = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
  };

  const determineTierHighlight = () => {
    if (activeUsers <= milestones[0]) return 0;
    if (activeUsers <= milestones[3]) return 1;
    return 2;
  };

  const highlightedTier = determineTierHighlight();

  const calculateDynamicPrice = (tier: PricingTier): string => {
    if (tier.title === "Enterprise") return "Let's Talk";
    if (tier.title === "Starter") return "Free";

    const basePrice = billingCycle === 'monthly' ? tier.basePrice.monthly : tier.basePrice.annually;
    const userMultiplier = activeUsers > 50 ? activeUsers / 50 : 1; 
    const dynamicPrice = basePrice * userMultiplier;

    return `$${dynamicPrice.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col items-center p-10 mb-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10">{pricingData.title}</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => handleCycleChange('monthly')}
        >
          Monthly Billing
        </button>
        <button
          className={`px-4 py-2 rounded ${billingCycle === 'annually' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => handleCycleChange('annually')}
        >
          Annual Billing
        </button>
      </div>

      <div className="w-full max-w-lg mb-10">
        <label className="block text-center text-lg font-medium mb-2">
          Total Requests: {activeUsers}k{activeUsers === 300 ? "+" : ""}
        </label>
        <input
          type="range"
          min={10}
          max={300}
          step={10}
          value={activeUsers}
          onChange={(e) => setActiveUsers(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          {milestones.map((milestone, i) => (
            <span key={i} className={`${activeUsers === milestone ? 'font-bold text-gray-900' : ''}`}>
              {milestone}k{milestone === 300 ? "+" : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {pricingData.tiers.map((tier, index) =>
          highlightedTier === index ? (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center border-4 border-blue-600"
            >
              <h2 className="text-2xl font-semibold mb-4">{tier.title}</h2>
              <p className="mb-6 text-gray-600">{tier.features.join(", ")}</p>
              <div className="text-3xl font-bold mb-4">{calculateDynamicPrice(tier)}</div>
              <ul className="text-gray-600 mb-6 space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <a
                href={tier.href}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {tier.cta}
              </a>
            </div>
          ) : null 
        )}
      </div>
    </div>
  );
};

export default PricingPage;
