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


import { ChangeEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSheet } from "@/hooks/useSheet";
import Avatar from "@/components/Avatar";
import useTitle from "@/hooks/useTitle";
import { debounce } from "@/utils"; // Removed getStaticUrl since logo is fixed

const Header = () => {
  const { user, logout } = useAuth();
  const { sheetDetail, handleTitleChange } = useSheet();
  
  useTitle(sheetDetail?.title);

  const titleRef = useRef<HTMLDivElement>(null); // ✅ Reference to filename div

  const handleChange = debounce(() => {
    if (!titleRef.current) return;

    // ✅ Save cursor position
    const selection = window.getSelection();
    const cursorPosition = selection?.getRangeAt(0).startOffset || 0;

    // ✅ Update title
    handleTitleChange(titleRef.current.innerText);

    // ✅ Restore cursor position after state updates
    setTimeout(() => {
      if (selection && titleRef.current) {
        const range = document.createRange();
        range.setStart(titleRef.current.childNodes[0], cursorPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, 0);
  }, 500); // Keep debounce to avoid too many updates

  return (
    <div className="flex justify-between items-center h-[var(--header-height)] px-4">
      <div className="flex items-center gap-2">
        <Link to="/sheet/list">
          <img className="w-12 h-12 cursor-pointer" src="/logo.png" alt="Logo" />
        </Link>
        <div
          ref={titleRef} // ✅ Attach ref
          className="text-dark-gray font-medium text-lg w-fit outline outline-1 outline-transparent hover:outline-dark-gray rounded-sm focus:outline-2 focus:outline-dark-blue px-2"
          dangerouslySetInnerHTML={{ __html: sheetDetail?.title || "" }}
          onInput={handleChange}
          contentEditable
        ></div>
      </div>
      {user && <Avatar user={user} logout={logout} />}
    </div>
  );
};

export default Header;

