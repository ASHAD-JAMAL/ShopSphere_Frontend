import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  // ------------------------logout logic start------------------------
  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  console.log("context add to cart count", context);
  // ------------------------logout logic end-------------------------

  return (
    <>
      <header className="h-16 shadow-md bg-white fixed w-full z-40">
        <div className="h-full container mx-auto flex items-center px-4 justify-between">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
            <input
              type="text"
              placeholder="search products here..."
              className="w-full outline-none"
            />
            <div className="text-lg min-w-[50px] h-8 bg-[#f5f5f6] flex items-center justify-center rounded-r-full cursor-pointer">
              <GrSearch />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <div className="relative flex justify-center">
              {user?._id && (
                <div
                  className="text-3xl cursor-pointer relative flex justify-center "
                  onClick={() => setMenuDisplay((preve) => !preve)}
                >
                  {user?.profilepic ? (
                    <img
                      src={user?.profilepic}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaRegUserCircle />
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shaddow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-pannel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((preve) => !preve)}
                      >
                        Admin Pannel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            
              {/* cart product count display on ui  */}
            {user?._id && (
              <div className="text-3xl cursor-pointer relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-[#f16565] text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{context?.cartProductsCount}</p>
                </div>
              </div>
            )}
            <div>
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-full text-white bg-[#f16565] hover:bg-[#f34b4b]"
                >
                  LogOut
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-full text-white bg-[#f16565] hover:bg-[#f34b4b]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
