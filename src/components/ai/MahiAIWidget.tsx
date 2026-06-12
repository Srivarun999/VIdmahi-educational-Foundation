"use client";

import { useEffect, useState } from "react";
import MahiAIButton from "./MahiAIButton";
import MahiAIChat from "./MahiAIChat";

export default function MahiAIWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      {!open && (
        <div className="fixed bottom-4 right-4 z-[70]">
          <MahiAIButton
            onClick={() => setOpen(true)}
            open={open}
          />
        </div>
      )}

      <MahiAIChat
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}