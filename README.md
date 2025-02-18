# 🚀 Cryptocurrency Tracker

A modern cryptocurrency tracking application built with Next.js and TypeScript that allows users to monitor real-time cryptocurrency prices and market data.

## ✨ Features

### Core Features

- 💹 Search and track top 50 cryptocurrencies by market cap
- 💰 Real-time price updates in multiple currencies (USD, EUR, GBP, CHF, INR)
- 📊 Detailed view for each cryptocurrency
- 📝 Recently viewed cryptocurrencies history
- 📱 Responsive design for all device sizes
- 📊 Analytics visualisations for the data

### Technical Features

- 🔄 Server-side rendering with Next.js 14
- 📘 Type safety with TypeScript
- ⚡ Real-time data fetching with React Query
- £ Offline data caching - works without internet access
- 🛡️ Error handling with Error Boundaries
- ✅ Comprehensive test coverage
- 🔨 API mocking for development and testing

## 🛠️ Tech Stack

| Technology   | Purpose          |
| ------------ | ---------------- |
| Next.js 14   | Framework        |
| TypeScript   | Language         |
| Tailwind CSS | Styling          |
| React Query  | State Management |
| Jest & RTL   | Testing          |
| MSW          | API Mocking      |
| CoinGecko    | API              |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```
2. npm install
3. npm run dev

The application will be available at

```bash
http://localhost:3000
```

# 🏗️ Build for Production

```bash
npm run build
npm start
🧪 Testing
Running Tests
bashCopy# Run all tests
npm test
```

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage

# Testing Stack

🧪 Jest for test running and assertions
🔍 React Testing Library for component testing
🌐 MSW (Mock Service Worker) for API mocking
🧬 Jest DOM for DOM testing utilities

⚠️ Error Handling
The application implements comprehensive error handling:

🔄 API error handling with custom error classes
🌐 Network error detection and recovery
⏳ Rate limiting handling
✅ Validation error handling
🛡️ Error boundaries for component errors
⌛ Loading states and fallbacks

🛠️ Development Features

📝 ESLint configuration for code quality
🎨 Prettier for code formatting
📘 TypeScript for type safety
🔄 Husky for pre-commit hooks

# API Mocking

🔄 MSW for API mocking in development
📊 Realistic data simulation
⚠️ Error scenario testing
🌐 Network condition simulation

📁 Project Structure

```bash
crypto-tracker/
├── src/
│ ├── app/
│ │ ├── page.tsx
│ │ ├── layout.tsx
│ │ └── globals.css
│ ├── components/
│ │ ├── SearchBar.tsx
│ │ ├── CryptoList.tsx
│ │ ├── CryptoCard.tsx
│ │ ├── CurrencySelector.tsx
│ │ ├── RecentlyViewed.tsx
│ │ └── DetailView.tsx
│ ├── lib/
│ │ ├── api.ts
│ │ ├── types.ts
│ │ └── utils.ts
│ ├── hooks/
│ │ ├── useCryptoData.ts
│ │ ├── useRecentlyViewed.ts
│ │ └── useCurrencyConverter.ts
│ └── tests/
│ ├── components/
│ └── hooks/
└── package.json
```

📜 Available Scripts

```bash
npm run dev - Start development server
npm run build - Build for production
npm start - Start production server
npm test - Run tests
npm run lint - Run ESLint
npm run format - Run Prettier
```

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

🔄 CI/CD
The project uses GitHub Actions for CI/CD:

🔄 Automated testing on PRs
📝 Lint checking
🏗️ Build verification
🧪 Type checking
