import Layout from "@/components/layout/layout"
import { BooksPage } from "@/pages/books"
import { BooksData } from "@/pages/books.data"
import { ReaderPage } from "@/pages/reader"
import { ReaderData } from "@/pages/reader.data"
import { MetaProvider } from "@solidjs/meta"
import { A, Route, Router, Routes } from "@solidjs/router"
import { Component } from "solid-js"

export const App: Component = () => {
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
            <Route path="/books" component={BooksPage} data={BooksData} />
          </Route>

          <Route path="/reader/:id" component={ReaderPage} data={ReaderData} />
        </Routes>
      </Router>
    </MetaProvider>
  )
}
