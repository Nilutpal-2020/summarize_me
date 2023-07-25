import pandas as pd
import numpy as np
import nltk
import matplotlib.pyplot as plt
import random

import re
import string

from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

from nltk.tokenize import sent_tokenize, word_tokenize

# nltk.download('stopwords')
# nltk.download('wordnet')

from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx

def read_paragraph(text):
    sentences = []
    sentences = sent_tokenize(text)
    return sentences

def remove_stopwords(sentences):
    stop_words = stopwords.words('english')
    sentences = " ".join([i for i in sentences if i not in stop_words])
    return sentences

def text_cleaning(sentences):
    # lowercase texts
    clean_sentences = [s.lower() for s in sentences]
    
    # remove unicode characters
    clean_sentences = [re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", " ", text) for text in clean_sentences]
    clean_sentences = [text.strip() for text in clean_sentences]
    
    # remove stopwords
    clean_sentences = [remove_stopwords(text.split()) for text in clean_sentences]
    
    return clean_sentences

def perform_stemming(sentences):
    stemmer = PorterStemmer()
    stemmed_sentences = []
    for sentence in sentences:
        words = sentence.split()
        stem_words = [stemmer.stem(word) for word in words]
        stemmed_sentences.append(" ".join(stem_words))
    return stemmed_sentences


def get_tfidf_vectors(sentences):
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_vectorizer.fit(sentences)
    tfidf_matrix = tfidf_vectorizer.fit_transform(sentences)
    tfidf_matrix = tfidf_matrix.toarray()
    
    return tfidf_matrix

def generate_summary(paragraph, ratio=0.2):
    sentences = read_paragraph(paragraph)
    clean_sentences = text_cleaning(sentences)
    stem_sentences = perform_stemming(clean_sentences)
    
    sentence_vectors = get_tfidf_vectors(stem_sentences)
    sim_mat = np.matmul(sentence_vectors, sentence_vectors.T)
    
    nx_graph = nx.from_numpy_array(sim_mat)
    scores = nx.pagerank(nx_graph)
    
    ranked_sentences = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
    num_sentences = round(len(ranked_sentences) * ratio)
    summarized_sentences = [s[1] for s in ranked_sentences[: num_sentences]]
    summary = ' '.join(summarized_sentences)
    
    return summary

if __name__ == '__main__':
    text = '''
    Ever noticed how plane seats appear to be getting smaller and smaller? With increasing numbers of people taking to the skies, some experts are questioning if having such packed out planes is putting passengers at risk. They say that the shrinking space on aeroplanes is not only uncomfortable - it's putting our health and safety in danger. More than squabbling over the arm rest, shrinking space on planes putting our health and safety in danger? This week, a U.S consumer advisory group set up by the Department of Transportation said at a public hearing that while the government is happy to set standards for animals flying on planes, it doesn't stipulate a minimum amount of space for humans. 'In a world where animals have more rights to space and food than humans,' said Charlie Leocha, consumer representative on the committee. 'It is time that the DOT and FAA take a stand for humane treatment of passengers.' But could crowding on planes lead to more serious issues than fighting for space in the overhead lockers, crashing elbows and seat back kicking? Tests conducted by the FAA use planes with a 31 inch pitch, a standard which on some airlines has decreased . Many economy seats on United Airlines have 30 inches of room, while some airlines offer as little as 28 inches . Cynthia Corbertt, a human factors researcher with the Federal Aviation Administration, that it conducts tests on how quickly passengers can leave a plane. But these tests are conducted using planes with 31 inches between each row of seats, a standard which on some airlines has decreased, reported the Detroit News. The distance between two seats from one point on a seat to the same point on the seat behind it is known as the pitch. While most airlines stick to a pitch of 31 inches or above, some fall below this. While United Airlines has 30 inches of space, Gulf Air economy seats have between 29 and 32 inches, Air Asia offers 29 inches and Spirit Airlines offers just 28 inches. British Airways has a seat pitch of 31 inches, while easyJet has 29 inches, Thomson's short haul seat pitch is 28 inches, and Virgin Atlantic's is 30-31.
    '''
    summary = generate_summary(text)
    print(summary)