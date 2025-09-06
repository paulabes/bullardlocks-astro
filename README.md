
# Bullard Locks - Professional Locksmith Website

A well-structured website for Bullard Locks, operated by William Bullard in Crouch End, North London.

## 🚀 Production Status: NEARLY READY — small items remain

This site is functionally complete and close to production. Most front-end features, schema markup, and the contact/email flow are implemented. A small number of operational tasks must be finalised on the target hosting environment before going fully live (see "Outstanding before launch").

### Current runtime notes
- reCAPTCHA is temporarily disabled in the frontend and bypassed in `send_email.php` for testing. Re-enable before public launch.
- Google reviews are rendered by `js/google-reviews.js` which first loads `api/google-reviews.json` (local fallback). Ensure `api/google-reviews.json` is present on the server or provide the remote endpoint.
- `send_email.php` uses PHP's `mail()` function; verify mail delivery on your host or configure SMTP / a transactional email provider.

## Key implemented features
- Responsive design (Bootstrap)
- Dynamic header/footer includes via JavaScript
- Contact forms (contact + emergency + auto + safe) with AJAX support
- Server-side email handling via `send_email.php` (HTML emails + confirmation flow)
- Google reviews injection (local JSON fallback)
- Accessibility and SEO improvements (JSON-LD schema present)

## Project structure (relevant files)
```
index.html
about.html
contact.html
services.html
locations.html
send_email.php
README.md
sitemap.xml
css/style.css
js/main.js
js/google-reviews.js
api/google-reviews.json
includes/header.html
includes/footer.html
services/*.html
```

## 📝 Outstanding before launch (short checklist)

1. reCAPTCHA: re-enable Google reCAPTCHA v2 on forms and set the secret key in `send_email.php`. The verification code is present but commented out.
2. Email delivery: verify `mail()` on your host. If unreliable, configure SMTP or use a transactional provider (SendGrid, Mailgun) and update `send_email.php` accordingly.
3. Reviews: ensure `api/google-reviews.json` is deployed or configure the remote reviews endpoint used by `js/google-reviews.js`.
4. Sitemap & Search Console: `sitemap.xml` lastmod timestamps were updated; submit sitemap to Google Search Console.
5. SSL: confirm production server has a valid TLS certificate and enforce HTTPS redirects.
6. Analytics & privacy: add analytics if desired and ensure cookie/privacy notices meet regulations.
7. Final QA: open each page and test forms, chat modal, phone/WhatsApp CTAs, and verify no console errors. Remove debug console logs from `js/main.js` if desired.

## Quick deployment tips

- Run a local PHP server to test email flow: `php -S localhost:8000` and submit the forms; check the server error log for mail() diagnostics.
- Keep `api/google-reviews.json` on the server for deterministic reviews rendering without a remote API.

## Last updated

- September 6, 2025

---

If you want, I can run a quick local smoke test (start PHP server, open `contact.html`, and test form submission flow) and report results.
- **Hosting**: Any web server with PHP support (cPanel optimized)
- **Forms**: 4 form types with reCAPTCHA and professional email templates
- **Security**: Google reCAPTCHA v2 integration on all forms
- **Email System**: Complete with HTML templates and confirmations
