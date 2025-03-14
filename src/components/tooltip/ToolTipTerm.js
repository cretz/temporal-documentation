import React, { useState, useRef, useEffect } from 'react';

const ToolTipTerm = ({ term, tooltip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosingByButton, setIsClosingByButton] = useState(false);
  const tooltipRef = useRef(null);
  const termRef = useRef(null);

  const openTooltip = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 100); // 0.1s pause before opening
  };

  const closeTooltipInstantly = () => {
    setIsOpen(false);
    setIsClosingByButton(false);
  };

  const closeTooltipWithAnimation = () => {
    setIsClosingByButton(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        termRef.current &&
        !termRef.current.contains(event.target)
      ) {
        closeTooltipInstantly();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <span style={{ display: 'inline-block' }}>
      <span
        ref={termRef}
        onClick={openTooltip}
        onFocus={openTooltip}
        aria-describedby="tooltip"
        tabIndex="0"
        role="button"
        style={{
          cursor: 'help',
          color: '#5856E7',
          textDecoration: 'underline',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'color 0.3s ease',
        }}
      >
        {term}
      </span>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="toolTipTextOpen"
          role="tooltip"
          id="tooltip"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(145deg, #5e5e5e, #222222)',
            padding: '20px 24px',
            borderRadius: '12px',
            color: '#EDEFF0',
            fontSize: '1rem',
            textAlign: 'center',
            width: '80%',
            maxWidth: '300px',
            opacity: isOpen ? 1 : 0,
            transition: isClosingByButton
              ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
              : 'none',
            zIndex: 100,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h4
            style={{
              fontSize: '1.2rem',
              color: '#EDEFF0',
              margin: 0,
              marginBottom: '12px',
            }}
          >
            {term}
          </h4>
          <p style={{ fontSize: '1rem', margin: 0, padding: '0 8px' }}>
            {tooltip}
          </p>

          <button
            onClick={closeTooltipWithAnimation}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #EDEFF0',
              color: '#EDEFF0',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '12px',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
            }}
            aria-label="Close tooltip"
          >
            Done
          </button>
        </div>
      )}
    </span>
  );
};

export default ToolTipTerm;
