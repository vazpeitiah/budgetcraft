import { Coins } from 'iconoir-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import VerticalNavbar from 'components/Navbar/VerticalNavbar/VerticalNavbar'
import { ROUTES } from 'utils/config'

import styles from './appframe.module.css'

interface AppFrameProps {
  children?: React.ReactNode
}

const AppFrame = ({ children }: AppFrameProps) => {
  const { t } = useTranslation()

  return (
    <main className={styles['app-container']}>
      <section className={styles['app']}>
        <nav className={styles['app__nav']}>
          <h1 className={styles['app__nav__header']}>
            <Coins className="text-base" />
            <Link to={ROUTES.home}>{t('app.title')}</Link>
          </h1>
          <ul className="navbar-end flex gap-2">
            <li>
              <Link to={ROUTES.category}>
                <button className="btn btn-ghost text-xs">
                  {t('categories.title')}
                </button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.account}>
                <button className="btn btn-ghost text-xs">
                  {t('accounts.title')}
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <section className={styles['app__content']}>{children}</section>
      </section>
    </main>
  )
}

export default AppFrame
