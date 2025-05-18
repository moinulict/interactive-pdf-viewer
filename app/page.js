'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PDF viewer to avoid SSR issues
const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="flex justify-center min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">PDF Viewer with Context Menu</h1>
      <PDFViewer pdfUrl="/sample.pdf" />
    </main>
  );
} 