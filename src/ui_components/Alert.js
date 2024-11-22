import { Alert, Space } from 'antd';
const onClose = (e) => {
  console.log(e, 'I was closed.');
};
const NetWorkAlert = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
      marginBottom: "20px",
    }}
  >
    <Alert
      message="You are offline"
      type="error"
      closable
      onClose={onClose}
    />
  </Space>
);

export default NetWorkAlert;