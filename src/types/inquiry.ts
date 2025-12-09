export interface InquiryFormData {
  studentName: string;
  parentName: string;
  email?: string;
  phone: string;
  occupation: string;
  category: 'Admission' | 'Inquiry' | 'Visit' | 'Other';
  message?: string;
  source: 'Website' | 'Facebook' | 'Instagram' | 'Newspaper' | 'Friends/Family' | 'Google Search' | 'Other';
}

export interface InquiryResponse {
  _id: string;
  studentName: string;
  parentName: string;
  email?: string;
  phone: string;
  occupation: string;
  category: string;
  message?: string;
  remarks: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryStats {
  all: number;
  new: number;
  contacted: number;
  notResponding: number;
  followUp: number;
  enrolled: number;
  rejected: number;
}
