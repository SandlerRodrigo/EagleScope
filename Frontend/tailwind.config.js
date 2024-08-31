import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-background': "url('./assets/login_bg.jpeg')", // Substitua '/path/to/your/image.jpg' pelo caminho da sua imagem
      }),
      colors: {
        'primary': '#4D3146', // Substitua '#yourColor' pela cor que você escolheu
      },
    },
  },
  plugins: [
    daisyui,
  ],
    daisyui: {
    themes: [{light : 
      {
        'primary': '#4D3146', // Substitua '#yourColor' pela cor que você escolheu
      },
    }],
  },
}