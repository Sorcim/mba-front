import Account from '../components/account/account'
import { AccountType } from '../types/Account'
import Default from '../layouts/_default'
import AddModalButton from '../components/modal/button/addModalButton'
import AddAccountForm from '../components/account/form/addAccountForm'
import { ModalProvider } from '../context/modalContext'
import useSWR from 'swr'
import { AccountApi } from '../api/AccountApi.ts'
import HttpClient from '../api/HttpClient.ts'

const Accounts = () => {
  const { data, mutate } = useSWR(AccountApi.url().get, HttpClient.get)
  return (
    <Default>
      <section className="py-28">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ModalProvider>
              <AddModalButton
                modalContent={
                  <AddAccountForm
                    afterSubmit={() => {
                      mutate()
                    }}
                  />
                }
              />
            </ModalProvider>
            <div className="mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
              {data &&
                data.data.map((item: AccountType) => (
                  <Account
                    account={item}
                    key={item.id}
                    mutate={() => {
                      mutate()
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </Default>
  )
}

export default Accounts
