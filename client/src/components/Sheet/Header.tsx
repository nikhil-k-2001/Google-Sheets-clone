// import { ChangeEvent } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { useSheet } from "@/hooks/useSheet";
// import Avatar from "@/components/Avatar";
// import useTitle from "@/hooks/useTitle";
// import { debounce, getStaticUrl } from "@/utils";

// const Header = () => {
//   const { user, logout } = useAuth();

//   const { sheetDetail, handleTitleChange } = useSheet();

//   useTitle(sheetDetail?.title);

//   const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
//     handleTitleChange(event.target.innerText);
//   }, 500);

//   return (
//     <div className="flex justify-between items-center h-[var(--header-height)] px-4">
//       <div className="flex items-center gap-2">
//         <Link to="/sheet/list">
//           <img
//             className="w-12 h-12 cursor-pointer"
//             src={getStaticUrl("/logo.png")}
//           />
//         </Link>
//         <div
//           className="text-dark-gray font-medium text-lg w-fit outline outline-1 outline-transparent hover:outline-dark-gray rounded-sm focus:outline-2 focus:outline-dark-blue px-2"
//           dangerouslySetInnerHTML={{ __html: sheetDetail?.title || "" }}
//           onInput={handleChange}
//           contentEditable
//         ></div>
//       </div>
//       {user && <Avatar user={user} logout={logout} />}
//     </div>
//   );
// };

// export default Header;

import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSheet } from "@/hooks/useSheet";
import Avatar from "@/components/Avatar";
import useTitle from "@/hooks/useTitle";
import { debounce } from "@/utils";

const Header = () => {
  const { user, logout } = useAuth();
  const { sheetDetail, handleTitleChange } = useSheet();

  useTitle(sheetDetail?.title);

  // ✅ Debounce input changes to avoid excessive re-renders
  const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    handleTitleChange(event.target.value);
  }, 500);

  return (
    <div className="flex justify-between items-center h-[var(--header-height)] px-4">
      <div className="flex items-center gap-2">
        <Link to="/sheet/list">
          <img className="w-12 h-12 cursor-pointer" src="/logo.png" alt="Logo" />
        </Link>
        {/* ✅ Replaced `contentEditable` with a controlled input */}
        <input
          className="text-dark-gray font-medium text-lg w-fit outline outline-1 outline-transparent hover:outline-dark-gray rounded-sm focus:outline-2 focus:outline-dark-blue px-2"
          type="text"
          value={sheetDetail?.title || ""}
          onChange={handleChange}
        />
      </div>
      {user && <Avatar user={user} logout={logout} />}
    </div>
  );
};

export default Header;
