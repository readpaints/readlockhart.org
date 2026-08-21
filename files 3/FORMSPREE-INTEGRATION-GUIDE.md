# Formspree Integration Guide for Tours Page

## Overview

Your tours page now integrates with Formspree to handle tour booking inquiries. When visitors submit the "Request a Tour" form, their information is automatically sent to your Formspree inbox.

---

## Installation

From your project root, install the Formspree React library:

```bash
npm install @formspree/react
```

This package is imported at the top of your `tours-page.jsx` file and handles form submission.

---

## What Gets Sent to You

When a visitor submits a tour inquiry, Formspree sends you an email containing:

- **Name** — Visitor's name
- **Email** — Their email address
- **Phone** — WhatsApp/phone (if provided)
- **Guests** — Number of people in their group
- **Museum** — Which tour they're interested in (Prado, Reina Sofía, or Thyssen)
- **Date** — Preferred tour date
- **Time** — Preferred tour time
- **Interests** — Selected interests (comma-separated, e.g., "Velázquez, Technique, Spanish History")
- **Ticket Assistance** — Whether they want you to purchase tickets
- **Notes** — Any additional questions or special requests

---

## How It Works

**When a visitor clicks "Request a Tour":**

1. The form validates required fields
2. Interests (an array) are converted to a comma-separated string for email readability
3. All form data is submitted securely to Formspree via HTTPS
4. You receive an email in your Formspree inbox
5. The visitor sees a success message: "Thank you! I'll be in touch shortly."
6. The form clears automatically after 3 seconds

**If there's an error:**

The visitor will see an error message (though Formspree submission is very reliable).

---

## Managing Responses in Formspree

1. Log into your Formspree account at https://formspree.io/
2. Go to your form (ID: `xrededzd`)
3. You'll see all submissions in the dashboard
4. Click any submission to view full details
5. You can reply directly from Formspree, or copy the visitor's email and contact them separately

---

## Testimonials Form (Still Local)

The "Share Your Experience" testimonials form works independently:

- Testimonials are **not** sent to Formspree
- Instead, they're collected locally and display on the page immediately
- Testimonials persist in your component's state during the session
- If you want to also email testimonials to yourself, you can set up a separate Formspree endpoint

---

## Testing the Form

Before launching publicly:

1. Fill out the "Request a Tour" form completely
2. Use your own email in the email field
3. Click "Request a Tour"
4. Check your email inbox for the Formspree confirmation
5. Verify all fields appear correctly

---

## Important Notes

**Form Security:**
- Formspree handles HTTPS encryption automatically
- Visitor email addresses are never stored publicly
- Form submissions go directly to your Formspree account

**Email Frequency:**
- You'll receive one email per form submission
- Formspree may batch emails if there are many submissions at once
- Check your spam folder if you don't see submissions

**Rate Limiting:**
- Formspree includes spam protection by default
- Legitimate visitors won't hit limits

---

## Customization

If you want to:

- **Add a field to the form** — add it to the form HTML and the formData object
- **Change the form ID** — update the `xrededzd` in the fetch URL and in the hook
- **Send testimonials to email too** — create a separate Formspree endpoint and add another submission handler
- **Customize the success message** — modify the "Thank you! I'll be in touch shortly." text in the component

---

## Troubleshooting

**"Form submission failed" error:**
- Check that you installed `@formspree/react`
- Verify your Formspree form ID is correct
- Check your network tab in browser dev tools to see if the request reached Formspree

**Not receiving emails:**
- Check your spam/junk folder
- Verify the email address in your Formspree account settings
- Check Formspree dashboard to see if submissions are recorded there

**Visitor not seeing success message:**
- This is usually just a timing issue—the form still submitted successfully
- They should receive a separate confirmation from Formspree if you've configured it

---

## Next Steps

1. Run `npm install @formspree/react`
2. Deploy your updated tours page
3. Test the form with a test submission
4. Monitor your Formspree inbox as bookings come in
5. Respond to inquiries promptly (within 24-48 hours is ideal)

The form is production-ready. Launch it! 🚀
