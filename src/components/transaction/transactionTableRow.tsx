import { TransactionType } from '../../types/Transaction'
import AmountField from '../fields/amountField'
import DateField from '../fields/dateField'
import Checkbox from '../inputs/checkbox'
import { ModalProvider } from '../../context/modalContext'
import EditFormTransaction from './form/edit'
import DeleteTransactionModal from './modal/deleteTransactionModal'
import DeleteModalButton from '../modal/button/deleteModalButton'
import EditModalButton from '../modal/button/editModalButton'

type TransactionProps = {
  transaction: TransactionType
  afterEdit: () => void
  afterDelete: () => void
}

const TransactionTableRow = ({
  transaction,
  afterEdit,
  afterDelete,
}: TransactionProps) => {
  return (
    <tr>
      <td className="pr-6 py-4 whitespace-nowrap">
        <Checkbox transaction={transaction} afterChange={afterEdit} />
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <DateField value={transaction.date} format={'dd MMMM yyyy'} />
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">{transaction.description}</td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-2 rounded-full font-semibold text-xs text-blue-600 bg-blue-50`}
        >
          Type
        </span>
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <AmountField value={transaction.amount} />
      </td>
      <td className="pr-6 py-4 whitespace-nowrap">
        <div className="flex justify-around">
          <ModalProvider>
            <EditModalButton
              modalContent={
                <EditFormTransaction
                  transaction={transaction}
                  afterSubmit={afterEdit}
                />
              }
            />
            <DeleteModalButton
              modalContent={
                <DeleteTransactionModal
                  transaction={transaction}
                  afterDelete={() => afterDelete()}
                />
              }
            />
          </ModalProvider>
        </div>
      </td>
    </tr>
  )
}

export default TransactionTableRow
