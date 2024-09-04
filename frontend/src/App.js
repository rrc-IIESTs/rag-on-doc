import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LLMQuery from './components/LLMQuery';
import UploadPDF from './components/UploadPDF';
import RAGQuery from './components/RAGQuery';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">AI Document Assistant</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/llm-query">LLM Query</Nav.Link>
            <Nav.Link as={NavLink} to="/upload-pdf">Upload PDF</Nav.Link>
            <Nav.Link as={NavLink} to="/rag-query">RAG Query</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<LLMQuery />} />
          <Route path="/llm-query" element={<LLMQuery />} />
          <Route path="/upload-pdf" element={<UploadPDF />} />
          <Route path="/rag-query" element={<RAGQuery />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

