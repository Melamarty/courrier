# AI Courrier Analyzer

## Overview

The AI Courrier Analyzer is a powerful tool that uses artificial intelligence to automatically analyze courrier images and extract metadata and classification information.

## Features

### 🖼️ Image Upload

- **Drag & Drop**: Simply drag and drop image files onto the upload area
- **File Selection**: Click to browse and select image files
- **Supported Formats**: JPG, PNG, GIF
- **File Size Limit**: Maximum 10MB per image
- **Real-time Preview**: See your image before analysis

### 🤖 AI Analysis

- **Automatic Classification**: Identifies courrier type (Urgence, Medical, Administrative)
- **Metadata Extraction**: Extracts sender information, dates, subjects, and content
- **Confidence Scoring**: Shows analysis confidence percentage
- **Processing Time**: Displays how long the analysis took

### 🎨 Beautiful UI

- **Modern Design**: Clean, responsive interface with gradient backgrounds
- **Loading Animations**: Engaging spinner and progress indicators
- **Color-coded Results**: Different colors for different courrier types
- **Mobile Responsive**: Works perfectly on all device sizes

## How to Use

1. **Navigate to the Analyzer**

   - Go to `/analyze_courrier` route in your application

2. **Upload an Image**

   - Drag and drop an image file onto the upload area, or
   - Click "Choisir un fichier" to browse and select an image

3. **Start Analysis**

   - Click "Analyser le Courrier" button
   - Watch the beautiful loading animation while AI processes your image

4. **View Results**

   - See the courrier type classification
   - Review extracted metadata (sender, recipient, date, subject)
   - Check the confidence score and processing time

5. **Start Over**
   - Click "Analyser un Autre Courrier" to analyze a new image

## API Integration

The analyzer connects to the AI service at `http://localhost:8000/analyze-courrier` and expects:

### Request

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: FormData with 'image' field containing the image file

### Response

```json
{
  "metadata": {
    "sender_name": "John Doe",
    "sender_email": "john@example.com",
    "recipient_name": "Jane Smith",
    "recipient_email": "jane@example.com",
    "date": "2024-01-15",
    "subject": "Meeting Request",
    "content": "Please schedule a meeting..."
  },
  "courrier_type": "administrative",
  "confidence": 0.95,
  "processing_time": 3.2
}
```

## Courrier Types

- **Urgence** (Red): Emergency/urgent courriers
- **Medical** (Teal): Medical-related courriers
- **Administrative** (Purple): Administrative courriers

## Technical Details

### Components

- **Model Component**: Main analyzer component
- **CourrierService**: Handles API communication
- **CourrierAnalysis Interface**: TypeScript interface for API response

### Dependencies

- Angular 17+ with standalone components
- Font Awesome for icons
- Poppins font family
- HttpClient for API calls

### Styling

- CSS Grid for responsive layout
- CSS Animations for smooth transitions
- Gradient backgrounds and modern design
- Mobile-first responsive design

## Error Handling

The application handles various error scenarios:

- Invalid file types
- File size too large
- Network errors during API calls
- Missing or invalid API responses

## Performance

- Optimized image preview with object-fit
- Efficient drag and drop handling
- Smooth animations with CSS transforms
- Responsive design for all screen sizes

## Browser Support

- Modern browsers with ES6+ support
- Drag and drop API support
- CSS Grid and Flexbox support
