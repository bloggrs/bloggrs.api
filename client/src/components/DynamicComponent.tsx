import React from 'react';

interface DynamicComponentProps {
  content: string;
  props: Record<string, any>;
}

export function DynamicComponent({ content, props }: DynamicComponentProps) {
  // Replace template variables with actual props
  const renderContent = () => {
    let renderedContent = content;
    Object.entries(props).forEach(([key, value]) => {
      renderedContent = renderedContent.replace(
        new RegExp(`{props.${key}}`, 'g'),
        value as string
      );
    });
    return renderedContent;
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: renderContent() }} />
  );
} 