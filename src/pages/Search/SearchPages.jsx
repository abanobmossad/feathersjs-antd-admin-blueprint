import React from 'react';
import { Tabs, Card } from 'antd';
import propTypes from 'prop-types';
import querystring from 'query-string';
import { withRouter } from 'react-router-dom';
// load pages
import PageHeader from '../../components/PageHeader';

const { q: keyword, tab } = querystring.parse(window.location.search);

const SearchPages = ({
  title, icon,
  description, banner, history,
}) => (
  <>
    <PageHeader
      icon={icon}
      title={title}
      description={description}
      img={banner}
      pageTitle="Search"
    />
    <Card>
      <Tabs
        type="card"
        defaultActiveKey={tab || 'users'}
        animated={false}
        onChange={((activeTab) => {
          history.push({ search: querystring.stringify({ q: keyword, tab: activeTab }) });
        })}
      >
        <Tabs.TabPane tab="Users" key="users">
          Users
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </>
);

SearchPages.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  banner: propTypes.string.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};


export default withRouter(SearchPages);
