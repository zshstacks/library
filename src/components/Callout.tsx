import { ReactNode } from "react";

interface CalloutProps {
  type?: "tip" | "warning" | "note";
  children: ReactNode;
}

const CALLOUT_STYLES = {
  tip: {
    border: "border-[#81e6d9]/30",
    bg: "bg-[#81e6d9]/6 dark:bg-[#81e6d9]/16",
    icon: "💡",
    label: "Tip",
    labelColor: "text-[#81e6d9]",
  },
  warning: {
    border: "border-amber-400/30",
    bg: "bg-amber-400/6 dark:bg-amber-600/6",
    icon: "⚠️",
    label: "Warning",
    labelColor: "text-amber-400 dark:text-amber-700",
  },
  note: {
    border: "border-white/15",
    bg: "bg-white/4 dark:bg-amber-400/6",
    icon: "📌",
    label: "Note",
    labelColor: "text-white/60 dark:text-[#4b525b]",
  },
};

export function Callout({ type = "note", children }: CalloutProps) {
  const s = CALLOUT_STYLES[type];
  return (
    <div className={`my-6 rounded-lg border ${s.border} ${s.bg} px-4 py-3`}>
      <div
        className={`flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider mb-1.5 ${s.labelColor}`}
      >
        <span>{s.icon}</span>
        <span>{s.label}</span>
      </div>
      <div className="text-[13.5px] text-white/65 dark:text-gray-700/70 leading-relaxed [&_code]:text-[#81e6d9] dark:[&_code]:text-[#319795] [&_code]:bg-white/8 dark:[&_code]:bg-black/8 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-[12.5px]">
        {children}
      </div>
    </div>
  );
}
