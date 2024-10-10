<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-goal-setter-app
</h1>
<h4 align="center">A web application to track your fitness journey and set achievable goals.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js" />
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_HTML,_CSS-red" alt="Frontend: TypeScript, React, HTML, CSS" />
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" alt="Database: PostgreSQL" />
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-goal-setter-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-goal-setter-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-goal-setter-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "fitness-tracker-goal-setter-app" that empowers fitness enthusiasts to track their progress, set achievable goals, and connect with a supportive community.  Built with Next.js, React, TypeScript, and a robust backend powered by Node.js and PostgreSQL, this MVP offers a user-friendly and engaging experience. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the MVP, its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, uuid, esbuild, and eslint, which are essential for building and styling the UI components, and handling external services.|
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as background, components, and content.|
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Interacts with browser APIs, external services through HTTP requests, and includes integrations with speech recognition and synthesis APIs.|
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
fitness-tracker-goal-setter-app/
├── .env
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── prisma
│   ├── schema.prisma
│   └── migrations
├── public
│   └── images
├── pages
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].ts
│   │   ├── goals
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   ├── progress
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   ├── users
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   └── webhooks
│   │       └── stripe.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   ├── goals.tsx
│   ├── progress.tsx
│   ├── community.tsx
│   └── settings.tsx
├── components
│   ├── layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Spinner.tsx
│   └── features
│       ├── auth
│       │   ├── LoginForm.tsx
│       │   └── SignupForm.tsx
│       ├── goals
│       │   ├── GoalCard.tsx
│       │   ├── GoalForm.tsx
│       │   └── GoalList.tsx
│       ├── progress
│       │   ├── ProgressChart.tsx
│       │   └── ProgressLog.tsx
│       ├── dashboard
│       │   ├── DashboardStats.tsx
│       │   └── RecentActivity.tsx
│       └── community
│           ├── CommunityFeed.tsx
│           └── UserProfile.tsx
├── lib
│   ├── api
│   │   └── client.ts
│   ├── hooks
│   │   ├── useUser.ts
│   │   └── useGoals.ts
│   └── utils
│       ├── formatters.ts
│       ├── validators.ts
│       └── calculations.ts
├── styles
│   ├── globals.css
│   └── theme.ts
├── types
│   ├── goal.ts
│   ├── progress.ts
│   └── user.ts
├── context
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services
│   ├── goalService.ts
│   ├── progressService.ts
│   └── userService.ts
└── package.json

```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- PostgreSQL 14+ 
- Docker 20.10+

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-goal-setter-app.git
   cd fitness-tracker-goal-setter-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file for environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables in the `.env` file.
4. Set up the PostgreSQL database:
  - Install PostgreSQL on your machine if you haven't already.
  - Create a new database.
  - Set the `DATABASE_URL` environment variable in your `.env` file to connect to your database.
5. Run database migrations:
   ```bash
   npm run migrate
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   Access the application in your browser at [http://localhost:3000](http://localhost:3000).


## 🏗️ Usage
### 🏃‍♂️ Running the MVP
- Start the development server:
   ```bash
   npm run dev
   ```
- Access the application in your browser at [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
- **`next.config.js`**: Configures Next.js for optimal performance and development settings.
- **`tailwind.config.js`**: Customizes Tailwind CSS for the application's visual style.
- **`tsconfig.json`**: Configures the TypeScript compiler for type checking and code generation.
- **`.env`**:  Stores environment variables specific to your development and production environments. 

### 📚 Examples
- **User Registration**
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "email": "user@example.com", "password": "securepass123"}' 
   ```
- **Setting a Fitness Goal**
   ```bash
   curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}' 
   ```
- **Logging Progress**
   ```bash
   curl -X POST http://localhost:3000/api/progress \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"goalId": "goal_id_here", "value": 2, "date": "2023-06-15"}'
   ```


## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Vercel
1. Create a Vercel account and install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Initialize a Vercel project:
   ```bash
   vercel init fitness-tracker-goal-setter-app
   ```
   Follow the prompts to configure your project.
4. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

### 🔑 Environment Variables
- `DATABASE_URL`:  Connection string for your PostgreSQL database (e.g., `postgresql://user:password@host:port/database_name`)
- `NEXTAUTH_URL`:  Your application's URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET`:  A random 32-character string for secure authentication (generate a unique secret using `openssl rand -base64 32`)
- [Add any other environment variables specific to your MVP]

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/register**
  - Description: Registers a new user.
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`
- **POST /api/auth/login**
  - Description: Logs in an existing user.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`
- **GET /api/auth/session**
  - Description: Fetches the current user session.
  - Response: `{ "user": { "id": string, "username": string, "email": string }, "expires": string }`
- **POST /api/goals**
  - Description: Creates a new fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`
- **GET /api/goals**
  - Description: Fetches all goals for the current user.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }]`
- **GET /api/goals/:id**
  - Description: Fetches a specific goal by its ID.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`
- **PUT /api/goals/:id**
  - Description: Updates an existing goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date, "progress": number }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`
- **DELETE /api/goals/:id**
  - Description: Deletes a goal by its ID.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{}`
- **POST /api/progress**
  - Description: Creates a new progress entry for a goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalId": string, "value": number, "date": date }`
  - Response: `{ "id": string, "goalId": string, "value": number, "date": date }`
- **GET /api/progress**
  - Description: Fetches all progress entries for the current user.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[{ "id": string, "goalId": string, "value": number, "date": date }]`
- **GET /api/progress/:id**
  - Description: Fetches a specific progress entry by its ID.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "id": string, "goalId": string, "value": number, "date": date }`
- **PUT /api/progress/:id**
  - Description: Updates an existing progress entry.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "goalId": string, "value": number, "date": date }`
  - Response: `{ "id": string, "goalId": string, "value": number, "date": date }`
- **DELETE /api/progress/:id**
  - Description: Deletes a progress entry by its ID.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{}`

### 🔒 Authentication
1. **Registration and Login:**  Use the `/api/auth/register` and `/api/auth/login` endpoints to register a new user or log in to an existing account. Upon successful authentication, you'll receive a JWT token.
2. **Authentication Header:** Include the JWT token in the `Authorization` header for all protected API routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. **Session Management:**  The `Authorization` header is used to authenticate each request and ensure that only authenticated users can access protected data or resources. 

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepass123"}'

# Fetch the current user session (after login)
curl -X GET http://localhost:3000/api/auth/session \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}' 
```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: fitness-tracker-goal-setter-app

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>