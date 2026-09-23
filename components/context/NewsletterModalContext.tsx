"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { NewsletterModal } from "@/components/ui/NewsletterModal";

type NewsletterModalContextType = {
  isOpen: boolean;
  openNewsletterModal: () => void;
  closeNewsletterModal: () => void;
};

const NewsletterModalContext = createContext<NewsletterModalContextType | undefined>(
  undefined
);

export function NewsletterModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openNewsletterModal = () => setIsOpen(true);
  const closeNewsletterModal = () => setIsOpen(false);

  return (
    <NewsletterModalContext.Provider
      value={{ isOpen, openNewsletterModal, closeNewsletterModal }}
    >
      {children}
      <NewsletterModal isOpen={isOpen} onClose={closeNewsletterModal} />
    </NewsletterModalContext.Provider>
  );
}

export function useNewsletterModal() {
  const context = useContext(NewsletterModalContext);
  if (!context) {
    throw new Error(
      "useNewsletterModal must be used within a NewsletterModalProvider"
    );
  }
  return context;
}
