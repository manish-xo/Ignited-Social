"use client";

import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface SuccessToastProps {
  title: string;
  description?: string;
}

export const showSuccessToast = ({ title, description }: SuccessToastProps) => {
  toast.custom(
    (t) => (
      <div
        className={`
          flex w-[360px] items-start gap-3 rounded-2xl
          border border-emerald-200
          bg-white px-4 py-3.5
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          font-sans
        `}
      >
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2
            size={17}
            strokeWidth={2.2}
            className="text-emerald-600"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[0.85rem] font-heading font-semibold tracking-[-0.01em] text-[#171717]">
            {title}
          </p>

          {description && (
            <p className="mt-0.5 text-[0.75rem] font-heading leading-5 text-[#737373]">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(t)}
          className="text-[#A3A3A3] transition-colors hover:text-[#525252]"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    ),
    {
      duration: 4000,
    },
  );
};
