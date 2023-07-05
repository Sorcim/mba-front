import { useParams } from 'react-router-dom'
import Default from '../layouts/_default'
import useSWRInfinite from 'swr/infinite'
import useSWR from 'swr'
import InfiniteScroll from 'react-infinite-scroll-component'
import TransactionTableRow from '../components/transaction/transactionTableRow'
import { TransactionType } from '../types/Transaction'
import { ModalProvider } from '../context/modalContext'
import AddFormTransaction from '../components/transaction/form/add'
import AmountField from '../components/fields/amountField'
import AddModalButton from '../components/modal/button/addModalButton'
import httpClient from '../api/HttpClient.ts'
import { AccountApi } from '../api/AccountApi.ts'
import HttpClient from '../api/HttpClient.ts'
import { TransactionApi } from '../api/TransactionApi.ts'

type ResultProps = {
  data: Array<TransactionType>
  meta: {
    total: number
    current_page: number
    last_page: number
    per_page: number
  }
}

const Transactions = () => {
  const { id } = useParams()

  const getKey = (index: number) => {
    return `${TransactionApi.url(Number(id)).get}?page=${index + 1}`
  }
  const {
    data: transactions,
    error,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<ResultProps, Error>(
    (index: number) => getKey(index),
    HttpClient.get,
    { revalidateAll: true }
  )

  const { data: account, mutate: accountMutate } = useSWR(
    AccountApi.url(Number(id)).show,
    httpClient.get
  )

  const handleNext = () => {
    setSize(size + 1)
  }
  return (
    <Default>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 relative h-max overflow-auto">
          <div className="flex">
            {id && (
              <ModalProvider>
                <AddModalButton
                  modalContent={
                    <AddFormTransaction
                      accountId={id}
                      afterSubmit={() => {
                        mutate()
                        accountMutate()
                      }}
                    />
                  }
                />
              </ModalProvider>
            )}
            <div className="flex-1 text-right">
              <p>
                Montant sur le compte :{' '}
                {account ? <AmountField value={account.currentBalance} /> : ''}
              </p>
              <p>
                Montant validé :{' '}
                {account ? <AmountField value={account.valideBalance} /> : ''}
              </p>
            </div>
          </div>
          {transactions && !error && (
            <InfiniteScroll
              dataLength={transactions[0].meta.per_page * size}
              next={handleNext}
              hasMore={size < transactions[0].meta.last_page}
              loader={null}
            >
              <table className="w-full table-auto text-sm text-left mt-12">
                <thead className="text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 pr-6"></th>
                    <th className="py-3 pr-6">Date</th>
                    <th className="py-3 pr-6">Description</th>
                    <th className="py-3 pr-6">Status</th>
                    <th className="py-3 pr-6">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {transactions.map((result: ResultProps) => {
                    return result.data.map((item: TransactionType) => (
                      <TransactionTableRow
                        key={item.id}
                        transaction={item}
                        afterEdit={() => {
                          mutate()
                          accountMutate()
                        }}
                        afterDelete={() => {
                          mutate()
                          accountMutate()
                        }}
                      />
                    ))
                  })}
                </tbody>
              </table>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </Default>
  )
}

export default Transactions
