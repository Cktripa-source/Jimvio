# JIMVIO - Global Creator-Commerce Ecosystem

One platform combining marketplace, affiliates, influencers, and communities. One universal account with dynamic role switching.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Shadcn UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: Irembopay API
- **Media**: Cloudinary
- **AI**: OpenAI API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
IREMBOPAY_API_KEY=your_irembopay_key
IREMBOPAY_SECRET=your_irembopay_secret
```

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run migrations:
   ```bash
   supabase db push
   ```
   Or apply the SQL files in `supabase/migrations/` manually in the Supabase SQL Editor.
3. Enable Email auth and Google OAuth in Supabase Dashboard > Authentication > Providers

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (public)/     # Marketing pages (home, marketplace, etc.)
│   ├── (auth)/       # Login, signup, forgot password
│   ├── dashboard/    # User dashboards (buyer, vendor, affiliate, etc.)
│   ├── admin/       # Admin dashboard
│   └── api/         # API routes
├── components/
│   ├── ui/          # Shadcn components
│   ├── auth/        # Auth forms
│   ├── dashboard/    # Dashboard components
│   ├── layout/      # Header, Footer
│   └── shared/      # Reusable components
├── lib/
│   ├── supabase/    # Supabase clients
│   ├── services/    # Business logic
│   ├── api/         # External API integrations
│   └── utils/       # Helpers
└── types/           # TypeScript types
```

## User Roles

- **Buyer**: Purchase products, join communities
- **Vendor**: Sell products, manage affiliates, run campaigns
- **Affiliate**: Promote products, earn commissions
- **Influencer**: Join campaigns, create viral content
- **Community Owner**: Manage paid communities
- **Admin**: Platform moderation (separate)

## Features

- ✅ Authentication (Email, Google)
- ✅ Database schema with RLS
- ✅ Marketplace (products, categories, variants)
- ✅ Role-based dashboards
- ✅ Affiliate system (links, commissions)
- ✅ Influencer campaigns & viral clips
- ✅ Community platform (subscriptions)
- ✅ Payment integration (Irembopay)
- ✅ Media storage (Cloudinary)
- ✅ AI features (OpenAI)
- ✅ Glassmorphism UI

## License

Proprietary - JIMVIO
