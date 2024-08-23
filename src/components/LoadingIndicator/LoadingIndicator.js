import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@fluentui/react-components';
import "./LoadingIndicator.css";

const LoadingIndicator = () => {
  const loading = useSelector((state) => state.user.loading);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
        <Spinner size="huge" label="" />
    </div>
  );
};

export default LoadingIndicator;