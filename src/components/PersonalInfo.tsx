import React, { useEffect, useState } from 'react'
import { Card, Checkbox, Modal, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import '../style/personalinfo.css'
import Question from './Question/Question'

function PersonalInfo({ personalInformationFields }: any) {
  const [toggleState, setToggleState] = useState(personalInformationFields)

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setToggleState(personalInformationFields)
  }, [personalInformationFields])

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
      title="Personal Information"
      className="personal-infos"
      headStyle={{ backgroundColor: '#d0f7fa' }}
    >
      <div className="info-fields">
        <p>First Name</p>
      </div>
      <div className="info-fields">
        <p>Last Name</p>
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
            checked={toggleState.phoneNumber.internalUse}
            onChange={() => handleToggle('phoneNumber', 'internalUse')}
          >
            internal
          </Checkbox>
          <div className="switch">
            <Switch
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

export default PersonalInfo
