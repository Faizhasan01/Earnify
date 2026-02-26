/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: 'var(--bg-main)',
                hero: 'var(--bg-hero)',
                card: 'var(--bg-card)',
                border: 'var(--color-border)',
                primary: 'var(--color-primary)',
                accent: 'var(--color-accent)',
            }
        },
    },
    plugins: [],
}
