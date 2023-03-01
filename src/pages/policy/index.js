import Link from 'next/link'

// styles
import styles from './PolicyPage.module.css'

export default function PolicyPage() {
  return (
    <div className={styles.container}>
      <h2>Money Manager App Cookie Policy</h2>

      <p>Last updated: 1 Mar 2023</p>

      <h2>1. Introduction</h2>

      <p>
        This cookie policy (“Policy”) describes what cookies are, how we use
        them, and what your choices are regarding their use. Please read this
        Policy carefully before using our web application (“App”) which is
        powered by{' '}
        <Link
          target='_blank'
          href='https://firebase.google.com/'
        >
          Firebase
        </Link>
        , a backend platform provided by Google LLC (“Firebase”).
      </p>

      <h2>2. What Are Cookies?</h2>

      <p>
        Cookies are small text files that are stored on your device when you
        visit a website. They are used to remember your preferences and
        settings, to help you navigate between pages more efficiently, and to
        provide a more personalized experience.
      </p>

      <h2>3. How We Use Cookies</h2>

      <p>
        Our App uses Firebase, which may use cookies to provide services such as
        analytics, authentication, and storage. These cookies may collect
        information about how you use our App, such as which pages you visit,
        what features you use, and what buttons you click. This information is
        used to improve our App and provide a better user experience.
      </p>

      <h2>4. What Cookies We Use</h2>

      <p>The cookies used by Firebase may include:</p>

      <ul>
        <li>
          Analytics cookies, which help us understand how our App is used and
          improve its performance.
        </li>
        <li>
          Authentication cookies, which allow you to sign in to our App and
          access secure areas.
        </li>
        <li>
          Storage cookies, which allow us to store data locally on your device.
        </li>
      </ul>

      <h2>5. Your Choices</h2>

      <p>
        You can choose whether or not to accept cookies by adjusting your
        browser settings. Most browsers automatically accept cookies, but you
        can usually modify your settings to decline them. However, if you choose
        to decline cookies, some features of our App may not function properly.
      </p>

      <p>
        You can also opt out of Firebase cookies by visiting the{' '}
        <Link
          target='_blank'
          href='https://policies.google.com/privacy?hl=en'
        >
          Google Privacy & Terms page
        </Link>
        .
      </p>

      <h2>6. Changes to This Policy</h2>

      <p>
        We reserve the right to modify this Policy at any time, so please review
        it frequently. Changes and clarifications will take effect immediately
        upon their posting on the App. If we make material changes to this
        Policy, we will notify you here that it has been updated, so that you
        are aware of what information we collect, how we use it, and under what
        circumstances, if any, we use and/or disclose it.
      </p>

      <h2>7. Contact Us</h2>

      <p>
        If you have any questions about this Policy or our use of cookies,
        please contact us at{' '}
        <Link href='mailto:dev@zedchamaa.com'>dev@zedchamaa.com</Link>.
      </p>

      <p>Thank you for using our App.</p>
    </div>
  )
}
