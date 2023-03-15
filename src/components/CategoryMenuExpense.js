import Select from 'react-select'

export default function CategoryMenuExpense({ onChange, category }) {
  const categories = [
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Food', label: 'Food' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Housing', label: 'Housing' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Investment', label: 'Investment' },
    { value: 'Personal Care', label: 'Personal Care' },
    { value: 'Saving', label: 'Saving' },
    { value: 'Taxes', label: 'Taxes' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Other Expense', label: 'Other Expense' },
  ]

  const menuContainer = document.body // or any other container with a max-width set

  return (
    <Select
      options={categories.sort((a, b) => a.label.localeCompare(b.label))}
      onChange={onChange}
      placeholder={category}
      menuPortalTarget={menuContainer}
    />
  )
}
