import { useContext, useState } from 'react'
import MenuLink from '../components/link/menuLink'
import { AccountContext, AccountContextType } from '../context/accountContext'
import SelectAccount from '../components/inputs/selectAccount'

const Menu = () => {
  const { account } = useContext(AccountContext) as AccountContextType
  const [state, setState] = useState(false)

  const navigation = [
    { title: 'Account', path: '/account' },
    { title: 'Transactions', path: `/account/${account?.id}/transactions` },
    {
      title: 'Récurrent',
      path: `/account/${account?.id}/scheduled_transactions`,
    },
    { title: 'Graph', path: '/account' },
    { title: 'Types', path: '/account' },
  ]
  return (
    <nav className="bg-white w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <MenuLink to={'/account'}>
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </MenuLink>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {account?.id &&
              navigation.map((item, idx) => {
                return (
                  <MenuLink to={item.path} key={idx}>
                    {item.title}
                  </MenuLink>
                )
              })}
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <SelectAccount />
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                <MenuLink to={'/'}>Logout</MenuLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu
