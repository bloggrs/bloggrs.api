import React from 'react';

interface DynamicComponentProps {
  content: string;
  props: Record<string, any>;
}

export function DynamicComponent({ content, props }: DynamicComponentProps) {
  const renderContent = () => {
    let renderedContent = content;

    // Handle arrays in props (like features array)
    if (props.features) {
      const featuresHtml = props.features.map((feature: any) => `
        <div class="feature">
          <h3>${feature.title}</h3>
          <p>${feature.description}</p>
        </div>
      `).join('');
      renderedContent = renderedContent.replace(
        '{props.features.map(feature => (\n              <div class="feature">\n                <h3>{feature.title}</h3>\n                <p>{feature.description}</p>\n              </div>\n            ))}',
        featuresHtml
      );
    }

    // Replace simple prop placeholders
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'string') {
        renderedContent = renderedContent.replace(
          new RegExp(`{props.${key}}`, 'g'),
          value
        );
      }
    });

    return renderedContent;
  };

  return (
    <div 
      className="dynamic-component" 
      dangerouslySetInnerHTML={{ __html: renderContent() }} 
    />
  );
} 