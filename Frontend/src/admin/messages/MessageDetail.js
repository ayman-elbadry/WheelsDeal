// MessageDetail.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../context/axiosClient'
import axios from 'axios'
import LoadingSpinner from '../../components/ui/loading-spinner'
import './messages.css' // Fichier CSS pour les styles

export default function MessageDetail () {
  const { id } = useParams()
  const [message, setMessage] = useState(null)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axiosClient.get(
          `http://127.0.0.1:8000/api/message/${id}`
        )
        setMessage(data.data)
      } catch (error) {
        console.error('Error fetching message:', error)
      }
    }
    fetchMessage()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(response)
    try {
      await axiosClient.post(`http://127.0.0.1:8000/api/message/${id}/reply`, {
        response
      })
      setLoading(false)
      alert('Response sent successfully!')
    } catch (error) {
      console.error('Error sending response:', error)
      setLoading(false)
      alert('Failed to send response. Please try again later.')
    }
  }

  if (!message) return <LoadingSpinner />

  return (
    <div className='message-detail-container'>
      <h2>Message Detail</h2>
      <div className='message-detail'>
        <p className='message-detail-item'>
          {' '}
          {new Date(message.created_at).toLocaleString()}
        </p>
        <p className='message-detail-item'>
          <strong>Name:</strong> {message.name}
        </p>
        <p className='message-detail-item'>
          <strong>Email:</strong> {message.email}
        </p>
        <p className='message-detail-item'>
          <strong>Subject:</strong> {message.subject}
        </p>
        <p className='message-detail-item'>
          <strong>Message:</strong> {message.message}
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            cols='15'
            name='reponse'
            className='form-control'
            placeholder='Reply...'
            rows='5'
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <input
            type='submit'
            value={loading ? 'Sending...' : 'Send'}
            className='btn btn-primary mt-3'
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}
