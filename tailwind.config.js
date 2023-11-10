/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        /* brown background with white text */
        mainBackgroundColor: 'rgb(62,23,11)', 
        mainTextColor: 'white',
        /* light gray background whith black text */
        secondBackgroundColor: 'rgb(200,200,200)',
        secondTextColor: 'black',
        /* nav style : white background with black text */
        navStyleBackground : 'white',
        navStyleText : 'black',
        /* article background */
        articleBackground : 'white',
        articleText: 'black',
      },
    },
  },
  plugins: [],
}

