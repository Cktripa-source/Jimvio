# JIMVIO Platform Architecture

## Project Structure

```
jimvio/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public marketing pages (no auth required)
│   │   ├── page.tsx              # Home
│   │   ├── marketplace/
│   │   ├── categories/
│   │   ├── vendors/
│   │   ├── affiliate/
│   │   ├── influencers/
│   │   ├── communities/
│   │   ├── pricing/
│   │   ├── blog/
│   │   ├── about/
│   │   ├── contact/
│   │   └── help/
│   ├── (auth)/                   # Auth pages (login, signup)
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── dashboard/                # Universal dashboard (auth required)
│   │   ├── layout.tsx            # Dashboard layout with role switcher
│   │   ├── buyer/
│   │   ├── vendor/
│   │   ├── affiliate/
│   │   ├── influencer/
│   │   └── community/
│   ├── admin/                    # Admin dashboard (admin role only)
│   ├── api/                      # API routes
│   ├── layout.tsx
│   └── globals.css
├── src/
│   ├── components/
│   │   ├── ui/                   # Shadcn UI components
│   │   ├── marketplace/          # Marketplace-specific components
│   │   ├── affiliate/            # Affiliate components
│   │   ├── influencer/           # Influencer components
│   │   ├── community/            # Community components
│   │   ├── layout/               # Shared layout components
│   │   └── shared/               # Reusable across platform
│   ├── lib/
│   │   ├── supabase/             # Supabase client & auth
│   │   ├── services/             # Business logic services
│   │   ├── hooks/                # Custom React hooks
│   │   ├── database/             # DB types & queries
│   │   ├── api/                  # API client utilities
│   │   └── utils/                # Helper functions
│   └── types/                    # TypeScript types
├── supabase/
│   ├── migrations/               # SQL migrations
│   └── functions/                # Edge functions
└── public/
```

## Module Overview

### Core Modules
- **Marketplace**: Alibaba-style product catalog (physical + digital)
- **Affiliate**: ClickBank-style referral & commission system
- **Influencer**: Campaign management & viral clip engine
- **Community**: Subscription-based creator communities

### User Roles
- **Buyer**: Purchase products, join communities
- **Vendor**: Sell products, manage affiliates, run campaigns
- **Affiliate**: Promote products, earn commissions
- **Influencer**: Join campaigns, create viral content
- **Community Owner**: Manage paid communities
- **Admin**: Platform moderation (separate system)

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Shadcn UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: Irembopay API
- **Media**: Cloudinary
- **AI**: OpenAI API
- **Deployment**: Vercel
