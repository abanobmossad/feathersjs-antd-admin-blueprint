### Getting Started

1. run `npm i`
2. start meteor backend on port 3000.
3. Additional `atmosphere` packages should be listed in import array in `meteor-client-config.js` file.
4. `npm start`

---

### Project structure

```sh
src/
  ├──api/ # api ui and logic
  │  Cases/
  │  │  ├──index.js # get the data from meteor
  │  ├──Originations
  │  ├──Owners
  │  ├──Causes
  ├──components/   # all the reusable components
  │    ├──Table/
  │    │  ├──Table.css # styles
  │    │  ├──Table.js # react ui
  │    │  ├──index.js
  │    │──Navbar
  │    │──Button
  │    ├──...
  ├──layout/ # app layout
  │    ├──App.js
  │    ├──App.css
  ├──pages/ # pages entry points and ui
  │    ├──Login/
  │    │  ├──Login.js
  │    │  ├──Login.css
  │    │  ├──index.js
  │    ├──Signin
  │    Cases/
  │    │  Cases.css # styles
  │    │  Cases.jsx # react ui
  │    │  ├──index.js #page entry point
  │    ├──Originations
  │    ├──Owners
  │    ├──Causes
  │    ├──...
  ├──index.js # app index

```

---

### Components

#### Table component usage

```js
import { Table, ActionButton } from "/components/Table";
```

For display the data

```js
<Table data={data} headers={headers} />
```

`headers` is an array objects `label` is the column  header and `propName` is represent the attribute key in the `data` object 

```js
[{ label: "Username", propName: "username " },
 { label: "Email", propName: "email" },
 { label: "Status", propName: "status" }
];
```

`data` is the data from database shape of

```js
[ {_id: 1, username: 'username', email: 'dummy@email.com', status: 'status',},
  {_id: 2, username: 'username', email: 'dummy@email.com', status: 'status',},
  ...
]
```

**Table with actions**

```js
<Table data={data} head={head}>
	<ActionButton intent="danger" text="remove" action={this.remove} />
	<ActionButton intent="success" text="update" action={this.update} />
</Table>
```

`ActionButton` takes `text` as the displayed text and `action` function

the `action` function will be called with the `id` of clicked row

```js
function update(id) {
	console.log(id);
}
```

---
