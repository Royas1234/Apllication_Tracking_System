import React, { useEffect, useState } from 'react'
import '../style/navbar.css'
import CoverImage from './CoverImage'
import PersonalInfo from './PersonalInfo'
import Profile from './Profile'
import axios from 'axios'
// const axios = require("axios")

function ApplicationForm() {
  const [personalInfoData, setPersonalInfoData] = useState({
    phoneNumber: {
      internalUse: false,
      show: false,
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
  })
  const [profileData, setProfileData] = useState({
    education: {
      mandatory: true,
      show: true,
    },
    experience: {
      mandatory: true,
      show: true,
    },
    resume: {
      mandatory: true,
      show: true,
    },
    profileQuestions: [],
  })
  const [dataId, setDataId] = useState('')
  const [dataType, setDataType] = useState('applicationForm')
  const [coverImage, setCoverImage] = useState('')
  const [customisedQuestions, setCustomisedQuestions] = useState([])

  useEffect(() => {
    axios
      .get(
        'http://127.0.0.1:4010/api/800.16169155474/programs/autem/application-form'
      )
      .then((response) => {
        setPersonalInfoData(response.data.data.attributes.personalInformation)
        setProfileData(response.data.data.attributes.profile)
        setCoverImage(response.data.data.attributes.coverImage)
        setCustomisedQuestions(
          response.data.data.attributes.customisedQuestions
        )
        setDataId(response.data.data.id)
        setDataType(response.data.data.type)
      })
  }, [])
  const saveApplicationInfoToServer = async (formAttributesKey, formValue) => {
    const payload = {
      data: {
        id: dataId,
        type: dataType,
        attributes: {
          coverImage,
          personalInformation: personalInfoData,
          profile: profileData,
          customisedQuestions,
          [formAttributesKey]: formValue,
        },
      },
    }
    try {
      await axios.put(
        'http://127.0.0.1:4010/api/483.94426793814927/programs/distinctio/application-form',
        payload
      )
    } catch (error: any) {
      if (error.response) {
        console.error('Error saving toggle state:', error)
      }
    }
  }

  return (
    <div className="content-container">
      <CoverImage />
      <PersonalInfo
        personalInformationFields={personalInfoData}
        saveApplicationInfoToServer={saveApplicationInfoToServer}
      />
      <Profile
        profileFields={profileData}
        saveApplicationInfoToServer={saveApplicationInfoToServer}
      />
    </div>
  )
}

export default ApplicationForm
