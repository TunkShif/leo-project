import SideBar from "@/components/layout/side-bar"
import { Outlet } from "@solidjs/router"

const Layout = () => {
  return (
    <div class="flex">
      <SideBar />
      <div class="ml-64 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
