import React from 'react'

function Repository() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Repository Content</h2>
      <div className="prose max-w-none">
        <p>This repo is part of Git Integration & Wix CLI, a set of tools that allows you to write, test, and publish code for your Wix site locally on your computer.</p>
        
        <h3 className="text-lg font-semibold mt-4">Set up this repository in your IDE</h3>
        <p>Before getting started, make sure you have the following things installed:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Git</li>
          <li>Node, version 14.8 or later</li>
          <li>npm or yarn</li>
          <li>An SSH key added to your GitHub account</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">Setup Steps:</h3>
        <ol className="list-decimal pl-5 mt-2">
          <li>Open your terminal and navigate to where you want to store the repo</li>
          <li>Clone the repo by running git clone &lt;your-repository-url&gt;</li>
          <li>Navigate to the repo's directory</li>
          <li>Install the repo's dependencies</li>
          <li>Install the Wix CLI globally</li>
        </ol>
      </div>
    </div>
  )
}

export default Repository