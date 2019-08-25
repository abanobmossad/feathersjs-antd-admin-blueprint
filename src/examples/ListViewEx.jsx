import React from 'react';
import ListView from '../components/ListView';


const ListViewEx = () => (
  <ListView
    fetchData={{
      path: 'orders',
    }}
    listMeta={(item) => ({
      title: <p>{item._id}</p>,
      description: <p>{item._id}</p>,
      avatar: <img src="/images/userPH.jpg" width="25" height="25" alt="Avatar" />,
    })}
    listContent={(item) => (
      <p>
        <b>{item.title}</b>
        <hr />
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Maxime neque ducimus adipisci
        dignissimos dolor excepturi, sint earum eius
        repudiandae fuga quibusdam veniam debitis
        ipsum, quam mollitia unde eos eaque odit.
      </p>
    )}
    size="small"
    grid
  />
);

export default ListViewEx;
