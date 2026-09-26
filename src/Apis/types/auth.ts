// 1. Data Payloads (البيانات المرسلة للـ API)
export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyResetCodePayload {
  resetCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

// 2. API Responses (البيانات القادمة من الـ API)
export interface ForgotPasswordResponse {
  statusMsg?: string;
  message: string;
}

export interface VerifyResetCodeResponse {
  status: string; // e.g., "Success"
  message?: string;
}

export interface ResetPasswordResponse {
  token: string;
  message?: string;
}

// 3. React Hook Form Types (أنواع المدخلات لكل مرحلة)
export interface Step1FormInput {
  email: string;
}

export interface Step2FormInput {
  resetCode: string;
}

export interface Step3FormInput {
  newPassword: string;
}


export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  token?: string;
  statusMsg?: string;
}