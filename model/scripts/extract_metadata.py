import re

def extract_metadata_from_ocr(text):
    metadata = {}
    # Extract sender email
    email_match = re.search(r"[\w\.-]+@[\w\.-]+", text)
    if email_match:
        metadata["sender_email"] = email_match.group(0)
    # Extract sender name (look for a line before the email, or a line starting with 'Dr.' or similar)
    name_match = re.search(r"(?m)^([A-Z][a-z]+\.?\s+[A-Z][a-z]+)$", text)
    if name_match:
        metadata["sender_name"] = name_match.group(1)
    else:
        # Try to find a line with 'Dr.'
        dr_match = re.search(r"(?m)^(Dr\.\s+[A-Z][a-z]+\s+[A-Z][a-z]+)$", text)
        if dr_match:
            metadata["sender_name"] = dr_match.group(1)
    # Extract meeting date (look for a date in the format 'October 22, 2024' or similar)
    date_match = re.search(r"([A-Z][a-z]+\s+\d{1,2},\s*\d{4})", text)
    if date_match:
        metadata["meeting_date"] = date_match.group(1)
    return metadata
