import { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then((response) => {
      setPersons(response)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }   

    if (persons.some(person => person.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personFormProps = {
    addPerson: addPerson,
    newName: newName,
    handleNameChange: handleNameChange,
    newNumber: newNumber,
    handleNumberChange: handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm {...personFormProps}/>
      <h2>Numbers</h2>
      <FilteredPersonList persons={persons} filter={filter}/>
    </div>
  )
}

const SearchFilter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter names: <input value={filter} onChange={handleFilterChange}></input>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange} /></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">submit</button></div>
      </form>
  )
}

const FilteredPersonList = (props) => {
  const filteredPersons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  )

  return (
    <div>
      {filteredPersons.map(person => (
        <>
          <p key={person.id}>{person.name} {person.number} <button type="submit">delete</button></p>
        </>
      ))}
    </div>
  )
}

export default App