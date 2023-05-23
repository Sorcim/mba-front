import Menu from './_menu'
import React from 'react'
import { AccountProvider } from '../context/accountContext'

type defaultProps = {
  children?: React.ReactNode
}

const Default = ({ children }: defaultProps) => {
  return (
    <AccountProvider>
      <Menu />
      <div className="flex">
        <div className="w-full">
          <div className="container m-auto mt-0">{children}</div>
        </div>
      </div>
    </AccountProvider>
  )
}

export default Default
