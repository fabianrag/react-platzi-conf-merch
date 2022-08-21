import { useContext } from "react"
import AppContext from "../context/AppContext"

export default function handleSumTotal() {
    const { state } = useContext(AppContext)
    const { cart } = state
    const reducer = (accumulator, currentValue) => {
        return accumulator + (currentValue.price * currentValue.quantity)
    }
    const sum = cart.reduce(reducer, 0)
    return sum
}