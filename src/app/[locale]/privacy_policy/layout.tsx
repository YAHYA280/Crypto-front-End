import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
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

export default LoginLayout;
