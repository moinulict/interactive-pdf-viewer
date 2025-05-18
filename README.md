# Interactive PDF Viewer

A modern, feature-rich PDF viewer built with Next.js and React that enhances document reading with interactive capabilities.

![Interactive PDF Viewer](https://via.placeholder.com/800x450.png?text=Interactive+PDF+Viewer)

## Features

- **Smart Context Menu**: Interact with selected text through:
  - **Explain**: Get explanations for complex concepts
  - **Chat**: Ask questions about the selected text
  - **Quiz**: Generate quiz questions from the content
  - **Flashcards**: Create flashcards for studying

- **Advanced Navigation**:
  - Page-by-page navigation
  - Direct page jumping
  - Current page indicator

- **Zoom Controls**:
  - Zoom in/out with percentage display
  - Reset zoom functionality
  - Optimized viewing on different screen sizes

- **Document Management**:
  - Download PDF files directly
  - Print functionality

- **Mobile-Responsive Design**:
  - Adapts to different screen sizes
  - Touch-friendly interface
  - Long-press selection on mobile devices

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-pdf-viewer.git
cd interactive-pdf-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Loading a PDF

Place your PDF files in the `public` folder and update the `pdfUrl` prop in `app/page.js` to point to your file.

### Text Selection and Context Menu

1. Click and drag to select text in the PDF
2. The context menu will automatically appear with options:
   - **Explain**: Shows an explanation of the selected text
   - **Chat**: Opens a chat interface about the selection
   - **Quiz**: Generates quiz questions based on the content
   - **Flashcards**: Creates flashcards from the selection

### Zoom Controls

- Use the **+** and **-** buttons to adjust zoom level
- Click the reset button to return to 100% zoom
- Current zoom percentage is displayed between the controls

### Page Navigation

- Use **Previous** and **Next** buttons to navigate between pages
- Enter a specific page number in the "Go to" field and click "Go"
- Current page and total pages are displayed in the navigation bar

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **react-pdf**: PDF rendering library for React
- **Tailwind CSS**: Utility-first CSS framework

## Customization

### Styling

The viewer uses Tailwind CSS for styling. You can modify the appearance by:

1. Editing the Tailwind classes in the component files
2. Updating the Tailwind configuration in `tailwind.config.js`
3. Adding custom styles in `app/globals.css`

### Context Menu Actions

You can extend the functionality of the context menu actions in `components/PDFViewer.js` by modifying the click handlers.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [react-pdf](https://github.com/wojtekmaj/react-pdf) for PDF rendering
- [Next.js](https://nextjs.org/) for the application framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Made with ❤️ by [Your Name]
