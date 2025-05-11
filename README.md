# Live Collaborative Editor

A modern, real-time collaborative text editor built with Next.js, TypeScript, TailwindCSS, Froala Editor, and Y.js (WebRTC). Designed for professional use and internship submissions.

## Features

- **Session Management**: Create or join collaborative sessions (rooms) with unique IDs
- **Real-Time Collaboration**: Multiple users can edit the same document simultaneously, with instant updates
- **User Identification**: Each user has a unique name and color, visible to all
- **Save Button**: Download the current document as HTML at any time
- **Modern, Responsive UI**: Beautiful, interactive, and professional interface
- **No Backend Required**: Peer-to-peer sync using Y.js and WebRTC

## Demo

![Collaborative Editor Demo](public/demo-screenshot.png)

## Tech Stack

- **Next.js** (React framework)
- **TypeScript** (type-safe code)
- **TailwindCSS** (utility-first styling)
- **Froala Editor** (rich text editing)
- **Y.js** (real-time CRDT collaboration)
- **Y-WebRTC** (peer-to-peer sync)

## How to Run the Project

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/collaborative-editor.git
   cd collaborative-editor
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

### Testing Collaboration
1. Open the app in two or more browser tabs/windows (or on different devices)
2. Log in with different usernames/colors
3. Create or join the same session (room) using a session ID
4. Edit the document in one tab and see changes appear instantly in all others
5. Use the Save button to download the document as HTML

## How It Works

- **Session Management**: Each session (room) is a unique collaborative document. Share the session ID to collaborate with others.
- **Real-Time Collaboration**: Y.js and WebRTC enable instant, peer-to-peer updates with no backend or database.
- **User Presence**: See all active users in the session, each with a unique color and name.
- **Save Button**: Download the current document as HTML at any time.
- **Modern UI**: Built with TailwindCSS for a beautiful, professional look.

## Project Structure
- `/app/components/Editor.tsx`: The collaborative editor
- `/app/components/Login.tsx`: User login
- `/app/components/SessionManager.tsx`: Session creation/joining
- `/app/page.tsx`: Main page and UI logic
- `/app/layout.tsx`: Root layout

## License
MIT

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [Froala Editor](https://froala.com/wysiwyg-editor/)
- [Y.js](https://yjs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

**This project is designed to impress for frontend developer roles. Good luck!**
