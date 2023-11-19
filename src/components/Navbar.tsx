import React from 'react'
import { Layout, Tabs } from 'antd'
import '../style/navbar.css'
import { HomeOutlined, MenuOutlined, ScheduleOutlined } from '@ant-design/icons'
import ApplicationForm from './ApplicationForm'
const { Sider, Content } = Layout

type TabBarItemProps = {
  label: string
}

function TabBarItem(props: TabBarItemProps) {
  console.log('prop', props)
  return <div>{props.label}</div>
}

const contentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  paddingTop: '112px',
}

const siderStyle: React.CSSProperties = {
  color: '#fff',
  backgroundColor: 'white',
  boxShadow: '0px 4px 23px rgba(0, 0, 0, 0.05)',
}

function Navbar() {
  return (
    <Layout>
      <Sider width="117px" style={siderStyle}>
        <div className="icon-container">
          <div className="menu">
            <MenuOutlined />
          </div>
          <div className="home">
            <HomeOutlined />
          </div>
          <div className="list">
            <ScheduleOutlined />
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={contentStyle}>
          <Tabs
            activeKey="Application Form"
            type="line"
            tabBarStyle={{
              borderBottom: 0,
              boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.12)',
            }}
            items={[
              {
                label: <TabBarItem label="Program Details" />,
                key: 'Program Details',
                children: 'Program Details',
              },
              {
                label: <TabBarItem label="Aplication Form" />,
                key: 'Application Form',
                children: <ApplicationForm />,
              },
              {
                label: <TabBarItem label="Workflow" />,
                key: 'Workflow',
                children: 'Workflow',
              },
              {
                label: <TabBarItem label="Preview" />,
                key: 'Preview',
                children: 'Preview',
              },
            ]}
          />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Navbar
