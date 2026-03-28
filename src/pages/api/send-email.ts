import type { APIRoute } from 'astro';

interface EmailData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  type?: string;
  to?: string;
}

interface PhotoAttachment {
  filename: string;
  content: string; // base64
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let emailData: EmailData;
    let photoAttachments: PhotoAttachment[] = [];
    const contentType = request.headers.get('content-type') || '';

    // Handle both FormData and JSON requests
    if (contentType.includes('application/json')) {
      const body = await request.json();
      emailData = {
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || 'Not provided',
        service: body.service || 'General enquiry',
        message: body.message || '',
        type: body.type || 'contact',
        to: body.to,
      };

      // Handle base64 photos from JSON
      if (Array.isArray(body.photos)) {
        for (const photo of body.photos) {
          if (photo.filename && photo.content) {
            photoAttachments.push({
              filename: photo.filename,
              content: photo.content,
            });
          }
        }
      }
    } else {
      const formData = await request.formData();
      emailData = {
        name: (formData.get('name') as string) || '',
        phone: (formData.get('phone') as string) || '',
        email: (formData.get('email') as string) || 'Not provided',
        service: (formData.get('service') as string) || 'General enquiry',
        message: (formData.get('message') as string) || '',
        type: (formData.get('form_type') as string) || 'contact',
      };

      // Process photo attachments
      const photoCount = parseInt((formData.get('photo_count') as string) || '0', 10);
      for (let i = 0; i < photoCount; i++) {
        const photoFile = formData.get(`photo_${i}`) as File | null;
        if (photoFile && photoFile.size > 0) {
          const arrayBuffer = await photoFile.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString('base64');
          photoAttachments.push({
            filename: photoFile.name || `photo-${i + 1}.jpg`,
            content: base64,
          });
        }
      }
    }

    const { name, phone, email, service, message, type, to } = emailData;

    // --- Validation helpers ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disposableDomains = ['tempmail', 'throwaway', 'guerrilla', 'mailinator', '10minute', 'temp-mail', 'fakeinbox'];

