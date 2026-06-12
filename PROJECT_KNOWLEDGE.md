# Vidmahi Educational Foundation - Project Knowledge Base

This file is a comprehensive source-of-truth summary for the current website codebase. It is intended to help a future AI chatbot answer questions accurately without inventing details.

## 1. Project Snapshot

- Project name: Vidmahi Educational Foundation
- Public purpose: Educational initiative focused on helping government school students in rural areas through free coaching, guidance, and community support
- Primary audience: Students, parents, volunteers, donors, and visitors learning about the foundation
- Primary language on the site: English
- Site style: Clean nonprofit / education branding with blue, green, and gold accents
- Main message: Empower rural students, support education, and expand village-based learning opportunities
- Motto / brand line used in the site: Igniting minds, illuminating futures.

## 2. Repository Location

- Workspace root: `vidmahi/`
- Important note: the outer folder is `vidmahi web page`, but the actual app lives inside the nested `vidmahi/` folder

## 3. Tech Stack

- Framework: Next.js 15 with App Router
- Language: TypeScript
- UI styling: Tailwind CSS
- React version: 18.3.0
- Image handling: Next Image with `unoptimized: true`
- Package manager expectation: npm

### Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run Next lint

## 4. Build and Config Facts

### Next.js config

- File: `next.config.ts`
- Images are set to `unoptimized: true`
- This means the site is not using Next image optimization at build time

### Tailwind config

- File: `tailwind.config.ts`
- Custom colors defined:
  - `primary`: `#0A2E6D`
  - `green.foundation`: `#5A8F2D`
  - `green.light`: `#6aa333`
  - `gold`: `#F2B233`
  - `secondary-bg`: `#F8FAFC`
- Custom fonts defined:
  - `heading`: `Georgia, serif`
  - `body`: `system-ui, sans-serif`

### Global CSS

- File: `src/app/globals.css`
- CSS variables defined:
  - `--primary`: `#0a2e6d`
  - `--green`: `#5a8f2d`
  - `--gold`: `#f2b233`
- `html` uses smooth scrolling
- `body` uses a system UI font stack
- Utility classes exist for the foundation color palette

## 5. Site Structure

### Routes

- `/` - homepage
- `/gallery` - gallery page

### Root layout

- File: `src/app/layout.tsx`
- Shared across all pages:
  - `Navbar`
  - page content in `<main>`
  - `Footer`
- Metadata title: Vidmahi Educational Foundation
- Metadata description: Igniting minds in our villages to illuminate the future of our world. Empowering rural students through free coaching and educational guidance.
- Icons referenced:
  - `/favicon.ico`
  - `/favicon.png`

### Homepage composition

- File: `src/app/page.tsx`
- Section order:
  - Hero slider
  - Who We Are
  - Our Programs
  - Annual Reports
  - Support Mission
  - Contact Us

### Gallery page composition

- File: `src/app/gallery/page.tsx`
- The page renders one section per program from `src/data/programs.ts`
- Each program section shows program details and images filtered from `src/data/gallery.ts`
- The gallery page uses its own hero banner with a blue-to-green gradient

## 6. Navigation and Shared UI

### Navbar

- File: `src/components/layout/Navbar.tsx`
- Fixed top navigation bar
- Logo asset: `/logo/vidmahi-logo.png`
- Desktop links:
  - Home
  - About Us -> `/#about`
  - Our Program -> `/#programs`
  - Annual Reports -> `/#reports`
  - Gallery -> `/gallery`
  - Donate -> external donation form
  - Contact Us -> `/#contact`
- Mobile menu is toggled with local state
- Donate button opens an external Google Form in a new tab

### Footer

- File: `src/components/layout/Footer.tsx`
- Contains:
  - logo and foundation name
  - quick links
  - contact details
  - social links
- Footer motto line includes: `Grāmotthānāya Vidyādānam`
- Copyright text shown in the UI: `© 2025 Vidmahi Educational Foundation. All Rights Reserved.`

## 7. Content Sections on the Homepage

### Hero slider

