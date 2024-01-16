
const Filter = ({ value, onChange }) => {

  const handleFilterChange = (event) => {
    onChange(event.target.value)
  }
  
  return (
    <div>
      <label>
        <select value={value} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        </select>
        </label>
    </div>
  )
}

export default Filter