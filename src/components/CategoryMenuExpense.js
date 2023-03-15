import Select from 'react-select'

export default function CategoryMenuExpense({ onChange, category }) {
  const categories = [{ value: 'Groceries', label: 'Groceries' }]

  const menuContainer = document.body // or any other container with a max-width set

  return (
    <Select
      options={categories}
      onChange={onChange}
      placeholder={category}
      menuPortalTarget={menuContainer}
    />
  )
}
