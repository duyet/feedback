"use client"

import {
  Toaster as ChakraToaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastIndicator,
} from "@chakra-ui/react"
import { toaster } from "../../hooks/useToast"

export { toaster } from "../../hooks/useToast"

export const Toaster = () => {
  return (
    <ChakraToaster toaster={toaster}>
      {(toast) => (
        <ToastRoot>
          <ToastIndicator />
          <ToastTitle>{toast.title}</ToastTitle>
          <ToastDescription>{toast.description}</ToastDescription>
          <ToastCloseTrigger />
        </ToastRoot>
      )}
    </ChakraToaster>
  )
}
