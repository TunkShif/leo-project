import Header from "@/components/layout/header"
import SideBar from "@/components/layout/side-bar"
import { Outlet } from "@solidjs/router"

const DefaultLayout = () => {
  return (
    <div class="flex">
      <SideBar />
      <div class="ml-64 w-full">
        <Header />
        <main class="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
