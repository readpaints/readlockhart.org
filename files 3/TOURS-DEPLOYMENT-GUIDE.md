# Complete Deployment Guide: Adding Tours to readlockhart.org

This guide walks you through adding the tours page to your website and deploying everything to Cloudflare Pages.

---

## Prerequisites

You should have:
- Access to your GitHub repository (where readlockhart.org code lives)
- Git installed on your computer
- The new `tours.html` file (provided)
- A text editor (VS Code, Sublime Text, etc.)

---

## STEP 1: Locate Your Project Folder

**What you're doing:** Finding where your readlockhart.org code lives on your computer.

**How to do it:**

1. Open your terminal/command prompt
2. Navigate to where your project lives. For example:
   ```bash
   cd ~/Documents/readlockhart
   # or
   cd ~/repos/readlockhart
   # or wherever you have it stored
   ```

3. Verify you're in the right place by listing the files:
   ```bash
   ls
   # or on Windows:
   dir
   ```
   
   You should see `index.html` and possibly other files.

---

## STEP 2: Add the Tours Page File

**What you're doing:** Adding the new `tours.html` file to your project.

**How to do it:**

1. **Option A: Copy-paste**
   - Find the `tours.html` file you downloaded
   - Copy it
   - Paste it into your project folder (same level as `index.html`)

2. **Option B: Via terminal**
   ```bash
   cp ~/Downloads/tours.html ./tours.html
   ```
   (Adjust the path to wherever you downloaded it)

3. **Verify it worked:**
   ```bash
   ls
   ```
   You should now see both `index.html` and `tours.html` listed.

---

## STEP 3: Update Your Main Navigation

**What you're doing:** Adding a "Tours" link to your main website navigation so visitors can find the tours page.

**How to do it:**

1. Open `index.html` in your text editor (VS Code, Sublime, etc.)

2. Find the navigation section. Look for:
   ```html
   <ul class="nav-links">
      <li><a href="...">...</a></li>
   </ul>
   ```

3. You should see links like Portfolio, Contact, etc. Add this line:
   ```html
   <li><a href="tours.html">Tours</a></li>
   ```

   **Example of what it should look like after:**
   ```html
   <ul class="nav-links">
      <li><a href="index.html">Portfolio</a></li>
      <li><a href="tours.html">Tours</a></li>
      <li><a href="index.html#contact">Contact</a></li>
   </ul>
   ```

4. Save the file.

---

## STEP 4: Verify Everything Locally (Optional but Recommended)

**What you're doing:** Testing the tours page on your computer before deploying.

**How to do it:**

1. In your terminal, start a simple server:
   ```bash
   # If you have Python 3:
   python3 -m http.server 8000
   
   # If you have Python 2:
   python -m SimpleHTTPServer 8000
   
   # If you have Node.js:
   npx http-server
   ```

2. Open your browser and go to:
   ```
   http://localhost:8000
   ```

3. Click the "Tours" link in the navigation—you should see the tours page load

4. Test the booking form (fill it out and click "Request a Tour")—you should see "Thank you!" message

5. When done testing, stop the server by pressing `Ctrl+C` in the terminal

---

## STEP 5: Push to GitHub

**What you're doing:** Uploading your changes (the new tours page and updated nav) to GitHub so Cloudflare can deploy them.

**How to do it:**

1. In your terminal (still in your project folder), check the status:
   ```bash
   git status
   ```
   You should see `index.html` and `tours.html` listed as modified/new.

2. Add the changes:
   ```bash
   git add .
   ```

3. Create a commit message:
   ```bash
   git commit -m "Add museum tours page with Formspree integration"
   ```

4. Push to GitHub:
   ```bash
   git push origin main
   ```
   (If your branch is named something else, use that instead of `main`)

5. If prompted for credentials, enter your GitHub username and personal access token (if you use one).

**If you get an error:**
- Make sure you're in the right folder (`pwd` to check)
- Make sure you have Git installed (`git --version`)
- Make sure you're connected to your GitHub repo (`git remote -v` should show your repo)

---

## STEP 6: Cloudflare Auto-Deploys

