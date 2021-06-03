import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './Episode';

test('component renders', ()=>{
    // passing an empty object seems to render the component without errors.
    render(<Episode episode={{}}/>);
});
test('episode summary dispays', ()=>{
    render(<Episode episode={{summary:'Test this statement is displayed.'}}/>);

    const summary = screen.getByText(/Test this statement is displayed/i);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeVisible();
    expect(summary).toContainHTML('<p>Test this statement is displayed.</p>');
});
test('image set to ./stranger_things.png if prop is null', ()=>{
    render(<Episode episode={{image:null}} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt','./stranger_things.png')
    expect(imgElement).toHaveAttribute('src','./stranger_things.png')
});
