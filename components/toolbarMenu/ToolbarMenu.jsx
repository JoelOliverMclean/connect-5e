import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const styles = {
  burgerMenu:
    "flex md:hidden flex-col justify-between cursor-pointer p-2 gap-1",
  burgerLine: "w-[16px] h-[2px] bg-[var(--foreground)]",
  menuOption: "py-1 px-2 text-lg cursor-pointer",
};

function MenuOptions({ setOpen }) {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {session ? (
        <form
          action={async () => {
            await signOut();
          }}
        >
          <button type="submit" className={styles.menuOption}>
            Logout
          </button>
        </form>
      ) : (
        <Link
          href={"/"}
          onClick={() => setOpen(false)}
          className={styles.menuOption}
        >
          Login
        </Link>
      )}
    </div>
  );
}

function ToolbarMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      <div className="hidden md:block">
        <MenuOptions />
      </div>
      <div className={styles.burgerMenu} onClick={() => setOpen(!open)}>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
      </div>
      {open && (
        <div
          ref={menuRef}
          className="block md:hidden absolute top-[100%] right-0 bottom-0 left-0 p-2 fadeable h-[100%]"
        >
          <div className="bg-red-900 px-3 py-1 shadow-lg shadow-black rounded-lg duration-300">
            <MenuOptions setOpen={setOpen} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolbarMenu;
