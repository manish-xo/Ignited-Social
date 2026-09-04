"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  max: number;
  placeholder: string;
  /** e.g. "@" or "#" — auto-prepended if the user doesn't type it themselves */
  prefix?: string;
  icon?: ReactNode;
}

export default function TagInput({
  values,
  onChange,
  max,
  placeholder,
  prefix,
  icon,
}: TagInputProps) {
  const [text, setText] = useState("");
  const atMax = values.length >= max;

  const addTag = () => {
    let value = text.trim();
    if (!value) return;
    if (prefix && !value.startsWith(prefix)) value = `${prefix}${value}`;

    const isDuplicate = values.some(
      (v) => v.toLowerCase() === value.toLowerCase(),
    );
    if (isDuplicate || atMax) {
      setText("");
      return;
    }
    onChange([...values, value]);
    setText("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((v) => v !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && text === "" && values.length > 0) {
      removeTag(values[values.length - 1]);
    }
  };

  return (
    <div>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={atMax ? `Limit reached (${max})` : placeholder}
          disabled={atMax}
          className={`w-full rounded-xl border border-action/50 bg-white py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 disabled:opacity-60 ${
            icon ? "pl-10 pr-3.5" : "px-3.5"
          }`}
        />
      </div>

      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-full bg-action-tint-bg px-3 py-1.5 text-sm font-medium text-action"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="text-action/70 hover:text-action"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-muted">
        {values.length}/{max}
      </p>
    </div>
  );
}
