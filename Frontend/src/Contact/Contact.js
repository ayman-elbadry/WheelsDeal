import React, { useState } from 'react'
import './css/animate.css'
import './css/style.css'
import './css/bootstrap.min.css'
import Footer from '../components/navbar/Footer'
import axios from 'axios'
export default function Contact () {
  const [user, setUser] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  function handleChange (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit (e) {
    e.preventDefault()
    const send = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/message',
          user
        )
        console.log(response.data) // Affiche la réponse du serveur
        // Gérer la réponse, par exemple en informant l'utilisateur que le message a été envoyé
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error)
        // Gérer l'erreur, par exemple en informant l'utilisateur de l'échec de l'envoi
      }
    }
    send()
  }
  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center' />
        <div className='row justify-content-center'>
          <div className='col-lg-10 col-md-12'>
            <div className='wrapper'>
              <div className='row no-gutters'>
                <div className='col-md-7 d-flex align-items-stretch'>
                  <div className='contact-wrap w-100  p-md-5 p-4' id='c_form'>
                    <div id='form-message-warning' className='mb-4' />
                    <div id='form-message-success' className='mb-4'>
                      Your message was sent, thank you!
                    </div>
                    <form
                      method='POST'
                      id='contactForm'
                      onSubmit={handleSubmit}
                      name='contactForm'
                    >
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <input
                              type='text'
                              onChange={(e) => handleChange(e)}
                              className='form-control'
                              name='name'
                              value={user.name}
                              id='name'
                              placeholder='Name'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <input
                              type='email'
                              className='form-control'
                              onChange={(e) => handleChange(e)}
                              name='email'
                              value={user.email}
                              id='email'
                              placeholder='Email'
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <input
                              type='text'
                              className='form-control'
                              onChange={(e) => handleChange(e)}
                              name='subject'
                              value={user.subject}
                              id='subject'
                              placeholder='Subject'
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <textarea
                              name='message'
                              onChange={(e) => handleChange(e)}
                              className='form-control'
                              id='message'
                              cols='30'
                              rows='7'
                              placeholder='Message'
                              value={user.message}
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <input
                              type='submit'
                              value='Send Message'
                              className='btn btn-primary'
                            />
                            <div className='submitting' />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className='col-md-5 d-flex  align-items-stretch'
                  id='c_form'
                >
                  <div className='info-wrap bg-primary w-100 p-lg-5 p-4'>
                    <h3 className='mb-4 mt-md-4'>Contact us</h3>
                    <div className='dbox w-100 d-flex align-items-start'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-map-marker' />
                      </div>
                      <div className='text pl-3'>
                        <p>
                          <span>Address:</span> 198 West 21th Street, Suite 721
                          Maarif
                        </p>
                      </div>
                    </div>
                    <div className='dbox w-100 d-flex align-items-center'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-phone' />
                      </div>
                      <div className='text pl-3'>
                        <p>
                          <span>Phone:</span> + 1235 2355 98
                        </p>
                      </div>
                    </div>
                    <div className='dbox w-100 d-flex align-items-center'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-paper-plane' />
                      </div>
                      <div className='text pl-3'>
                        <p>
                          <span>Email:</span>wheelsdeal4you@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className='dbox w-100 d-flex align-items-center'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-globe' />
                      </div>
                      <div className='text pl-3'>
                        <p>
                          <span>Website</span>{' '}
                          <a href='https://WheelsDeal.com'>WheelsDeal.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
