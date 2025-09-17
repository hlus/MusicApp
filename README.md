# MusicApp 🎵

A React Native music streaming app built with Expo that allows users to search, play, and manage their favorite tracks.

## Features

- **Audio Playback**: Play music previews with a custom audio player
- **Favorites Management**: Save and manage favorite tracks locally

## Tech Stack

### Core Framework
- **Expo** - React Native framework for cross-platform development
- **Expo Router** - File-based routing system
- **React Native** - Mobile app development framework

### Data & State Management
- **Deezer API** - Music streaming and search API
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client for API requests

### Database & Storage
- **SQLite** - Local database for storing favorite tracks
- **Drizzle ORM** - Type-safe database queries and migrations
- **Expo SQLite** - SQLite integration for Expo

### Audio & Media
- **React Native Track Player** - Advanced audio playback capabilities
- **Expo Image** - Optimized image loading and caching

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on your preferred platform**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go

## Development

### Database Migrations
```bash
# Generate migration
npx drizzle-kit generate

# Run migrations
npx drizzle-kit push
```

### Linting
```bash
npm run lint
```

## Database Schema

The app uses SQLite with Drizzle ORM to store:
- **Favorite Tracks**: User's saved tracks with metadata
- **Track Details**: Cached track information for offline access

## Audio Features

- **Preview Playback**: 30-second track previews
- **Background Playback**: Continues playing when app is backgrounded
- **Media Controls**: Lock screen and notification controls
- **Progress Tracking**: Real-time playback progress

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Track Player](https://github.com/doublesymmetry/react-native-track-player)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Deezer API](https://developers.deezer.com/)
