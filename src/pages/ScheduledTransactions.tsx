import { useParams } from 'react-router-dom'
import Default from '../layouts/_default'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ScheduledTransactionType } from '../types/ScheduledTransaction'
import { ModalProvider } from '../context/modalContext'
import AddFormScheduledTransaction from '../components/scheduledTransaction/form/addFormScheduledTransaction'
import ScheduledTransactionTableRow from '../components/scheduledTransaction/scheduledTransactionTableRow'
import AddModalButton from '../components/modal/button/addModalButton'
import { ScheduledTransactionApi } from '../api/ScheduledTransactionApi.ts'
import HttpClient from '../api/HttpClient.ts'

type ResultProps = {
  data: Array<ScheduledTransactionType>
  meta: {
    total: number
    current_page: number
    last_page: number
    per_page: number
  }
}

const ScheduledTransactions = () => {
  const { id } = useParams()
  const getKey = (index: number) => {
    return `${ScheduledTransactionApi.url(Number(id)).get}?page=${index + 1}`
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

  const handleNext = () => {
    setSize(size + 1)
  }
  return (
    <Default>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 relative h-max overflow-auto">
          <div>
            {id && (
              <ModalProvider>
                <AddModalButton
                  modalContent={
                    <AddFormScheduledTransaction
                      afterSubmit={() => {
                        mutate()
                      }}
                    />
                  }
                />
              </ModalProvider>
            )}
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
                    <th className="py-3 pr-6">Description</th>
                    <th className="py-3 pr-6">Price</th>
                    <th className="py-3 pr-6">Jour</th>
                    <th className="py-3 pr-6">Tag</th>
                    <th className="py-3 pr-6">Date de fin</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {transactions.map((result: ResultProps) => {
                    return result.data.map((item: ScheduledTransactionType) => (
                      <ScheduledTransactionTableRow
                        key={item.id}
                        scheduledTransaction={item}
                        afterEdit={() => {
                          mutate()
                        }}
                        afterDelete={() => {
                          mutate()
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

export default ScheduledTransactions
