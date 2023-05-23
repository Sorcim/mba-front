import AmountField from '../fields/amountField'
import DateField from '../fields/dateField'
import { ModalProvider } from '../../context/modalContext'
import { ScheduledTransactionType } from '../../types/ScheduledTransaction'
import EditFormScheduledTransaction from './form/editFormScheduledTransaction'
import EditModalButton from '../modal/button/editModalButton'
import DeleteModalButton from '../modal/button/deleteModalButton'
import DeleteScheduledTransactionModal from './modal/deleteScheduledTransactionModal'

type ScheduledTransactionProps = {
  scheduledTransaction: ScheduledTransactionType
  afterEdit: () => void
  afterDelete: () => void
}

const ScheduledTransactionTableRow = ({
  scheduledTransaction,
  afterEdit,
  afterDelete,
}: ScheduledTransactionProps) => {
  return (
    <tr>
      <td className="pr-6 py-4 whitespace-nowrap">
        {scheduledTransaction.description}
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <AmountField value={scheduledTransaction.amount} />
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        {scheduledTransaction.day}
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-2 rounded-full font-semibold text-xs text-blue-600 bg-blue-50`}
        >
          Type
        </span>
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <DateField value={scheduledTransaction.end_date} />
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <div className="flex justify-around">
          <ModalProvider>
            <EditModalButton
              modalContent={
                <EditFormScheduledTransaction
                  scheduledTransaction={scheduledTransaction}
                  afterSubmit={afterEdit}
                />
              }
            />
            <DeleteModalButton
              modalContent={
                <DeleteScheduledTransactionModal
                  scheduledTransaction={scheduledTransaction}
                  afterDelete={afterDelete}
                />
              }
            />
          </ModalProvider>
        </div>
      </td>
    </tr>
  )
}

export default ScheduledTransactionTableRow
