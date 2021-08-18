import React from 'react'
import { Body } from '../Shared/Body'
import { NoFilterSearch } from '../Shared/Search'

export const Friends = () => {

  let logged = true

  if (logged) {
    return (
      <Body>
        <NoFilterSearch look="amigos" />
      </Body>
    )
  }
  return (
    <>
      <Body>
        <div className="h-100 p-2 d-flex align-items-center">
          <h1 className="text-light text-center">Entre na sua conta ou se cadastre para ter acesso aos seus amigos.</h1>
        </div>
      </Body>
    </>
  )
}