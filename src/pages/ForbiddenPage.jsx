// ForbiddenPage.js
import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151515] text-[#eeeeee]">
      <div className="text-center">
        <h1 className="text-6xl font-bold">403</h1>
        <p className="text-2xl mt-4">You do not have permission to view this page.</p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
