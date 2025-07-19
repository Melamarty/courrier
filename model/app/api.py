from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sys
import os
import tempfile
import shutil
from typing import Dict, Any
import json

# Add the scripts directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'scripts'))

# Import our custom modules
from text_recognition import extract_text_from_image
from extract_metadata import extract_metadata_from_ocr
from classify_email import classify_email_type, get_classification_confidence

app = FastAPI(
    title="Courrier Analysis API",
    description="API for analyzing courrier images and extracting metadata",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Courrier Analysis API is running"}

@app.post("/analyze-courrier")
async def analyze_courrier(file: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Analyze a courrier image and return metadata and classification.
    
    Args:
        file: Image file to analyze (supports common image formats)
        
    Returns:
        JSON response with:
        - extracted_text: OCR text from the image
        - metadata: Extracted metadata (sender, email, dates, etc.)
        - email_type: Classification result (administratif, médical, urgence, normal)
        - confidence_scores: Confidence scores for each category
    """
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400, 
            detail="File must be an image. Supported formats: JPEG, PNG, GIF, etc."
        )
    
    # Create a temporary file to store the uploaded image
    temp_file = None
    try:
        # Create temporary file with proper extension
        suffix = os.path.splitext(file.filename)[1] if file.filename else '.jpg'
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        
        # Write uploaded file to temporary file
        shutil.copyfileobj(file.file, temp_file)
        temp_file.close()
        
        # Process the image
        try:
            # Extract text using OCR
            extracted_text = extract_text_from_image(temp_file.name)
            
            # Extract metadata
            metadata = extract_metadata_from_ocr(extracted_text)
            
            # Classify email type
            email_type = classify_email_type(extracted_text)
            
            # Get confidence scores
            confidence_scores = get_classification_confidence(extracted_text)
            
            # Prepare response
            response = {
                "success": True,
                "extracted_text": extracted_text,
                "metadata": metadata,
                "email_type": email_type,
                "confidence_scores": confidence_scores,
                "file_info": {
                    "filename": file.filename,
                    "content_type": file.content_type,
                    "size": file.size
                }
            }
            
            return response
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error processing image: {str(e)}"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error handling file upload: {str(e)}"
        )
    finally:
        # Clean up temporary file
        if temp_file and os.path.exists(temp_file.name):
            os.unlink(temp_file.name)

@app.get("/health")
async def health_check():
    """Detailed health check endpoint"""
    return {
        "status": "healthy",
        "service": "Courrier Analysis API",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
