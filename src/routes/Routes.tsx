import Login from '../pages/Login'
import Accounts from '../pages/Accounts'
import ScheduledTransactions from '../pages/ScheduledTransactions'
import Transactions from '../pages/Transactions'

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/account/:id/transactions',
    element: <Transactions />,
  },
  {
    path: '/account/transactions',
    element: <Transactions />,
  },
  {
    path: '/account/:id/scheduled_transactions',
    element: <ScheduledTransactions />,
  },
  {
    path: '/account',
    element: <Accounts />,
  },
]

export default routes
