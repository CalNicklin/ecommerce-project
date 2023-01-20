import { createContext, useContext, useState } from "react";
import { createCart, getCartById } from "src/api";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cartState, setCartState] = useState({
        cart: {},
        setCart: (cart) => {
            setCartState((prevState) => {
                return {
                    ...prevState,
                    cart: cart
                };
            });
        }
    });

    return (
        <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
    )
};

export default CartContext;