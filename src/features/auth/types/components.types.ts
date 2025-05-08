import React from 'react';

export type LabeledInputProps = {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type LeftBannerProps = {
  title: string;
  subtitle: string;
};

export type SingleCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
  highlight?: boolean;
};

export type InputFieldProps = {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string; // ✅ 추가
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ 추가
};
