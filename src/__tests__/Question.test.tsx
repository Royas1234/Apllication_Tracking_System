import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import Question from '../components/Question/Question'
import selectEvent from 'react-select-event'

const mockQuestionToEdit = {
  id: '1',
  type: 'multiple-choice',
  choices: ['Option 1', 'Option 2'],
  question: 'What is your favorite color?',
  maxChoice: 1,
  isEditing: true,
}
const mockAddNewQuestion = jest.fn()
const mockEditQuestion = jest.fn()
const mockDeleteQuestion = jest.fn()

describe('Questions', () => {
  it('should be able show the heading element', () => {
    render(
      <Question
        addNewQuestion={mockAddNewQuestion}
        questionToEdit={mockQuestionToEdit}
        editQuestion={mockEditQuestion}
        deleteQuestion={mockDeleteQuestion}
      />
    )
    const headingElement = screen.getByText('Question')
    expect(headingElement).toBeInTheDocument()
  })
  // it('should show what is in the type dropdown', () => {
  //   render(
  //     <Question
  //       addNewQuestion={mockAddNewQuestion}
  //       questionToEdit={mockQuestionToEdit}
  //       editQuestion={mockEditQuestion}
  //       deleteQuestion={mockDeleteQuestion}
  //     />
  //   )
  //   const selectElement = screen.getByTestId('selectedType')
  //   expect(selectElement).toBeInTheDocument()
  // })
  it('should select question type', async () => {
    render(
      <Question
        addNewQuestion={mockAddNewQuestion}
        questionToEdit={mockQuestionToEdit}
        editQuestion={mockEditQuestion}
        deleteQuestion={mockDeleteQuestion}
      />
    )
    // const selectElement = screen.getByTestId('selectedType')
    const questionFormElement = screen.getByTestId('questionForm')
    const selectLabelElement = screen.getByLabelText('Type')
    // fireEvent.mouseDown(selectElement)
    await waitFor(() => {
      selectEvent.select(selectLabelElement, ['Paragraph'])

      expect(questionFormElement).toHaveFormValues({
        type: 'Paragraph',
      })
    })
  })
  it('should be able show input element', () => {
    render(
      <Question
        addNewQuestion={mockAddNewQuestion}
        questionToEdit={mockQuestionToEdit}
        editQuestion={mockEditQuestion}
        deleteQuestion={mockDeleteQuestion}
      />
    )
    const inputElement = screen.getByPlaceholderText('Type here')
    expect(inputElement).toBeInTheDocument()
  })
  it('should be able type in the input', () => {
    render(
      <Question
        addNewQuestion={mockAddNewQuestion}
        questionToEdit={mockQuestionToEdit}
        editQuestion={mockEditQuestion}
        deleteQuestion={mockDeleteQuestion}
      />
    )
    const inputElement = screen.getByPlaceholderText('Type here')
    fireEvent.change(inputElement, { target: { value: 'my name' } })
    expect(inputElement).toHaveValue('my name')
  })
})
