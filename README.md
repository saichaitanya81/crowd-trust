# CrowdTrust 🛡️
> **Verified. Transparent. Impactful.**

CrowdTrust is a transparent crowdfunding web platform built with **React**, **Node.js/Express**, **MongoDB Atlas**, and **Tailwind CSS**. Unlike basic crowdfunding prototypes, CrowdTrust tackles the trust deficit in online fundraising through **identity verification (KYC)**, **milestone-based fund releases (escrow)**, **itemized expense audits with invoice inspection**, **measurable impact tracking**, **donor reporting**, and **AI-powered campaign assistance**.

---

## 📑 Table of Contents

- [Key Differentiators & Trust Architecture](#-key-differentiators--trust-architecture)
- [Technology Stack](#-technology-stack)
- [Monorepo Project Structure](#-monorepo-project-structure)
- [System Architecture & Lifecycle](#-system-architecture--lifecycle)
- [Prerequisites & Environment Setup](#-prerequisites--environment-setup)
- [Installation & Quickstart](#-installation--quickstart)
- [Database Seeding & Test Accounts](#-database-seeding--test-accounts)
- [Running Backend & Frontend](#-running-backend--frontend)
- [REST API Reference](#-rest-api-reference)
- [Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
- [Automated Testing](#-automated-testing)
- [Security Architecture](#-security-architecture)
- [Project Viva & Presentation Guide](#-project-viva--presentation-guide)

---

## 🌟 Key Differentiators & Trust Architecture

1. **Creator Identity Verification (KYC)**:
   - Creators submit government IDs or organization credentials (`passport`, `national_id`, `tax_id`, `nonprofit_cert`).
   - Compliance admins review and approve/reject credentials before awarding the **Verified Trust** badge.

2. **Milestone Escrow & Evidence Releases**:
   - Funding goals are divided into verifiable project phases.
   - Creators upload verifiable evidence (inspection links, photographic proof, contractor invoices) to request milestone completion.
   - Admins audit proofs before unlocking subsequent escrow stages.

3. **Itemized Expense Ledger & Invoice Auditing**:
   - Creators submit itemized expense entries with vendor details, spending categories, and receipt/invoice attachments.
   - Public transparency dashboards display interactive spending breakdown charts and approved vs. remaining funds.

4. **Quantified Impact Metrics**:
   - Projects track real-world results (e.g., *120 students sponsored*, *500 solar panels installed*, *450 emergency meal kits delivered*).

5. **AI Campaign Assistant (Google Gemini SDK & Heuristic Engine)**:
   - Provides creators with automated feedback on story clarity, budget realism, risk detection, category recommendations, and executive summaries.
   - Built with the `@google/genai` SDK with an intelligent offline heuristic fallback for uninterrupted offline development.

6. **Trust & Safety Moderation Command Center**:
   - Authenticated donors can report suspicious campaigns.
   - Admins possess a centralized dashboard to moderate campaigns, resolve reports, audit expenses, and review KYC records.

---

## 💻 Technology Stack

### Frontend
- **Framework**: React.js (v19) + Vite (v8)
- **Styling**: Tailwind CSS (v4) with custom tokens and dark theme support
- **Routing**: React Router (v7) with declarative `ProtectedRoute` and `RoleRoute`
- **Form Handling & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **HTTP Client**: Axios with centralized request/response interceptors

### Backend
- **Runtime**: Node.js (v22+ LTS)
- **Server Framework**: Express.js (ES Modules)
- **Database**: MongoDB Atlas via Mongoose (v8)
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs (12 salt rounds)
- **AI Engine**: Google Gemini API (`@google/genai`) + Rule-Based Heuristic Fallback
- **File Uploads**: Multer with MIME validation and disk storage (fallback ready for Cloudinary)
- **Security Middleware**: Helmet, CORS, Express Rate Limit, Mongo input sanitization

---

## 📁 Monorepo Project Structure

```text
crowdtrust/
├── client/                      # Frontend Application (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/          # Reusable UI widgets (Modals, Timelines, Cards, Badges)
│   │   │   ├── AiAssistantDrawer.jsx
│   │   │   ├── CampaignCard.jsx
│   │   │   ├── CampaignGrid.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── DonationModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImpactCard.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── MilestoneTimeline.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ReportModal.jsx
│   │   │   ├── RoleRoute.jsx
│   │   │   └── VerificationBadge.jsx
│   │   ├── context/             # React Contexts (AuthContext, ToastContext)
│   │   ├── pages/               # Application Route Views
│   │   │   ├── HomePage.jsx
│   │   │   ├── CampaignsPage.jsx
│   │   │   ├── CampaignDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── HowItWorksPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── CreatorDashboard.jsx
│   │   │   ├── CreateCampaignWizard.jsx
│   │   │   ├── ManageCampaignHub.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/            # Axios API client & endpoints
│   │   ├── index.css            # Tailwind CSS design system
│   │   ├── App.jsx              # Application router
│   │   └── main.jsx             # React DOM entrypoint
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend REST API (Node.js + Express)
│   ├── src/
│   │   ├── config/              # Environment config & MongoDB connection
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── middleware/          # Auth, RBAC, Multer, Error handlers
│   │   ├── models/              # 11 Mongoose Data Models
│   │   ├── routes/              # Express REST Route endpoints
│   │   ├── services/            # Payment simulation, Notification, AI Services
│   │   ├── utils/               # ApiError, ApiResponse, Slugify utilities
│   │   ├── validators/          # Zod request validation schemas
│   │   ├── seed/                # Database seed generator & runner
│   │   └── app.js               # Express application initialization
│   ├── server.js                # Server entry point
│   ├── package.json
│   └── tests/                   # Integration & Unit API tests
│
├── .env.example                 # Environment variables blueprint
├── .gitignore                   # Git ignore configurations
├── package.json                 # Monorepo root scripts
└── README.md                    # System documentation
```

---

## ⚙️ Prerequisites & Environment Setup

### 1. Requirements
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **MongoDB**: MongoDB Atlas connection string OR local MongoDB instance (`mongodb://127.0.0.1:27017/crowdtrust`)
- **Package Manager**: `npm` (comes with Node.js)

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:

```bash
# On Linux/macOS
cp .env.example server/.env

# On Windows PowerShell
Copy-Item .env.example server\.env
```

Review `server/.env` and update values if connecting to MongoDB Atlas or using Google Gemini AI:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Atlas or Local MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/crowdtrust?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=super_secret_crowdtrust_jwt_key_replace_in_production_123456789
JWT_EXPIRES_IN=7d

# Payment Simulation
PAYMENT_PROVIDER=sandbox
PAYMENT_PROVIDER_KEY=ct_test_pk_9948271038571937
PAYMENT_PROVIDER_SECRET=ct_test_sk_9948271038571937_secret

# Optional: Google Gemini API (Heuristic fallback included if omitted)
GEMINI_API_KEY=
```

---

## 🚀 Installation & Quickstart

### Step 1: Install Dependencies

```bash
# Install root, backend, and frontend packages
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

---

## 🗄️ Database Seeding & Test Accounts

CrowdTrust includes a comprehensive seed script that provisions **8 realistic users**, **6 verified & active campaigns** across multiple categories (Medical, Education, Clean Water, Tech Innovation), complete with **milestones**, **itemized expenses**, **donor transactions**, **impact metrics**, and **safety reports**.

To seed the database:

```bash
# Run from repository root
npm run seed

# OR directly from server directory
cd server
npm run seed
```

### Pre-Configured Test Accounts

| Role | Email | Password | Access / Capabilities |
| :--- | :--- | :--- | :--- |
| 🛡️ **Super Admin** | `admin@crowdtrust.org` | `Admin@12345#` | Trust & Safety Command Center, KYC approval, Milestone escrow audits, Expense reviews, Community reports |
| 🚀 **Verified Creator** | `dr.ananya@lifelinecare.org` | `Creator@12345#` | Manages "Pediatric Cardiac Care", submits milestone proofs, logs expenses, posts updates |
| 🚀 **Verified Creator** | `vikram@ruraledtech.org` | `Creator@12345#` | Manages "Solar Powered Smart Classrooms", updates student metrics |
| 🚀 **Creator** | `arjun@cleanocean.org` | `Creator@12345#` | Manages "Clean Ganges River Barrier Project" |
| 🚀 **Creator** | `sarah@prostheticsforall.org` | `Creator@12345#` | Manages "3D Printed Bionic Limbs" |
| 💖 **Active Donor** | `priya.sharma@gmail.com` | `Donor@12345#` | Top donor (₹50,000+), bookmarks campaigns, followed updates |
| 💖 **Donor** | `rahul.verma@techcorp.in` | `Donor@12345#` | Supported clean energy & education initiatives |
| 💖 **Donor** | `kavita.patel@outlook.com` | `Donor@12345#` | Supported healthcare & community projects |

---

## 🏃 Running Backend & Frontend

Open two terminal windows:

### Terminal 1: Backend API Server
```bash
cd server
npm run dev
```
*Server starts on `http://localhost:5000` (API status at `http://localhost:5000/api/health`)*

### Terminal 2: Frontend Client
```bash
cd client
npm run dev
```
*Client web application starts on `http://localhost:5173`*

---

## 📡 REST API Reference

All responses return standard JSON structures:
- **Success**: `{ "success": true, "message": "...", "data": { ... } }`
- **Error**: `{ "success": false, "message": "...", "errors": [ ... ] }`

| Module | Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register new Donor or Creator | Public |
| **Auth** | `POST` | `/api/auth/login` | Authenticate and obtain JWT token | Public |
| **Auth** | `GET` | `/api/auth/me` | Fetch authenticated user profile | Private |
| **Campaigns** | `GET` | `/api/campaigns` | Search & filter campaigns (category, status, sort) | Public |
| **Campaigns** | `GET` | `/api/campaigns/:id` | Get full campaign details with milestones, expenses, impact | Public |
| **Campaigns** | `POST` | `/api/campaigns` | Create campaign draft / submit for review | Creator/Admin |
| **Campaigns** | `PUT` | `/api/campaigns/:id` | Update campaign information | Creator/Admin |
| **Donations** | `POST` | `/api/donations` | Initiate simulated escrow donation | Private |
| **Donations** | `POST` | `/api/donations/:id/confirm` | Confirm payment and update funding counters | Private |
| **Donations** | `GET` | `/api/donations/my-donations` | List authenticated donor's contributions | Private |
| **Milestones** | `POST` | `/api/milestones` | Add project milestone | Creator/Admin |
| **Milestones** | `POST` | `/api/milestones/:id/evidence` | Submit completion evidence for admin audit | Creator/Admin |
| **Expenses** | `POST` | `/api/expenses` | Submit itemized expense with vendor invoice | Creator/Admin |
| **Expenses** | `GET` | `/api/expenses/campaign/:id` | Fetch verified campaign transparency ledger | Public |
| **Updates** | `POST` | `/api/updates` | Publish creator progress update to followers | Creator/Admin |
| **Comments** | `POST` | `/api/comments` | Post discussion message | Private |
| **Reports** | `POST` | `/api/reports` | Flag suspicious campaign for moderation | Private |
| **Admin** | `GET` | `/api/admin/stats` | Platform volume, campaign, user analytics | Admin |
| **Admin** | `PATCH` | `/api/admin/verifications/:id`| Approve or reject creator KYC submission | Admin |
| **Admin** | `PATCH` | `/api/admin/campaigns/:id` | Publish, pause, or delist campaign | Admin |
| **Admin** | `PATCH` | `/api/admin/milestones/:id` | Audit milestone evidence and release escrow | Admin |
| **Admin** | `PATCH` | `/api/admin/expenses/:id` | Approve or reject vendor expense claim | Admin |
| **Admin** | `PATCH` | `/api/admin/reports/:id` | Investigate or dismiss safety report | Admin |
| **AI Assistant**| `POST` | `/api/ai/improve` | Analyze draft for clarity, budget, and risks | Creator/Admin |

---

## 🔒 Security Architecture

1. **Defense in Depth**: Every protected endpoint enforces server-side JWT authentication and RBAC checks. Client-side routing is strictly for UX.
2. **Password Security**: Passwords require a minimum of 8 characters with lowercase, uppercase, number, and special character checks, hashed with bcrypt (12 rounds).
3. **No Financial Leakage**: No raw credit cards or CVVs are processed or stored on CrowdTrust servers. Payment confirmation uses cryptographic transaction reference verification.
4. **Input Sanitization & Validation**: Zod schemas validate and sanitize all request payloads.
5. **No Admin Self-Registration**: Super Administrator accounts cannot be created via the public registration endpoint.

---

## 🧪 Automated Testing

CrowdTrust uses Node's native test runner with Supertest for zero-configuration testing:

```bash
# Run server test suite
npm run test:server

# OR from server directory
cd server
npm test
```

---

## 🎓 Project Viva & Presentation Guide

When demonstrating CrowdTrust during evaluations or viva presentations, follow this suggested walkthrough:

1. **The Problem Statement**: Explain why traditional crowdfunding platforms suffer from high fraud rates and lack of post-funding accountability.
2. **The Solution (Trust Framework)**:
   - Walk through the **Home Page** metrics and explain the **Verified Trust** badge.
   - Open the **Campaign Details Page** (`Pediatric Cardiac Care`) and show the **Milestone Escrow Timeline**, **Interactive Expense Category Chart**, and **Invoice Viewer**.
3. **The Donor Experience**:
   - Log in as `priya.sharma@gmail.com`.
   - Make a test donation of ₹5,000 using the simulated gateway.
   - Show the immediate reactive update to the funding progress bar, the updated donor leaderboard, and the notification badge.
4. **The Creator Experience**:
   - Log in as `dr.ananya@lifelinecare.org`.
   - Visit the **Creator Dashboard** and open the **Manage Campaign Hub**.
   - Demonstrate adding an itemized expense receipt and submitting milestone evidence.
   - Open the **AI Campaign Assistant** to show automated critique and structure recommendations.
5. **The Admin Command Center**:
   - Log in as `admin@crowdtrust.org`.
   - Visit `/admin/dashboard` to show the platform moderation queues.
   - Demonstrate approving a KYC document, releasing escrow for a milestone, and resolving a user safety report.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
