import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  linkedinUrl?: string;
  liveUrl?: string;
  huggingFaceUrl?: string;
  tags: string[];
  isNew?: boolean;
  isComingSoon?: boolean;
  color?: string; // Hex or RGB color for glow effect
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Language' | 'Frontend' | 'Backend' | 'Tool' | 'Core';
}

export interface Qualification {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  type: 'Education' | 'Experience';
  description?: string;
  certificate?: string; // Path to image
  certificateUrl?: string; // URL to external certificate link
  linkedinUrl?: string; // URL to the LinkedIn post
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface ServiceCard {
  id: number;
  title: string;
  icon: string; // We'll use string identifiers for icons
  description: string;
}