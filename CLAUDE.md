# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start production server on localhost:3000
- `npm run dev` - Start development server with nodemon auto-reload
- `npm test` - Run Jest test suite with coverage report
- `npm run test:watch` - Run tests in watch mode for active development
- `npm run test:single -- --testNamePattern="pattern"` - Run specific test patterns
- `npm run lint` - Run ESLint code quality checks
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run build` - Run full build pipeline (lint + test + build confirmation)
- `npm run setup` - Initial project setup including dependencies and game data
- `npm run reset-game` - Reset all game data and player progress
- `npm run generate-pets` - Generate additional pet templates for testing

## Architecture Overview

This is a full-stack pet collection game with a modular MVC architecture:

**Backend Structure (`backend/`)**
- `server.js` - Express server with CORS, static file serving, and API routes
- `models/Pet.js` - Pet entity with stats, leveling, feeding, and play mechanics
- `models/Player.js` - Player entity with inventory, achievements, and pet collection
- Game data stored in memory Map structures (designed for easy database migration)

**Frontend Structure (`frontend/`)**
- `index.html` - Single-page application with modal dialogs and tab navigation
- `css/style.css` - Responsive design with gradient backgrounds and animations
- `js/game.js` - Vanilla JavaScript with fetch API for backend communication
- Local storage integration for player session persistence

**Game Mechanics**
- **Pet System**: 4 rarity tiers (common/rare/epic/legendary) with randomized stats
- **Gacha System**: Probability-based pet acquisition (50%/30%/15%/5% distribution)
- **Pet Care**: Feeding increases happiness/energy, playing gains experience but costs energy
- **Player Progression**: Experience-based leveling with coin/gem rewards
- **Achievement System**: Milestone-based unlocks with visual feedback

**Key Technical Patterns**
- **UUID-based entities**: All pets and players use UUID for unique identification  
- **Stat calculation system**: Rarity-based multipliers for pet base statistics
- **Experience curves**: Level-based XP requirements for both pets and players
- **Resource management**: Coin/gem economy with item consumption tracking
- **Error handling**: Comprehensive validation with user-friendly Chinese error messages

**API Design**
- RESTful endpoints following `/api/resource/action` pattern
- Consistent JSON response format with success/error states
- Session-less design using player name as identifier
- Real-time stat updates returned with each action response

## Testing Strategy

- **Unit Tests**: Pet and Player model business logic validation
- **Integration Tests**: Full API endpoint testing with supertest
- **Coverage Reports**: Jest generates coverage for all model methods
- **Mock Data**: Automated test player/pet creation for isolated testing

## Scripts and Utilities

The project includes several utility scripts referenced in package.json:
- `scripts/setup-game.js` - Initial project setup including dependencies and game data
- `scripts/reset-game.js` - Reset all game data and player progress  
- `scripts/generate-pets.js` - Generate additional pet templates for testing

## Data Storage

- **In-Memory Storage**: Game data stored in JavaScript Map structures for development
- **Player Sessions**: Frontend uses localStorage for player session persistence
- **Data Models**: UUID-based identification for all entities (pets and players)
- **Migration Ready**: Architecture designed for easy database migration from memory storage

## Claude Code Command Demonstration

This project serves as a practical demonstration environment for all 38 Claude Code slash commands, with realistic scenarios for each command type including project management, development workflows, code review, and deployment preparation.