# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a fully functional contact form with email integration, interactive resume preview and downloads, and automated Medium blog articles integration.

## ✨ Features

- 🎨 Modern, responsive design with dark mode support
- ⚡ Built with Vite for lightning-fast development
- 📱 Mobile-friendly and responsive on all devices
- 📄 **Interactive Resume Page**: Live PDF preview directly in-browser, with download cards for PDF and editable Word (DOCX) formats
- 📝 **Automated Medium Blog Feed**: Directly pulls, parses, and displays your latest Medium articles (with custom CDATA and HTML entity decoding)
- 📧 Working contact form with email integration (Nodemailer)
- 🎯 TypeScript for type safety and complete autocomplete
- 🎭 Tailwind CSS for styling
- 🚀 Optimized for Vercel deployment

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Email**: Nodemailer (SMTP)
- **API Handlers**: Express (Local development) & Vercel serverless functions (Production)

## 📋 Prerequisites

- Node.js 18+ and npm
- SMTP credentials (for contact form email sending)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
TARGET_EMAIL=recipient@gmail.com
```

> **Note**: For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### 4. Start development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000** (proxied to Vite on **5173**).

## 🏗️ Development Architecture

### Local Development

The project uses a custom Express dev server (`dev-server.js`) that:
- Handles `/api/contact` POST requests locally with Nodemailer.
- Handles `/api/medium` GET requests to fetch and parse the Medium RSS Feed on the fly.
- Proxies all other requests to the Vite dev server (port 5173).
- Configured with Vite proxy fallback to allow seamless access through either port `3000` or `5173`.

```
Browser → Express (port 3000) ↔ Vite (port 5173)
                ↓
       Local API Handlers (Contact & Medium Feed)
```

### Production (Vercel)

In production, Vercel automatically uses the serverless functions at:
- `api/contact.ts` - Serverless function for contact form
- `api/medium.ts` - Serverless function to fetch and parse Medium feed (with 1-hour CDN caching enabled)

## 📧 Contact Form

The contact form is fully functional and sends emails using SMTP. It validates input, handles errors gracefully, and provides user feedback.

**Features:**
- ✅ Server-side email sending
- ✅ Form validation
- ✅ Error handling
- ✅ Success notifications
- ✅ Works in both dev and production

## 📦 Available Scripts

- `npm run dev` - Start development server (Vite + Express)
- `npm run dev:vite` - Start only Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment to Vercel

### 1. Configure Environment Variables

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all variables from your `.env` file:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `TARGET_EMAIL`

### 2. Deploy

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to production
vercel --prod
```

Or simply push to your main branch if auto-deployment is enabled.

### Vercel Configuration

The project is configured to work seamlessly with Vercel:
- `api/contact.ts` - Serverless function for contact form
- `api/medium.ts` - Serverless function for Medium feed
- Vite build output automatically detected
- Environment variables loaded from Vercel dashboard

## 📁 Project Structure

```
portfolio/
├── api/
│   ├── contact.ts          # Vercel serverless function for contact form (production)
│   └── medium.ts           # Vercel serverless function for Medium feed (production)
├── public/
│   └── resume/
│       ├── Harsh_Dadiya_Resume.pdf    # PDF Resume file
│       └── Harsh_Dadiya_Resume.docx   # Word Resume file
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx      # Desktop & Mobile Navbar (routes to /resume)
│   │   └── Footer.tsx      # Global footer
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Portfolio Home with experience/education lists
│   │   ├── About.tsx       # About page with detailed bio, skills grid, competencies
│   │   ├── Projects.tsx    # List of projects
│   │   ├── Achievements.tsx# List of achievements
│   │   ├── Blog.tsx        # Medium feed rendering (with CDATA and entity cleaning)
│   │   ├── Contact.tsx     # Contact form page
│   │   └── Resume.tsx      # Interactive resume page with embedded PDF & downloads
│   ├── utils/
│   │   └── animations.ts   # Shared motion animation configurations
│   ├── App.tsx            # Main app component & routes
│   └── main.tsx           # App entry point
├── dev-server.js          # Express dev server (local only)
├── .env                   # Environment variables (gitignored)
└── package.json           # Dependencies and scripts
```

## 🔧 Troubleshooting

### Contact form not working locally?

Make sure you're running `npm run dev` (not `npm run dev:vite`) to start the Express dev server that handles API requests.

### Email not sending?

1. Verify SMTP credentials in `.env` file.
2. For Gmail, ensure you're using an App Password, not your regular password.
3. Check firewall/antivirus isn't blocking SMTP connections.
4. Review server logs for detailed error messages.

### Medium Blog articles not loading?

1. Check your internet connection (the API calls the live Medium endpoint).
2. Ensure you have run `npm run dev` so the backend server (port 3000) is running to fetch and parse the feed.
3. Verify your Medium handle in `dev-server.js` and `api/medium.ts` is correct (`@harshdadiya`).

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Harsh Dadiya**
- Email: harshdadiya@gmail.com
- LinkedIn: [harsh-dadiya](https://www.linkedin.com/in/harsh-dadiya/)
- GitHub: [Dadiya-Harsh](https://github.com/Dadiya-Harsh)

---

Built with ❤️ using React + Vite + TypeScript
