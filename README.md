# CryptoMap - Global Crypto Exchange Locator

CryptoMap is a web application that helps users find cryptocurrency exchanges and ATMs worldwide. Users can locate the nearest exchange points, view real-time rates, read reviews, and get directions.

## Features

- 🗺️ Interactive map showing crypto exchanges and ATMs
- 📍 Real-time geolocation to find nearby exchange points
- 💱 Live exchange rates for various cryptocurrencies
- ⭐ User reviews and ratings system
- 🔔 Notifications for rate changes and status updates
- 🌐 Multi-language support
- 🔒 Secure user authentication

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Maps**: Leaflet
- **Form Validation**: Zod
- **UI Components**: Headless UI

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB database
- Google Maps API key (for geocoding)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cryptomap.git
   cd cryptomap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DATABASE_URL="your-mongodb-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
└── types/                # TypeScript type definitions
```

## API Routes

- `POST /api/auth/signup` - User registration
- `GET /api/exchange-points` - List exchange points
- `POST /api/exchange-points` - Create exchange point
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/cryptomap](https://github.com/yourusername/cryptomap)
