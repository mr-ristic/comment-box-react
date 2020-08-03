import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOuterClick from './useOuterClick';

describe('Custom Hook test - Outer click', () => {
  it('should catch click on outisde of div', async () => {
    const ExampleComponent = () => {
      const innerRef = useRef(null);
      const { isOuter } = useOuterClick(innerRef);
      return (
        <div className='container'>
          <div ref={innerRef} className='inner'>
            Inner Div<button>button</button>
          </div>
          <div className='outer'>Click on me!</div>
          {isOuter && <div>Clicked on outer</div>}
        </div>
      );
    };
    render(<ExampleComponent />);
    userEvent.click(screen.getByText('Click on me!'));

    await waitFor(() =>
      expect(screen.getByText('Clicked on outer')).toBeTruthy()
    );
  });
});
