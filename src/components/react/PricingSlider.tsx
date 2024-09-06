import { ZApiResponseSchema, ZPlanSchema } from "@/api/types/pricing";
import axios from "axios";
import React, { useEffect, useState } from "react";
import type { z } from "zod";
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
      features: ["Email Support", "API access", "Plugin"],
      href: "https://crawlora.com?plan=starter",
      cta: "Get Started",
    },
    {
      title: "Premium",
      basePrice: {
        monthly: 999,
        annually: 9990,
      },
      features: [
        "Premium Email Support",
        "API access",
        "Unlimited seconds",
        "Fast and reliable web proxy",
      ],
      href: "https://crawlora.com?plan=premium",
      cta: "Get Premium",
    },
    {
      title: "Enterprise",
      basePrice: {
        monthly: 0,
        annually: 0,
      },
      features: [
        "Premium Email Support",
        "API access",
        "Unlimited requests",
        "Fast and reliable web proxy",
      ],
      href: "https://crawlora.com?plan=enterprise",
      cta: "Get Enterprise",
    },
  ],
};

type BillingCycle = "monthly" | "annually";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [activeUsers, setActiveUsers] = useState<number>(0);
  console.log("activeUsers:", activeUsers);
  const [hoverValue, setHoverValue] = useState<number>(0);
  console.log("hoverValue:", hoverValue);
  const [pricingDetails, setPricingDetails] = useState<
    z.infer<typeof ZApiResponseSchema>["data"]
  >([]);
  //   const [loading, setLoading] = useState(true);

  console.log("pricingDetails:", pricingDetails);
  const milestones = [0, 850];
  const handleCycleChange = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
  };

  const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPlan = "basic";
        const { data } = await axios.get<z.infer<typeof ZApiResponseSchema>>(
          `https://420b-2401-4900-1c02-15e6-cc6b-b377-c38d-be8.ngrok-free.app/api/v1/pricing/plans?billingCycle=${billingCycle}&currentPlan=${currentPlan}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "1",
            },
          },
        );
        setPricingDetails(ZApiResponseSchema.parse(data)["data"]);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [billingCycle]);

  const getPlanByMinutes = (activeUsers: number) => {
    if (activeUsers === 850) {
      return {
        id: "",
        created_at: "",
        title: "Enterprise",
        description: "Premium Email Support, Unlimited requests",
        amount: "Let's Talk",
        currency: "",
        deleted_at: null,
        planAccessRights: [],
      };
    }

    const index = activeUsers / 50;
    if (index < pricingDetails.length) {
      return pricingDetails[index];
    }
  };

  const defaultPlan: z.infer<typeof ZPlanSchema> = {
    id: "",
    created_at: "",
    title: "",
    description: "",
    amount: 0,
    currency: "",
    deleted_at: null,
    planAccessRights: [],
  };

  const result = getPlanByMinutes(activeUsers) ?? defaultPlan;

  return (
    <div className="flex flex-col items-center p-10 mb-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">{pricingData.title}</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            billingCycle === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleCycleChange("monthly")}
        >
          Monthly Billing
        </button>
        <button
          className={`px-4 py-2 rounded ${
            billingCycle === "annually"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleCycleChange("annually")}
        >
          Annual Billing
        </button>
      </div>

      <div className="w-full max-w-lg mb-10 relative">
        <label className="block text-center text-lg font-medium mb-2">
          Total Seconds:{" "}
          {result.planAccessRights[0]?.access?.seconds_limit || 0}
        </label>
        <input
          type="range"
          min={milestones[0]}
          max={milestones[milestones.length - 1]}
          step={50}
          value={activeUsers}
          onChange={(e) => setActiveUsers(Number(e.target.value))}
          onMouseMove={handleHover}
          onMouseLeave={handleMouseLeave}
          className="w-full cursor-pointer appearance-none bg-gray-300 h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${
              (activeUsers / 850) * 100
            }%, #e5e7eb 0%)`,
          }}
        />
        <div className="relative text-sm text-gray-500 mt-2">
          {hoverValue !== null && (
            <div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-md font-semibold bg-white shadow-lg rounded-md p-2 border w-24 text-center"
              style={{ left: `${(hoverValue / 850) * 100}%` }}
            >
              {hoverValue}k{hoverValue === 850 ? "+" : ""}
            </div>
          )}
          <div className="flex justify-between mt-4">
            {milestones.map((milestone) => (
              <span key={milestone}>
                {milestone}k{milestone === 850 ? "+" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-4 border-blue-600">
          <h2 className="text-2xl font-semibold mb-4">
            {result?.title || "-"}
          </h2>
          <p className="mb-6 text-gray-600"> {result?.description || "-"}</p>
          <div className="text-3xl font-bold mb-4">
            {result.currency}
            {result.amount}
          </div>
          <ul className="text-gray-600 mb-6 space-y-2">
            <li>Email Support</li>
            <li>API access</li>
            <li>Plugin</li>
          </ul>

          <a
            href={`https://app.crawlora.com/en/login?current-plan=${result?.title}`}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {`Get ${result?.title}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
