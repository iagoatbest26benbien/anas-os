export interface Project {
  id: string;
  title: string;
  description: { en: string; fr: string };
  stack: string[];
  github?: string;
  live?: string;
  featured: boolean;
  highlights: { en: string[]; fr: string[] };
}

export const projects: Project[] = [
  {
    id: "facturia",
    title: "Facturia",
    description: {
      en: "Full SaaS invoicing platform with AI assistant, Stripe payments, and multi-template PDF generation.",
      fr: "Plateforme SaaS de facturation complète avec assistant IA, paiements Stripe et génération PDF multi-templates.",
    },
    stack: ["Next.js 15", "TypeScript", "Supabase", "Stripe Connect", "Claude API", "Tailwind CSS", "React PDF"],
    live: "https://factureia.com/",
    featured: true,
    highlights: {
      en: [
        "Production SaaS with real users",
        "AI tax assistant powered by Claude",
        "Stripe Connect for payment processing",
        "Multi-template PDF generation",
      ],
      fr: [
        "SaaS en production avec de vrais utilisateurs",
        "Assistant fiscal IA propulsé par Claude",
        "Stripe Connect pour le traitement des paiements",
        "Génération PDF multi-templates",
      ],
    },
  },
  {
    id: "hookrust",
    title: "HookRust",
    description: {
      en: "Self-hosted, single-binary webhook gateway with zero external dependencies.",
      fr: "Passerelle webhook auto-hébergée, binaire unique, zéro dépendance externe.",
    },
    stack: ["Rust", "Axum", "Tokio", "SQLite", "Docker", "Clap"],
    github: "https://github.com/iagoatbest26benbien/hookrust",
    featured: false,
    highlights: {
      en: [
        "HMAC signature validation",
        "Retry with exponential backoff",
        "Token bucket rate limiting",
        "Full REST API + CLI tool",
      ],
      fr: [
        "Validation de signature HMAC",
        "Retry avec backoff exponentiel",
        "Rate limiting par token bucket",
        "API REST complète + outil CLI",
      ],
    },
  },
  {
    id: "salle-de-marche",
    title: "Salle de Marché",
    description: {
      en: "Multi-agent AI trading bot analyzing financial news and executing trades autonomously.",
      fr: "Bot de trading IA multi-agents analysant les actualités financières et exécutant des trades de manière autonome.",
    },
    stack: ["Python", "Anthropic SDK", "AsyncIO", "Finnhub", "Alpaca", "React", "Docker"],
    github: "https://github.com/iagoatbest26benbien/salle-de-marche",
    featured: false,
    highlights: {
      en: [
        "7 autonomous AI agents",
        "Async pipeline < 90s per trade",
        "Risk management with auto-halt",
        "Real-time React dashboard",
      ],
      fr: [
        "7 agents IA autonomes",
        "Pipeline async < 90s par trade",
        "Gestion des risques avec arrêt automatique",
        "Dashboard React en temps réel",
      ],
    },
  },
  {
    id: "om-cv-pipeline",
    title: "OM CV Pipeline",
    description: {
      en: "Computer vision system for automated tactical analysis of football matches.",
      fr: "Système de vision par ordinateur pour l'analyse tactique automatisée de matchs de football.",
    },
    stack: ["Python", "YOLOv8", "OpenCV", "scikit-learn", "Next.js", "Supervision"],
    github: "https://github.com/iagoatbest26benbien/om-cv-pipeline",
    featured: false,
    highlights: {
      en: [
        "YOLO player detection & tracking",
        "Team separation by jersey color",
        "Homography 2D minimap projection",
        "Automatic formation detection",
      ],
      fr: [
        "Détection & tracking de joueurs YOLO",
        "Séparation d'équipes par couleur de maillot",
        "Projection minimap 2D par homographie",
        "Détection automatique de formation",
      ],
    },
  },
  {
    id: "mcp-context",
    title: "MCP Context Server",
    description: {
      en: "Developer tool for maintaining project context across Claude and IDE sessions.",
      fr: "Outil développeur pour maintenir le contexte projet entre les sessions Claude et IDE.",
    },
    stack: ["TypeScript", "Node.js", "MCP SDK", "Zod"],
    github: "https://github.com/iagoatbest26benbien/MCP-CONTEXT",
    featured: false,
    highlights: {
      en: [
        "Auto-scan project structure",
        "Technical decision tracking",
        "Persistent JSON storage",
        "MCP protocol compatible",
      ],
      fr: [
        "Scan automatique de la structure projet",
        "Suivi des décisions techniques",
        "Stockage JSON persistant",
        "Compatible protocole MCP",
      ],
    },
  },
];
