import ReaderPage from "@/pages/reader"
import { MetaProvider } from "@solidjs/meta"
import { Route, Router, Routes } from "@solidjs/router"
import type { Component } from "solid-js"

const App: Component = () => {
  return (
    <MetaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<h1>home</h1>} />
          <Route path="/reader/:id" component={ReaderPage} />
        </Routes>
      </Router>
    </MetaProvider>
  )
}

export default App
