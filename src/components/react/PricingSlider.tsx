import { ZApiResponseSchema, ZPlanSchema } from "@/api/types/pricing";
import type { LandingPageData } from "@/config/landing.interface";
import { getLandingData } from "@/services/data.service";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import type { z } from "zod";

type BillingCycle = "monthly" | "annually";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [activeTier, setActiveTier] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [pricingDetails, setPricingDetails] = useState<
    z.infer<typeof ZApiResponseSchema>["data"]
  >([]);
  const [landingInfo, setLandingInfo] = useState<LandingPageData | null>(null);

  const milestones = [0, 850];
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

  useEffect(() => {
    const fetchLandingData = async () => {
      const data = await getLandingData();
      setLandingInfo(data);
    };
    fetchLandingData();
  }, []);

  const getPricingDetails = useCallback(async () => {
    try {
      const { data } = await axios.get<z.infer<typeof ZApiResponseSchema>>(
        `https://17d5-2401-4900-1c02-15e6-9afc-d0-b692-6bb3.ngrok-free.app/api/v1/pricing/plans?billingCycle=${billingCycle}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        },
      );
      setPricingDetails(ZApiResponseSchema.parse(data)["data"]);
    } catch (err) {
      console.error(err);
    }
  }, [billingCycle]);

  useEffect(() => {
    getPricingDetails();
  }, [getPricingDetails]);

  const getPlanByMinutes = (activeTier: number) => {
    if (activeTier === 850) {
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

    const index = activeTier / 50;
    return pricingDetails[index] || defaultPlan;
  };

  const handleHover = (e: React.MouseEvent<HTMLInputElement>) => {
    setHoverValue(Number(e.currentTarget.value));
  };

  const handleMouseLeave = () => setHoverValue(null);

  const activePricingTier = getPlanByMinutes(activeTier);

  return (
    <div className="flex flex-col items-center p-10 mb-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">Our Pricing</h1>

      <div className="flex space-x-4 mb-8">
        {["monthly", "annually"].map((cycle) => (
          <button
            key={cycle}
            className={`px-4 py-2 rounded ${
              billingCycle === cycle
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setBillingCycle(cycle as BillingCycle)}
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)} Billing
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg mb-10 relative">
        <label className="block text-center text-lg font-medium mb-2">
          Total Seconds:{" "}
          {activePricingTier.planAccessRights[0]?.access?.seconds_limit || 0}
        </label>
        <input
          type="range"
          min={milestones[0]}
          max={milestones[milestones.length - 1]}
          step={50}
          value={activeTier}
          onChange={(e) => setActiveTier(Number(e.target.value))}
          onMouseMove={handleHover}
          onMouseLeave={handleMouseLeave}
          className="w-full cursor-pointer appearance-none bg-gray-300 h-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${
              (activeTier / 850) * 100
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
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border-4 border-blue-600 max-w-lg mx-auto break-words">
          <h2 className="text-2xl font-semibold mb-4">
            {activePricingTier?.title || "-"}
          </h2>
          <p className="mb-6 text-gray-600">
            {activePricingTier?.description || "-"}
          </p>
          <div className="text-3xl font-bold mb-4">
            {activePricingTier.currency}
            {activePricingTier.amount}
          </div>
          <ul className="text-gray-600 mb-6 space-y-2">
            <li>Email Support</li>
            <li>API Access</li>
            <li>Plugin</li>
          </ul>
          <a
            href={`${landingInfo?.meta.ldJson.url}?current-plan=${activePricingTier?.title}`}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {`Get ${activePricingTier?.title}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
