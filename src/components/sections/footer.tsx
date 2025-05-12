import React from 'react'

const Footer = ({ className }: { className: string }) => {
  return (
    <footer>
      <div className={className}>
        <p>&copy; {new Date().getFullYear()} Ahmed RAOUANE. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer