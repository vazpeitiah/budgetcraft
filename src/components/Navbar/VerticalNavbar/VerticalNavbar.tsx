import { Coins } from 'iconoir-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from 'utils/config'

import styles from './verticalnavbar.module.css'

const VerticalNavbar = () => {
  const { t } = useTranslation()
  return (
    <div>
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <h1 className={styles['ynav__header']}>
        <Coins className="text-base" />
        <Link to={ROUTES.home}>{t('app.title')}</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={ROUTES.home}>Transacciones</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default VerticalNavbar
