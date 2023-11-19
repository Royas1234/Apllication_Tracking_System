import React, { useState, useEffect } from 'react'
import { Card, Checkbox, Switch, Modal } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import Question from './Question/Question'
import '../style/personalinfo.css'

export type QuestionShape = {
  id: string
  type: string
  choices: string[]
  maxChoice: number
  question: string
  isEditing: boolean
}

function Profile({ profileFields, saveApplicationInfoToServer }: any) {
  const [toggleState, setToggleState] = useState(profileFields)
  const [displayQuestion, setDisplayQuestion] = useState(
    profileFields.profileQuestions
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [questionToEdit, setQuestionToEdit] = useState<QuestionShape | null>(
    null
  )

  useEffect(() => {
    setToggleState(profileFields)
    setDisplayQuestion(profileFields.profileQuestions)
  }, [profileFields])

  const handleToggle = (field, fieldOption) => {
    const changeToggleState = {
      ...toggleState,
      [field]: {
        ...toggleState[field],
        [fieldOption]: !toggleState[field][fieldOption],
      },
    }
    setToggleState(changeToggleState)
    saveApplicationInfoToServer('profile', changeToggleState)
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
    const updatedProfileQuestions = [...displayQuestion, newQuestion]

    const updatedProfie = {
      ...toggleState,
      profileQuestions: updatedProfileQuestions,
    }
    setDisplayQuestion(updatedProfileQuestions)
    saveApplicationInfoToServer('profile', updatedProfie)

    handleCancel()
  }

  const handleEditQuestion = (question) => {
    setQuestionToEdit(question)
    showModal()
  }

  const editQuestion = (updatedQuestion) => {
    const editedQuestion = displayQuestion.map((currentQuestion) => {
      if (updatedQuestion.id === currentQuestion.id) {
        return { ...currentQuestion, ...updatedQuestion }
      } else {
        return currentQuestion
      }
    })
    const updateProfileWithEditedProfileQuestions = {
      ...toggleState,
      profileQuestions: editedQuestion,
    }
    setDisplayQuestion(editedQuestion)
    saveApplicationInfoToServer(
      'profile',
      updateProfileWithEditedProfileQuestions
    )

    handleCancel()
  }
  const deleteQuestion = (idToDelete) => {
    const questionsAfterDelete = displayQuestion.filter((questionToDelete) => {
      return questionToDelete.id !== idToDelete.id
    })

    const updatedProfileWithDeletedProfileQuestions = {
      ...toggleState,
      profileQuestios: questionsAfterDelete,
    }
    setDisplayQuestion(questionsAfterDelete)
    saveApplicationInfoToServer(
      'profile',
      updatedProfileWithDeletedProfileQuestions
    )
    handleCancel()
  }
  return (
    <Card
      title="Profile"
      className="personal-infos"
      headStyle={{ backgroundColor: '#d0f7fa' }}
    >
      <div className="info-fields">
        <div className="information-text">
          <p>Education</p>
        </div>
        <div className="checkbox-switch-container profile-check">
          <Checkbox
            checked={toggleState.education.mandatory}
            onChange={() => handleToggle('education', 'mandatory')}
          >
            Mandatory
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.education.show}
              onChange={() => handleToggle('education', 'show')}
            />
            {toggleState.education.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>Experience</p>
        </div>
        <div className="checkbox-switch-container profile-check">
          <Checkbox
            checked={toggleState.experience.mandatory}
            onChange={() => handleToggle('experience', 'mandatory')}
          >
            Mandatory
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.experience.show}
              onChange={() => handleToggle('experience', 'show')}
            />
            {toggleState.experience.show ? (
              <span className="toggle-text">Show</span>
            ) : (
              <span className="toggle-text">Hide</span>
            )}
          </div>
        </div>
      </div>
      <div className="info-fields">
        <div className="information-text">
          <p>Resume</p>
        </div>
        <div className="checkbox-switch-container profile-check">
          <Checkbox
            checked={toggleState.resume.mandatory}
            onChange={() => handleToggle('resume', 'mandatory')}
          >
            Mandatory
          </Checkbox>
          <div className="switch">
            <Switch
              checked={toggleState.resume.show}
              onChange={() => handleToggle('resume', 'show')}
            />
            {toggleState.resume.show ? (
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
        >
          <div className="question-type">{question.type}</div>
          <div className="edit-question flex-container">
            <div className="question">{question.question}</div>
            <div>
              <EditOutlined />
            </div>
          </div>
        </div>
      ))}
      <div className="add-question" onClick={showModal}>
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

export default Profile
