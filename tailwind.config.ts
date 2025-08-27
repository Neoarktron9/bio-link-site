import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'fira-code': ['Fira Code', 'Courier New', 'monospace'],
        'press-start-2p': ['Press Start 2P', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom theme colors from the original CSS
        // Default (Matrix)
        'matrix-bg': '#0A0A0A',
        'matrix-output': '#33FF33',
        'matrix-input': '#FFFFFF',
        'matrix-prompt': '#33FF33',
        'matrix-header': '#33FF33',
        'matrix-link': '#FFFFFF',
        'matrix-link-hover': '#33FF33',
        'matrix-shadow': 'rgba(51,255,51,0.4)',
        'matrix-container-bg': 'rgba(0,0,0,0.3)',
        'matrix-container-border': '#33FF33',
        'matrix-window-header-bg': '#33FF33',
        'matrix-window-header-text': '#0A0A0A',

        // Dracula
        'dracula-bg': '#282a36',
        'dracula-output': '#f8f8f2',
        'dracula-input': '#f8f8f2',
        'dracula-prompt': '#50fa7b',
        'dracula-header': '#bd93f9',
        'dracula-link': '#f8f8f2',
        'dracula-link-hover': '#ff79c6',
        'dracula-shadow': 'rgba(189,147,249,0.3)',
        'dracula-container-bg': 'rgba(0,0,0,0.2)',
        'dracula-container-border': '#44475a',
        'dracula-window-header-bg': '#bd93f9',
        'dracula-window-header-text': '#f8f8f2',

        // Nord
        'nord-bg': '#2E3440',
        'nord-output': '#D8DEE9',
        'nord-input': '#ECEFF4',
        'nord-prompt': '#88C0D0',
        'nord-header': '#81A1C1',
        'nord-link': '#E5E9F0',
        'nord-link-hover': '#88C0D0',
        'nord-shadow': 'rgba(136,192,208,0.3)',
        'nord-container-bg': 'rgba(76,86,106,0.3)',
        'nord-container-border': '#4C566A',
        'nord-window-header-bg': '#81A1C1',
        'nord-window-header-text': '#2E3440',

        // Solarized Light
        'solarized-light-bg': '#fdf6e3',
        'solarized-light-output': '#586e75',
        'solarized-light-input': '#073642',
        'solarized-light-prompt': '#268bd2',
        'solarized-light-header': '#2aa198',
        'solarized-light-link': '#586e75',
        'solarized-light-link-hover': '#cb4b16',
        'solarized-light-shadow': 'rgba(42,161,152,0.3)',
        'solarized-light-container-bg': 'rgba(238,232,213,0.5)',
        'solarized-light-container-border': '#93a1a1',
        'solarized-light-window-header-bg': '#2aa198',
        'solarized-light-window-header-text': '#fdf6e3',

        // Cyberpunk
        'cyberpunk-bg': '#0d0221',
        'cyberpunk-output': '#f0f',
        'cyberpunk-input': '#fff',
        'cyberpunk-prompt': '#0ff',
        'cyberpunk-header': '#ff0',
        'cyberpunk-link': '#fff',
        'cyberpunk-link-hover': '#0ff',
        'cyberpunk-shadow': 'rgba(255,0,255,0.4)',
        'cyberpunk-container-bg': 'rgba(2,12,46,0.4)',
        'cyberpunk-container-border': '#f0f',
        'cyberpunk-window-header-bg': '#0ff',
        'cyberpunk-window-header-text': '#0d0221',

        // Retro
        'retro-bg': '#000',
        'retro-output': '#f0a000',
        'retro-input': '#f0a000',
        'retro-prompt': '#f0a000',
        'retro-header': '#f0a000',
        'retro-link': '#f0a000',
        'retro-link-hover': '#fff',
        'retro-shadow': 'rgba(240,160,0,0.3)',
        'retro-container-bg': 'rgba(10,10,10,0.3)',
        'retro-container-border': '#f0a000',
        'retro-window-header-bg': '#f0a000',
        'retro-window-header-text': '#000',

        // Vaporwave
        'vaporwave-bg': '#1a0e2a',
        'vaporwave-output': '#ff71ce',
        'vaporwave-input': '#fff',
        'vaporwave-prompt': '#0ff',
        'vaporwave-header': '#ff71ce',
        'vaporwave-link': '#fff',
        'vaporwave-link-hover': '#0ff',
        'vaporwave-shadow': 'rgba(0,255,255,0.4)',
        'vaporwave-container-bg': 'rgba(42,1,53,0.4)',
        'vaporwave-container-border': '#ff71ce',
        'vaporwave-window-header-bg': '#0ff',
        'vaporwave-window-header-text': '#1a0e2a',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        blink: {
          "50%": { backgroundColor: "transparent" },
        },
        fade: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        spin: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "80%": { transform: "translate(3px, -3px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blink: "blink 1s step-end infinite",
        fade: "fade 0.5s ease",
        spin: "spin 20s infinite linear",
        glitch: "glitch 5s infinite alternate-reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;