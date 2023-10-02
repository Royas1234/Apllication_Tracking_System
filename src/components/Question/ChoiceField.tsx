import React from 'react'
import { Input, Typography, Checkbox } from 'antd'
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons'
import '../../style/choiceField.css'

const { Text } = Typography

type ChoiceFieldProp = {
  updateChoiceField: any
  values: any
}

function ChoiceField({ updateChoiceField, values }: ChoiceFieldProp) {
  const allChoices = Object.values(values)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    updateChoiceField({
      ...values,
      [index]: e.target.value,
    })
  }
  const addNewChoice = () => {
    updateChoiceField({
      ...values,
      [allChoices.length]: '',
    })
  }

  return (
    <div className="Choice">
      <Text className="type type-choice">Choice</Text>
      <div className="choice-list">
        {allChoices.map((value: any, index: number) => {
          const isLastItem = allChoices.length - 1 === index
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
