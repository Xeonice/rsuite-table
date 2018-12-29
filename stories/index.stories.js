import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import data from './utils/data';
import treeData from './utils/treeData';
import Table from '../src/compiler';
const {
  Column, HeaderCell, Cell,
} = Table;

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Knobs for React props
stories.add('初始 Table', () => (
  <Table
    autoHeight
    data={data}
    onRowClick={data => {
      console.log(data);
    }}
  >
    <Column width={70} align="center" fixed resizable={boolean('Id(Resizable)', false)}>
      <HeaderCell>Id</HeaderCell>
      <Cell dataKey="id" />
    </Column>

    <Column width={200} fixed resizable={boolean('First Name(Resizable)', false)}>
      <HeaderCell>First Name</HeaderCell>
      <Cell dataKey="firstName" />
    </Column>

    <Column width={200} fixed={boolean('LastName fixed', false)}>
      <HeaderCell>Last Name</HeaderCell>
      <Cell dataKey="lastName" />
    </Column>

    <Column width={200}>
      <HeaderCell>City</HeaderCell>
      <Cell dataKey="city" />
    </Column>

    <Column width={200}>
      <HeaderCell>Street</HeaderCell>
      <Cell dataKey="street" />
    </Column>

    <Column width={300}>
      <HeaderCell>Company Name</HeaderCell>
      <Cell dataKey="companyName" />
    </Column>

    <Column width={300}>
      <HeaderCell>Email</HeaderCell>
      <Cell dataKey="email" />
    </Column>
  </Table>
));

// Knobs as dynamic variables.
stories.add('树形表格', () => {
  // const name = text('Name', 'Arunoda Susiripala');
  // const age = number('Age', 89);
  return ( <Table
    isTree
    defaultExpandAllRows
    rowKey="id"
    autoHeight
    data={treeData}
    onExpandChange={(isOpen, rowData) => {
      console.log(isOpen, rowData);
    }}
  >
    <Column flexGrow={1}>
      <HeaderCell>Label</HeaderCell>
      <Cell dataKey="labelName" />
    </Column>

    <Column width={100}>
      <HeaderCell>Status</HeaderCell>
      <Cell dataKey="status" />
    </Column>

    <Column width={100}>
      <HeaderCell>Count</HeaderCell>
      <Cell dataKey="count" />
    </Column>
  </Table>);
});
