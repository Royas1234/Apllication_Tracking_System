import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ApplicationForm from '../components/ApplicationForm'

describe.skip('Application Form', () => {
  test.skip('should add question enter', () => {
    render(<ApplicationForm />)
    const addQuestionBtn = screen.getByTestId('addQuestion')
    fireEvent.click(addQuestionBtn)
    const questionModal = screen.queryByText('Questions')
    const inputElement = screen.getByPlaceholderText('Type here')
    fireEvent.change(inputElement, { target: { value: 'my name' } })
    expect(questionModal).toHaveTextContent('my name')
    const buttonElement = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(buttonElement)

    // const divElement = screen.getByText('my name')
    // expect(divElement).toBeInTheDocument()
  })
})
