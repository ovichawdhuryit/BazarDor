<div align="center">

# 🛒 বাজার দর | BazarDor

**আজকের বাজারের দাম এক নজরে**
*Daily essential commodity prices across Bangladesh, in one place.*

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-secure-05893E)

</div>

---

## 📖 About

**BazarDor (বাজার দর)** is a Bangla-first web app that helps people track the daily prices of everyday essentials: rice, lentils, oil, vegetables, fish, meat, eggs, dairy and spices. It shows market-wise minimum, maximum and average prices from different divisions of Bangladesh, along with how prices have changed compared to yesterday.

---

## 🧰 Technologies Used

| Area | Tech |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Components, Turbopack) |
| **Language** | TypeScript, React |
| **Styling** | Tailwind CSS, [DaisyUI](https://daisyui.com/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (Email/Password, Google OAuth, GitHub OAuth) |
| **Database** | MongoDB Atlas |
| **Data source** | REST API hosted on Cloudflare Workers (products and categories) |
| **Fonts** | Anek Bangla, Geist (via `next/font`) |

---

## ✨ Key Features

1. **📊 Daily Price Dashboard**
   The homepage highlights today's biggest price **increases** and **decreases** with color-coded badges (▲ red, ▼ green, — neutral), plus a scrolling live price ticker and a full list of all products.

2. **🗂️ Category-wise Browsing**
   Browse products by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) using dynamic routes (`/category/[categoryId]`). The active category is highlighted in the navbar.

3. **🏪 Market-wise Price Details**
   Every product has its own page with a price summary (lowest, highest, average) and a table of prices across markets and divisions, including the min, max and average for each market.

4. **🔐 Secure Authentication**
   Sign up and log in with email and password, **Google** or **GitHub**. Sessions are stored in MongoDB Atlas, protected pages redirect visitors to the login page, and users who try to sign up again with an existing email are sent to log in.

5. **🇧🇩 Bangla-first & Responsive UI**
   Dates, prices and percentages are formatted in Bangla numerals (`bn-BD`). The layout adapts from mobile to desktop, with a sticky-bottom footer and scrollable tables and category bars on small screens.

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas (include the database name in the URI)
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority

# Better Auth
BETTER_AUTH_SECRET=your-long-random-secret   # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

OAuth callback URLs for local development:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth handler
│   ├── category/[categoryId]/       # Category-wise products
│   ├── product/[id]/                # Product detail page
│   ├── login/  signup/              # Auth pages
│   ├── layout.tsx
│   └── page.tsx                     # Homepage
├── Components/                      # NavBar, Hero, ProductCard, Footer, ...
├── lib/
│   ├── auth.ts                      # Better Auth server config
│   ├── auth-client.ts               # Better Auth client
│   └── format.ts                    # Shared helpers (unit labels)
└── middleware.ts                    # Route protection (proxy.ts on Next.js 16)
```

---

## 🔌 API Endpoints Used

| Endpoint | Description |
| --- | --- |
| `GET /api/bazardor/categories` | List of all categories |
| `GET /api/bazardor/products` | All products |
| `GET /api/bazardor/products?category=chal` | Products of one category |
| `GET /api/bazardor/products/:id` | Single product with market-wise prices |

---

## ⚠️ Disclaimer

All prices shown are indicative and may change depending on market conditions.
*সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।*

---

<div align="center">

Made with ❤️ in Bangladesh

</div>