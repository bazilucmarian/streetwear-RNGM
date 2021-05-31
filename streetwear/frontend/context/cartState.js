import { createContext, useState } from 'react';

export const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
};
