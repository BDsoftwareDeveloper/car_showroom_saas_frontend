import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListCarModel = ({ onEdit, onDelete }) => {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchModels = async () => {
    try {
      const response = await axios.get('/car-models')
      console.log('Fetched models:', response.data)

      if (Array.isArray(response.data)) {
        setModels(response.data)
      } else if (Array.isArray(response.data.models)) {
        setModels(response.data.models)
      } else {
        const firstKey = Object.keys(response.data)[0]
        if (Array.isArray(response.data[firstKey])) {
          setModels(response.data[firstKey])
        } else {
          setModels([])
          setError('Unexpected response structure')
        }
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load models')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this model?')) return
    try {
      await axios.delete(`/car-models/${id}`)
      fetchModels()
      onDelete && onDelete()
    } catch (err) {
      alert('Failed to delete model')
    }
  }

  if (loading) return <p>Loading models...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Car Models</h2>
      {models.length === 0 ? (
        <p>No models found.</p>
      ) : (
        <ul>
          {models.map((model) => (
            <li key={model.id}>
              {model.name} (Brand ID: {model.brand_id}){' '}
              <button onClick={() => onEdit(model.id)}>Edit</button>{' '}
              <button onClick={() => handleDelete(model.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListCarModel
