"use client";
import GradientBackground from "@/components/ui/GradientBackground";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { RiskPoint, riskPoints } from "@/data/pricing";
import DarkGradientSection from "@/components/ui/DarkGradientSection";

const RiskFree = () => {
  return (
    <DarkGradientSection>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 sm:p-14">
        <div className="eyebrow flex items-center justify-center mb-5">
          <CornerFrame className="">
            <p className="font-mono text-canvas uppercase text-xs">Rish Free</p>
          </CornerFrame>
        </div>
        <div className="heading text-center flex flex-col items-center justify-center text-canvas font-heading text-[8vw] sm:text-[8vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.88] tracking-tighter">
          {/* <span className="">Try it. If it  doesn&apos;t work,</span>
          <span>get your money back.</span> */}
          <span className="">Don't like it?</span>
          <span className="">Get your money back.</span>
        </div>

        <div className="subHeading">
          <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[300] tracking-wide text-action-on-dark sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
            No questions, no chasing, no “let me check with my manager.” One
            click and it’s done.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {riskPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="grid grid-rows-3 place-items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-action text-canvas">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-[500] tracking-normal text-xl text-canvas/90 text-center">
                  {point.title}
                </h3>
                <p className="text-md font-[300] tracking-wide sm:text-md text-placeholder text-center">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto w-full text-center mt-12 text-sm text-action-on-dark tracking-wide font-[300]">
          Hassle Free – automated refund process. No claim to file.
        </div>

        {/* <div className="mt-12 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full bg-action px-8 py-3 text-md font-[300] tracking-wide text-white transition-colors hover:bg-action-hover"
          >
            Get started risk-free
          </a>
        </div> */}
      </div>
    </DarkGradientSection>
  );
};

export default RiskFree;
