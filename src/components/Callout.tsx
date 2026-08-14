import { ReactNode } from "react";

interface CalloutProps {
  type?: "tip" | "warning" | "note";
  children: ReactNode;
}

const CALLOUT_STYLES = {
  tip: {
    border: "border-[#81e6d9]/30 dark:border-[#2c7a7b]/30",
    bg: "bg-[#81e6d9]/5 dark:bg-[#2c7a7b]/10",
    icon: "💡",
    label: "Tip",
    labelColor: "text-[#81e6d9] dark:text-[#2c7a7b]",
  },
  warning: {
    border: "border-[#ff63c3]/30 dark:border-indigo-400/30",
    bg: "bg-[#ff63c3]/5 dark:bg-indigo-400/10",
    icon: "⚠️",
    label: "Warning",
    labelColor: "text-[#ff63c3] dark:text-indigo-400",
  },
  note: {
    border: "border-white/15 dark:border-gray-800/20",
    bg: "bg-white/4 dark:bg-white/10",
    icon: "📌",
    label: "Note",
    labelColor: "text-white/60 dark:text-gray-800/70",
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
      <div className="text-[13.5px] text-white/65 dark:text-gray-700/70 leading-relaxed [&_code]:text-[#81e6d9] dark:[&_code]:text-[#2c7a7b] [&_code]:bg-white/8 dark:[&_code]:bg-black/8 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-[12.5px]">
        {children}
      </div>
    </div>
  );
}