    const ukPhoneRegex = /^(\+?44|0)?[1-9]\d{9,10}$/;
    const nameRegex = /^[a-zA-Z\s\-']+$/;

    const profanityPatterns = [
      /\b(fu+ck|f+u+k|fuk|fck|fcuk|phuck|phuk)/i,
      /\b(sh[i1]+t|sh[i1]te|bullsh)/i,
      /\b(a+ss\s*ho+le|arsehole|arse)/i,
      /\b(bastard|wanker|tosser|bellend|prick|dick\s*head|twat|cunt)/i,
      /\b(bitch|slut|whore)/i,
      /\bfuck\s*(off|you|u|ya|this|that|ing)/i,
      /\bpi+ss\s*(off|ed)/i,
    ];

    const spamPatterns = [
      /\[url=/i, /\[link=/i, /<a\s+href/i,
      /viagra|cialis|casino|crypto|bitcoin|lottery/i,
      /click here|buy now|act now|limited time/i,
      /(.)\1{10,}/,
    ];

    const isGibberish = (text: string): boolean => {
      const cleaned = text.replace(/\s+/g, '').toLowerCase();
      if (cleaned.length < 3) return false;
      const words = text.trim().split(/\s+/);
      if (words.length >= 3) return false;
      if (/^[asdfghjklqwertyuiopzxcvbnm]{8,}$/i.test(cleaned)) {
        const vowelRatio = (cleaned.match(/[aeiou]/gi) || []).length / cleaned.length;
        if (vowelRatio < 0.1) return true;
      }
      if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(cleaned)) return true;
      if (/(.)\1{5,}/.test(cleaned)) return true;
      if (/(.{1,3})\1{4,}/.test(cleaned)) return true;
      if (cleaned.length > 6 && !/[aeiou]/i.test(cleaned)) return true;
      return false;
    };

    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return text.replace(/[&<>"']/g, (c) => map[c]);
    };

    // --- Determine request type ---
    const isChatbot = type === 'chatbot-lead' || type === 'chatbot';
    const isCallback = type === 'callback';

    // --- Spam & profanity checks (all submissions) ---
    const allText = `${name} ${message}`;
    if (spamPatterns.some(p => p.test(allText))) {
      return new Response(
        JSON.stringify({ success: true, message: 'Thank you for your message.' }), // Fake success for bots
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (profanityPatterns.some(p => p.test(allText))) {
      return new Response(
        JSON.stringify({ success: false, error: "Your message contains language we can't send. Please update it and try again." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Validate contact form submissions ---
    if (!isChatbot) {
      if (!name || name.trim().length < 2) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter your full name.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (!nameRegex.test(name.trim())) {
        return new Response(
          JSON.stringify({ success: false, error: 'Name contains invalid characters.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (isGibberish(name)) {
        return new Response(
          JSON.stringify({ success: false, error: "That doesn't look quite right. Please check your name and try again." }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (!phone) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter your phone number.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const phoneClean = phone.replace(/[\s\-\(\)\.]/g, '');
      if (!ukPhoneRegex.test(phoneClean)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter a valid UK phone number.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Skip email/message validation for callback forms (they have preset messages)
      if (!isCallback) {
        if (email && email !== 'Not provided') {
          if (!emailRegex.test(email)) {
            return new Response(
              JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }
          const emailDomain = email.split('@')[1]?.toLowerCase() || '';
          if (disposableDomains.some(d => emailDomain.includes(d))) {
            return new Response(
              JSON.stringify({ success: false, error: 'Please use a valid email address.' }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }

        if (!message || message.trim().length < 5) {
          return new Response(
            JSON.stringify({ success: false, error: 'Please provide details about your enquiry.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        if (isGibberish(message)) {
          return new Response(
            JSON.stringify({ success: false, error: "That doesn't look quite right. Please check your message and try again." }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // --- Validate chatbot lead submissions ---
    if (isChatbot && !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'No conversation data.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const serviceLabels: Record<string, string> = {
      emergency: 'Emergency Locksmith',
      auto: 'Auto Locksmith',
      safe: 'Safe Engineer',
      other: 'Other',
      '': 'Not specified',
    };

    const recipient = to || 'william@bullardlocks.com';
    const isChatbotLead = type === 'chatbot-lead' || type === 'chatbot';
    const hasPhotos = photoAttachments.length > 0;

    const photoNote = hasPhotos
      ? `<div class="field"><span class="label">Photos attached:</span><p>${photoAttachments.length} photo(s) attached — see attachments below.</p></div>`
      : '';

    const emailStyles = `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; font-size: 14px; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1fae9b; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .content { padding: 20px; background: #f9f9f9; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 700; color: #1fae9b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
    .field p { margin: 0; font-size: 15px; color: #333; }
    .field a { color: #1fae9b; text-decoration: none; font-size: 15px; }
    .urgent-badge { background: #ff4444; color: white; padding: 8px 14px; display: inline-block; margin-bottom: 15px; font-weight: bold; font-size: 14px; }
    .photo-badge { display: inline-block; background: rgba(31,174,155,0.1); border: 1px solid #1fae9b; color: #1fae9b; padding: 4px 12px; font-size: 13px; margin-top: 4px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #999; }
    pre { white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 15px; margin: 0; }`;

    const emailHtml = isChatbotLead
      ? `<!DOCTYPE html>
<html>
<head><style>${emailStyles}</style></head>
<body>
  <div class="container">
    <div class="header"><h1>New Lead from AI Chatbot</h1></div>
    <div class="content">
      ${message.includes('IMMEDIATE') ? '<div class="urgent-badge">URGENT - CALL BACK IMMEDIATELY</div>' : ''}
      <div class="field"><span class="label">Name</span><p>${escapeHtml(name)}</p></div>
      <div class="field"><span class="label">Phone</span><p><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p></div>
      ${email && email !== 'Not provided' ? `<div class="field"><span class="label">Email</span><p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p></div>` : ''}
      <div class="field"><span class="label">Details</span><pre>${escapeHtml(message)}</pre></div>
      ${photoNote}
    </div>
    <div class="footer">
      <p>Lead captured via AI Chatbot on bullardlocks.com</p>
      <p>${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
    </div>
  </div>
</body>
</html>`
      : `<!DOCTYPE html>
<html>
<head><style>${emailStyles}</style></head>
<body>
  <div class="container">
    <div class="header"><h1>${type === 'callback' ? 'New Callback Request' : 'New Contact Form Submission'}</h1></div>
    <div class="content">
      <div class="field"><span class="label">Name</span><p>${escapeHtml(name)}</p></div>
      <div class="field"><span class="label">Phone</span><p><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p></div>
      <div class="field"><span class="label">Email</span><p><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p></div>
      <div class="field"><span class="label">Service</span><p>${escapeHtml(serviceLabels[service] || service)}</p></div>
      <div class="field"><span class="label">Message</span><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p></div>
      ${hasPhotos ? `<div class="field"><span class="label">Photos</span><p><span class="photo-badge">${photoAttachments.length} photo(s) attached</span></p></div>` : ''}
    </div>
    <div class="footer">
      <p>Submitted from bullardlocks.com | ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
    </div>
  </div>
</body>
</html>`;

    const sourceLabel = isChatbotLead ? 'Chatbot' : type === 'callback' ? 'Callback' : 'Contact Form';
    const subject = `[${sourceLabel}] ${message.includes('IMMEDIATE') ? 'URGENT: ' : ''}${serviceLabels[service] || 'Enquiry'} - ${name}${hasPhotos ? ` (${photoAttachments.length} photo${photoAttachments.length > 1 ? 's' : ''})` : ''}`;

    const emailPayload: Record<string, unknown> = {
      from: 'Bullard Locks <noreply@bullardlocks.com>',
      to: [recipient],
      reply_to:
        email !== 'Not provided' && !email.includes('chatbot-lead') ? email : undefined,
      subject,
      html: emailHtml,
    };

    if (photoAttachments.length > 0) {
      emailPayload.attachments = photoAttachments.map((p) => ({
        filename: p.filename,
        content: p.content,
      }));
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send email. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: isChatbotLead
          ? 'Your details have been sent to our team.'
          : 'Thank you for your message. We will get back to you shortly.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
