'use client';

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Point to the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectionText, setSelectionText] = useState('');
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [goToPage, setGoToPage] = useState('');
  const containerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Zoom functions
  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.1, 3));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  }

  function resetZoom() {
    setScale(1);
  }

  // Go to specific page
  function handleGoToPage(e) {
    e.preventDefault();
    const pageNum = parseInt(goToPage);
    if (pageNum && pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
    setGoToPage('');
  }

  function handleMouseUp(event) {
    const sel = window.getSelection().toString().trim();
    if (sel) {
      setSelectionText(sel);
      setMenuPos({ x: event.clientX, y: event.clientY });
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  // Setup mouse event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseup', handleMouseUp);
      
      // Add click listener to close menu when clicking outside
      const handleClickOutside = (e) => {
        if (!e.target.closest('.context-menu')) {
          setShowMenu(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        container.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  // Handle mobile touch events
  useEffect(() => {
    let timer;
    const longPressThreshold = 500; // ms
    
    const handleTouchStart = () => {
      timer = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        if (text) {
          setSelectionText(text);
          setShowMenu(true);
        }
      }, longPressThreshold);
    };
    
    const handleTouchEnd = () => {
      clearTimeout(timer);
    };
    
    const container = containerRef.current;
    if (container && isMobile) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobile]);

  // Page navigation
  function goToPrevPage() {
    setPageNumber(page => Math.max(page - 1, 1));
  }

  function goToNextPage() {
    setPageNumber(page => Math.min(page + 1, numPages));
  }

  // Mobile menu style
  const menuStyle = isMobile ? {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '12px 12px 0 0',
    padding: '10px',
    zIndex: 1000,
  } : {
    position: 'fixed',
    top: menuPos.y,
    left: menuPos.x,
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  return (
    <div 
      ref={containerRef} 
      className="pdf-container relative mx-auto"
      style={{ width: isMobile ? '100%' : '800px' }}
    >
      {/* PDF Navigation Controls */}
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded">
        <div className="flex space-x-2">
          <button 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <a 
            href={pdfUrl} 
            download 
            className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
          >
            <span className="material-icons text-sm mr-1">download</span> Download
          </a>
          
          <button 
            onClick={() => window.print()} 
            className="px-4 py-2 bg-purple-500 text-white rounded flex items-center"
          >
            <span className="material-icons text-sm mr-1">print</span> Print
          </button>
        </div>
        
        <p className="text-center font-medium">
          Page {pageNumber} of {numPages || '--'}
        </p>
        
        <button 
          onClick={goToNextPage} 
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Zoom and Page Controls */}
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded border">
        <div className="flex space-x-2 items-center">
          <button 
            onClick={zoomOut} 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
            title="Zoom Out"
          >
            <span className="material-icons text-sm">zoom_out</span>
          </button>
          
          <div className="px-2 py-1 bg-white border rounded min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </div>
          
          <button 
            onClick={zoomIn} 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
            title="Zoom In"
          >
            <span className="material-icons text-sm">zoom_in</span>
          </button>
          
          <button 
            onClick={resetZoom} 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
            title="Reset Zoom"
          >
            <span className="material-icons text-sm">restart_alt</span>
          </button>
        </div>
        
        <form onSubmit={handleGoToPage} className="flex items-center space-x-2">
          <span className="text-sm">Go to:</span>
          <input
            type="number"
            min="1"
            max={numPages || 1}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="border rounded px-2 py-1 w-16 text-center"
            placeholder="Page"
          />
          <button 
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go
          </button>
        </form>
      </div>

      {/* PDF Document */}
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="border rounded p-4 flex justify-center"
      >
        <Page 
          pageNumber={pageNumber} 
          width={isMobile ? window.innerWidth - 40 : 800 * scale}
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="mx-auto"
        />
      </Document>

      {/* Context Menu */}
      {showMenu && (
        <div
          className="context-menu bg-white shadow-lg rounded-lg py-2 min-w-[150px] border"
          style={menuStyle}
        >
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
            onClick={() => {
              console.log('User clicked Explain:', selectionText);
              alert('Explain: ' + selectionText);
              setShowMenu(false);
            }}
          >
            <span className="material-icons text-sm mr-2">school</span> Explain
          </button>
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
            onClick={() => {
              console.log('User clicked Chat:', selectionText);
              alert('Chat: ' + selectionText);
              setShowMenu(false);
            }}
          >
            <span className="material-icons text-sm mr-2">chat</span> Chat
          </button>
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
            onClick={() => {
              console.log('User clicked Quiz:', selectionText);
              alert('Quiz: ' + selectionText);
              setShowMenu(false);
            }}
          >
            <span className="material-icons text-sm mr-2">quiz</span> Quiz
          </button>
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
            onClick={() => {
              console.log('User clicked Flashcards:', selectionText);
              alert('Flashcards: ' + selectionText);
              setShowMenu(false);
            }}
          >
            <span className="material-icons text-sm mr-2">style</span> Flashcards
          </button>
        </div>
      )}
    </div>
  );
} 