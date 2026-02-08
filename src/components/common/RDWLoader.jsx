import React from 'react';

const RDWLoader = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center transition-colors">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin" />
      
      {/* Text */}
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
        Loading...
      </p>
    </div>
  );
};

export default RDWLoader;
