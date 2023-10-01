import React, { useEffect, useState } from 'react'
import '../style/navbar.css'
import CoverImage from './CoverImage'
import PersonalInfo from './PersonalInfo'
import Profile from './Profile'
import axios from 'axios'

// type PersonalInformationFields = {
//   firstName: {
//     internalUse: boolean
//     show: boolean
//   }
//   lastName: {
//     internalUse: boolean
//     show: boolean
//   }
//   emailId: {
//     internalUse: boolean
//     show: boolean
//   }
//   phoneNumber: {
//     internalUse: boolean
//     show: boolean
//   }
//   nationality: {
//     internalUse: boolean
//     show: boolean
//   }
//   currentResidence: {
//     internalUse: boolean
//     show: boolean
//   }
//   idNumber: {
//     internalUse: boolean
//     show: boolean
//   }
//   dateOfBirth: {
//     internalUse: boolean
//     show: boolean
//   }
//   gender: {
//     internalUse: boolean
//     show: boolean
//   }
//   personalQuestions: {
//     id: string
//     type: string
//     question: string
//     choices: string[]
//     maxChoice: number
//     disqualify: boolean
//     other: boolean
//   }[]
// }
// type profileFields = {
//   education: {
//     mandatory: boolean
//     show: boolean
//   }
//   experience: {
//     mandatory: boolean
//     show: boolean
//   }
//   resume: {
//     mandatory: boolean
//     show: boolean
//   }
//   profileQuestions: {
//     id: string
//     type: string
//     question: string
//     choices: string[]
//     maxChoice: number
//     disqualify: boolean
//     other: boolean
//   }[]
// }

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
  })

  useEffect(() => {
    axios
      .get(
        'http://127.0.0.1:4010/api/800.16169155474/programs/autem/application-form'
      )
      .then((response) => {
        setPersonalInfoData(response.data.data.attributes.personalInformation)
        setProfileData(response.data.data.attributes.profile)
      })
  }, [])

  return (
    <div className="content-container">
      <CoverImage />
      <PersonalInfo personalInformationFields={personalInfoData} />
      <Profile profileFields={profileData} />
    </div>
  )
}

export default ApplicationForm
