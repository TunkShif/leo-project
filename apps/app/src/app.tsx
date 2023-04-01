import Layout from "@/components/layout/layout"
import BooksPage from "@/pages/books"
import ReaderPage from "@/pages/reader"
import { MetaProvider } from "@solidjs/meta"
import { A, Route, Router, Routes } from "@solidjs/router"
import type { Component } from "solid-js"

const App: Component = () => {
  return (
    <MetaProvider>
      <Router>
        <Routes>
          <Route path="/" component={Layout}>
            <Route
              path="/"
              element={
                <>
                  <h1>home</h1>
                  <A href="/reader/test">book</A>
                </>
              }
            />
            <Route path="/books" component={BooksPage} />
          </Route>

          <Route path="/reader/:id" component={ReaderPage} />
        </Routes>
      </Router>
    </MetaProvider>
  )
}

export default App
