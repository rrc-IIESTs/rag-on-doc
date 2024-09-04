import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function RAGQuery() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRAGSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setSources([]);

    try {
      const res = await axios.post('http://localhost:8080/ask_pdf', { query });
      setResponse(res.data.answer);
      setSources(res.data.sources);
    } catch (err) {
      setError('Error fetching response from server. Ensure a PDF is uploaded before performing RAG.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>RAG Query on Uploaded PDF</Card.Title>
        <Form onSubmit={handleRAGSubmit}>
          <Form.Group controlId="ragQuery">
            <Form.Label>Enter your query:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your question here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {response && (
          <>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Answer:</Card.Title>
                <Card.Text>{response}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Sources:</Card.Title>
                <ListGroup variant="flush">
                  {sources.map((source, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Source:</strong> {source.source} <br />
                      <strong>Content:</strong> {source.page_content}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default RAGQuery;
