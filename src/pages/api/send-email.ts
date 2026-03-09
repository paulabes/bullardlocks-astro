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

    // Validate required fields (relaxed for chatbot leads — details are in the message)
    const isChatbot = type === 'chatbot-lead' || type === 'chatbot';
    if (!isChatbot && (!name || !phone || !message)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
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

    const emailHtml = isChatbotLead
      ? `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1fae9b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1fae9b; }
    .urgent-badge { background: #ff4444; color: white; padding: 8px 14px; display: inline-block; margin-bottom: 15px; border-radius: 4px; font-weight: bold; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>New Lead from AI Chatbot</h1></div>
    <div class="content">
      ${message.includes('IMMEDIATE') ? '<div class="urgent-badge">URGENT — CALL BACK IMMEDIATELY</div>' : ''}
      <div class="field"><span class="label">Customer Name:</span><p>${name}</p></div>
      <div class="field"><span class="label">Phone Number:</span><p><a href="tel:${phone}" style="font-size: 18px; font-weight: bold;">${phone}</a></p></div>
      <div class="field"><span class="label">Details:</span><pre>${message}</pre></div>
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
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1fae9b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1fae9b; }
    .photo-badge { display: inline-block; background: rgba(31,174,155,0.1); border: 1px solid #1fae9b; color: #1fae9b; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-top: 4px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>New Contact Form Submission</h1></div>
    <div class="content">
      <div class="field"><span class="label">Name:</span><p>${name}</p></div>
      <div class="field"><span class="label">Phone:</span><p><a href="tel:${phone}" style="font-weight:bold;">${phone}</a></p></div>
      <div class="field"><span class="label">Email:</span><p><a href="mailto:${email}">${email}</a></p></div>
      <div class="field"><span class="label">Service Required:</span><p>${serviceLabels[service] || service}</p></div>
      <div class="field"><span class="label">Message:</span><p>${message.replace(/\n/g, '<br>')}</p></div>
      ${hasPhotos ? `<div class="field"><span class="label">Photos:</span><p><span class="photo-badge"><i>📷 ${photoAttachments.length} photo(s) attached</i></span></p></div>` : ''}
    </div>
    <div class="footer">
      <p>Submitted from bullardlocks.com | ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
    </div>
  </div>
</body>
</html>`;

    const subject = isChatbotLead
      ? `${message.includes('IMMEDIATE') ? 'URGENT: ' : ''}New ${serviceLabels[service] || 'Locksmith'} Lead — ${name}`
      : `New ${serviceLabels[service] || 'Contact'} Enquiry from ${name}${hasPhotos ? ` (${photoAttachments.length} photo${photoAttachments.length > 1 ? 's' : ''})` : ''}`;

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
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
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
