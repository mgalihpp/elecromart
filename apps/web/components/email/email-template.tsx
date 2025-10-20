import * as React from 'react';

interface EmailTemplateProps {
  url: string;
  type: 'reset-password' | 'verify-email';
}

export function EmailTemplate({ url, type }: EmailTemplateProps) {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 24,
        background: '#ffffff',
        borderRadius: 8,
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#111827',
        boxShadow: '0 2px 6px rgba(16,24,40,0.05)',
      }}
    >
      <h1 style={{ margin: '0 0 12px', fontSize: 20 }}>
        {type === 'verify-email' ? 'Verify your email' : 'Reset Password'}
      </h1>
      <p style={{ margin: '0 0 20px', lineHeight: 1.5 }}>
        {type === 'verify-email'
          ? 'Thanks for creating an account. Please verify your email address by clicking the button below.'
          : 'You requested a password reset. Click the button below to choose a new password.'}
      </p>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#0b74ff',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '12px 20px',
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          {type === 'verify-email' ? 'Verify Email' : 'Reset Password'}
        </a>
      </div>

      <p style={{ margin: '0 0 8px', fontSize: 14 }}>
        If the button doesn't work, copy and paste the link below into your
        browser:
      </p>
      <p
        style={{
          wordBreak: 'break-all',
          fontSize: 13,
          color: '#0b74ff',
          margin: '0 0 20px',
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0b74ff', textDecoration: 'none' }}
        >
          {url}
        </a>
      </p>

      <p style={{ margin: '0 0 8px', fontSize: 14 }}>
        If you didn't request this, you can safely ignore this email.
      </p>

      <div style={{ marginTop: 28, fontSize: 13, color: '#6b7280' }}>
        <div>Thanks,</div>
        <div style={{ fontWeight: 600, marginTop: 6 }}>The Team</div>
      </div>

      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #eef2f7',
          margin: '20px 0',
        }}
      />

      <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
        This link will expire in 24 hours.
      </p>
    </div>
  );
}
