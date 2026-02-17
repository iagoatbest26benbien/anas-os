export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "ai"
  | "databases"
  | "tools";

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Framer Motion", level: 75, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "Rust", level: 65, category: "backend" },
  { name: "REST APIs", level: 85, category: "backend" },

  // DevOps & Cloud
  { name: "Docker", level: 75, category: "devops" },
  { name: "AWS", level: 60, category: "devops" },
  { name: "Terraform", level: 55, category: "devops" },
  { name: "GitHub Actions", level: 80, category: "devops" },
  { name: "Linux", level: 75, category: "devops" },

  // AI & ML
  { name: "Claude API", level: 85, category: "ai" },
  { name: "OpenCV", level: 70, category: "ai" },
  { name: "YOLOv8", level: 65, category: "ai" },
  { name: "LLM Orchestration", level: 75, category: "ai" },

  // Databases
  { name: "Supabase", level: 85, category: "databases" },
  { name: "PostgreSQL", level: 75, category: "databases" },
  { name: "SQLite", level: 70, category: "databases" },
  { name: "Redis", level: 55, category: "databases" },

  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Figma", level: 65, category: "tools" },
  { name: "Stripe", level: 70, category: "tools" },
];

export const categoryKeys: SkillCategory[] = [
  "frontend",
  "backend",
  "devops",
  "ai",
  "databases",
  "tools",
];
