/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyberpunk: {
                    bg: '#0a0a0a',
                    card: '#0f172a',
                    blue: '#00f3ff',
                    green: '#00ff66',
                    purple: '#b026ff',
                    border: 'rgba(0, 243, 255, 0.2)',
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 243, 255, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 243, 255, 0.8), 0 0 30px rgba(0, 243, 255, 0.6)' },
                }
            }
        },
    },
    plugins: [],
}
