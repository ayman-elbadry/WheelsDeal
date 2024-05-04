import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../context/axiosClient'
import LoadingSpinner from '../../components/ui/loading-spinner'
import './messages.css' // Fichier CSS pour les styles

export default function Messages () {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessages, setSelectedMessages] = useState([])
  const [response, setResponse] = useState('')
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosClient.get(
          'http://127.0.0.1:8000/api/message'
        )
        setMessages(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    if (selectAll) {
      setSelectedMessages(messages.map((message) => message.id))
    } else {
      setSelectedMessages([])
    }
  }, [selectAll])

  const handleCheckboxChange = (messageId) => {
    const updatedSelectedMessages = selectedMessages.includes(messageId)
      ? selectedMessages.filter((id) => id !== messageId)
      : [...selectedMessages, messageId]
    setSelectedMessages(updatedSelectedMessages)
  }

  const handleSendEmail = async () => {
    console.log(selectedMessages, response)
    try {
      await axiosClient.post('http://127.0.0.1:8000/api/send-email', {
        selectedMessages,
        response
      })
      alert('Email sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email. Please try again later.')
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className='container mt-4'>
      <h1 className='text-center mb-4'>Messages</h1>
      <div className='row mb-3'>
        <div className='col-md-6'>
          <div className='input-group'>
            <textarea
              className='form-control'
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder='Enter your response here...'
            />
            <button className='btn btn-primary' onClick={handleSendEmail}>
              Send Email
            </button>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-check mt-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='selectAll'
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
            <label className='form-check-label' htmlFor='selectAll'>
              Select All
            </label>
          </div>
        </div>
      </div>
      <ul className='list-group'>
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => (
            <li key={index} className='list-group-item'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={selectedMessages.includes(message.id)}
                onChange={() => handleCheckboxChange(message.id)}
              />
              <Link
                to={`/dashboard/message/${message.id}`}
                className='message-link'
              >
                <div className='message-card'>
                  <div className='form-check'>
                    <div className='message-content'>
                      <h5 className='message-email'>
                        <span className='email-label'>From: </span>
                        {message.email}
                        <span className='email-label ml-5'>A: </span>
                        {new Date(message.created_at).toLocaleString()}
                        <span className='message-text' />
                      </h5>
                      <p className='message-text'>{message.message}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
