import { Outlet, useNavigate, Navigate } from "react-router"
import Cookies from "js-cookie"

const AuthLayout = () => {
  const navigate = useNavigate()

  const token = Cookies.get('jwtToken')

  if (token) {
    return <Navigate to="/" replace />
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-full flex flex-row items-center justify-between p-4">
          <h1 className="text-3xl font-medium">ShopKart</h1>
          {/* Need to connet to home page */}
          <button className="h-8 cursor-pointer text-slate-700 w-14 border-slate-700 rounded-sm border-1"
            onClick={() => navigate('/')}
          >
            Shop
          </button>
        </div>
        <div className="p-8 mt-40 bg-white rounded-md border-1 border-slate-200 flex flex-col w-1/2" >
          <Outlet />
        </div>
      </div>
    )
  }
}

export default AuthLayout