import "../src/index.css"

const preview = {
  parameters: {
    backgrounds: {
      default: "light"
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
