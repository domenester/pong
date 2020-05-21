import React, { useEffect, ComponentType } from "react"
import { ISocketService, useSocketServiceValue } from "../../services"

interface IRootProps {
  Component: ComponentType<any>,
  props?: { [key: string ]: any }
}

export default function Root ({ Component, props }: IRootProps) {
  const {
    connected
  }: ISocketService = useSocketServiceValue()

  useEffect(() => {
    connected()
  })

  return <Component {...props} />
}