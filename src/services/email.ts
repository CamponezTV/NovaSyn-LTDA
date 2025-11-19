import { WaitlistFormData, SendEmailResponse } from "@/types/form";

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendWaitlistEmail(data: WaitlistFormData): Promise<SendEmailResponse> {
  if (!BREVO_API_KEY) {
    console.error("Brevo API key is not configured");
    return { success: false, error: "Email service not configured" };
  }

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
          name: "Novasyn Waitlist",
          email: "noreply@novasyn.com" // Update with your sender email
        },
        to: [{
          email: "your-email@novasyn.com", // Update with recipient email
          name: "Novasyn Team"
        }],
        subject: `Nova inscrição na waitlist: ${data.storeName}`,
        htmlContent: `
          <h2>Nova inscrição na waitlist!</h2>
          <p><strong>Loja:</strong> ${data.storeName}</p>
          <p><strong>Segmento:</strong> ${data.segment}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Localização:</strong> ${data.location}</p>
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
