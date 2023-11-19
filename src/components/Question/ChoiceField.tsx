import React from 'react'
import { Input, Typography, Checkbox } from 'antd'
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons'
import '../../style/choiceField.css'

const { Text } = Typography

type ChoiceFieldProp = {
  updateChoiceField: any
  choices: string[]
}

function ChoiceField({ updateChoiceField, choices }: ChoiceFieldProp) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedChoicesState = [...choices]
    updatedChoicesState[index] = e.target.value
    updateChoiceField(updatedChoicesState)
  }

  const addNewChoice = () => {
    updateChoiceField([...choices, ''])
  }

  return (
    <div className="Choice">
      <Text className="type type-choice">Choice</Text>
      <div className="choice-list">
        {choices.map((value: any, index: number) => {
          const isLastItem = choices.length - 1 === index
          return (
            <div key={index} className="flex-container choice-field">
              <UnorderedListOutlined />
              <Input
                style={{ width: '80%', margin: '0px 10px' }}
                className="choice-input"
                placeholder="Type here"
                value={value}
                onChange={(e) => handleChange(e, index)}
              />
              {isLastItem && (
                <button onClick={addNewChoice}>
                  <PlusOutlined />
                </button>
              )}
            </div>
          )
        })}
      </div>
      <div className="choices-checkbox">
        <Checkbox>Enable &quot;other&quot; option</Checkbox>
      </div>
    </div>
  )
}

export default ChoiceField
