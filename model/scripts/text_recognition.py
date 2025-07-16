import cv2
import pytesseract
import sys
import os

# Set the path to the Tesseract executable (update if installed elsewhere)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_image(image_path):
    """
    Extract text from an image using OCR.
    
    Args:
        image_path (str): Path to the image file
        
    Returns:
        str: Extracted text from the image
        
    Raises:
        SystemExit: If image file doesn't exist, can't be read, or Tesseract is not installed
    """
    if not os.path.exists(image_path):
        print(f"Error: File '{image_path}' does not exist.")
        sys.exit(1)
        
    image = cv2.imread(image_path)
    if image is None:
        print(f"Error: Unable to read image '{image_path}'.")
        sys.exit(1)
        
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    try:
        text = pytesseract.image_to_string(gray)
        return text
    except pytesseract.pytesseract.TesseractNotFoundError:
        print("Error: Tesseract is not installed or not found at the specified path.")
        print("Please install Tesseract OCR and ensure the path is correct.")
        sys.exit(1) 