- File: `src/components/sections/HeroSlider.tsx`
- Uses `heroSlides` from `src/data/site.ts`
- Auto-advances every 5 seconds
- Includes previous/next arrows and dot navigation
- Main headline text shown:
  - `Empowering Rural Students.`
  - `Building Brighter Futures.`
- Primary call-to-action: support mission donation form
- Secondary call-to-action: gallery page

### Who We Are

- File: `src/components/sections/WhoWeAre.tsx`
- Uses `aboutContent` from `src/data/about.ts`
- Content themes:
  - public funding
  - government school students
  - Bhuthkur Village, Dasturabad Mandal, Nirmal District
  - free coaching and opportunity creation
- Lists supported programs:
  - Navodaya Entrance Examinations
  - Gurukul Entrance Examinations
  - Other Competitive and Scholarship Examinations
  - Academic and Personal Development Programs
- Includes volunteer leadership section
- Founder / manager shown: Singari Sri Varun
- Volunteer CTA points to the volunteer form

### Our Programs

- File: `src/components/sections/OurPrograms.tsx`
- Uses `programs` from `src/data/programs.ts`
- Each program card links to its gallery section
- Current program list contains one program: Free Navodaya Coaching

### Annual Reports

- File: `src/components/sections/AnnualReports.tsx`
- Uses `annualReports` from `src/data/reports.ts`
- Emphasizes transparency and responsible use of contributions
- Report year currently present: `2026-27`
- Download links are rendered for donation and expenditure PDFs when available

### Support Mission

- File: `src/components/sections/SupportMission.tsx`
- Focuses on donor support and rural education impact
- Mentions the journey from Bhuthkur Village toward reaching more villages
- CTA button opens the donation form

### Contact Us

- File: `src/components/sections/ContactUs.tsx`
- Uses `contactInfo` from `src/data/contact.ts`
- Displays address, email, phone, and social links
- Contact heading: `We'd Love to Hear From You`

## 8. Data Files and Source-of-Truth Content

### About content

- File: `src/data/about.ts`
- Key facts:
  - Vidmahi Educational Foundation is a publicly funded educational initiative
  - It supports government school students through education, guidance, and opportunity
  - It was born in Bhuthkur Village, Dasturabad Mandal, Nirmal District
  - It aims to expand beyond a single village to other villages over time
- Current image reference: `/about-us.png`
- Closing message encourages users to join the journey to transform rural India through education

### Contact info

- File: `src/data/contact.ts`
- Email: `vidmahieducationalfoundation@gmail.com`
- Phone: `+91 7032791760`
- Address: `MPPS, Bhuthkur, Dasturabad, Nirmal, Telangana 504202`
- Social profiles:
  - X: `https://x.com/vidmahifoundation`
  - LinkedIn: `https://linkedin.com/company/vidmahifoundation`
  - Instagram: `https://instagram.com/vidmahifoundation`
  - YouTube: `https://youtube.com/@vidmahifoundation`

### Programs

- File: `src/data/programs.ts`
- Current program list contains one entry:
  - ID: `navodaya-coaching`
  - Title: `Free Navodaya Coaching`
  - Location: `MPPS, Bhuthkur, Dasturabad, Nirmal`
  - Description: free coaching and guidance for Jawahar Navodaya Vidyalaya Entrance Examinations
  - Image: `/gallery/navodaya-coaching/program-cover.png`

### Gallery images

- File: `src/data/gallery.ts`
- Current images map to program ID `navodaya-coaching`
- Current items reference:
  - `/gallery/navodaya-coaching/photo-1.jpg`
  - `/gallery/navodaya-coaching/photo-2.jpg`
  - `/gallery/navodaya-coaching/photo-3.jpg`
  - `/gallery/navodaya-coaching/photo-4.jpg`
- Alt text implies classroom, teacher explanation, practice session, and group study scenes

### Annual reports

- File: `src/data/reports.ts`
- Current report entry:
  - Year: `2026-27`
  - Donation report: `/reports/2026-27-donation-report.pdf`
  - Expenditure report: `/reports/2026-27-expenditure-report.pdf`

