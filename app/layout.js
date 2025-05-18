import './globals.css';

export const metadata = {
  title: 'PDF Viewer with Context Menu',
  description: 'A Next.js application that displays PDFs with a custom context menu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
