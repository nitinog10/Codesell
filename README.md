# Codesell

E-commerce platform for selling source code with GitHub-native authentication.

## About

Codesell is an e-commerce platform designed for developers to buy and sell source code. It leverages modern web development practices and tools to provide a seamless experience.

## Features

- GitHub-native authentication
- Source code marketplace
- Secure transactions
- User-friendly interface
- Email notifications
- API for backend interactions
- Unit testing with Vitest
- Type-safe development with TypeScript

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Vitest

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nitinog10/Codesell.git
    cd Codesell
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Copy `.env.example` to `.env` and configure your environment variables.
4. Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

- `docs/`: Documentation for backend API and testing guidelines.
- `emails/`: React components for email templates.
- `nitinog10-Codesell-0a6593f/`: Main application directory with additional configuration and source code.
- `src/`: Core logic including pages, API routes, and components.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT

## Code Improvements Applied

- Added regression tests for high-risk files: `src/lib/utils.ts`, `src/lib/validators.ts`, `nitinog10-Codesell-1a39988/src/lib/utils.ts`.
- Proposed extracting shared utility code into a dedicated module to reduce coupling.
- Updated documentation by re-indexing and regenerating walkthroughs/diagrams post structural changes.
