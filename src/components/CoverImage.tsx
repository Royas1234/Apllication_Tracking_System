import React from 'react'
import { useState } from 'react'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Card, message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import '../style/coverimg.css'

function CoverImage() {
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt1M = file.size / 1024 / 1024 < 2
    if (!isLt1M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt1M
  }

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <div className="upload-button-container">
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
      <div className="upload-texts" style={{ marginTop: 8 }}>
        <p className="upload-image">Upload cover image</p>
        <p>16:9 ratio is recommended. Max image size 1mb</p>
      </div>
    </div>
  )
  return (
    <Card
      title="Upload cover image"
      headStyle={{ backgroundColor: '#d0f7fa', height: 'auto' }}
    >
      <div className="upload-content">
        <Upload
          name="avatar"
          listType="picture-card"
          className="uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    </Card>
  )
}

export default CoverImage
