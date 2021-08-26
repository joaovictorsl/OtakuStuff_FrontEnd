import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Navbar, Brand, Botao, Search, Toggle } from "./styles"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faBars } from '@fortawesome/free-solid-svg-icons'
import AnimeService from '../../../services/animes/getAnimes'
import { MobileMenu } from './MobileMenu'

interface Props {
  setLoading: Function,
  setAnimes: Function
}

export const UnauthenticatedHeader: React.FC<Props> = ({ setLoading, setAnimes }) => {

  const [showMenu, setShowMenu] = React.useState("none")
  const [search, setSearch] = React.useState("")

  const searchAnime = async () => {
    setLoading(true)
    let res;
    if (search == '') {
      res = await AnimeService.getTopAnime(null)
      setAnimes(res.data['animes'])
      setLoading(false)
      return
    }
    res = await AnimeService.searchAnime({ search: { q: search } })
    setAnimes(res.data['animes'])
    setLoading(false)
  }

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
        <Col lg={6} className="justify-content-center d-flex align-items-center">
          <Botao>
            <FontAwesomeIcon icon={faFilter} color="#FF6B4F" className="me-2" />
          </Botao>
          <Search placeholder="Procurar por algo..." value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => e.key == "Enter" && searchAnime()} />
          <Botao onClick={() => searchAnime()}>
            <FontAwesomeIcon icon={faSearch} color="#FF6B4F" className="ms-2" />
          </Botao>
        </Col>
        {/* Search */}
        {/* Entrar e Cadastrar */}
        <Col lg={3} className="justify-content-center d-flex">
          <Col className="d-flex align-items-center justify-content-center" lg={6}>
            <Link href="/Login">
              <Botao>
                Entrar
              </Botao>
            </Link>
          </Col>
          <Col className="d-flex align-items-center justify-content-center" lg={6}>
            <Link href="/SignUp">
              <Botao>
                Cadastrar
              </Botao>
            </Link>
          </Col>
        </Col>
        {/* Entrar e Cadastrar */}
      </Row>

      {/*Mobile Menu*/}
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      {/*Mobile Menu*/}
    </Navbar>
  )
}
