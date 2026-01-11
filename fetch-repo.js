import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const REPO_URL = 'https://api.github.com/repos/Essateric/Essateric/contents';

async function downloadFile(url, filePath) {
  try {
    const response = await axios.get(url, {
      responseType: 'text',
      headers: {
        Accept: 'application/vnd.github.v3.raw'
      }
    });
    
    // Create the directory if it doesn't exist
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(filePath, response.data);
    console.log(`Successfully downloaded: ${filePath}`);
  } catch (error) {
    console.error(`Error downloading ${filePath}:`, error.message);
  }
}

async function fetchRepo(url, targetPath = '.') {
  try {
    console.log(`Fetching from: ${url}`);
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });
    
    const items = response.data;

    for (const item of items) {
      const itemPath = path.join(targetPath, item.name);
      
      if (item.type === 'file') {
        console.log(`Downloading file: ${item.name}`);
        await downloadFile(item.download_url, itemPath);
      } else if (item.type === 'dir') {
        console.log(`Creating directory: ${itemPath}`);
        await fs.mkdir(itemPath, { recursive: true });
        await fetchRepo(item.url, itemPath);
      }
    }
  } catch (error) {
    console.error('Error fetching repository:', error.message);
    throw error;
  }
}

console.log('Starting repository download...');
fetchRepo(REPO_URL)
  .then(() => {
    console.log('Repository download complete!');
    console.log('You can now run "npm run dev" to start the development server');
  })
  .catch(error => {
    console.error('Failed to download repository:', error.message);
    process.exit(1);
  });