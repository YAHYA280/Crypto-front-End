import React from 'react';

interface TermsAndConditionsLayoutProps {
  children: React.ReactNode;
}

const TermsAndConditionsLayout: React.FC<TermsAndConditionsLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms And Conditions</title>
      </head>
      <body>
        <div className="terms-and-conditions-container">{children}</div>
      </body>
    </html>
  );
};

export default TermsAndConditionsLayout;
