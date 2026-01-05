# eelectron-forge

A modern, macOS-styled todo/reminder application built with Electron, Vite, and TypeScript.

## Features

- **Todo Management**: Add, edit, delete, and mark todos as complete
- **Smart Filtering**: View todos by All, Active, Completed, Today, or Flagged
- **Flagging System**: Mark important todos with flags for quick access
- **Persistent Storage**: Todos are saved to local storage automatically
- **macOS Design**: Native macOS-style UI with smooth animations
- **Keyboard Shortcuts**: Press Enter to quickly add new todos
- **Responsive Layout**: Sidebar navigation with clean content area

## Tech Stack

- **Electron**: 39.2.7 - Cross-platform desktop application framework
- **Electron Forge**: 7.10.2 - Complete tooling for Electron applications
- **Vite**: 5.4.21 - Next-generation frontend build tool
- **TypeScript**: 4.5.4 - Type-safe JavaScript
- **ESLint**: 8.57.1 - Code linting and formatting

## Project Structure

```
eelectron-forge/
├── src/
│   ├── main.ts           # Electron main process entry point
│   ├── preload.ts        # Preload script for IPC bridge
│   ├── renderer.ts      # Renderer process entry point
│   ├── types.ts          # TypeScript type definitions
│   ├── todo.ts           # Todo application logic
│   └── index.css         # macOS-styled CSS
├── index.html            # Main HTML template
├── forge.config.ts       # Electron Forge configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.main.config.ts   # Vite config for main process
├── vite.preload.config.ts # Vite config for preload script
└── vite.renderer.config.ts # Vite config for renderer process
```

## Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd eelectron-forge
```

2. Install dependencies:
```bash
npm install
```

## Development

### Start Development Server

```bash
npm run start
```

This will:
- Launch the Electron app in development mode
- Enable hot-reloading for the renderer process
- Open DevTools automatically

### Lint Code

```bash
npm run lint
```

## Building

### Package Application

```bash
npm run package
```

This creates an executable in the `out/` directory without distribution formats.

### Create Distribution

```bash
npm run make
```

This creates distribution packages in the `out/make/` directory:

- **macOS**: `.zip` file (via MakerZIP)
- **Windows**: `.exe` installer (via MakerSquirrel)
- **Linux**: `.deb` and `.rpm` packages (via MakerDEB and MakerRPM)

### Publish

```bash
npm run publish
```

Publishes the application to a configured release channel (requires additional setup).

## Application Architecture

### Main Process (`src/main.ts`)

The main process manages application lifecycle and creates browser windows:

- **Window Management**: Creates and manages the main application window (800x600)
- **Lifecycle Events**: Handles app ready, window-all-closed, and activate events
- **File Loading**: Loads either development server URL or packaged HTML file
- **DevTools**: Automatically opens DevTools in development mode

### Preload Script (`src/preload.ts`)

Currently minimal - designed for secure IPC communication between main and renderer processes.

### Renderer Process (`src/renderer.ts` + `src/todo.ts`)

The renderer process manages the UI and application logic:

- **TodoApp Class**: Encapsulates all todo management functionality
- **DOM Manipulation**: Direct DOM manipulation without frameworks
- **Local Storage**: Persists todos and filter state to localStorage
- **Event Handling**: Manages user interactions (clicks, keypresses)

### Type Definitions (`src/types.ts`)

```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  flagged: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed' | 'today' | 'flagged';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
```

### Styling (`src/index.css`)

macOS-inspired design system with:

- **System Colors**: Native macOS color palette
- **Typography**: SF Pro font family with system fallbacks
- **Spacing**: 8pt grid system for consistent spacing
- **Components**: Custom checkboxes, buttons, and input fields
- **Transitions**: Smooth animations (0.15s - 0.25s)
- **Accessibility**: Focus styles and reduced motion support
- **Dark Mode**: Prepared for future dark mode implementation

## Electron Forge Configuration

### Makers

- **MakerSquirrel**: Windows installer via Squirrel
- **MakerZIP**: macOS distribution (Darwin platform only)
- **MakerDeb**: Debian package for Linux
- **MakerRpm**: RPM package for Linux

### Plugins

- **VitePlugin**: Integrates Vite for building main, preload, and renderer processes
- **FusesPlugin**: Configures Electron Fuses for security and behavior:
  - Disables Node.js runtime in renderer
  - Enables cookie encryption
  - Disables Node CLI inspection arguments
  - Enforces ASAR integrity validation
  - Only loads app from ASAR

### Packager Config

- **asar**: Enabled for app packaging

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server with hot-reload |
| `npm run package` | Package application for distribution |
| `npm run make` | Create distribution packages |
| `npm run publish` | Publish to release channel |
| `npm run lint` | Run ESLint for code quality checks |

## Browser Support

This is an Electron application and supports all platforms that Electron supports:

- **macOS**: 10.15 (Catalina) and later
- **Windows**: Windows 10 and later
- **Linux**: Latest distributions

## Security Features

The application uses Electron Fuses for enhanced security:

- **No Node in Renderer**: Prevents Node.js runtime access in renderer process
- **Cookie Encryption**: Enables encrypted cookie storage
- **ASAR Enforcement**: Only loads application code from ASAR archive
- **Integrity Validation**: Validates ASAR archive integrity on startup
- **No CLI Inspect**: Disables Node CLI inspection arguments

## Future Enhancements

- [ ] Multi-list support
- [ ] Due dates and reminders
- [ ] Data synchronization across devices
- [ ] Cloud backup
- [ ] Keyboard shortcuts for all actions
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Export/Import todos

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Deer404**
- Email: 919187569@qq.com

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Packaged with [Electron Forge](https://www.electronforge.io/)
- Styled with macOS design guidelines
- Icons from standard SVG sets

## Troubleshooting

### Development Server Won't Start

If the development server fails to start:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf .vite`

### Build Failures

If the build fails:
1. Ensure all dependencies are installed
2. Check for TypeScript errors: `npx tsc --noEmit`
3. Verify Forge configuration in `forge.config.ts`

### macOS Gatekeeper Issues

If you see "App is damaged" on macOS:
```bash
xattr -cr /path/to/app.app
```

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Forge Documentation](https://www.electronforge.io/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
