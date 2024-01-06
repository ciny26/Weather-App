/** @type {import('tailwindcss').Config} */
module.exports = {
  //give the path where you want to use it 
  content: ["./public/index.html" , "./src/**/*.{vue,js,jsx}"],
  theme: {
    //define custom properties like putting colors that you use always
    //in variables
    extend: {
      colors:{
        "weather-color-primary" : "#00668A",
        "weather-color-secondly" : "#004E71",
      }
      },
      fontFamily:{
        roboto : "[Roboto , sans-serif]"
      },
      container:{
        padding: "2rem",
        center: true
      },
      screens:{
        sma:"480px",
        med:"760px"
      }
  },
  plugins: [],
}

