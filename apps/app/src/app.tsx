import { MetaProvider } from "@solidjs/meta"
import { Route, Router, Routes } from "@solidjs/router"
import type { Component } from "solid-js"
import ReaderPage from "./pages/reader"

const App: Component = () => {
  return (
    <MetaProvider>
      <Router>
        <Routes>
          <Route path="/reader/:id" component={ReaderPage} />
        </Routes>
      </Router>
    </MetaProvider>
  )
}

export default App