**What you're doing:** Cloudflare automatically detects your GitHub push and deploys.

**How it works (automatic):**

1. When you pushed to GitHub, Cloudflare's system detected the change
2. Cloudflare automatically:
   - Pulls your latest code
   - Builds the site
   - Deploys it to live servers

3. This usually takes **1-3 minutes**

**To verify the deployment:**

1. Go to your Cloudflare Pages dashboard: https://dash.cloudflare.com/
2. Find your `readlockhart` project
3. You should see a recent build with a ✓ (success checkmark)
4. Wait for the status to show "Ready" or "Published"

---

## STEP 7: Test the Live Site

**What you're doing:** Verifying that the tours page is live on readlockhart.org.

**How to do it:**

1. Open your browser and go to:
   ```
   https://readlockhart.org/tours.html
   ```

2. You should see the tours page load with:
   - Your bio at the top
   - The three tour options
   - Pricing
   - Booking form
   - Testimonials section

3. Click the Tours link in the navigation—it should work

4. **Optional:** Fill out the booking form and submit. You should see "Thank you!" appear, and a moment later, you should receive an email in your Formspree inbox

---

## STEP 8: Verify Formspree Integration

**What you're doing:** Making sure booking inquiries are flowing to your Formspree account.

**How to do it:**

1. Go to https://formspree.io/ and log in
2. Navigate to your form (ID: `xrededzd`)
3. You should see your test submission(s) in the dashboard
4. Click on a submission to see the full details

**If you don't see submissions:**
- Wait a few seconds and refresh the page
- Check your spam/junk email folder
- Make sure you submitted a valid form

---

## Step 9 (Optional): Add a Hero Image or Section

**What you're doing:** Adding an optional hero image to the tours page to match your portfolio aesthetic.

**If you want to add a banner/hero image:**

1. Create an image (hero.jpg or similar)
2. Add it to your project folder
3. In `tours.html`, find this line:
   ```html
   <h1>Private Museum Tours in Madrid</h1>
   ```
4. Add a background image to the hero section by modifying the style, or add an `<img>` tag

*This is optional and the page works great without it.*

---

## Troubleshooting

### "Tours page shows 404 or is blank"
- Make sure `tours.html` is in the same folder as `index.html`
- Check that the deployment finished (look at Cloudflare dashboard)
- Try clearing your browser cache (Ctrl+Shift+Delete) and refresh

### "Form doesn't submit"
- Check that you're using the live site (https://readlockhart.org/tours.html), not localhost
- Check browser console for errors (F12 → Console tab)
- Verify Formspree form ID is correct (it should be `xrededzd`)

### "Navigation Tours link doesn't work"
- Make sure you added `<li><a href="tours.html">Tours</a></li>` to the nav in `index.html`
- Make sure you saved `index.html`
- Make sure you pushed the changes to GitHub

### "Cloudflare deployment stuck or failing"
- Check the Cloudflare Pages dashboard for error logs
- Click on the failed build to see what went wrong
- Usually it's just a temporary issue—try pushing again

---

## Next Steps

Once the tours page is live:

1. **Share with Anne & Karen:** Send them the tours page link and ask them to submit testimonials via the "Share Your Experience" form

2. **Monitor Formspree:** Check your Formspree inbox regularly for tour inquiries and respond within 24 hours

3. **Iterate:** As you get feedback, you can update the tours page. Any changes you make:
   - Edit `tours.html` locally
   - Push to GitHub
   - Cloudflare auto-deploys (1-3 minutes)

4. **Consider adding:**
   - A professional photo of yourself for credibility
   - A small FAQ section
   - Testimonials once you have them from Anne/Karen

---

## Summary of Files

Your project should now contain:
- `index.html` (updated with Tours navigation link)
- `tours.html` (new tours page)
- Any other files you already had (images, etc.)

---

## Questions?

If something isn't working:
1. Check the troubleshooting section above
2. Look at your browser's developer console (F12) for error messages
3. Check Cloudflare Pages dashboard for deployment errors
4. Verify the Formspree endpoint is correct: `https://formspree.io/f/xrededzd`

Good luck! The tours page is live once you complete Step 6. 🎨
