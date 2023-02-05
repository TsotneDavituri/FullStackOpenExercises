import { useEffect, useState } from 'react'
import personService from './services/persons'

// Main component that renders the phonebook
const App = () => {
  // States for list of persons, new persons name and number, and for the search filter
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  // use effect hook to fetch list of persons from the server
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
      })
  }, [])

  // function to add new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    // parseInt checks if the parameter of type string can be converted to a number, if not it returns NaN
    if (newName === "" || newNumber === "" || isNaN(parseInt(newNumber))) {
      window.alert('Please enter both a name and a valid number')
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      // check to see if the person already is in the phonebook
      if (persons.some(person => person.name.toUpperCase() === newName.toUpperCase())) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          // find the person in the list to use its id
          const findPerson = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
          personService
            .update(findPerson.id, personObject)
            .then(response => {
              // replace the old person with the updated person from the response
              setPersons(persons.map(person => {
                if (person.id === findPerson.id) {
                  return response
                } else {
                  return person
                }
              }))
              setNewName('')
              setNewNumber('')
            })
        }
      } else {
        //if they dont exist create a new person and add it to the list with concat
        personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }


  // functions that handle the event changes of the inputs of the forms
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // function that handles deletion from the phonebook
  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  // destructuring the props for passing to the PersonForm component
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
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm {...personFormProps} />
      <h2>Numbers</h2>
      <FilteredPersonList persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter names: <input value={filter} onChange={handleFilterChange}></input>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div> name: <input type="text" value={newName} onChange={handleNameChange} /></div>
      <div> number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">submit</button></div>
    </form>
  )
}

const Person = (props) => {
  return (
    <span key={props.person.id}> {props.person.name} {props.person.number} </span>
  )
}

const DeleteButton = (props) => {
  const confirmDeletion = () => {
    // a confirmation to ensure the user wants to delete the entry
    if (window.confirm("Do you want to delete this user?")) {
      // if confirmed the handleDelete method will be triggered with the person.id as argument
      props.handleDelete(props.person.id)
    }
  }
  return (
    <button onClick={confirmDeletion} type="submit">delete</button>
  )
}

const FilteredPersonList = (props) => {
  // Filters the list of persons based on the filter string passed as a prop
  const filteredPersons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  )
  return (
    <div>
      {/* Maps through the filtered list of persons and displays each person with a Person component */}
      {filteredPersons.map(person => (
        <div key={person.id}>
          <p>
            <Person person={person} />
            <DeleteButton person={person} handleDelete={() => props.handleDelete(person.id)} />
          </p>
        </div>
      ))}
    </div>
  )
}

export default App