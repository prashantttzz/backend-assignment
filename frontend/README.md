# Role-Based Task Management Dashboard

A professional, feature-rich task management system built with Next.js 16, TypeScript, and shadcn/ui components. Supports two user roles: USER and ADMIN with distinct dashboards and capabilities.

## Features

### Authentication
- User registration and login with JWT token-based authentication
- Secure token storage in localStorage
- Automatic role-based redirects after login
- Protected routes that redirect unauthorized users to login

### User Dashboard
- **Dashboard Overview**: View task statistics and progress
  - Total tasks count
  - Completed tasks count
  - Completion percentage
- **Task Management**:
  - Create new tasks with title and description
  - Edit existing tasks
  - Mark tasks as completed/pending
  - Delete tasks
  - Filter tasks by status

### Admin Dashboard
- **System Overview**: High-level statistics
  - Total users
  - Total tasks
  - Completed tasks count
- **User Management**:
  - View all system users
  - Promote/demote users to/from admin role
  - Delete users
- **Task Management**:
  - View all tasks in the system with task owner information
  - Update task status
  - Delete tasks
- **Task Assignment**:
  - Create and assign tasks directly to specific users
  - Select from dropdown list of all users

## Project Structure

```
app/
├── layout.tsx                      # Root layout with theme and toaster
├── page.tsx                        # Home page (redirects based on auth)
├── logout/page.tsx                # Logout handler
├── (auth)/                         # Authentication routes
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── register/page.tsx
└── (dashboard)/                    # Protected dashboard routes
    ├── layout.tsx                  # Dashboard layout with sidebar
    ├── page.tsx                    # Redirect based on role
    ├── user/
    │   ├── page.tsx               # User dashboard
    │   └── tasks/page.tsx         # User tasks list with filters
    └── admin/
        ├── page.tsx               # Admin dashboard
        ├── users/page.tsx         # User management
        ├── tasks/page.tsx         # All tasks management
        └── assign-task/page.tsx   # Assign task form

components/
├── auth/
│   ├── login-form.tsx             # Login form with validation
│   └── register-form.tsx          # Registration form with validation
├── dashboard/
│   ├── sidebar.tsx                # Navigation sidebar
│   └── topbar.tsx                 # Top navigation bar
└── tasks/
    ├── task-card.tsx              # Task display card
    ├── task-form.tsx              # Create/edit task modal
    └── task-table.tsx             # (Optional) Table view for tasks

lib/
├── api-client.ts                  # API service layer with typed endpoints
├── auth.ts                        # Authentication utilities
└── types.ts                       # TypeScript type definitions
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: react-hook-form + Zod validation
- **Notifications**: Sonner
- **Authentication**: JWT with localStorage
- **API Communication**: Fetch API with custom wrapper

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

The application communicates with a backend API using the endpoints defined in `lib/api-client.ts`. All requests automatically include JWT token in the Authorization header.

### Required API Endpoints

**Authentication:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

**User Tasks:**
- `GET /api/v1/tasks` - Get user's tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

**Admin Endpoints:**
- `GET /api/v1/admin/users` - Get all users
- `DELETE /api/v1/admin/users/:id` - Delete user
- `PATCH /api/v1/admin/users/:id/role` - Update user role
- `GET /api/v1/admin/tasks` - Get all tasks
- `POST /api/v1/admin/assign-task` - Assign task to user
- `PUT /api/v1/admin/tasks/:id` - Update task
- `DELETE /api/v1/admin/tasks/:id` - Delete task

## Authentication Flow

1. User registers or logs in with email and password
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is automatically included in all subsequent API requests
5. User is redirected to their role-based dashboard
6. Protected routes check for token and redirect unauthorized users to login

## Design System

The application uses a professional dark theme with blue/indigo color palette:
- **Primary Color**: Blue (oklch(0.56 0.16 256))
- **Secondary Color**: Light Blue (oklch(0.72 0.12 250))
- **Accent Color**: Purple (oklch(0.52 0.18 270))
- **Background**: Dark (oklch(0.12 0.01 260))
- **Foreground**: Light Gray (oklch(0.92 0.01 0))

All colors are defined as CSS variables in `app/globals.css` with support for light/dark themes.

## Form Validation

All forms use `react-hook-form` with Zod schema validation:
- Email format validation
- Password minimum length requirements
- Required field validation
- Real-time error display
- Toast notifications for submission feedback

## Key Features Implementation

### Protected Routes
Routes in the `(dashboard)` folder are protected by checking localStorage for a valid token. Users without authentication are redirected to the login page.

### Role-Based Navigation
The sidebar dynamically displays navigation options based on user role:
- Users see: Dashboard, My Tasks
- Admins see: Dashboard, My Tasks, Users, All Tasks

### Optimistic Updates
Task operations use optimistic UI updates where possible, providing instant feedback while API requests process.

### Error Handling
All API calls include error handling with user-friendly toast notifications explaining what went wrong.

## Customization

### Adding New Features
1. Define types in `lib/types.ts`
2. Add API endpoints in `lib/api-client.ts`
3. Create components in `components/`
4. Create pages in `app/(dashboard)/`

### Styling
- Edit color variables in `app/globals.css` to customize the theme
- Use Tailwind classes and design tokens for component styling
- Follow the existing component patterns in shadcn/ui

## Deployment

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables
Add the following to your Vercel project settings:
- `NEXT_PUBLIC_API_URL` - Your backend API URL

## Security Considerations

1. **Token Storage**: Currently uses localStorage (suitable for SPAs)
2. **API Security**: All API requests include JWT bearer token
3. **Protected Routes**: Client-side route protection with redirect
4. **Form Validation**: Both client and server-side validation required
5. **HTTPS Only**: Ensure HTTPS in production

## Future Enhancements

- [ ] Server-side session management with HTTP-only cookies
- [ ] WebSocket support for real-time updates
- [ ] Task filtering and search functionality
- [ ] User profile customization
- [ ] Task attachment support
- [ ] Task comments and collaboration
- [ ] Export tasks as PDF/CSV
- [ ] Dark/light theme toggle
- [ ] Mobile app version
- [ ] Analytics and reporting

## Support

For issues and questions, please open an issue in the repository.

## License

This project is licensed under the MIT License.
