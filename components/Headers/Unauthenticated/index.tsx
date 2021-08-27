import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Navbar, Brand, Toggle } from "./styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MobileMenu } from './MobileMenu'
import { Search } from './Search'
import { Navigator } from './Navigator'

interface Props {
  setLoading: Function,
  setAnimes: Function
}

export const UnauthenticatedHeader: React.FC<Props> = ({ setLoading, setAnimes }) => {

  const [showMenu, setShowMenu] = React.useState("none")

  return (
    <Navbar>
      <Row>
        {/* Brand */}
        <Col lg={3} md={11} sm={11} xs={10} className="justify-content-center d-flex">
          <Brand>OtakuStuff</Brand>
        </Col>
        {/* Brand */}
        {/* Open Menu Icon */}
        <Col md={1} sm={1} xs={2} className="d-lg-none d-flex justify-content-center">
          <Toggle>
            <FontAwesomeIcon icon={faBars} color="#FF6B4F" onClick={() => setShowMenu("flex")} />
          </Toggle>
        </Col>
        {/* Open Menu Icon */}
        {/* Search */}
        <Search setAnimes={setAnimes} setLoading={setLoading} />
        {/* Search */}
        {/* Entrar e Cadastrar/Username */}
        <Navigator />
        {/* Entrar e Cadastrar */}
      </Row>

      {/*Mobile Menu*/}
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      {/*Mobile Menu*/}
    </Navbar>
  )
}
