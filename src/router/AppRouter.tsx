import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ROUTES } from 'utils/config'
import AccountPage from 'views/Accounts/AccountPage'
import CategoriesPage from 'views/Categories/CategoriesPage'
import HomePage from 'views/Home/HomePage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.account} element={<AccountPage />} />
        <Route path={ROUTES.category} element={<CategoriesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
