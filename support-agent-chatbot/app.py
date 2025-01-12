from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Documentation URLs
DOCS = {
    "segment": "https://segment.com/docs/",
    "mparticle": "https://docs.mparticle.com/",
    "lytics": "https://docs.lytics.com/",
    "zeotap": "https://docs.zeotap.com/home/en-us/"
}

def fetch_docs(platform, query):
    """Fetch relevant information from the documentation."""
    url = DOCS.get(platform.lower())
    if not url:
        return f"No documentation found for {platform}."

    try:
        # Set a User-Agent to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
        # Fetch and parse the documentation
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for HTTP errors like 403
        soup = BeautifulSoup(response.content, "html.parser")

        # Combine headers and paragraphs for better matching
        headers = soup.find_all(["h1", "h2", "h3", "h4"])
        paragraphs = soup.find_all("p")
        all_text = headers + paragraphs

        # Search for relevant content based on keywords
        keywords = query.lower().split()  # Break query into keywords
        results = [
            element.text.strip()
            for element in all_text
            if any(keyword in element.text.lower() for keyword in keywords)
        ]

        return "\n".join(results[:5]) if results else "No relevant information found."
    except Exception as e:
        return f"Error fetching documentation: {str(e)}"


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/query", methods=["POST"])
def query():
    data = request.json
    platform = data.get("platform")
    question = data.get("question")

    if not platform or not question:
        return jsonify({"error": "Please provide both platform and question."}), 400

    result = fetch_docs(platform, question)
    if result == "No relevant information found.":
        result += f"\nYou can check the full documentation here: {DOCS.get(platform.lower(), '')}"
    return jsonify({"answer": result})

if __name__ == "__main__":
    app.run(debug=True)
