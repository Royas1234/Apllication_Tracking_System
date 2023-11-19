import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PersonalInfo from '../components/PersonalInfo'

jest.mock('axios')

const PersonalInformation = {
  phoneNumber: {
    internalUse: false,
    show: true,
  },
  nationality: {
    internalUse: false,
    show: false,
  },
  currentResidence: {
    internalUse: false,
    show: false,
  },
  idNumber: {
    internalUse: false,
    show: false,
  },
  dateOfBirth: {
    internalUse: false,
    show: false,
  },
  gender: {
    internalUse: false,
    show: false,
  },
  personalQuestions: [],
}
const updatedPersonalInformation = {
  ...PersonalInformation,
  personalQuestions: [
    {
      type: 'Paragraph',
      question: 'Hello World',
    },
  ],
}
const mockHandleChange = jest.fn()
afterEach(() => {
  cleanup()
})

describe('Personal Information', () => {
  describe('Heading and Paragragh Element in Personal Information', () => {
    it('should show the heading element', () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const headingElement = screen.getByText('Personal Information')
      expect(headingElement).toBeInTheDocument()
    })
    it('should be able to show the paragragh element First Name', () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const firstNameElement = screen.getByTitle('firstName')
      expect(firstNameElement).toBeInTheDocument()
    })
    it('should be able to show the paragragh element Last Name', () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const lastNameElement = screen.getByTestId('lastName')
      expect(lastNameElement).toBeInTheDocument()
    })
    it('should be able to show the paragragh element Email', () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const emailElement = screen.getByText('Email')
      expect(emailElement).toBeInTheDocument()
    })
  })
  describe('Check box and Switch fields', () => {
    it('should select checkbox on click', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const checkboxElement = screen.getByTestId('firstCheckbox')

      expect(checkboxElement).not.toBeChecked()
      fireEvent.click(checkboxElement)
      expect(checkboxElement).toBeChecked()
    })
    it('should call  onChange when checkbox is clicked', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={mockHandleChange}
        />
      )
      const checkboxElement = await screen.getByTestId('firstCheckbox')
      fireEvent.click(checkboxElement)
      expect(mockHandleChange).toHaveBeenCalled()
    })

    it('should toggle switch to false on click', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const switchElement = screen.getByTestId('firstSwitch')
      fireEvent.click(switchElement)
      expect(switchElement).not.toBeChecked()
    })
  })

  describe('Display Question', () => {
    it('should check if there is not any question  added', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const firstDislayQuestionElement = screen.queryByTestId('question')
      expect(firstDislayQuestionElement).not.toBeInTheDocument()
    })
    it('should check for if there is any question added', async () => {
      render(
        <PersonalInfo
          personalInformationFields={updatedPersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const firstDislayQuestionElement = screen.queryByTestId('question')
      expect(firstDislayQuestionElement).toBeInTheDocument()
    })

    it('should show if the question modal is in the document before add question button is clicked', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const addQuestionBtn = screen.getByTestId('addQuestion')
      let questionModal = screen.queryByText('Questions')
      expect(questionModal).not.toBeInTheDocument()
    })
    it('should show if the question modal is in the document after add question button is clicked', async () => {
      render(
        <PersonalInfo
          personalInformationFields={PersonalInformation}
          saveApplicationInfoToServer={() => {}}
        />
      )
      const addQuestionBtn = screen.getByTestId('addQuestion')
      let questionModal = screen.queryByText('Questions')
      fireEvent.click(addQuestionBtn)
      questionModal = screen.queryByText('Questions')
      expect(questionModal).toBeInTheDocument()
      expect(questionModal).toHaveTextContent('Questions')
    })
  })
})
