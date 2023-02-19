import { setup, styled } from 'goober'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { onClientOnly } from '../lib/client'

onClientOnly(() => setup(h))

const AlertWrapper = styled(`p`)`
  color: white;
  padding: 16px;
  border-radius: 6px;
  background: var(--primary);

  &.danger {
    background: var(--del-color);
  }
`

export default function Alert({ children, ...props }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(false)
    }, 3000)
    return () => clearTimeout(id)
  }, [])

  if (!show) {
    return <></>
  }

  return (
    <AlertWrapper className={props.class}>
      <small>{children}</small>
    </AlertWrapper>
  )
}
