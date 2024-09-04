# RAG-on-DOC (Retrieval Augmented Generation with PDF Documents)

This project is a **Retrieval Augmented Generation (RAG)** system with **Langchain** and **Chroma** for document-based question answering. It features a backend powered by FastAPI and a frontend built with React. Users can upload PDFs, split their contents into chunks, and perform queries over the document content using language models.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend](#backend)
  - [File Structure](#backend-file-structure)
  - [Setup and Run Instructions](#setup-and-run-instructions)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [File Structure](#frontend-file-structure)
  - [Setup and Run Instructions](#frontend-setup-and-run-instructions)
- [Environment](#environment)
- [License](#license)

---

## Project Overview

This project enables the user to:

- Upload PDF files and store them in a vector store (Chroma).
- Ask questions from the document using a retrieval-based system.
- Perform general queries via an LLM model.
- Utilize a user-friendly React-based frontend to interact with the FastAPI backend.

---

## Backend

The backend is a FastAPI-based service that processes PDF files, splits them into chunks, stores them in a vector database using Chroma, and provides endpoints for document-based queries or general AI-powered question answering.

### Backend File Structure

Here is the structure of the backend directory:

```bash
backend/
│
├── db/                  # Directory for the vector database files
├── pdf/                 # Directory where uploaded PDF files are stored
├── __pycache__/         # Cache directory (automatically generated)
├── main.py              # Main FastAPI application file

```

### Setup and Run Instructions

To set up and run the backend:

1. **Install Dependencies:**

    Navigate to the `backend/` directory and install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

2. **Run the Server:**

    Start the FastAPI server using Uvicorn:

    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8080
    ```

### API Endpoints

The backend exposes the following endpoints:

- `POST /pdf`: Upload a PDF file.
- `POST /ai`: Ask a general question to the LLM.
- `POST /ask_pdf`: Ask a question based on the content of a previously uploaded PDF.

---

## Frontend

The frontend is built with React and is responsible for user interactions such as uploading PDF files, asking questions, and displaying results from the backend.

### Frontend File Structure

Here is the structure of the frontend directory:

```bash
frontend/
│
├── node_modules/         # Dependencies
├── public/               # Public assets
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── LLMQuery.js   # Component for general LLM queries
│   │   ├── RAGQuery.js   # Component for document-based queries
│   │   └── UploadPDF.js  # Component for uploading PDFs
│   ├── App.js            # Main React application file
│   ├── index.js          # Entry point for the React app
│   ├── App.css           # Styles for the app
│   └── index.css         # Global styles
├── package.json          # Project configuration and scripts
├── package-lock.json     # Dependency tree lock file
├── README.md             # Readme file for the frontend
```

### Frontend Setup and Run Instructions

To set up and run the frontend:

1. **Install Dependencies:**

    Navigate to the `frontend/` directory and install the required Node.js packages:

    ```bash
    npm install
    ```

2. **Run the Application:**

    Start the React development server:

    ```bash
    npm start
    ```

### Components:

- `UploadPDF.js`: Handles file upload and sends the file to the backend.
- `LLMQuery.js`: Component for asking general questions to the LLM.
- `RAGQuery.js`: Component for querying document content based on previously uploaded PDFs.

---

## Environment

The environment for the backend is defined in the `environment.yml` file, which lists the required dependencies and settings.

To set up the environment:

1. **Install Anaconda or Miniconda** (if not installed).
2. **Create the environment:**

    ```bash
    conda env create -f environment.yml
    ```

3. **Activate the environment:**

    ```bash
    conda activate rag-on-doc
    ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
