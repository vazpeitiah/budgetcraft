import ReactDOM from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

const Portal = ({ children }: PortalProps) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById('portal-target')!
  )
}

export default Portal
