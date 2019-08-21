import React from 'react';
import { Layout } from 'antd';
import { FormattedMessage } from 'react-intl';
import { version } from '../../../package.json';

const colors = require('../../configs/colors');

const Footer = () => (
  <Layout.Footer className="footer">
    <b>
      <p className="footer__credits">
        <FormattedMessage
          id="footer.credits"
          defaultMessage="Antd Admin blueprint ©2019 created by abanob mossad"
        />
      </p>
      <div className="footer__version">
        <FormattedMessage id="footer.version" defaultMessage="Version" />
        <span
          className="footer__version-number"
          style={{ color: colors['footer-version'] }}
        >
          {version}
        </span>
      </div>
    </b>
  </Layout.Footer>
);

export default Footer;
