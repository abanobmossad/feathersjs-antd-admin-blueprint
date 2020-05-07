import React from 'react';
import { Modal, Result } from 'antd';

export const ErrorMessage = (error) => {
  if (error.code === 403) {
    return Modal.error({
      icon: false,
      okButtonProps: {
        type: 'link',
      },
      okText: 'Ok',
      onOk: () => {
        window.location.assign('/');
      },
      content: <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page, Or make this action."
      />,
    });
  }
  if (error.code === 500) {
    return Modal.error({
      icon: false,
      okButtonProps: {
        type: 'link',
      },
      okText: 'Report',
      content: <Result
        status="500"
        title="Internal server error"
        subTitle="Sorry, the server is wrong."
      />,
    });
  }
  if (error.code === 400) {
    return Modal.error({
      icon: false,
      okButtonProps: {
        type: 'link',
      },
      okText: 'Ok',
      content: <Result
        status="info"
        title="You may entered a bad value"
        subTitle={error.message}
      />,
    });
  }
  if (error.code === 406) {
    let subMessage = '';
    const { entityName } = error.data;
    if (entityName === 'card') {
      subMessage = 'You can deactivate this card instead';
    } else if (entityName === 'user') {
      subMessage = 'You can block this user instead';
    }
    return Modal.error({
      icon: false,
      okButtonProps: {
        type: 'link',
      },
      okText: 'Ok',
      content: <Result
        status="warning"
        title={error.message}
        subTitle={subMessage}
      />,
    });
  }
  return Modal.info({
    icon: false,
    okButtonProps: {
      type: 'link',
    },
    style: { top: 20 },
    okText: 'Report',
    content: <Result
      status="500"
      style={{ padding: 0 }}
      title="Internal server error"
      subTitle={(
        <div>
          <p>Sorry, the server got wrong</p>
          <span>
            Error:
            {' '}
            {error.message}
          </span>
        </div>
        )}
    />,
  });
};
