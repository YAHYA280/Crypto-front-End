import React from 'react';

interface PrivacyPolicyLayoutProps {
  children: React.ReactNode;
}

const PrivacyPolicyLayout: React.FC<PrivacyPolicyLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Privacy policy</title>
      </head>
      <body>
        <div className="privacy-policy-container">{children}</div>
      </body>
    </html>
  );
};

export default PrivacyPolicyLayout;
