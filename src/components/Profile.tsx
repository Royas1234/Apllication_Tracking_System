import React, { useState, useEffect } from 'react'
import { Card, Checkbox, Switch, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Question from './Question/Question'
import '../style/personalinfo.css'

function Profile({ profileFields }: any) {
  const [toggleState, setToggleState] = useState(profileFields)

  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    setToggleState(profileFields)
  }, [profileFields])

  const handleToggle = (field, fieldOption) => {
    setToggleState({
      ...toggleState,
      [field]: {
        ...toggleState[field],
        [fieldOption]: !toggleState[field][fieldOption],
      },
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
        onCancel={handleCancel}
      >
        <Question />
      </Modal>
    </Card>
  )
}

export default Profile
