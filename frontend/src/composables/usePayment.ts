import { ref } from 'vue'

const loading = ref<boolean>(false)

const columns = [
  'Payment ID',
  'Amount',
  'Date',
]

const rows = [
  { 'payment id': 'PAY1234', amount: '$2499', date: '10 June 2025', status: 'Pending' },
  { 'payment id': 'PAY1234', amount: '$2499', date: '10 June 2025', status: 'Pending' },
  { 'payment id': 'PAY1234', amount: '$2499', date: '10 June 2025', status: 'Pending' },
  { 'payment id': 'PAY1235', amount: '$3999', date: '27 May 2025', status: 'Completed' },
  { 'payment id': 'PAY1235', amount: '$3999', date: '27 May 2025', status: 'Completed' },
  { 'payment id': 'PAY1235', amount: '$3999', date: '27 May 2025', status: 'Completed' },
  { 'payment id': 'PAY1235', amount: '$3999', date: '27 May 2025', status: 'Completed' },
  { 'payment id': 'PAY1236', amount: '$1999', date: '15 April 2025', status: 'Failed' },
  { 'payment id': 'PAY1236', amount: '$1999', date: '15 April 2025', status: 'Failed' },
  { 'payment id': 'PAY1236', amount: '$1999', date: '15 April 2025', status: 'Failed' },
]


export function usePayment() {


    return {
        columns,
        rows,
        loading,
  }
}
