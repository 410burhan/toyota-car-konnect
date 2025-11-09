# Toyota Car Konnect

A modern web application for exploring and configuring Toyota vehicles.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

### Environment Variables

This project requires a Google Gemini API key for the chatbot feature.

1. **Get your API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

2. **Create a `.env` file:**
   - In the root directory, create a file named `.env`
   - Add the following line:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key

3. **Example `.env` file:**
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### Running the Application

After setting up your `.env` file:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Important Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- The `.env` file is for local development only
- If you're sharing the project, create a `.env.example` file with placeholder values
- You must restart the dev server after creating or modifying the `.env` file

## Troubleshooting

### "API key is not set" Error

If you see this error:
1. Make sure you've created a `.env` file in the root directory
2. Verify the variable name is exactly `VITE_GEMINI_API_KEY` (case-sensitive)
3. Ensure there are no spaces around the `=` sign
4. Restart your development server after creating/modifying the `.env` file

### API Key Invalid Error

If you see an "API key may be invalid" error:
1. Verify your API key is correct in Google AI Studio
2. Check if your API key has expired or been revoked
3. Generate a new API key if needed

## Deployment

### Important Security Note

⚠️ **Client-side API keys are exposed in the browser bundle.** While your `.env` file won't be committed, the API key will be visible in the built JavaScript files. To protect your API key:

1. **Set API key restrictions in Google AI Studio:**
   - Go to [Google AI Studio API Keys](https://aistudio.google.com/app/apikey)
   - Click on your API key
   - Under "API restrictions", add your domain(s)
   - Under "Application restrictions", set HTTP referrer restrictions

2. **Consider usage limits** in Google Cloud Console to prevent abuse

### Deployment Options

#### Option 1: Vercel (Recommended - Easiest)

1. **Push your code to GitHub** (make sure `.env` is NOT committed)

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - In "Environment Variables", add:
     - Name: `VITE_GEMINI_API_KEY`
     - Value: Your API key
   - Click "Deploy"

3. **Your site will be live!** Vercel automatically builds and deploys on every push to main.

#### Option 2: Netlify

1. **Push your code to GitHub**

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - In "Build settings":
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Show advanced" → "New variable":
     - Key: `VITE_GEMINI_API_KEY`
     - Value: Your API key
   - Click "Deploy site"

#### Option 3: GitHub Pages (Using GitHub Actions)

1. **Set up GitHub Secrets:**
   - Go to your repository on GitHub
   - Click "Settings" → "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your API key
   - Click "Add secret"

2. **Enable GitHub Pages:**
   - Go to "Settings" → "Pages"
   - Under "Source", select "GitHub Actions"
   - Save

3. **Push to main branch:**
   - The GitHub Action will automatically build and deploy
   - Your site will be available at: `https://[your-username].github.io/[repository-name]/`

4. **Note:** If your repository name is not the default, you may need to update the base path in `vite.config.ts`

### After Deployment

1. **Test your deployed site** to ensure the chatbot works
2. **Set up API key restrictions** in Google AI Studio to limit usage to your domain
3. **Monitor usage** in Google Cloud Console

### Troubleshooting Deployment

- **API key not working in production:**
  - Verify the environment variable is set correctly in your deployment platform
  - Check that the variable name is exactly `VITE_GEMINI_API_KEY`
  - Rebuild/redeploy after adding environment variables

- **GitHub Pages 404 errors:**
  - Make sure the base path in `vite.config.ts` matches your repository name
  - Check that the GitHub Action workflow completed successfully

- **Build fails:**
  - Check the build logs in your deployment platform
  - Ensure all dependencies are in `package.json`
  - Verify Node.js version compatibility
