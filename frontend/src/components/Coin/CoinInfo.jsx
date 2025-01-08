import React, { useState } from 'react';

function CoinInfo({ heading, desc = "" }) { // Default `desc` to an empty string
  const shortDesc = 
    desc.slice(0, 200) + 
    "<p onmouseover=\"this.style.color='blue';\" onmouseout=\"this.style.color='#f1f5f9';\" style=\"color: #f1f5f9;\"> Read More...</p>";
  const [flag, setFlag] = useState(true);

  return (
    <div className="text-slate-100 px-4 py-0 my-0 mx-4 cursor-pointer">
      <h2 className="my-4 text-lg font-semibold">{heading}</h2>
      {desc.length > 200 ? (
        <p
          onClick={() => setFlag(!flag)} // Correctly toggles the `flag` state
          dangerouslySetInnerHTML={{
            __html: flag ? shortDesc : desc,
          }}
        />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: desc }} />
      )}
    </div>
  );
}

export default CoinInfo;