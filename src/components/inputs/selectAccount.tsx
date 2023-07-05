import { useContext, useState } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { AccountType } from '../../types/Account'
import {
  AccountContext,
  AccountContextType,
} from '../../context/accountContext'
import { AccountApi } from '../../api/AccountApi.ts'
import HttpClient from '../../api/HttpClient.ts'

export const SelectAccount = () => {
  const { data } = useSWR(AccountApi.url().get, HttpClient.get)
  const { handleSetAccount, account } = useContext(
    AccountContext
  ) as AccountContextType
  const navigate = useNavigate()
  const [state, setState] = useState(false)

  const selectedItem = data
    ? data.data.find((item: AccountType) => item.id === account?.id)
    : null
  return (
    data && (
      <div className="relative max-w-xs px-4 text-base z-10">
        <button
          className="flex items-center justify-between gap-2 w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-pointer outline-none focus:border-indigo-600"
          aria-haspopup="true"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setState(!state)}
        >
          <div className="flex items-center gap-x-3">
            {'Compte : '}
            <span className={`text-sm`}>
              {selectedItem ? selectedItem.name : 'NC'}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {state ? (
          <div className="relative w-full">
            <ul
              className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64"
              role="listbox"
            >
              {data.data.map((item: AccountType) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setState(false)
                    handleSetAccount(item)
                    navigate(`/account/${item.id}/transactions`)
                  }}
                  role="option"
                  aria-selected={selectedItem && selectedItem.id == item.id}
                  className={`${
                    selectedItem && selectedItem.id == item.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : ''
                  } flex items-center justify-between gap-2 px-3 py-2 duration-150 text-gray-500 cursor-pointer hover:text-indigo-600 hover:bg-indigo-50`}
                >
                  <div className="flex items-center gap-x-3">{item.name}</div>
                  {selectedItem && selectedItem.id == item.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  )
}

export default SelectAccount
