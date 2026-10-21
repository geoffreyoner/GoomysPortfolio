export const projects = [
    {
        id: "lumaattend",
        title: "LumaAttend",
        description: "Face recognition attendance that runs on your own machine. No cloud, no API keys, no internet needed. It logs check-in and check-out as people walk past, ships an admin dashboard with CSV export, and has a kiosk mode that scans on its own. The Liquid Glass UI is there because I wanted to try it.",
        repositoryUrl: "https://github.com/geoffreyoner/LumaAttend",
        demoUrl: "",
        technologies: ["Python", "Flask", "OpenCV", "SQLite", "JavaScript"],
        category: "Web App",
        status: "Active"
    },
    {
        id: "minecraft-hub",
        title: "Minecraft Utility Hub",
        description: "Minecraft Java tools in one place. Look up any player and spin their skin around in 3D, check PvP tier lists, grab modpack presets straight from Modrinth, and ask the AI chat when you're stuck. Flask backend, deployed on Vercel.",
        repositoryUrl: "https://github.com/geoffreyoner/Minecraft-Utility-Hub",
        demoUrl: "https://minecraft-utility-hub.vercel.app",
        technologies: ["Python", "Flask", "JavaScript", "Gemini API", "Vercel"],
        category: "Utility",
        status: "Active"
    },
    {
        id: "goomys-portfolio",
        title: "Goomys Portfolio",
        description: "This site. Neo-Brutalism, light/dark toggle, smooth scrolling, and a greeting that types itself out in a few languages. Plain HTML, CSS, and JS — no framework, no build step. Flask serves it.",
        repositoryUrl: "https://github.com/geoffreyoner/GoomysPortfolio",
        demoUrl: "https://goomys.biz.id",
        technologies: ["HTML/CSS", "JavaScript", "Flask", "Vercel"],
        category: "Website",
        status: "Active"
    }
];