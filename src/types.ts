/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Package {
  id: string;
  name: string;
  price: string;
  priceValue: number; // For calculations and filters
  targetGroup: string;
  dataPerDay: string;
  dataTotal?: string;
  voiceInternal?: string;
  voiceExternal?: string;
  extraBenefits: string[];
  notIncluded?: string[];
  isHot?: boolean;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  recommendedPackageId: string;
  recommendedPackageName: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Registration {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  packageId: string;
  packageName: string;
  notes: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'activated' | 'cancelled';
}
