import Select from 'react-select'

export default function CategoryMenu({ onChange, category }) {
  const categories = [
    { value: 'Household', label: 'Household' },
    { value: 'Salary', label: 'Salary' },
  ]

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
