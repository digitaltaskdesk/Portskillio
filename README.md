# Portskillio — Phase 1

Premium pink/coral landing page with animated CSS illustration, light/dark theme, responsive navigation, student/recruiter routes, and placeholder authentication pages. **Real signup/login is not implemented until Phase 2.**

## Run locally

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install` and then `npm run dev`.
4. Visit http://localhost:3000.

## Upload to GitHub

Do not drag loose files into the GitHub web page: it drops the folders. Use git from the project folder instead:

```
git init
git add .
git commit -m "Portskillio"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main --force
```

Never commit `.env.local` or any secret. `.env.example` is safe.

## Deploy

Import your GitHub repository at https://vercel.com/new, use the Next.js preset, and deploy. No environment variables are required for Phase 1.

## Next phase

Connect Supabase Auth and PostgreSQL for real student/recruiter accounts.
