import React from 'react';
import Menu from '../../../commons/Menu';

export default function ProfileScreen(props) {
  return (
    <div>
      <Menu isProfilePage />
      Página de Profile!
      <pre>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>

  );
}
