import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadSpinner({ variant }) {
  return <Spinner animation="border" variant={variant} className="loader" />;
}
