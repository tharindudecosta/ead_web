import React from 'react';
import { format } from 'date-fns';

const DateFormatter = ({ dateString }) => {
  const formattedDate = format(new Date(dateString), "MMMM do, yyyy hh:mm a"); 

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateFormatter;
