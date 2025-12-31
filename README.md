# Rigma

A modern UI prototype development and showcase platform built with Next.js. Rigma helps developers create, version, and manage React UI components and prototypes with automatic screenshot generation and live previews.

## ✨ Features

- **🎨 Interactive UI Prototypes**: Create and showcase React components with live previews
- **📸 Automatic Screenshots**: Generate screenshots of your prototypes using Puppeteer
- **🔄 Version Management**: Track different versions of your prototypes with descriptions
- **📱 Responsive Design**: Grid and list views for optimal prototype browsing
- **⚡ Hot Reload**: Real-time updates during development
- **🖼️ Visual Gallery**: Browse all your prototypes with visual previews
- **📝 Monaco Editor Integration**: Built-in code editing capabilities
- **🎯 Component Duplication**: Easy prototype copying and versioning

## 🏗️ Architecture

Rigma is structured around a page-based system where each "page" represents a UI prototype:

```
src/app/pages/[pageId]/
├── page.tsx              # Main page info
└── versions/
    ├── v1/page.tsx      # Version 1 of the prototype
    ├── v2/page.tsx      # Version 2 of the prototype
    └── ...
```

- **Pages**: Individual UI prototypes (e.g., `agent-comms`, `dynamic-island`, `portfolio`)
- **Versions**: Different iterations of each prototype
- **Screenshots**: Automatically generated previews stored in `public/screenshots/`
- **Components**: Reusable UI components and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rigma
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the prototype gallery

### Development Mode

In development mode, you can:
- Create new prototypes using the "New Page" button
- Edit existing prototypes with hot reload
- Duplicate prototypes to create new versions
- Delete prototypes you no longer need

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for smooth transitions
- **Screenshots**: [Puppeteer](https://puppeteer.io/) for automated browser screenshots
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Icons**: [Heroicons](https://heroicons.com/)

## 📁 Project Structure

```
├── public/
│   ├── screenshots/        # Auto-generated prototype screenshots
│   └── assets/            # Static images and fonts
├── scripts/
│   └── build-pages.ts     # Static page generation for production
├── src/
│   ├── app/
│   │   ├── api/           # API routes for page management
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # UI prototype definitions
│   │   └── ...
│   ├── components/        # Core application components
│   ├── lib/              # Utilities (screenshot, file operations)
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript definitions
```

## 🔧 Build Process

Rigma includes a custom build process that:

1. **Generates static page data** (`scripts/build-pages.ts`)
2. **Creates production-ready screenshots** for all prototypes
3. **Optimizes assets** and bundles for deployment

```bash
npm run build  # Runs page generation + Next.js build
```

## 🎨 Creating Prototypes

1. In development mode, click "New Page" to create a prototype
2. Navigate to your new prototype and edit the React component
3. The prototype will automatically appear in the gallery with a screenshot
4. Use the "Copy" feature to create variations and versions

### Example Prototype Structure

```tsx
import React from 'react';

export default function MyPrototype() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My UI Prototype</h1>
      <p>Interactive components go here...</p>
    </div>
  );
}
```

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com):

1. Connect your repository to Vercel
2. Set up the build command: `npm run build`
3. Deploy with automatic preview builds for pull requests

For other deployment platforms, ensure the build process runs `tsx scripts/build-pages.ts` before `next build`.

## 📋 Roadmap

- [ ] **Production Mode**: Disable editing features for deployed showcases
- [ ] **Generalized Setup**: Make it easy to fork and customize for different teams
- [ ] **File Renaming**: Frontend interface for renaming prototype files
- [ ] **Component Library**: Extract and reuse components across prototypes
- [ ] **Collaboration**: Multi-user editing and commenting
- [ ] **Export Options**: Export prototypes as standalone components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source. Please check the repository for license details.
