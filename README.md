# Vidmahi Educational Foundation Website

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Adding Content (No Code Needed)

### Add Hero Images
1. Place images in `public/hero/` (e.g., `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`)
2. Update `src/data/site.ts` to list the image paths

### Add Gallery Photos
1. Create folder `public/gallery/navodaya-coaching/`
2. Add photos (e.g., `photo-1.jpg`, `photo-2.jpg`)
3. Update `src/data/gallery.ts` with new entries

### Add Annual Reports
1. Place PDF in `public/reports/` (e.g., `2027-28-donation-report.pdf`)
2. Add new entry to `src/data/reports.ts`

### Update Contact Info
- Edit `src/data/contact.ts`

### Change Donation Link
- Edit `src/constants/index.ts` → update `DONATION_FORM_URL`

---

## 🌐 Deployment (Vercel)

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Repository
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**
5. Add your custom domain in Vercel → Settings → Domains

---

## 🖼️ Required Images

Place these in `public/`:

| Path | Description |
|------|-------------|
| `logo/vidmahi-logo.png` | ✅ Already included |
| `hero/hero-1.jpg` | Hero slider image 1 |
| `hero/hero-2.jpg` | Hero slider image 2 |
| `hero/hero-3.jpg` | Hero slider image 3 |
| `hero/about-image.jpg` | About section image |
| `gallery/navodaya-coaching/program-cover.jpg` | Program card image |
| `gallery/navodaya-coaching/photo-1.jpg` | Gallery photo 1 |
| `gallery/navodaya-coaching/photo-2.jpg` | Gallery photo 2 |

---

## 📞 Support
For website help: vidmahifoundation@gmail.com
