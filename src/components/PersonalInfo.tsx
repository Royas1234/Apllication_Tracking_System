import React, { useEffect, useState } from 'react'
import { Card, Checkbox, Modal, Switch } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import '../style/personalinfo.css'
import Question from './Question/Question'
import axios from 'axios'

export type QuestionShape = {
  id: string
  type: string
  choices: string[]
  question: string
  maxChoice: number
  isEditing: boolean
}
export type noIdQuestionShape = {
  type: string
  question: string
  isEditing: boolean
}

function PersonalInfo({
  personalInformationFields,
  saveApplicationInfoToServer,
}: any) {
  const [toggleState, setToggleState] = useState(personalInformationFields)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [displayQuestion, setDisplayQuestion] = useState(
    personalInformationFields.personalQuestions
  )
  const [questionToEdit, setQuestionToEdit] = useState<QuestionShape | null>(
    null
  )

  useEffect(() => {
    setToggleState(personalInformationFields)
    setDisplayQuestion(personalInformationFields.personalQuestions)
  }, [personalInformationFields])

  const handleToggle = (field, fieldOption) => {
    const changeToggleState = {
      ...toggleState,
      [field]: {
        ...toggleState[field],
        [fieldOption]: !toggleState[field][fieldOption],
      },
    }
    setToggleState(changeToggleState)
    saveApplicationInfoToServer('personalInformation', changeToggleState)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleAfterClose = () => {
    setQuestionToEdit(null)
  }
  const addNewQuestion = (newQuestion) => {
    const updatedPersonalQuestions = [...displayQuestion, newQuestion]
    const updatedPersonalInformation = {
      ...toggleState,
      personalQuestions: updatedPersonalQuestions,
    }

    setDisplayQuestion(updatedPersonalQuestions)
    saveApplicationInfoToServer(
      'personalInformation',
      updatedPersonalInformation
    )
    handleCancel()
  }

  const handleEditQuestion = (question) => {
    setQuestionToEdit(question)
    showModal()
  }

  const editQuestion = (updatedQuestion) => {
    const editedQuestions = displayQuestion.map((currentQuestion) => {
      if (updatedQuestion.id === currentQuestion.id) {
        return { ...currentQuestion, ...updatedQuestion }
      } else {
        return currentQuestion
      }
    })
    const updatedPersonalInformationWithEditQuestion = {
      ...toggleState,
      personalQuestions: editedQuestions,
    }
    setDisplayQuestion(editedQuestions)
    saveApplicationInfoToServer(
      'personalInformation',
      updatedPersonalInformationWithEditQuestion
    )
    handleCancel()
  }
  const deleteQuestion = (idToDelete) => {
    const questionsAfterDelete = displayQuestion.filter((questionToDelete) => {
      return questionToDelete.id !== idToDelete.id
    })
    const updatedPersonalInformationWithDelQuestion = {
      ...toggleState,
      personalQuestions: questionsAfterDelete,
    }

    setDisplayQuestion(questionsAfterDelete)
    saveApplicationInfoToServer(
      'personalInformation',
      updatedPersonalInformationWithDelQuestion
    )
    handleCancel()
  }

  return (
    <Card
      title="Personal Information"
      className="personal-infos"
      headStyle={{ backgroundColor: '#d0f7fa' }}
    >
      <div className="info-fields">
        <p title="firstName">First Name</p>
      </div>
      <div className="info-fields">
        <p data-testid="lastName">Last Name</p>
      </div>
      <div className="info-fields">
        <p>Email</p>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>
            Phone <span className="dial-code">(without dial code)</span>
          </p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            data-testid="firstCheckbox"
            checked={toggleState.phoneNumber.internalUse}
            onChange={() => handleToggle('phoneNumber', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
              data-testid="firstSwitch"
              checked={toggleState.phoneNumber.show}
              onChange={() => handleToggle('phoneNumber', 'show')}
            />
            {toggleState.phoneNumber.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>Nationality</p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            checked={toggleState.nationality.internalUse}
            onChange={() => handleToggle('nationality', 'internalUse')}
          >
            internal
          </Checkbox>

          <div className="switch">
            <Switch
              checked={toggleState.nationality.show}
              onChange={() => handleToggle('nationality', 'show')}
            />
            {toggleState.nationality.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>

      <div className="info-fields">
        <div className="information-text">
          <p>Current Residence</p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            checked={toggleState.currentResidence.internalUse}
            onChange={() => handleToggle('currentResidence', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.currentResidence.show}
              onChange={() => handleToggle('currentResidence', 'show')}
            />
            {toggleState.currentResidence.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>ID Number</p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            checked={toggleState.idNumber.internalUse}
            onChange={() => handleToggle('idNumber', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.idNumber.show}
              onChange={() => handleToggle('idNumber', 'show')}
            />
            {toggleState.idNumber.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>Date of Birth</p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            checked={toggleState.dateOfBirth.internalUse}
            onChange={() => handleToggle('dateOfBirth', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.dateOfBirth.show}
              onChange={() => handleToggle('dateOfBirth', 'show')}
            />
            {toggleState.dateOfBirth.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>Gender</p>
        </div>
        <div className="checkbox-switch-container">
          <Checkbox
            checked={toggleState.gender.internalUse}
            onChange={() => handleToggle('gender', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.gender.show}
              onChange={() => handleToggle('gender', 'show')}
            />
            {toggleState.gender.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      {displayQuestion.map((question, index) => (
        <div
          className="display-question"
          key={index}
          onClick={() => handleEditQuestion(question)}
          data-testid="firstQuestionList"
        >
          <div className="question-type" data-testid="type">
            {question.type}
          </div>
          <div className="edit-question flex-container">
            <div className="question" data-testid="question">
              {question.question}
            </div>
            <div>
              <EditOutlined />
            </div>
          </div>
        </div>
      ))}
      <div
        className="add-question"
        data-testid="addQuestion"
        onClick={showModal}
      >
        <PlusOutlined
          style={{ color: 'black', fontSize: '25px', fontWeight: 500 }}
        />
        <p>Add a question</p>
      </div>

      <Modal
        footer={null}
        style={{ padding: 0 }}
        open={isModalOpen}
        afterClose={handleAfterClose}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Question
          addNewQuestion={addNewQuestion}
          questionToEdit={questionToEdit}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
        />
      </Modal>
    </Card>
  )
}

export default PersonalInfo
