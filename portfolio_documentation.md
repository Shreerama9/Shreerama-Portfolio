# Portfolio - Product Documentation

## Overview

**Portfolio** is a modern, high-performance personal branding platform built for Shreerama Shiva Sai Bharadwaja. It showcases professional experience, technical skills, and projects through an interactive, AI-enhanced interface.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution](#solution)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Architecture](#architecture)
6. [API Services](#api-services)
7. [Database Schema](#database-schema)
8. [Frontend Components](#frontend-components)
9. [AI Integration](#ai-integration)
10. [Coding Practices](#coding-practices)
11. [Development Setup](#development-setup)
12. [Deployment](#deployment)

---

## Problem Statement

In a competitive tech landscape, a static resume is often insufficient to demonstrate a developer's full range of skills, personality, and technical depth. Content creators and developers need a centralized, dynamic hub that not only lists achievements but also provides an interactive experience for potential collaborators and employers.

---

## Solution

The Portfolio provides:
- **Interactive Timeline** - A visual journey through professional experience and education.
- **AI Assistant** - A custom-trained chatbot that answers questions about Shreerama's background and projects.
- **Direct Booking** - Integrated call scheduling via Calendly.
- **Modern UI/UX** - A sleek, responsive design with dark mode support and smooth animations.
- **Project Showcase** - Detailed cards for full-stack and AI-driven projects.

---

## Features

### Core Features
| Feature | Description | Status |
|---------|-------------|--------|
| Interactive Timeline | Visual representation of career milestones | ✅ Complete |
| AI Assistant | Claude-powered chatbot for visitor queries | ✅ Complete |
| Project Gallery | Categorized display of technical work | ✅ Complete |
| Contact Form | Direct messaging with Web3Forms integration | ✅ Complete |
| Call Scheduling | Integrated Calendly booking system | ✅ Complete |
| Dark Mode | System-aware and manual theme toggling | ✅ Complete |

### UI/UX Features
| Feature | Description |
|---------|-------------|
| Glassmorphism | Modern, translucent UI elements |
| Motion Animations | Smooth transitions using Motion/React |
| Responsive Layout | Optimized for mobile, tablet, and desktop |
| ASCII Art Welcome | Unique developer-centric console greeting |
| Skip to Content | Accessibility-focused navigation |

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.3 | React Framework (App Router) |
| React | 19.0.0 | UI Library |
| Tailwind CSS | 3.4.1 | Styling |
| Motion | 11.15.0 | Animations |
| Lucide React | 0.545.0 | Icons |
| React Calendar | 6.0.0 | Date management |

### Backend (Next.js API Routes)
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | Runtime |
| OpenRouter API | - | AI Model Gateway (Claude 3.5 Sonnet) |
| Upstash Redis | 1.35.6 | Rate Limiting |
| Web3Forms | - | Contact form processing |

### DevOps
| Technology | Purpose |
|------------|---------|
| Vercel | Hosting & Deployment |
| ESLint | Code Quality |
| Turbopack | Incremental Bundling |

---

## Architecture

```mermaid
graph TD
    User((User)) -->|HTTPS| Frontend[Next.js Frontend]
    Frontend -->|API Call| ChatAPI[/api/chat]
    Frontend -->|API Call| BookingAPI[/api/book-call]
    
    ChatAPI -->|Auth| OpenRouter[OpenRouter / Claude 3.5]
    ChatAPI -->|Rate Limit| Redis[Upstash Redis]
    
    BookingAPI -->|Webhook| ExternalService[Booking Webhook]
    
    subgraph "External Services"
        OpenRouter
        Redis
        ExternalService
        Web3Forms[Web3Forms]
    end
    
    Frontend -.->|Form Submit| Web3Forms
```

---

## API Services

### Chat Assistant (`/api/chat`)
| Method | Description |
|--------|-------------|
| `POST` | Processes user messages using Claude 3.5 Sonnet via OpenRouter. Uses a custom system prompt from `prompts/context.md`. |

### Booking (`/api/book-call`)
| Method | Description |
|--------|-------------|
| `POST` | Handles call booking requests and forwards data to a configured webhook URL. |

---

## Database Schema

### Rate Limiting (Upstash Redis)
The application uses a key-value store to manage API rate limits based on user IP addresses.

```javascript
{
  "ratelimit:ip_address": Number (request count)
}
```

---

## Frontend Components

### Main Sections
| Component | Description |
|-----------|-------------|
| `Navbar.jsx` | Sticky navigation with theme toggle and booking button. |
| `Header.jsx` | Hero section with personal introduction. |
| `About.jsx` | Technical skills and background details. |
| `TimelineTest.jsx` | Interactive experience and education timeline. |
| `Work.jsx` | Project showcase with links and descriptions. |
| `Contact.jsx` | Contact form and social links. |
| `Chatbot.jsx` | Floating AI assistant interface. |

---

## AI Integration

### 1. AI Assistant Service
The chatbot uses **Claude 3.5 Sonnet** (via OpenRouter) to provide intelligent responses.

**Key Features:**
- **Context-Aware:** Reads personal context from `prompts/context.md`.
- **Structured Responses:** Configured to use bullet points for lists and keep answers concise.
- **Fallback Mechanism:** Provides a graceful fallback if the API key is missing.

---

## Coding Practices

### 1. Modern React Patterns
- **Server vs Client Components:** Strategic use of `'use client'` for interactive elements.
- **Hooks:** Extensive use of `useState` and `useEffect` for state management and theme handling.

### 2. Styling & Theming
- **Tailwind CSS:** Utility-first approach for consistent design.
- **Dark Mode:** Implemented using CSS classes and `localStorage` persistence.

### 3. Security & Performance
- **Rate Limiting:** Prevents API abuse using Upstash.
- **Environment Variables:** Secure handling of API keys and webhook URLs.
- **Turbopack:** Faster development builds.

---

## Development Setup

### Prerequisites
- Node.js 18+
- OpenRouter API Key
- Upstash Redis Credentials

### Environment Variables (`.env.local`)
```env
OPENROUTER_API_KEY=your_key_here
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
BOOKING_WEBHOOK_URL=your_webhook_here
```

### Running Locally
```bash
npm install
npm run dev
```

---

## Deployment

The project is optimized for **Vercel**.

1. Connect GitHub repository to Vercel.
2. Configure Environment Variables in Vercel Dashboard.
3. Deploy (automatic on every push to `main`).

---

## License

© 2025 Shreerama Shiva Sai Bharadwaja. All rights reserved.
