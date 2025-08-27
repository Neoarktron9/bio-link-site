export const config = {
  splash: {
    ascii: `
███████╗██╗███╗   ██╗ ██████╗ ██╗      ██╗   ██╗██╗   ██╗
██╔════╝██║████╗  ██║██╔════╝ ██║     ██║   ██║╚██╗ ██╔╝
███████╗██║██╔█╗ ██║██║  ███╗██║     ██║   ██║ ╚████╔╝ 
╚════██║██║██║╚██╗██║██║   ██║██║     ██║   ██║  ╚██╔╝  
███████╗██║██║ ╚████║╚██████╔╝███████╗╚██████╔╝   ██║  
╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   
            `,
    duration: 2500,
  },
  motd: [
    "------------------------------------",
    "Singularity: The Apology Build.",
    "All systems stable. All layouts functional.",
    "------------------------------------",
  ],
  terminal: {
    prompt_string: (user = "guest", host = "singularity") => `${user}@${host}:~$ `,
  },
  whoami: {
    name: "username",
    bio: ["A digital artisan.", "Specializing in full-stack development & creative coding."],
    status: "Online",
  },
  neofetch_ascii: `
        _______
       /  1212 \\
      /   1212  \\
     /    /  \\   \\
    /    /....\\   \\
   /    /      \\   \\
  /    /        \\   \\
 /____/          \\___\\
            `,
  themes: {
    matrix: 'theme-matrix',
    dracula: 'theme-dracula',
    nord: 'theme-nord',
    'solarized-light': 'theme-solarized-light',
    cyberpunk: 'theme-cyberpunk',
    retro: 'theme-retro',
    vaporwave: 'theme-vaporwave',
  },
  layouts: {
    default: 'layout-terminal',
    terminal: 'layout-terminal',
    minimal: 'layout-minimal',
    centered: 'layout-centered',
    desktop: 'layout-desktop',
    holographic: 'layout-holographic',
    multipanel: 'layout-multipanel',
    logstream: 'layout-logstream',
    grid: 'layout-grid',
    carousel: 'layout-carousel',
    codex: 'layout-codex',
    orb: 'layout-orb',
  },
  links: [
    { title: "GitHub", url: "#" },
    { title: "Twitter", url: "#" },
    { title: "Project A", url: "#" },
    { title: "Project B", url: "#" },
    { title: "Art", url: "#" },
    { title: "Contact", url: "mailto:" }
  ],
};

export type ThemeKey = keyof typeof config.themes;
export type LayoutKey = keyof typeof config.layouts;

export interface TerminalLine {
  type: 'output' | 'input';
  content: string;
  isHtml?: boolean;
}