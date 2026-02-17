export type Locale = "en" | "fr";

export const translations = {
  // System
  "system.loading": { en: "Loading portfolio...", fr: "Chargement du portfolio..." },
  "system.name": { en: "AnasOS", fr: "AnasOS" },
  "system.subtitle": { en: "Interactive Portfolio", fr: "Portfolio Interactif" },
  "system.settings": { en: "Settings", fr: "Paramètres" },
  "system.back": { en: "← Back", fr: "← Retour" },
  "system.wallpaper": { en: "Wallpaper", fr: "Fond d'écran" },
  "system.minimize": { en: "Minimize", fr: "Réduire" },
  "system.maximize": { en: "Maximize", fr: "Agrandir" },
  "system.restore": { en: "Restore", fr: "Restaurer" },
  "system.close": { en: "Close", fr: "Fermer" },
  "system.skipBoot": { en: "Click or press any key to skip", fr: "Cliquez ou appuyez pour passer" },

  // App titles
  "app.about": { en: "About", fr: "À propos" },
  "app.projects": { en: "Projects", fr: "Projets" },
  "app.terminal": { en: "Terminal", fr: "Terminal" },
  "app.skills": { en: "Skills", fr: "Compétences" },
  "app.contact": { en: "Contact", fr: "Contact" },
  "app.files": { en: "Files", fr: "Fichiers" },
  "app.pdf-viewer": { en: "PDF Viewer", fr: "Visionneuse PDF" },
  "app.browser": { en: "Browser", fr: "Navigateur" },
  "app.experience": { en: "Experience", fr: "Expérience" },

  // About
  "about.title": { en: "Anas El Manssouri", fr: "Anas El Manssouri" },
  "about.role": {
    en: "Junior Full-Stack Developer & DevOps",
    fr: "Développeur Full-Stack Junior & DevOps",
  },
  "about.location": { en: "Remote, Paris", fr: "Remote, Paris" },
  "about.bio.1": {
    en: "I'm a self-taught developer who went from zero to shipping production SaaS in under a year. At Craftmind.ai, I build full-stack applications end-to-end — from architecture and CI/CD to cloud deployment.",
    fr: "Développeur autodidacte passé de zéro à la mise en production de SaaS en moins d'un an. Chez Craftmind.ai, je construis des applications full-stack de bout en bout — de l'architecture et CI/CD au déploiement cloud.",
  },
  "about.bio.2": {
    en: "I love tackling hard problems: writing low-level Rust for performance, orchestrating multi-agent AI systems, or building computer vision pipelines. I'm currently pursuing a Bachelor in Web Development while working as a Full-Stack / DevOps Builder.",
    fr: "J'aime m'attaquer aux problèmes difficiles : écrire du Rust bas niveau pour la performance, orchestrer des systèmes IA multi-agents, ou construire des pipelines de vision par ordinateur. Je prépare actuellement un Bachelor en Développement Web tout en travaillant comme Full-Stack / DevOps Builder.",
  },
  "about.viewCv": { en: "View CV", fr: "Voir le CV" },
  "about.education": {
    en: "Currently pursuing a Bachelor in Web Development",
    fr: "Actuellement en Bachelor Développement Web",
  },
  "about.skipAnimation": { en: "Skip animation ▸", fr: "Passer l'animation ▸" },

  // Contact
  "contact.title": { en: "Get in Touch", fr: "Me contacter" },
  "contact.subtitle": {
    en: "I'm open to new opportunities. Feel free to reach out!",
    fr: "Je suis ouvert aux nouvelles opportunités. N'hésitez pas !",
  },
  "contact.email": { en: "Send an email", fr: "Envoyer un email" },
  "contact.cv.en": { en: "CV English", fr: "CV Anglais" },
  "contact.cv.fr": { en: "CV French", fr: "CV Français" },
  "contact.cv.alternance": { en: "CV Alternance", fr: "CV Alternance" },
  "contact.downloadCv": { en: "Download CVs", fr: "Télécharger les CVs" },

  // Projects
  "projects.all": { en: "All", fr: "Tout" },
  "projects.back": { en: "← Back", fr: "← Retour" },
  "projects.viewDemo": { en: "Live Demo", fr: "Voir le site" },
  "projects.viewGithub": { en: "GitHub", fr: "GitHub" },
  "projects.highlights": { en: "Highlights", fr: "Points clés" },
  "projects.featured": { en: "Featured", fr: "Mis en avant" },

  // Skills
  "skills.all": { en: "All", fr: "Toutes" },
  "skills.frontend": { en: "Frontend", fr: "Frontend" },
  "skills.backend": { en: "Backend", fr: "Backend" },
  "skills.devops": { en: "DevOps & Cloud", fr: "DevOps & Cloud" },
  "skills.ai": { en: "AI & ML", fr: "IA & ML" },
  "skills.databases": { en: "Databases", fr: "Bases de données" },
  "skills.tools": { en: "Tools", fr: "Outils" },

  // Experience
  "experience.role": {
    en: "Full-Stack / DevOps Builder",
    fr: "Full-Stack / DevOps Builder",
  },
  "experience.company": { en: "Craftmind.ai", fr: "Craftmind.ai" },
  "experience.period": { en: "Nov 2025 - Present", fr: "Nov 2025 - Présent" },
  "experience.location": { en: "Remote, Paris", fr: "Remote, Paris" },
  "experience.task.1": {
    en: "Ship production SaaS products end-to-end — from architecture design to cloud deployment",
    fr: "Livraison de produits SaaS en production de bout en bout — de la conception d'architecture au déploiement cloud",
  },
  "experience.task.2": {
    en: "Build technical foundations: CI/CD pipelines, infrastructure as code, monitoring",
    fr: "Construction des fondations techniques : pipelines CI/CD, infrastructure as code, monitoring",
  },
  "experience.task.3": {
    en: "Develop automation solutions for industrial clients",
    fr: "Développement de solutions d'automatisation pour des clients industriels",
  },
  "experience.task.4": {
    en: "Polyvalent role spanning frontend, backend, DevOps, and AI integration",
    fr: "Rôle polyvalent couvrant frontend, backend, DevOps et intégration IA",
  },

  // Terminal
  "terminal.welcome": {
    en: "AnasOS Terminal v1.0 — Type 'help' for the list of commands.",
    fr: "AnasOS Terminal v1.0 — Tapez 'help' pour la liste des commandes.",
  },
  "terminal.notFound": {
    en: "command not found: {cmd}. Type 'help' for help.",
    fr: "commande introuvable : {cmd}. Tapez 'help' pour l'aide.",
  },

  // File Manager
  "files.emptyFolder": { en: "Empty folder", fr: "Dossier vide" },

  // Browser
  "browser.placeholder": { en: "Enter a URL...", fr: "Entrez une URL..." },
  "browser.title": { en: "AnasOS Browser", fr: "Navigateur AnasOS" },

  // PDF
  "pdf.placeholder": { en: "PDF Viewer — Select a PDF to view", fr: "Visionneuse PDF — Sélectionnez un PDF" },

  // CTA
  "cta.hire": { en: "Hire Me", fr: "Recrutez-moi" },
  "cta.hireSubtitle": { en: "Open to opportunities", fr: "Ouvert aux opportunités" },

  // Context menu
  "context.open": { en: "Open", fr: "Ouvrir" },
  "context.rename": { en: "Rename", fr: "Renommer" },
  "context.hideFromDesktop": { en: "Remove from desktop", fr: "Retirer du bureau" },
  "context.showOnDesktop": { en: "Show on desktop", fr: "Afficher sur le bureau" },
  "context.resetLayout": { en: "Reset layout", fr: "Réinitialiser la disposition" },
  "context.changeWallpaper": { en: "Change wallpaper", fr: "Changer le fond d'écran" },
  "context.sortByName": { en: "Sort by name", fr: "Trier par nom" },

  // Misc
  "misc.download": { en: "Download", fr: "Télécharger" },
} as const;

export type TranslationKey = keyof typeof translations;
