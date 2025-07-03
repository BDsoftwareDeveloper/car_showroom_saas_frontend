import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ListCarVariant = ({ onEdit, onDelete }) => {
  const [variants, setVariants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVariants = async () => {
    try {
      const response = await axios.get('/car-variants')
      console.log('Fetched variants:', response.data)

      if (Array.isArray(response.data)) {
        setVariants(response.data)
      } else if (Array.isArray(response.data.variants)) {
        setVariants(response.data.variants)
      } else {
        const firstKey = Object.keys(response.data)[0]
        if (Array.isArray(response.data[firstKey])) {
          setVariants(response.data[firstKey])
        } else {
          setVariants([])
          setError('Unexpected response structure')
        }
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load variants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVariants()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this variant?')) return
    try {
      await axios.delete(`/car-variants/${id}`)
      fetchVariants()
      onDelete && onDelete()
    } catch (err) {
      alert('Failed to delete variant')
    }
  }

  if (loading) return <p>Loading variants...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Car Variants</h2>
      {variants.length === 0 ? (
        <p>No variants found.</p>
      ) : (
        <ul>
          {variants.map((variant) => (
            <li key={variant.id}>
              {variant.name} (Model ID: {variant.model_id}){' '}
              <button onClick={() => onEdit(variant.id)}>Edit</button>{' '}
              <button onClick={() => handleDelete(variant.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListCarVariant
