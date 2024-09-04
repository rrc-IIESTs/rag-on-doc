import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, ProgressBar, Card } from 'react-bootstrap';
import axios from 'axios';

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(null);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setUploadStatus(null);
    setProgress(0);

    try {
      const res = await axios.post('http://localhost:8080/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      setUploadStatus(res.data);
    } catch (err) {
      setError('Error uploading PDF file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Upload PDF Document</Card.Title>
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="pdfUpload">
            <Form.Label>Select PDF File:</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
          </Button>
        </Form>

        {progress > 0 && (
          <ProgressBar now={progress} label={`${progress}%`} className="mt-3" />
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {uploadStatus && (
          <Alert variant="success" className="mt-3">
            <p><strong>Status:</strong> {uploadStatus.status}</p>
            <p><strong>Filename:</strong> {uploadStatus.filename}</p>
            <p><strong>Document Length:</strong> {uploadStatus.doc_len}</p>
            <p><strong>Chunks Created:</strong> {uploadStatus.chunks}</p>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default UploadPDF;
