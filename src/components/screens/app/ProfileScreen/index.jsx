import React from 'react';

export default function ProfileScreen(props) {
  return (
    <div>
      Página de Profile!
      <pre>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>

  );
}
