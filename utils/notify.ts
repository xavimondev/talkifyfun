import toast from 'react-hot-toast'

type ToastType = 'success' | 'error' | 'loading' | 'custom'

export const showNotification = (message: string, type: ToastType) => {
  if (type === 'success') return toast.success(message)
  else if (type === 'error') return toast.error(message)
  else if (type === 'loading') return toast.loading(message)
  else return toast(message)
}

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId)
}
