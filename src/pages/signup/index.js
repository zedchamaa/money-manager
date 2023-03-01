import { useState } from 'react'
import Link from 'next/link'
import { useSignup } from '@/hooks/useSignup'
import Image from 'next/image'

// styles
import styles from './SignupPage.module.css'

// libraries
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pages & components
import Logo from '@/components/Logo'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (error) {
      console.log(error)
      toast.error(error)
      return
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
      return
    } else if (password.length < 7) {
      toast.error('Password must be at least 7 characters')
      setPassword('')
      setConfirmPassword('')
    } else {
      signup(email, password, displayName)
    }
  }

  // automatically update the footer copyright date
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.pageContainer}>
      <ToastContainer />
      <div className={styles.leftContainer}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.form}>
            <form
              onSubmit={handleSubmit}
              className={styles.formContainer}
            >
              <div className={styles.topContainer}>
                <h1>Create a new account</h1>
                <p>Please enter your details.</p>
              </div>

              <div className={styles.middleContainer}>
                <div className={styles.labels}>
                  <label>
                    <span>Display Name</span>
                    <input
                      type='text'
                      onChange={(e) => setDisplayName(e.target.value)}
                      value={displayName}
                      placeholder='Enter display name'
                      required
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder='example@email.com'
                      required
                    />
                  </label>
                  <label>
                    <span>Password</span>
                    <input
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder='Enter password'
                      required
                    />
                  </label>
                  <label>
                    <span>Confirm Password</span>
                    <input
                      type='password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      placeholder='Confirm password'
                      required
                    />
                  </label>
                </div>
                <div className={styles.btnContainer}>
                  {!isPending && (
                    <button className={styles.btn}>Register</button>
                  )}
                  {isPending && (
                    <button
                      className={styles.btn}
                      disabled
                    >
                      loading...
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <p>
                  Have an account?{' '}
                  <Link href='/login'>
                    <strong>Login</strong>
                  </Link>
                </p>
              </div>
              <div className={styles.copyright}>
                Copyright &copy; {currentYear}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://zedchamaa.com'
                >
                  zedchamaa
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightContent}>
          <div className={styles.description}>
            Revolutionize the way you manage your money. With our powerful and
            easy-to-use app, you can finally take control of your finances and
            make smarter financial decisions.
          </div>
          <div className={styles.mockup}>
            <Image
              src='/assets/images/mockup.png'
              alt='mockup'
              width='980'
              height='637'
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
