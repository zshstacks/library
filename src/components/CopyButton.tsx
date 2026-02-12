"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute right-3 top-3 p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy code"
    >
      {copied ? (
        <FiCheck className="text-emerald-400" size={14} />
      ) : (
        <FiCopy className="text-white/50" size={14} />
      )}
    </button>
  );
}
