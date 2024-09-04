import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';

function LLMQuery() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post('http://localhost:8080/ai', { query });
      setResponse(res.data.answer);
    } catch (err) {
      setError('Error fetching response from server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>LLM Query</Card.Title>
        <Form onSubmit={handleQuerySubmit}>
          <Form.Group controlId="llmQuery">
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
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Response:</Card.Title>
              <Card.Text>{response}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}

export default LLMQuery;
