import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Table, TableBody, TableRow, TableCell, TableContainer, Paper, Button, TextField } from '@mui/material'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    return await axios.get(baseUrl).then(response => { setResources(response.data) })
  }

  useEffect(() => {
    getAll()
  }, [])


  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    await getAll()
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onChange({ target: { value: '' } })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.onChange({ target: { value: '' } })
    number.onChange({ target: { value: '' } })
  }

  console.log(notes)

  return (
    <Container>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <TextField label="enter note" {...content} />
        <Button variant="contained" color="primary">create</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(n => (
              <TableRow key={n.id}>
                <TableCell>
                  <p key={n.id}>{n.content}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <TextField label="name" {...name} /> <br />
        <TextField label="number" {...number} />
        <Button variant="contained" color="primary">create</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {persons.map(n => (
              <TableRow key={n.id}>
                <TableCell>
                  <p key={n.id}>{n.name} {n.number}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default App