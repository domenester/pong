import React from "react"
import { useStateValue } from "../../shared/state-handler"
import './counter-down.scss'

export default function CounterDown() {
  const { state: { counterDown } } = useStateValue()
  return (
    <h1 className="counter-down centered text-center">
      { counterDown.value }
    </h1>
  )
}