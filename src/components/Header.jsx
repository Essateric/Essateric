import React from 'react'

function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="https://user-images.githubusercontent.com/89579857/185785022-cab37bf5-26be-4f11-85f0-1fac63c07d3b.png" 
            alt="Logo" 
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold">Git Integration & Wix CLI</h1>
        </div>
      </div>
    </header>
  )
}

export default Header