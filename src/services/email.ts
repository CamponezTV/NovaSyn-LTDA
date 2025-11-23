import { WaitlistFormData, SendEmailResponse } from "@/types/form";
import { sanitizeHtml, validateFormData } from "@/lib/security";
import { rateLimiter, getClientIdentifier } from "@/lib/rate-limit";

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL || "contato@novasyn.com.br";
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL || "noreply@novasyn.com.br";
const RATE_LIMIT_ENABLED = import.meta.env.VITE_ENABLE_RATE_LIMIT !== 'false';

export async function sendWaitlistEmail(data: WaitlistFormData): Promise<SendEmailResponse> {
  // Validate API configuration
  if (!BREVO_API_KEY) {
    console.error("Brevo API key is not configured");
    return { success: false, error: "Serviço de email não configurado" };
  }

  // Rate limiting check
  if (RATE_LIMIT_ENABLED) {
    const clientId = getClientIdentifier();
    
    if (!rateLimiter.isAllowed(clientId)) {
      const resetTime = rateLimiter.getTimeUntilReset(clientId);
      const minutes = Math.ceil(resetTime / 60000);
      return { 
        success: false, 
        error: `Muitas requisições. Tente novamente em ${minutes} minuto(s).` 
      };
    }
    
    rateLimiter.recordRequest(clientId);
  }

  // Validate and sanitize input
  const validation = validateFormData({
    storeName: data.storeName,
    segment: data.segment,
    whatsapp: data.whatsapp,
    email: data.email,
    location: data.location,
  });

  if (!validation.isValid) {
    return {
      success: false,
      error: `Dados inválidos: ${Object.values(validation.errors).join(', ')}`
    };
  }

  const sanitizedData = validation.sanitized;

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Nova Syn - Waitlist",
          email: SENDER_EMAIL
        },
        to: [{
          email: RECIPIENT_EMAIL,
          name: "Nova Syn Team"
        }],
        subject: `Nova inscrição na waitlist: ${sanitizeHtml(sanitizedData.storeName)}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
              .label { font-weight: bold; color: #6D28D9; }
              .value { margin-top: 5px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🎉 Nova Inscrição na Waitlist!</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">🏪 Nome da Loja:</div>
                  <div class="value">${sanitizeHtml(sanitizedData.storeName)}</div>
                </div>
                <div class="field">
                  <div class="label">🏷️ Segmento:</div>
                  <div class="value">${sanitizeHtml(sanitizedData.segment)}</div>
                </div>
                <div class="field">
                  <div class="label">📱 WhatsApp:</div>
                  <div class="value">${sanitizeHtml(sanitizedData.whatsapp)}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value">${sanitizeHtml(sanitizedData.email)}</div>
                </div>
                <div class="field">
                  <div class="label">📍 Localização:</div>
                  <div class="value">${sanitizeHtml(sanitizedData.location)}</div>
                </div>
                <div class="footer">
                  <p>Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                  <p>Sistema de Waitlist - Nova Syn</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      return { 
        success: false, 
        error: errorData.message || "Failed to send email" 
      };
    }

    const result = await response.json();
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
