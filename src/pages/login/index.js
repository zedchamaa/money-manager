import { useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/useLogin'
import { useRouter } from 'next/router'
import Image from 'next/image'

// styles
import styles from './LoginPage.module.css'

// pages & components
import Logo from '@/components/Logo'
import MailIcon from '@/components/icons/MailIcon'
import LockIcon from '@/components/icons/LockIcon'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  // redirect users to forgot password page
  const handleRedirect = () => {
    router.push('/forgot-password')
  }

  // automatically update the footer copyright date
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.pageContainer}>
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
                <h1>Login to your account</h1>
                <p>Welcome! Please enter your login details.</p>
              </div>
              <div className={styles.demoCredentials}>
                <div className={styles.demoNote}>Demo Login Details:</div>
                <div className={styles.demoDetails}>
                  <div className={styles.username}>
                    <div>
                      <MailIcon />
                    </div>
                    <div>dev@zedchamaa.com</div>
                  </div>
                  <div className={styles.password}>
                    <div>
                      <LockIcon />
                    </div>
                    <div>demoapp</div>
                  </div>
                </div>
              </div>
              <div className={styles.middleContainer}>
                <div className={styles.labels}>
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
                </div>
                <div className={styles.forgotPassword}>
                  <span onClick={handleRedirect}>Forgot password?</span>
                </div>
                <div>
                  {!isPending && <button className={styles.btn}>Login</button>}
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
                  Don't have an account?{' '}
                  <Link href='/signup'>
                    <strong>Sign Up</strong>
                  </Link>
                </p>
                {error && <div className='form-alert'>{error}</div>}
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
