# Tours Page Integration Guide for readlockhart.org

## Overview

This Tours page component is ready to integrate into your existing readlockhart.org website. It's built as a React component (`.jsx`) with a refined, elegant aesthetic that matches your artist's website.

---

## Design Philosophy

The page follows these principles:

**Aesthetic Direction:** Refined gallery/salon aesthetic
- Clean, elegant typography (Georgia serif)
- Generous negative space (gallery-wall treatment)
- Subtle hierarchy and minimal visual noise
- Warm, human tone that matches your voice
- Refined borders and spacing, no corporate polish

**Key Design Elements:**
- Hero section with ruled lines (gallery-aesthetic dividers)
- Tour cards that expand on click (conversational, not all-at-once info dump)
- Sophisticated form styling
- Testimonial-ready sections (you'll add Anne and Karen's quotes later)

---

## Integration Steps

### 1. Add Tours Button/Link to Navigation

If you use a navigation menu on readlockhart.org, add:

```html
<a href="/tours" class="nav-link">Tours</a>
```

Or if you have existing nav structure, integrate it alongside your current links (Portfolio, About, Contact, etc.).

### 2. Deploy the Component

**If using a React-based site (Next.js, Create React App, etc.):**
- Copy the `tours-page.jsx` code into your `/pages` or `/components` directory
- Import and route it to `/tours` or `/museum-tours`

**If using a static site or other framework:**
- Convert the component to HTML/CSS/JavaScript
- I can help with this conversion if needed

### 3. Handle Form Submissions

Currently, the form console.logs data. You'll need to:

**Option A: Email Service Integration (Recommended)**

Add form handling to submit to your email. Best approaches:

1. **Formspree** (simple, free tier available)
   - Sign up at formspree.io
   - Add your email
   - The form sends directly to your inbox
   - Takes 2 minutes to set up

2. **EmailJS** (JavaScript library)
   - No backend required
   - Sends directly from browser to your email
   - Can include a copy to visitor

3. **Your own backend** (if you have one)
   - POST to your API endpoint
   - Send confirmation emails

**Option B: Interim Manual Process**

For now, you could:
- Add a WhatsApp contact link to the success state
- Use Google Forms embedded (less elegant, but functional)
- Keep track manually and respond to email/phone

### 4. Calendar Blocking Logic

The component generates available dates for the next 90 days, excluding:
- Sundays (museums closed)
- Mondays (low traffic)

**To implement actual blocking:**

You need a backend database to track booked tours. When someone requests a date:
- Book that date
- Block the day before + the day after automatically
- Remove those dates from availability

**Example logic:**
```
If booking: Wednesday, March 15
Block: Tuesday March 14, Wednesday March 15, Thursday March 16
```

**Simple Implementation:**
- Use a Google Sheet to track bookings (manual but functional)
- When you confirm a tour, mark the date and adjacent dates as "blocked"
- The availability list updates accordingly

---

## Optional Enhancements (After Launch)

### Add Testimonials Section
Once you have feedback from tours, add a section like:

```html
<section class="testimonials">
  <h2>What Guests Say</h2>
  <blockquote>
    "The way Read explained how the gray was actually blue, green, and violet 
    changed how I see paintings forever." — Anne, New York
  </blockquote>
</section>
```

### Add Your Photo
The page references "you painting" and "you in museums" — add professional photos of:
- You in a museum talking with guests
- You painting in your studio
- Detail of your work (establishing credentials)

### Add Pricing
Once you finalize rates, replace "Pricing available upon request" with clear pricing:

```
The Prado: €200–300/person (2-5 guests)
Reina Sofía: €150–200/person
Thyssen: €200–300/person
Add-on experiences: €30–50/person
```

### Instagram Integration
Add a subtle Instagram link for portfolio display:
```
Follow my studio practice: @readlockhart
```

---

## Form Fields Explained

The inquiry form collects:

- **Name, Email, Phone:** For contacting you back
- **Museum:** Which tour they're interested in
- **Number of Guests:** Group size (1-5)
- **Preferred Date/Time:** Their ideal timing (helps with calendar blocking)
- **Interests:** Tags like "Velázquez," "Technique," etc. (helps you customize the tour)
- **Notes:** Open-ended space for special requests or context

---

## Response Flow

**Current:** Form displays success message for 3 seconds, then clears.

**Recommended:** 
1. You receive email notification
2. You review guest info
3. You respond within 24-48 hours via email/WhatsApp with:
   - Confirmation of their preferred date (or alternative options)
   - Meeting location details
   - Logistics (where to meet, duration, any preparation)
   - Optional add-ons they might enjoy
   - Cancellation policy (if you have one)

---

## Customization Options

### Change Museums
If you want to add/remove museums, edit the `tours` array in the component:

```javascript
const tours = [
  {
    id: 'prado',
    title: 'Your Title',
    duration: '2.5 hours',
    theme: '...',
    description: '...',
    works: [...]
  }
];
```

### Change Colors
The page uses:
- White backgrounds (`bg-white`)
- Gray text (`text-gray-700`)
- Dark gray accents (`bg-gray-900` for buttons)

To adjust, modify the Tailwind color classes.

### Change Typography
Currently uses Georgia serif (elegant, readable). To change:
```css
font-family: 'Your Font', serif;
```

---

## Launch Checklist

- [ ] Deploy component to readlockhart.org
- [ ] Add "Tours" to site navigation
- [ ] Set up email form handling (Formspree or similar)
- [ ] Test inquiry form end-to-end
- [ ] Add your own photo(s) to the page
- [ ] Share link with Anne and Karen for feedback
- [ ] Update availability calendar as tours book
- [ ] Add testimonials once you have them
- [ ] Consider pricing finalization (currently "upon request")

---

## Technical Support

If you need help with:
- **Converting to HTML/CSS/JS** (if not using React)
- **Setting up email integration** (Formspree, EmailJS, etc.)
- **Adding a booking calendar** (Google Calendar API, Calendly embed, etc.)
- **Photo optimization and placement**
- **Mobile responsiveness tweaks**

...reach out. The component is responsive and mobile-ready, but you may want refinements for specific devices or use cases.

---

## Final Note

This page positions you as a curator and artist, not a tour operator. The tone is warm, intelligent, and human. The form is simple enough to not feel corporate, sophisticated enough to attract the right guests.

Anne and Karen weren't delighted because of information. They were delighted because you were genuinely alive in front of the paintings. This page should reflect that—an invitation to an experience, not a transactional booking page.

Launch it, get feedback, adjust, and enjoy building something that sustains your painter's life while feeding your intellectual gift for seeing.
