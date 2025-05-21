# Cruncher Nerd AI

Cruncher Nerd AI is a powerful application that crawls websites via sitemaps, processes and vectorizes content, and enables AI-powered question answering based on the crawled data.

## Features

- Google & GitHub OAuth authentication
- Create and manage "Crunchers" for different websites
- Crawl websites via sitemaps and store data as vectors
- Chat with an AI assistant based on the crawled content
- View detailed history of crawl runs
- Secure model key encryption

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- MongoDB for data storage
- Supabase for authentication (in production)
- Vector embeddings for AI-powered search

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (for production)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cruncher-nerd-ai.git
   cd cruncher-nerd-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_MONGODB_URI=your_mongodb_connection_string
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   VITE_ENCRYPTION_KEY=your_secure_encryption_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Azure

This repository includes a GitHub Actions workflow for automatic deployment to Azure. To set it up:

1. Create an Azure App Service
2. Set up the following secrets in your GitHub repository:
   - `AZURE_CREDENTIALS`: Your Azure service principal credentials
   - `AZURE_APP_NAME`: The name of your Azure App Service

The CI/CD pipeline will automatically build and deploy the application when changes are pushed to the main branch.

## Project Structure

- `/src/components`: UI components
- `/src/context`: React context providers
- `/src/hooks`: Custom React hooks
- `/src/pages`: Page components
- `/src/types`: TypeScript type definitions

## Database Schema

### Users Collection
- id (string)
- name (string)
- email (string)
- avatar (string, optional)
- authProvider (string)
- createdAt (date)

### Crunchers Collection
- id (string)
- userId (string)
- name (string)
- modelKey (string, encrypted)
- modelName (string)
- systemPrompt (string)
- sitemapUrl (string)
- documentsEnabled (boolean)
- createdAt (date)
- updatedAt (date)

### CrunchRuns Collection
- id (string)
- cruncherId (string)
- timestamp (date)
- totalPagesCrawled (number)
- totalChunksGenerated (number)
- crawlDuration (number)
- status (string)
- error (string, optional)

### CrunchedData Collection
- id (string)
- cruncherId (string)
- runId (string)
- url (string)
- chunkNumber (number)
- title (string)
- summary (string)
- content (string)
- metadata (object)
- embedding (vector)
- createdAt (date)

## License

MIT
