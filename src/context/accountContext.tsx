import { createContext, useState } from 'react'
import { AccountType } from '../types/Account'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { AccountApi } from '../api/AccountApi.ts'
import HttpClient from '../api/HttpClient.ts'

export type AccountContextType = {
  account: AccountType | null
  handleSetAccount: (account: AccountType | null) => void
}
const AccountContext = createContext<AccountContextType | null>(null)

type AccountProviderProps = {
  children: JSX.Element[]
}
const AccountProvider = ({ children }: AccountProviderProps) => {
  const [account, setAccount] = useState<AccountType | null>(null)
  const { id } = useParams()
  const shouldFetch = account === null && id !== undefined
  const { data } = useSWR(
    shouldFetch ? AccountApi.url(Number(id)).show : null,
    HttpClient.get
  )
  const handleSetAccount = (account: AccountType | null) => {
    setAccount(account)
  }

  if (data) {
    handleSetAccount(data)
  }

  return (
    <AccountContext.Provider value={{ account, handleSetAccount }}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider }
