import { useState } from "react";
import initialState from '../initialState'

const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const addToCart = payload => {
        const isInTheCart = state.cart.findIndex(item => item.id === payload.id);
        if (isInTheCart > -1) {
            const newCart = state.cart
            newCart[isInTheCart].quantity += 1;
            setState({
                ...state,
                cart: newCart
            });
        } else {
            setState({
                ...state,
                cart: [...state.cart, payload]
            });
        }
    }

    const removeFromCart = payload => {
        if (payload.quantity === 1) {
            setState({
                ...state,
                cart: state.cart.filter(item => item.id !== payload.id)
            })
        } else {
            const newCart = state.cart;
            newCart[newCart.findIndex(item => item.id === payload.id)].quantity -= 1;
            setState({
                ...state,
                cart: newCart
            });
        }

    }

    const addToBuyer = payload => {
        setState({
            ...state,
            buyer: [...state.buyer, payload]
        });
    }

    const countTotal = () => {
        let total = 0;
        state.cart.forEach(item => {
            total += item.quantity
        });
        return total;
    }

    const addNewOrder = payload => {
        setState({
            ...state,
            orders: [...state.orders, payload]
        });
    }

    return {
        state,
        addToCart,
        removeFromCart,
        addToBuyer,
        addNewOrder,
        countTotal
    }
}

export default useInitialState;