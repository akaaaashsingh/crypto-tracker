Cryptocurrency Tracker
A modern cryptocurrency tracking application built with Next.js and TypeScript that allows users to monitor real-time cryptocurrency prices and market data.
Features
Core Features

Search and track top 50 cryptocurrencies by market cap
Real-time price updates in multiple currencies (USD, EUR, GBP, CHF, INR)
Detailed view for each cryptocurrency
Recently viewed cryptocurrencies history
Responsive design for all device sizes

Technical Features

Server-side rendering with Next.js 14
Type safety with TypeScript
Real-time data fetching with React Query
Error handling with Error Boundaries
Comprehensive test coverage
API mocking for development and testing
Offline app data caching works without internet connection

Tech Stack

Framework: Next.js 14
Language: TypeScript
Styling: Tailwind CSS
State Management: React Query
Testing: Jest, React Testing Library, MSW
API: CoinGecko
Development Tools: ESLint, Prettier

Getting Started
Prerequisites

Node.js 18.17 or later
npm or yarn

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker

Install dependencies:

bashCopynpm install

Create a .env.local file in the root directory:

envCopyNEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

Start the development server:

bashCopynpm run dev
The application will be available at http://localhost:3000
Build for Production
bashCopynpm run build
npm start
Testing
Running Tests
bashCopy# Run all tests
npm test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage
Testing Stack

Jest for test running and assertions
React Testing Library for component testing
MSW (Mock Service Worker) for API mocking
Jest DOM for DOM testing utilities

Error Handling
The application implements comprehensive error handling:

API error handling with custom error classes
Network error detection and recovery
Rate limiting handling
Validation error handling
Error boundaries for component errors
Loading states and fallbacks

Development Features
Code Quality

ESLint configuration for code quality
Prettier for code formatting
TypeScript for type safety
Husky for pre-commit hooks

API Mocking

MSW for API mocking in development
Realistic data simulation
Error scenario testing
Network condition simulation

Project Structure
Copycrypto-tracker/
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
Available Scripts
bashCopynpm run dev # Start development server
npm run build # Build for production
npm start # Start production server
npm test # Run tests
npm run lint # Run ESLint
npm run format # Run Prettier
Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Future Improvements

Add price alerts functionality
Implement portfolio tracking
Add price history charts
Support for more currencies
Add cryptocurrency news feed
Implement user authentication
Add favorite cryptocurrencies
Implement push notifications
Add market analysis tools
Support for more cryptocurrencies

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Acknowledgments

CoinGecko API for cryptocurrency data
Next.js team for the amazing framework
Testing utilities maintainers
Open source community

Contact
Your Name - @yourusername
Project Link: https://github.com/yourusername/crypto-tracker