### Hero slides

- File: `src/data/site.ts`
- Current slides reference:
  - `/hero/hero-1.jpg` - Rural students in classroom
  - `/hero/hero-2.jpg` - Students studying together
  - `/hero/hero-3.jpg` - Teacher mentoring students

### External action URLs

- File: `src/constants/index.ts`
- Donation form URL: `https://forms.gle/nBFPDq7FTBMzm9RZ6`
- Volunteer form URL: `https://forms.gle/oMgLhfPwiCL96eAt6`

## 9. Shared Type Definitions

- File: `src/types/index.ts`
- Shared interfaces:
  - `HeroSlide`
  - `Program`
  - `GalleryImage`
  - `AnnualReport`
  - `ContactInfo`
- These types define the shape of all content used across the app

## 10. Public Asset Inventory

### Assets that exist in `public/`

- `about-us.png`
- `favicon.ico`
- `favicon.png`
- `logo/vidmahi-logo.png`
- `hero/hero-1.jpg`
- `hero/hero-2.jpg`
- `hero/singari-sri-varun.png`
- `gallery/navodaya-coaching/program-cover.png`

### Asset folder notes from the repo

- `public/hero/README.txt` says to place hero images there and mentions `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, and `about-image.jpg`
- `public/gallery/README.txt` says to place gallery images in program-specific folders
- `public/gallery/navodaya-coaching/README.txt` says the program cover should be `program-cover.jpg`, but the code currently uses `program-cover.png`
- `public/reports/README.txt` says to place PDF reports there

## 11. Current Gaps and Missing References

These are important for chatbot accuracy. The code references some files that are not currently present in the public folder listing.

- `src/data/site.ts` references `/hero/hero-3.jpg`, but only `hero-1.jpg` and `hero-2.jpg` are currently present in `public/hero/`
- `src/data/site.ts` and the homepage text imply a hero set of three images, but the third image is missing right now
- `src/data/about.ts` references `/about-us.png`, and that file is present
- `src/data/gallery.ts` references `photo-3.jpg` and `photo-4.jpg`, but only `program-cover.png` is currently present in `public/gallery/navodaya-coaching/`
- `src/data/reports.ts` references PDF reports for `2026-27`, but no report PDFs are currently present in `public/reports/`
- `public/gallery/navodaya-coaching/README.txt` describes `program-cover.jpg`, but the existing asset is `program-cover.png`

## 12. Exact Public-Facing Copy Worth Preserving

If a chatbot is answering questions about the site, these phrases are part of the current public identity:

- `Vidmahi Educational Foundation`
- `Igniting minds, illuminating futures.`
- `Empowering Rural Students. Building Brighter Futures.`
- `We provide free coaching and support for...`
- `Support Our Mission`
- `Annual Reports`
- `Transparency & Academic Reports`
- `We'd Love to Hear From You`
- `Free Navodaya Coaching`
- `Navodaya Entrance Examinations`

## 13. Answering Rules For A Future AI Chatbot

To keep answers accurate:

- Prefer data from `src/data/*.ts` over assumptions
- Use the actual filesystem state to decide whether an asset exists
- If a file is referenced in code but missing from `public/`, say it is currently missing rather than pretending it is available
- If asked about contact, donation, or volunteer information, use the values in `src/data/contact.ts` and `src/constants/index.ts`
- If asked about site structure, use the route and section definitions in `src/app/*.tsx` and `src/components/sections/*.tsx`
- If asked about the mission, use the wording in `src/data/about.ts` and `src/components/sections/SupportMission.tsx`
- If asked about reports, only describe the `2026-27` report entry unless more are added later

## 14. Maintenance Notes

When the project changes, update this file at the same time as the code so the chatbot stays aligned with reality.

Good updates to keep in sync:

- New pages or routes
- New program entries
- New gallery images
- New report years or PDFs
- Contact detail changes
- Donation or volunteer form URL changes
- Asset file additions or renames
- Brand copy or mission statement changes
