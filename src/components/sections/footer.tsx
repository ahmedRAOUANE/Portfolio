import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="container mx-auto p-4 text-center text-sm text-[var(--foreground)]/50">
            <p>&copy; {new Date().getFullYear()} Ahmed RAOUANE. All rights reserved.</p>
            <p>Built with Next.js and Tailwind CSS</p>
        </div>
    </footer>
  )
}

export default Footer