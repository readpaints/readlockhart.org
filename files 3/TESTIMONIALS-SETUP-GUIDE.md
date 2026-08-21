# Testimonials System: Complete Setup & Management Guide

## THE IDEA
Guests submit testimonials → They go to your Formspree inbox → You choose which ones to feature → You add them to the HTML → They stay on the site permanently.

This gives you curation control and guarantees testimonials persist forever.

---

## STEP 1: Create a Formspree Endpoint for Testimonials

1. Go to https://formspree.io/
2. Log in (same account as your booking form)
3. Click **"Create"** → **"New Form"**
4. Name it: `Tours Testimonials`
5. You'll get a form ID that looks like: `xabc1234def567g`
6. **Copy this ID and save it somewhere safe**

---

## STEP 2: Add Your Form ID to tours.html

In the tours.html file, find this line:

```html
<form id="testimonialForm" action="https://formspree.io/f/YOUR_TESTIMONIAL_FORM_ID" method="POST">
```

Replace `YOUR_TESTIMONIAL_FORM_ID` with your actual ID from Step 1.

**Example:**
```html
<form id="testimonialForm" action="https://formspree.io/f/xabc1234def567g" method="POST">
```

Then push to GitHub and deploy.

---

## STEP 3: How It Works When Live

**When a guest submits a testimonial:**

1. They fill in the form on your site
2. They click "Share Your Reflection"
3. They see: "Thank you. Your reflection has been received."
4. The testimonial goes to your **Formspree inbox** (not to the website)
5. You read it in your email / Formspree dashboard

---

## STEP 4: Adding Testimonials to Your Site Permanently

**When you get a great testimonial you want to feature:**

### The Testimonial Block Template

Find this section in tours.html (around line 616):

```html
<div class="testimonial-form">
  <h3>Add Your Reflection</h3>
  ...form code...
</div>
```

**ABOVE that section, add this code:**

```html
<div class="testimonial-list" style="margin-bottom: 48px;">
  <div class="testimonial-item">
    <p class="testimonial-text">"[THE EXACT QUOTE GOES HERE]"</p>
    <p class="testimonial-author">[Guest Name]</p>
    <p class="testimonial-location">[City, Country]</p>
  </div>
</div>
```

### Example - Real Testimonial Added

```html
<div class="testimonial-list" style="margin-bottom: 48px;">
  <div class="testimonial-item">
    <p class="testimonial-text">"Read didn't just show us paintings. He taught us how to truly see them. The way he explained how the gray was actually blue, green, and violet fighting under thin paint changed how I look at art forever."</p>
    <p class="testimonial-author">Anne</p>
    <p class="testimonial-location">New York</p>
  </div>
  <div class="testimonial-item">
    <p class="testimonial-text">"What struck me most was how alive everything felt. Not scripted, not rehearsed. Read was genuinely excited to show us these paintings, and that energy is contagious."</p>
    <p class="testimonial-author">Karen</p>
    <p class="testimonial-location">New York</p>
  </div>
</div>
```

Then push to GitHub. They'll be live permanently.

---

## STEP 5: Quick Reference - Copy/Paste Template

Every time you want to add a new testimonial, copy this:

```html
<div class="testimonial-item">
  <p class="testimonial-text">"[PASTE EXACT QUOTE HERE]"</p>
  <p class="testimonial-author">[Guest Name]</p>
  <p class="testimonial-location">[City, Country - optional]</p>
</div>
```

Add it inside the `<div class="testimonial-list">` block.

---

## STEP 6: Manage Your Testimonials

**Your Formspree Dashboard:**
- https://formspree.io/
- All testimonials land here in your inbox
- Read them, decide which ones are strong
- Screenshot or copy the ones you want to feature
- Add to HTML (Step 4)
- Push to GitHub

**That's it.**

---

## THE WORKFLOW (Super Simple)

1. **Guest books** → Email to Formspree inbox
2. **Guest submits testimonial** → Email to Formspree inbox
3. **You read them as emails arrive** → Decide which are great
4. **Copy-paste great ones into HTML** → Using template above
5. **Push to GitHub** → Cloudflare deploys in 1-3 minutes
6. **Testimonials live permanently** → No refresh needed

---

## Testing It

Before going live, test the testimonial form:
1. Fill out the form on your site
2. Check your Formspree inbox → You should get an email
3. Go to https://formspree.io/ and see it in the dashboard
4. Once it works, you're good to go

---

## Important Notes

- **Testimonials only appear on your site if you manually add them to the HTML**
- This is actually better because you curate them
- You control which testimonials show (no bad reviews)
- They persist forever once added to the HTML
- When you push to GitHub, testimonials stay live
- Guests don't see their testimonial appear instantly—it goes to your email first, then you add it

---

## Still Questions?

The key insight: **Testimonials go to Formspree (your inbox), not the website. You curate which ones appear by adding them to the HTML code.**

This is more professional than auto-displaying every submission, and it ensures testimonials never disappear.
