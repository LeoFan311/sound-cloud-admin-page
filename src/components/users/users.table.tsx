import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { callFetchAllUsers } from '../../services/api';

const columns: ColumnsType<any> = [
   {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <a>{text}</a>,
   },
   {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
   },
   {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
   },
   {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
   },
];

const data = [
   {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
   },
   {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
   },
   {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
   },
];

// const handleRefreshToken = async () => {
//    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh`, {
//       method: 'POST',
//       headers: {
//          'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//    });
//    const resRefresh = await res.json();

//    console.log('Check refesh access_token: ', resRefresh);
//    console.log('Check new access_token: ', resRefresh.data.access_token);

//    if (resRefresh?.data?.access_token) return resRefresh.data.access_token;
//    else null;
// };

const UsersTable = () => {
   const [form] = Form.useForm();
   const [openAddUserModal, setOpenAddUserModal] = useState(false);
   const [usersData, setUsersData] = useState([]);
   const [tableIsLoading, setTableIsLoading] = useState(false);
   const local_access_token = localStorage.getItem('access_token');
   const [rfToken, setRfToken] = useState(local_access_token);
   useEffect(() => {
      getUsers();
   }, [rfToken]);

   const getUsers = async () => {
      // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/all`, {
      //    method: 'GET',
      //    headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      //    },
      //    credentials: 'include',
      // });
      // const NO_RETRY_HEADER = 'x-no-retry';

      // const resData = await res.json();
      // console.log('>>> Check table Data: ', resData?.data?.result ? resData.data.result : res);
      // if (resData?.data?.result) {
      //    setUsersData(resData.data.result);
      // }

      // if (res.status === 401 && !res.headers[NO_RETRY_HEADER]) {
      //    setTableIsLoading(true);
      //    res.headers[NO_RETRY_HEADER] = 'true';
      //    const access_token = await handleRefreshToken();
      //    if (access_token) {
      //       res.headers['Authorization'] = `Bearer ${access_token}`;
      //       localStorage.setItem('access_token', access_token);
      //       setRfToken(access_token);
      //       setTableIsLoading(false);
      //    }
      // }

      const res = await callFetchAllUsers();
      console.log('>>> Check callFetchAllUsers res: ', res);
      if (res?.data?.result) {
         setUsersData(res.data.result);
      }
   };

   const renderTableHeader = () => {
      return (
         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <div>Quảng lý người dùng</div>
            <div>
               <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAddUserModal(true)}
               >
                  Add user
               </Button>
            </div>
         </div>
      );
   };

   const validateMessages = {
      required: '${label} is required!',
      types: {
         email: '${label} is not a valid email!',
         number: '${label} is not a valid number!',
      },
      number: {
         range: '${label} must be between ${min} and ${max}',
      },
   };

   const handleFormOnFinish = async (values: any) => {
      console.log('>>> Check values form: ', values);
   };

   return (
      <div>
         <Table
            loading={tableIsLoading}
            columns={columns}
            dataSource={usersData}
            showHeader={true}
            title={renderTableHeader}
         />
         <Modal
            open={openAddUserModal}
            onCancel={() => setOpenAddUserModal(false)}
            title="Add user"
            maskClosable={false}
            width={450}
            okText="Create"
            closeIcon={false}
            onOk={() => form.submit()}
         >
            <div style={{ marginTop: '15px' }}>
               <Form
                  form={form}
                  validateMessages={validateMessages}
                  onFinish={(values) => handleFormOnFinish(values)}
               >
                  <Form.Item
                     name="name"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your Name!',
                        },
                     ]}
                  >
                     <Input placeholder="name" />
                  </Form.Item>
                  {/* <Form.Item
                     name="email"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your email!',
                        },
                     ]}
                  >
                     <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your password!',
                        },
                     ]}
                  >
                     <Input placeholder="password" />
                  </Form.Item>
                  <Form.Item
                     name="age"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your age!',
                        },
                     ]}
                  >
                     <Input placeholder="age" />
                  </Form.Item>
                  <Form.Item
                     name="gender"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your gender!',
                        },
                     ]}
                  >
                     <Select
                        defaultValue=""
                        // style={{ width: 120 }}
                        options={[
                           { value: 'male', label: 'Male' },
                           { value: 'female', label: 'Female' },
                        ]}
                     />
                  </Form.Item>
                  <Form.Item
                     name="address"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your address!',
                        },
                     ]}
                  >
                     <Input placeholder="address" />
                  </Form.Item>
                  <Form.Item
                     name="role"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your role!',
                        },
                     ]}
                  >
                     <Input placeholder="role" />
                  </Form.Item> */}
               </Form>
            </div>
         </Modal>
      </div>
   );
};

export default UsersTable;
