export interface WaitlistFormData {
  storeName: string;
  segment: string;
  whatsapp: string;
  email: string;
  location: string;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}
