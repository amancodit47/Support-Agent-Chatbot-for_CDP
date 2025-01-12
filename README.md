
# **CDP Support Agent Chatbot**  
A chatbot that provides step-by-step guidance for "how-to" questions related to four major Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. The chatbot extracts relevant information from the official documentation to help users perform specific tasks or achieve outcomes within these platforms.

---

## **Features**
1. **Answer "How-to" Questions**  
   - Responds to user queries such as:
     - *"How do I set up a new source in Segment?"*  
     - *"How can I create a user profile in mParticle?"*  
   - Retrieves precise and actionable steps directly from the documentation.
   
2. **Documentation Navigation**  
   - Fetches and indexes content from the official documentation of the four CDPs.  
   - Dynamically retrieves relevant sections to answer user questions.  

3. **Question Variations Handling**  
   - Understands different phrasings and variations of user queries.  
   - Handles irrelevant questions gracefully.

4. **Bonus Features**  
   - **Cross-CDP Comparisons**: Explains differences in functionalities or processes between Segment, mParticle, Lytics, and Zeotap.  
   - **Advanced "How-to" Questions**: Supports queries about complex configurations, integrations, and use cases.

---

## **Technologies Used**
- **Programming Language**: Python  
- **NLP and Information Retrieval**: 
  - [spaCy](https://spacy.io/)  
  - [LangChain](https://github.com/hwchase17/langchain)  
  - [Whoosh](https://whoosh.readthedocs.io/en/latest/)  
- **Web Framework**: Flask  
- **Search/Indexing**: FAISS or Whoosh  
- **Frontend**: HTML, CSS (optional for web interface)  
- **Web Scraping (if required)**: BeautifulSoup, Requests

---

## **Setup and Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/cdp-chatbot.git
cd cdp-chatbot
```

### **2. Install Dependencies**
Create a virtual environment and install required libraries:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **3. Preprocess Documentation**
Fetch and preprocess the official documentation for Segment, mParticle, Lytics, and Zeotap:
- Update the `data/` folder with preprocessed text files or use the script:
```bash
python preprocess_docs.py
```

### **4. Start the Flask Application**
Run the chatbot server:
```bash
python app.py
```
The application will be accessible at: `http://127.0.0.1:5000`.

---

## **Usage**
1. **Run the Chatbot**:
   - Open a terminal and start the Flask app.  
   - Alternatively, deploy the application to a cloud service like Heroku or AWS for public access.

2. **Ask Questions**:
   - Use the web interface or API endpoint to ask questions about Segment, mParticle, Lytics, or Zeotap.
   - Example API request (via Postman or cURL):
     ```json
     POST /chat
     {
       "query": "How do I build an audience segment in Lytics?"
     }
     ```
---

## **Evaluation Checklist**
- [x] **Accurate Responses**: Retrieves relevant steps for "how-to" questions.  
- [x] **Error Handling**: Responds gracefully to invalid queries.  
- [x] **Cross-CDP Comparisons**: Handles comparative questions.  
- [x] **Scalability**: Easily extendable to include other CDPs.  

---

## **Future Enhancements**
- **Continuous Learning**: Use machine learning to improve question understanding.  
- **Dynamic Updates**: Automatically fetch updates from the official documentation.  
- **Multi-language Support**: Extend support to other languages.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

## **Contributors**
- **Aman Kumar**  
- Feel free to contribute by submitting pull requests or reporting issues!  

