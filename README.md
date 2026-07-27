# Run and deploy the app

This repository contains everything needed to run the app locally.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if you use Gemini features)
3. Run the app in development:
   `npm run dev`

## Production

1. Build the app:
   `npm run build`
2. Start the production server:
   `npm start`

Notes:
- Environment variables should be provided in the environment or a .env file and must include any API keys required by your app.
- The provided server (server.js) serves the built `dist` folder for production. Adjust or replace with your preferred hosting (Cloud Run, Netlify, Vercel, etc.).
