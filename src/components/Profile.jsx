import React from 'react'

function Profile() {
  return (
    <div className="mb-8">
      <div className="flex items-start space-x-4">
        <img
          src="https://user-images.githubusercontent.com/89579857/185785022-cab37bf5-26be-4f11-85f0-1fac63c07d3b.png"
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">Essateric</h2>
          <p className="text-gray-600">Git Integration & Wix CLI Repository</p>
        </div>
      </div>
    </div>
  )
}

export default Profile