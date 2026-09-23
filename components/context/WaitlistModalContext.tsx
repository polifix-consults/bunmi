"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { WaitlistModal } from "@/components/ui/WaitlistModal";

type WaitlistModalContextType = {
  isOpen: boolean;
  openWaitlistModal: () => void;
  closeWaitlistModal: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(
  undefined
);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlistModal = () => setIsOpen(true);
  const closeWaitlistModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider
      value={{ isOpen, openWaitlistModal, closeWaitlistModal }}
    >
      {children}
      <WaitlistModal isOpen={isOpen} onClose={closeWaitlistModal} />
    </WaitlistModalContext.Provider>
  );
}

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);
  if (!context) {
    throw new Error(
      "useWaitlistModal must be used within a WaitlistModalProvider"
    );
  }
  return context;
}
