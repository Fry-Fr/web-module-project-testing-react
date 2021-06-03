import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';
import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow')

fetchShow.mockResolvedValue({
    name:'Stranger Things',
    summary:'',
    seasons:[
        {
            episodes:[],
            id:1,
            name:''
        },
        {
            episodes:[],
            id:2,
            name:''
        }
    ]
})

test('renders without any passed in props', ()=>{
    render(<Display />);
});

test('renders the Show component when button is clicked', async ()=>{

    render(<Display />);

    const button = screen.getByRole('button');
    let data = screen.queryByLabelText(/select a season/i);

    expect(data).not.toBeInTheDocument();
    expect(data).toBeFalsy();

    userEvent.click(button)

    await waitFor(()=>{
        data = screen.queryByLabelText(/select a season/i);

        expect(data).toBeInTheDocument();
        expect(data).toBeTruthy();
    })
    // screen.debug()
});

test('render to correct number of season objects when button is pressed', async ()=>{
    render(<Display />);

    const button = screen.getByRole('button');
    let data = screen.queryAllByTestId('season-option');

    userEvent.click(button);

    await waitFor(()=>{
        data = screen.getAllByTestId('season-option')
        expect(data).toHaveLength(2);
    })
})

test('display function is called when button is pressed', async ()=>{
    const mockFunc = jest.fn(()=>{
        return 'function called';
    });

    render(<Display displayFunc={mockFunc} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    await waitFor(()=>{
        expect(mockFunc.mock.calls).toHaveLength(1)
    });
});















///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.