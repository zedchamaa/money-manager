import Select from 'react-select'

export default function CategoryMenuIncome({ onChange, category }) {
  const categories = [
    { value: 'Child Support', label: 'Child Support' },
    { value: 'Government Benefits', label: 'Government Benefits' },
    { value: 'Investment Income', label: 'Investment Income' },
    { value: 'Other Earning', label: 'Other Earning' },
    { value: 'Pension Income', label: 'Pension Income' },
    { value: 'Prize Winnings', label: 'Prize Winnings' },
    { value: 'Rental Income', label: 'Rental Income' },
    { value: 'Royalties', label: 'Royalties' },
    { value: 'Salary', label: 'Salary' },
    { value: 'Sale of Personal Property', label: 'Sale of Personal Property' },
    { value: 'Other Income', label: 'Other Income' },
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
