/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    
  ],
  theme: {
    extend: {


      boxShadow: {
        neumorphism: '10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [],
}

