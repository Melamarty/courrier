from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def classify_email_type(text, threshold=0.3):
    """
    Classify email type based on cosine similarity with predefined categories.
    
    Args:
        text (str): The email text to classify
        threshold (float): Minimum similarity threshold (default: 0.3)
        
    Returns:
        str: Email type ('administratif', 'médical', 'urgence', or 'normal')
    """
    # Initialize the sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Define the categories and their representative keywords/phrases
    categories = {
        'administratif': [
            'budget', 'finance', 'committee', 'fiscal year', 'report', 
            'meeting', 'department', 'request', 'approval', 'document',
            'procedure', 'policy', 'compliance', 'deadline', 'review'
        ],
        'médical': [
            'patient', 'treatment', 'diagnosis', 'symptoms', 'medication',
            'doctor', 'hospital', 'medical', 'health', 'care', 'appointment',
            'prescription', 'test results', 'consultation', 'emergency room'
        ],
        'urgence': [
            'urgent', 'emergency', 'critical', 'immediate', 'asap',
            'urgently', 'crisis', 'alert', 'priority', 'urgent action',
            'emergency response', 'critical situation', 'immediate attention'
        ]
    }
    
    # Create embeddings for the input text
    text_embedding = model.encode([text])
    
    # Calculate similarities with each category
    similarities = {}
    
    for category, keywords in categories.items():
        # Create embeddings for category keywords
        category_embeddings = model.encode(keywords)
        
        # Calculate cosine similarity between text and category keywords
        category_similarities = cosine_similarity(text_embedding, category_embeddings)
        
        # Take the maximum similarity for this category
        max_similarity = np.max(category_similarities)
        similarities[category] = max_similarity
    
    # Find the category with highest similarity
    best_category = max(similarities, key=similarities.get)
    best_similarity = similarities[best_category]
    
    # If the best similarity is below threshold, classify as normal
    if best_similarity < threshold:
        return 'normal'
    else:
        return best_category

def get_classification_confidence(text, threshold=0.3):
    """
    Get classification confidence scores for all categories.
    
    Args:
        text (str): The email text to classify
        threshold (float): Minimum similarity threshold
        
    Returns:
        dict: Dictionary with category names and their confidence scores
    """
    # Initialize the sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Define the categories and their representative keywords/phrases
    categories = {
        'administratif': [
            'budget', 'finance', 'committee', 'fiscal year', 'report', 
            'meeting', 'department', 'request', 'approval', 'document',
            'procedure', 'policy', 'compliance', 'deadline', 'review'
        ],
        'médical': [
            'patient', 'treatment', 'diagnosis', 'symptoms', 'medication',
            'doctor', 'hospital', 'medical', 'health', 'care', 'appointment',
            'prescription', 'test results', 'consultation', 'emergency room'
        ],
        'urgence': [
            'urgent', 'emergency', 'critical', 'immediate', 'asap',
            'urgently', 'crisis', 'alert', 'priority', 'urgent action',
            'emergency response', 'critical situation', 'immediate attention'
        ]
    }
    
    # Create embeddings for the input text
    text_embedding = model.encode([text])
    
    # Calculate similarities with each category
    similarities = {}
    
    for category, keywords in categories.items():
        # Create embeddings for category keywords
        category_embeddings = model.encode(keywords)
        
        # Calculate cosine similarity between text and category keywords
        category_similarities = cosine_similarity(text_embedding, category_embeddings)
        
        # Take the maximum similarity for this category and convert to Python float
        max_similarity = float(np.max(category_similarities))
        similarities[category] = max_similarity
    
    # Add normal category (inverse of best similarity)
    best_similarity = max(similarities.values())
    similarities['normal'] = float(1 - best_similarity if best_similarity < threshold else 0)
    
    return similarities
