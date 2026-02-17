"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocaleStore } from "@/stores/localeStore";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills, categoryKeys } from "@/data/skills";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

function getCommands(locale: "en" | "fr"): Record<string, (args: string[]) => string> {
  return {
    help: () =>
      locale === "fr"
        ? `Commandes disponibles:
  whoami      — Qui suis-je ?
  ls          — Lister les fichiers
  cat         — Lire un fichier
  neofetch    — Infos système
  clear       — Effacer le terminal
  skills      — Mes compétences
  projects    — Mes projets
  experience  — Mon expérience
  contact     — Me contacter
  sudo        — Mode admin...`
        : `Available commands:
  whoami      — Who am I?
  ls          — List files
  cat         — Read a file
  neofetch    — System info
  clear       — Clear terminal
  skills      — My skills
  projects    — My projects
  experience  — My experience
  contact     — Contact me
  sudo        — Admin mode...`,

    whoami: () =>
      locale === "fr"
        ? "anas — Développeur Full-Stack Junior & DevOps @ Craftmind.ai"
        : "anas — Junior Full-Stack Developer & DevOps @ Craftmind.ai",

    ls: () => `Bureau/
Projets/
Documents/
resume-junior-en.pdf
resume-junior-fr.pdf
resume-alternance.pdf
README.md
.secret`,

    neofetch: () => `
  ╔══════════════════════════╗
  ║       AnasOS v1.0        ║
  ╠══════════════════════════╣
  ║  OS: AnasOS              ║
  ║  Host: Portfolio         ║
  ║  Shell: AnasShell        ║
  ║  Theme: Dark             ║
  ║  CPU: Next.js 16         ║
  ║  GPU: Framer Motion      ║
  ║  RAM: Zustand            ║
  ║  Lang: TypeScript        ║
  ║  Infra: Docker + AWS     ║
  ╚══════════════════════════╝`,

    skills: () => {
      const grouped: Record<string, string[]> = {};
      for (const s of skills) {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push(s.name);
      }
      return categoryKeys
        .map((cat) => `${cat.toUpperCase().padEnd(12)} ${(grouped[cat] || []).join(", ")}`)
        .join("\n");
    },

    projects: () =>
      projects
        .map(
          (p, i) =>
            `${i + 1}. ${p.title}${p.featured ? " ★" : ""}\n   ${p.description[locale]}`
        )
        .join("\n\n"),

    experience: () =>
      locale === "fr"
        ? `💼 Full-Stack / DevOps Builder @ Craftmind.ai
📅 Nov 2025 - Présent | 📍 Remote, Paris

• Livraison de SaaS en production de bout en bout
• CI/CD pipelines, infrastructure as code, monitoring
• Solutions d'automatisation pour clients industriels
• Rôle polyvalent : frontend, backend, DevOps, IA`
        : `💼 Full-Stack / DevOps Builder @ Craftmind.ai
📅 Nov 2025 - Present | 📍 Remote, Paris

• Ship production SaaS products end-to-end
• CI/CD pipelines, infrastructure as code, monitoring
• Automation solutions for industrial clients
• Polyvalent role: frontend, backend, DevOps, AI`,

    contact: () => `Email:    ${profile.email}
GitHub:   github.com/iagoatbest26benbien
LinkedIn: linkedin.com/in/anas-el-manssouri-268a35295`,

    cat: (args) => {
      const file = args[0];
      if (!file) return locale === "fr" ? "usage: cat <fichier>" : "usage: cat <file>";
      if (file === "README.md")
        return locale === "fr"
          ? "# AnasOS\nPortfolio interactif d'Anas El Manssouri.\nConstruit avec Next.js, TypeScript, Tailwind CSS, Framer Motion & Zustand."
          : "# AnasOS\nInteractive portfolio by Anas El Manssouri.\nBuilt with Next.js, TypeScript, Tailwind CSS, Framer Motion & Zustand.";
      if (file === ".secret")
        return locale === "fr"
          ? "🤫 Vous êtes curieux... J'aime ça ! Essayez 'sudo hire-anas'"
          : "🤫 You're curious... I like that! Try 'sudo hire-anas'";
      return locale === "fr"
        ? `cat: ${file}: Aucun fichier de ce type`
        : `cat: ${file}: No such file`;
    },

    clear: () => "__CLEAR__",
  };
}

export default function TerminalApp() {
  const locale = useLocaleStore((s) => s.locale);
  const t = useLocaleStore((s) => s.t);

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update welcome message on locale change
  useEffect(() => {
    setLines([{ type: "output", content: t("terminal.welcome") }]);
  }, [locale, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      const [command, ...args] = trimmed.split(" ");
      const lowerCmd = command.toLowerCase();
      const commands = getCommands(locale);

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", content: `anas@portfolio:~$ ${trimmed}` },
      ];

      if (lowerCmd === "clear") {
        setLines([]);
        return;
      }

      if (lowerCmd === "sudo" && args.join(" ") === "hire-anas") {
        newLines.push({
          type: "output",
          content:
            locale === "fr"
              ? "🎉 Félicitations ! Vous avez trouvé l'easter egg. Contactez-moi à anaselmanssouri479@gmail.com !"
              : "🎉 Congratulations! You found the easter egg. Contact me at anaselmanssouri479@gmail.com!",
        });
      } else if (commands[lowerCmd]) {
        const output = commands[lowerCmd](args);
        newLines.push({ type: "output", content: output });
      } else {
        newLines.push({
          type: "error",
          content: t("terminal.notFound", { cmd: command }),
        });
      }

      setLines(newLines);
    },
    [lines, locale, t]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = getCommands(locale);
      const match = Object.keys(commands).find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="h-full bg-black text-green-400 font-mono text-sm p-3 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-0.5">
          {line.type === "input" ? (
            <span className="text-green-300">{line.content}</span>
          ) : line.type === "error" ? (
            <span className="text-red-400">{line.content}</span>
          ) : (
            <span className="text-neutral-300">{line.content}</span>
          )}
        </div>
      ))}

      <div className="flex items-center">
        <span className="text-green-300 mr-2">anas@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          autoFocus
          spellCheck={false}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
