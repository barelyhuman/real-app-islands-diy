import { styled } from 'goober'

const ErrorWrapper = styled(`p`)`
  background: var(--del-color);
  color: white;
  padding: 16px;
  border-radius: 6px;
`

export default function ErrorText({ children }) {
  return (
    <ErrorWrapper>
      <small>{children}</small>
    </ErrorWrapper>
  )
}
