import React, { useEffect } from 'react'
import logo from '../../images/logo-removebg-preview (2).png'
import '../../css/header.css'
import icon from '../../images/arrow-down-sign-to-navigate.png'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import { MdAccountCircle, MdLogout } from 'react-icons/md'
import { HStack, Button, Box, Flex, Spacer } from '@chakra-ui/react'
import axiosClient from '../../context/axiosClient'
import axiosAdminClient from '../../context/axiosAdminClient'
export default function Header () {
  const { token, setToken, setUser, adminToken, setAdminToken } =
    useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      axiosClient.get('/user').then(({ data }) => {
        setUser(data)
      })
    }
  }, [token, setUser])

  const logout = async (e) => {
    e.preventDefault()
    if (adminToken) {
      try {
        await axiosAdminClient.post('http://127.0.0.1:8000/api/admin/logout')
        setAdminToken(null)
        navigate('/')
      } catch (e) {
        console.error(e)
      }
    } else {
      await axiosClient.post('http://127.0.0.1:8000/api/logout')
      setToken(null)
      setUser({})
      navigate('/')
    }
  }

  const enter = () => {
    const select = document.getElementById('select_icon')
    select.style.visibility = 'visible'
  }

  const leave = () => {
    const select = document.getElementById('select_icon')
    select.style.visibility = 'hidden'
  }

  return (
    <div id='header' onMouseLeave={leave}>
      <div id='Gheader'>
        <div className='logo'>
          <img id='logo' src={logo} alt='' />
        </div>

        <nav>
          <ul>
            <li>
              <NavLink exact to='/' activeClassName='selected'>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to='/cars' activeClassName='selected'>
                Voitures
              </NavLink>
            </li>
            <li>
              <NavLink to='/Location' activeClassName='selected'>
                Réservation
              </NavLink>
            </li>
            <li>
              <NavLink to='/ContactUs' activeClassName='selected'>
                Contacter-nous
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='login-buttons d-flex align-items-center'>
          {token
            ? (
              <HStack position='absolute' right={0} top={3}>
                <Button
                  color='gray.600'
                  colorScheme='blackAlpha'
                  variant='ghost'
                  leftIcon={<MdAccountCircle color='gray' />}
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </Button>
                <Button
                  color='gray.600'
                  colorScheme='blackAlpha'
                  variant='ghost'
                  leftIcon={<MdLogout color='gray' />}
                  onClick={(e) => logout(e)}
                >
                  Logout
                </Button>
              </HStack>
              )
            : adminToken
              ? (
                <Flex
                  className=' navbar navbar-expand-lg'
                  justifyContent='space-between'
                  alignItems='center'
                  p={4}
                  color='white'
                >
                  <Box>
                    <Link
                      to='/dashboard'
                      style={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                    >
                      Dashboard
                    </Link>
                  </Box>

                  <Spacer />

                  <Button
                    color='white'
                    colorScheme='blackAlpha'
                    variant='ghost'
                    leftIcon={<MdLogout color='white' />}
                    onClick={(e) => logout(e)}
                  >
                    Logout
                  </Button>
                </Flex>
                )
              : (
                <>
                  <button
                    type='button'
                    className='btn-outline-secondary px-3 me-2'
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                  <button
                    type='button'
                    className='btn-primary'
                    onClick={() => navigate('/signup')}
                  >
                    Sign up for free
                  </button>
                </>
                )}
        </div>
      </div>
    </div>
  )
}
