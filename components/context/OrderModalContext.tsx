"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { OrderCheckoutModal } from "@/components/ui/OrderCheckoutModal";

type OrderModalContextType = {
  isOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
};

const OrderModalContext = createContext<OrderModalContextType | undefined>(
  undefined
);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openOrderModal = () => setIsOpen(true);
  const closeOrderModal = () => setIsOpen(false);

  return (
    <OrderModalContext.Provider
      value={{ isOpen, openOrderModal, closeOrderModal }}
    >
      {children}
      <OrderCheckoutModal isOpen={isOpen} onClose={closeOrderModal} />
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  const context = useContext(OrderModalContext);
  if (!context) {
    throw new Error("useOrderModal must be used within an OrderModalProvider");
  }
  return context;
}
