import { injectIntl } from 'react-intl';

const translate = ({ intl, id, defaultMessage }) => {
  const placeholder = intl.formatMessage({ id, defaultMessage });
  return placeholder;
};


export default injectIntl(translate);
