import React from 'react'
import { Col } from 'react-bootstrap'

interface IProps {
  showFriends: () => void,
  displayFriends: string[]
}

export const FriendsButton: React.FC<IProps> = ({ showFriends, displayFriends }) => {
  return (
    <Col className={`text-center border-end border-top text-light border-dark ${displayFriends[0]}`}
      onClick={() => showFriends()}>
      Amigos
    </Col>
  )
}
