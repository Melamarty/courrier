import sys
import json
from text_recognition import extract_text_from_image
from extract_metadata import extract_metadata_from_ocr
from classify_email import classify_email_type

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
    else:
        image_path = "./image.png"  # Default image path
        
    print(f"Reading image: {image_path}")
    text = extract_text_from_image(image_path)
    
    print("\n=== OCR TEXT OUTPUT ===")
    print(text)
    
    metadata = extract_metadata_from_ocr(text)
    print("\n=== EXTRACTED METADATA (JSON) ===")
    print(json.dumps(metadata, indent=2))
    
    # Classify email type/priority
    email_type = classify_email_type(text)
    print(f"\n=== EMAIL CLASSIFICATION ===")
    print(f"Email Type/Priority: {email_type}")

