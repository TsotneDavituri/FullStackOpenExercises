import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {    
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
        const input = event.target.value
        dispatch(setFilter(input))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter