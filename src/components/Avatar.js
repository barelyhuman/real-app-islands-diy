import { styled } from 'goober'

const AvatarWrapper = styled('div')`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  overflow: hidden;

  & > img {
    object-fit: contain;
  }
`

const AvatarContent = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`

export function Avatar({ userId, name }) {
  return (
    <AvatarContent>
      <AvatarWrapper>
        <img src={`https://icotar.com/avatar/${userId}`} />
      </AvatarWrapper>
      <span>
        <small>{name}</small>
      </span>
    </AvatarContent>
  )
}
