import { useNavigate } from 'react-router-dom'
import { AccountType } from '../../types/Account'
import { useContext } from 'react'
import {
  AccountContext,
  AccountContextType,
} from '../../context/accountContext'
import AmountField from '../fields/amountField'
import EditAccountForm from './form/editAccountForm'
import { ModalProvider } from '../../context/modalContext'
import EditModalButton from '../modal/button/editModalButton'
import DeleteModalButton from '../modal/button/deleteModalButton'
import DeleteAccountModal from './modal/deleteAccountModal'

interface AccountProps {
  account: AccountType
  mutate: () => void
}

const Account = ({ account, mutate }: AccountProps) => {
  const navigate = useNavigate()
  const { handleSetAccount } = useContext(AccountContext) as AccountContextType
  const handleAccountClick = (account: AccountType) => {
    handleSetAccount(account)
    navigate(`/account/${account.id}/transactions`)
  }
  return (
    <div className={'rounded-xl border-2 flex align-middle '}>
      <div
        className="flex-1 flex items-stretch flex-col p-8 cursor-pointer"
        onClick={() => handleAccountClick(account)}
      >
        <span className="text-indigo-600 font-medium">{account.name}</span>
        <div className="mt-4 text-gray-800 text-3xl font-semibold">
          <AmountField value={account.currentBalance} />
        </div>
      </div>
      <div>
        <ModalProvider>
          <EditModalButton
            modalContent={
              <EditAccountForm account={account} afterSubmit={mutate} />
            }
          />
          <DeleteModalButton
            modalContent={
              <DeleteAccountModal account={account} afterDelete={mutate} />
            }
          />
        </ModalProvider>
      </div>
    </div>
  )
}

export default Account
