import { Link } from 'react-router-dom'
import React from 'react'
type MenuLinkProps = {
  to: string
  children?: React.ReactNode
}

const MenuLink = ({ to, children }: MenuLinkProps) => {
  return (
    <Link to={to}>
      <p className="text-gray-600 hover:text-primary-600">{children}</p>
    </Link>
  )
}

export default MenuLink
