import React from 'react'
import { useState } from 'react'
import { Card, Select, Input, Typography, Button, Checkbox } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import '../../style/question.css'
import ChoiceField from './ChoiceField'

const { Text } = Typography
interface QuestionItem {
  id: number
  type: string
  inputQuestion: string
  isEditing: boolean
}

function Question() {
  const [questionValue, setQuestionValue] = useState('')
  const [choices, setChoices] = useState({ 0: '' })
  const [type, setType] = useState('')
  const [displayQuestion, setDisplayQuestion] = useState<QuestionItem[]>([])

  const handleChange = (value: string) => {
    setType(value)
  }
  const updateChoiceField = (values: any) => {
    setChoices(values)
  }

  // const handleSave = () => {
  //   if (questionValue) {
  //     const newQuestions: any = [
  //       ...displayQuestion,
  //       { id: Math.random(), inputQuestion: questionValue, isEditing: false },
  //     ]
  //     setDisplayQuestion(newQuestions)
  //     console.log(newQuestions)
  //     setQuestionValue('')
  //   }
  // }
  const handleSave = () => {
    if (questionValue) {
      const newQuestion: QuestionItem = {
        id: Math.random(),
        type: type,
        inputQuestion: questionValue,
        isEditing: false,
      }
      setDisplayQuestion([...displayQuestion, newQuestion])
      console.log(newQuestion)
      setQuestionValue('')
    }
  }
  const handleDelete = (idToDelete) => {
    const updatedQuestions = displayQuestion.filter(
      (delQuestion) => delQuestion.id !== idToDelete
    )
    setDisplayQuestion(updatedQuestions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave()
  }
  return (
    <Card title="Questions" headStyle={{ backgroundColor: '#d0f7fa' }}>
      <form className="question-container" onSubmit={handleSubmit}>
        <p className="type">Type</p>
        <div className="select">
          <Select
            style={{
              width: '100%',
              height: '50px',
            }}
            value={type}
            onChange={handleChange}
            options={[
              { value: 'Paragragh', label: 'Paragragh' },
              { value: 'Short answer', label: 'Short answer' },
              { value: 'Yes/No', label: 'Yes/No' },
              { value: 'Dropdown', label: 'Dropdown' },
              { value: 'Multiple Choice', label: 'Multiple Choice' },
              { value: 'Date', label: 'Date' },
              { value: 'Number', label: 'Number' },
              { value: 'File upload', label: 'File upload' },
              { value: 'Video question', label: 'Video question' },
            ]}
          />
        </div>
        {displayQuestion.map((question, index) => (
          <div className="display-question" key={index}>
            <div className="question-type">{type}</div>
            <div className="edit-question flex-container">
              <div className="question">{question.inputQuestion}</div>
              <div>
                <EditOutlined />
              </div>
            </div>
          </div>
        ))}
        <div className="input-container">
          <p>Question</p>
          <Input
            placeholder="Type here"
            value={questionValue}
            onChange={(e) => setQuestionValue(e.target.value)}
          />
        </div>

        {type === 'Multiple Choice' && (
          <div className="choice-option-container">
            <ChoiceField
              updateChoiceField={updateChoiceField}
              values={choices}
            />
            <div className="max-choice">
              <Text className="max-choice-text">Max choice allowed</Text>
              <Input
                onChange={(e) => setQuestionValue(e.target.value)}
                style={{ width: '100%', marginTop: '8px' }}
                placeholder="Enter number of choice allowed here"
              />
            </div>
          </div>
        )}
        {type === 'Dropdown' && (
          <div className="drop-down-container">
            <ChoiceField
              updateChoiceField={updateChoiceField}
              values={choices}
            />
          </div>
        )}
        {type === 'Yes/No' && (
          <div className="yes-no-container">
            <Checkbox style={{ paddingTop: '10px' }}>
              Enable &quot;other&quot; option
            </Checkbox>
          </div>
        )}

        <div className="flex-container footer-container">
          <div
            className="flex-container"
            // onClick={() => handleDelete(displayQuestion.id)}
          >
            <CloseOutlined style={{ color: '#a80000' }} />
            <Text style={{ color: '#a80000', marginLeft: '12px' }} strong>
              Delete question
            </Text>
          </div>
          <Button
            htmlType="submit"
            style={{ backgroundColor: '#087b2f', color: '#fff' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Question
