import "../src/index.css"

const preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "white", value: "#ffffff" },
        { name: "slate", value: "#0f172a" }
      ]
    },
    darkMode: {
      stylePreview: true,
      classTarget: "html",
      darkClass: "dark"
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
