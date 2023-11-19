import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card, Input, Typography, Button, Checkbox } from 'antd'
import Select, { SingleValue } from 'react-select'
import { CloseOutlined } from '@ant-design/icons'
import '../../style/question.css'
import ChoiceField from './ChoiceField'
import { QuestionShape } from '../PersonalInfo'
import { v4 } from 'uuid'

const { Text } = Typography
type QuestionProps = {
  addNewQuestion: (newQuestion: QuestionShape) => void
  questionToEdit: QuestionShape | null
  deleteQuestion: (newQuestion: QuestionShape) => void
  editQuestion: (newQuestion: QuestionShape) => void
}

type QuestionOption = {
  label: string
  value: string
}

function Question({
  addNewQuestion,
  questionToEdit,
  editQuestion,
  deleteQuestion,
}: QuestionProps) {
  const [questionValue, setQuestionValue] = useState(
    questionToEdit?.question ?? ''
  )
  const [choices, setChoices] = useState([''])
  const [type, setType] = useState<QuestionOption>({
    label: questionToEdit?.type ?? '',
    value: questionToEdit?.type ?? '',
  })
  const [maxChoice, setMaxChoice] = useState(0)

  useEffect(() => {
    if (questionToEdit) {
      setQuestionValue(questionToEdit.question)
      setChoices(questionToEdit.choices)
      setMaxChoice(questionToEdit.maxChoice)
    }
  }, [questionToEdit])

  const handleChange = (option: SingleValue<QuestionOption>) => {
    if (option) {
      setType(option)
    }
  }
  const updateChoiceField = (values: any) => {
    setChoices(values)
  }
  const handleSave = () => {
    const newQuestion: QuestionShape = {
      id: questionToEdit?.id || v4(),
      type: type.value,
      choices,
      maxChoice,
      question: questionValue,
      isEditing: false,
    }
    if (questionToEdit) {
      editQuestion(newQuestion)
    } else {
      addNewQuestion(newQuestion)
    }
  }

  const handleDelete = () => {
    const newQuestion: QuestionShape = {
      id: questionToEdit?.id || v4(),
      type: type.value,
      choices,
      maxChoice,
      question: questionValue,
      isEditing: false,
    }
    if (questionToEdit) {
      deleteQuestion(newQuestion)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSave()
  }
  return (
    <Card title="Questions" headStyle={{ backgroundColor: '#d0f7fa' }}>
      <form
        role="form"
        className="question-container"
        data-testid="questionForm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="type" aria-labelledby="type" className="type">
          Type
        </label>
        <Select
          data-testid="selectedType"
          name="type"
          inputId="typea"
          className="select"
          value={type}
          onChange={handleChange}
          options={[
            { value: 'Paragraph', label: 'Paragraph' },
            { value: 'ShortAnswer', label: 'ShortAnswer' },
            { value: 'YesNo', label: 'YesNo' },
            { value: 'Dropdown', label: 'Dropdown' },
            { value: 'MultipleChoice', label: 'MultipleChoice' },
            { value: 'Date', label: 'Date' },
            { value: 'Number', label: 'Number' },
            { value: 'FileUpload', label: 'FileUpload' },
          ]}
        />

        <div className="input-container">
          <p>Question</p>
          <Input
            placeholder="Type here"
            value={questionValue}
            onChange={(e) => setQuestionValue(e.target.value)}
          />
        </div>

        {type.value === 'MultipleChoice' && (
          <div className="choice-option-container">
            <ChoiceField
              updateChoiceField={updateChoiceField}
              choices={choices}
            />
            <div className="max-choice">
              <Text className="max-choice-text">Max choice allowed</Text>
              <Input
                type="number"
                value={maxChoice}
                onChange={(e) => setMaxChoice(parseInt(e.target.value))}
                style={{ width: '100%', marginTop: '8px' }}
                placeholder="Enter number of choice allowed here"
              />
            </div>
          </div>
        )}
        {type.value === 'Dropdown' && (
          <div className="drop-down-container">
            <ChoiceField
              updateChoiceField={updateChoiceField}
              choices={choices}
            />
          </div>
        )}
        {type.value === 'YesNo' && (
          <div className="yes-no-container">
            <Checkbox style={{ paddingTop: '10px' }}>
              Enable &quot;other&quot; option
            </Checkbox>
          </div>
        )}

        <div className="flex-container footer-container">
          <div className="flex-container" onClick={handleDelete}>
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
