# Portfolio Next.js Project

A modern, full-stack portfolio web application built with [Next.js](https://nextjs.org), featuring seamless authentication, database integration via [Supabase](https://supabase.com), and optimized for performance and scalability. This project is designed to showcase your work, skills, and contact information, and can be easily customized for personal or professional use.

---

## Features

- **Next.js 15+**: App directory, server components, and fast refresh.
- **TypeScript**: Type-safe codebase for reliability and maintainability.
- **Supabase Integration**:  
  - User authentication (sign up, login, logout)
  - Real-time database for projects, posts, or contact messages
  - Secure API routes for data operations
- **Geist Font**: Optimized font loading with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).
- **Responsive Design**: Mobile-first, accessible, and modern UI.
- **Customizable Content**: Easily update your portfolio, skills, and contact info.
- **Environment Variables**: Securely manage API keys and secrets.
- **ESLint & Prettier**: Code linting and formatting.
- **Ready for Vercel Deployment**: One-click deploy.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedRAOUANE/Portfolio.git
   cd portfolio-next
   ```

2. **Install dependencies:**
   ```bash
        npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following (replace with your actual Supabase credentials):

   ```
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    RESEND_API_KEY=your-resend-api-key

    NEXT_PUBLIC_ENV="development" #this will open all features built in the app, you can use "production" to see the production version

    NEXT_PUBLIC_BASE_URL="http://localhost:3000" #change the url based on your envirenment
   ```

   make sure you have supabase account and the necessary tables
   - profiles table: this table is automatic generated when new user is logged in (make sure you activated this feature)
   - projects table: this table should have:
   ```
        name: text;
        description: text;
        project_link: text;
        is_active: bool;
        image: jsonb {url: string, fileName: string}
    ```

   - add your admin account manually, and make sure he have the role admin in profiles table
   - all users have user role by default 

   > **Note:** Never commit `.env.local` to version control.

4. **Run the development server:**
   ```bash
        npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Project Structure

```
.
├── public/                # Static assets
├── src/
│   └── app/
│       ├── page.tsx      # Main page component
│       ├── layout.tsx    # App layout
│       ├── globals.css   # Global styles
│       └── ...           # Other feature components
├── lib/
│   └── supabaseClient.ts # Supabase client setup
├── .env.local            # Environment variables (not committed)
├── next.config.ts        # Next.js configuration
├── package.json
└── README.md
```

---

## Available Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

---

## Customization

- Update your portfolio content in `src/app/[lang]/page.tsx` and related components.
- Modify Supabase tables to fit your data needs (projects, profiles).
- Adjust styles in `globals.css` or add new components as needed.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

## License

This project is open source and available under the [MIT License](LICENSE).
