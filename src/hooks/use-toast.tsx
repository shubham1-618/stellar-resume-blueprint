import { useCallback, useState } from "react"

import { useClientOnly } from "@/hooks/use-client-only"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 1000000

type ToasterState = {
  toasts: Toast[]
}

type ActionType =
  | {
      type: "ADD_TOAST"
      toast: Toast
    }
  | {
      type: "UPDATE_TOAST"
      toast: Partial<Toast>
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: Toast["id"]
    }
  | {
      type: "REMOVE_TOAST"
      toastId?: Toast["id"]
    }

const toastReducer = (state: ToasterState, action: ActionType): ToasterState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, visible: false } : t
        ),
      }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const DEFAULT_STATE: ToasterState = {
  toasts: [],
}

const useToast = () => {
  useClientOnly()
  const [state, dispatch] = useState<ToasterState>(DEFAULT_STATE)

  const toast = useCallback(
    ({ ...props }: Toast) => {
      const id = props.id || Math.random().toString(36).substring(2)

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open: boolean) => {
            if (!open) dismiss(id)
          },
        },
      })
    },
    [dispatch]
  )

  const update = useCallback(
    (id: string, { ...props }: Partial<Toast>) => {
      dispatch({
        type: "UPDATE_TOAST",
        toast: { id, ...props },
      })
    },
    [dispatch]
  )

  const dismiss = useCallback(
    (toastId?: string) => {
      dispatch({ type: "DISMISS_TOAST", toastId: toastId })
      setTimeout(() => {
        dispatch({ type: "REMOVE_TOAST", toastId: toastId })
      }, TOAST_REMOVE_DELAY)
    },
    [dispatch]
  )

  return {
    ...state,
    toast,
    update,
    dismiss,
  }
}

export { useToast, toastReducer, TOAST_REMOVE_DELAY }
