import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";
export default function NavBar({ route }: { route: string }) {
  return (
    <div className="wrapper">
      {/* <div class="page">Body</div> */}
      <div className="bottom-appbar">
        <div className="tabs">
          <Link
            href={"/home"}
            className={`tab  tab--left  ${
              route === "home" ? "text-green-500" : "text-black "
            }`}
          >
            <AiFillHome />
          </Link>
          <div className="tab tab--fab">
            <div className="top cursor-pointer">
              <Link className={`fab `} href={`/Found`}>
                <BiQrScan size={35} />
              </Link>
            </div>
          </div>
          <Link
            href={"/user"}
            className={`tab tab--right ${
              route === "user" ? "text-green-500" : ""
            }`}
          >
            <FaUser
              className={`${route == "user" ? "text-primary" : "text-black"}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
