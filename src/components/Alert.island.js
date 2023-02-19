import Toastify from 'toastify-js'
import { onClientOnly } from '../lib/client'

export default function Alert({ children, type, ...props }) {
  onClientOnly(() => {
    let toastClass = 'success-toast'
    if (type === 'error') {
      toastClass = 'error-toast'
    }
    if (!children) {
      return
    }
    Toastify({
      text: children,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      className: ['toast', toastClass].join(' '),
    }).showToast()
  })

  return <></>
}
