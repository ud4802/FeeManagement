// import React from "react";
// // import { Table } from "@nextui-org/react";
// import { Button, Table, Input, Space } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// import axios from "../api/axios";
// import { useRef, useState, useEffect } from "react";
// import Highlighter from "react-highlight-words";
// import { Navigate, useNavigate } from "react-router-dom";

// function ViewStudents() {
//   const loggedInUser = localStorage.getItem("auth");
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef(null);
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1890ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       ...getColumnSearchProps("name"),
//     },
//     {
//       title: "Sem",
//       dataIndex: "sem",
//     },

//     {
//       title: "Year",
//       dataIndex: "year",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       // ...getColumnSearchProps('status'),
//       filters: [
//         {
//           text: "Paid",
//           value: "PAID",
//         },
//         {
//           text: "Not Paid",
//           value: "NOT PAID",
//         },
//       ],
//       onFilter: (value, record) => record.status.indexOf(value) === 0,
//     },
//   ];

//   const [userData, setUserdata] = useState([]);
//   const [sem, setSem] = useState("");
//   const [year, setYear] = useState("");

//   const handleUpload = async (e) => {
//     const listData = await axios.post("/api", JSON.stringify({ sem, year }), {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     setUserdata(listData.data);

//     console.log(
//       listData.data[0].name,
//       listData.data[0].sem,
//       listData.data[0].year,
//       userData.data[0].name
//     );
//   };

//   console.log(sem);

//   const list = [];
//   const data = [];

//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };

//   for (var k = 0; k < userData.length; k++) {
//     data.push({
//       key: k,
//       name: userData[k].name,
//       sem: userData[k].sem,
//       year: userData[k].year,
//       email: userData[k].email,
//       status: userData[k].status,
//     });
//   }
//   const hasSelected = false;
//   const select = (e) => {
//     if (e > 0) {
//       hasSelected = true;
//     } else {
//       hasSelected = false;
//     }
//   };

//   const sendEmail = async (e) => {
//     console.log(list);
//     await axios
//       .post("/mail", { list })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // const hasSelected = 0;

//   return (
//     <>
//       {loggedInUser ? (
//         <>
//           <section4 class="search">
//             <label for="exampleInputEmail1">Semester : </label>
//             &nbsp; &nbsp;
//             <select
//               class="form-select form-select-sm"
//               aria-label=".form-select-sm example"
//               onChange={(e) => setSem(e.target.value)}
//               value={sem}
//             >
//               <option selected>Select Semester</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//             </select>
//             &nbsp; &nbsp; &nbsp; &nbsp;
//             <label for="exampleInputEmail1">Academic Year : </label>
//             &nbsp;&nbsp;&nbsp;
//             <div class="form-group">
//               <input
//                 type="text"
//                 class="form-control"
//                 id="exampleInputEmail1"
//                 placeholder="e.g. 2020-2024"
//                 required
//                 onChange={(e) => setYear(e.target.value)}
//                 value={year}
//               />
//             </div>
//             <br />
//             &nbsp;&nbsp;&nbsp;
//             <div className="align" id="submit">
//               <button
//                 type="submit"
//                 onClick={(e) => {
//                   handleUpload(e);
//                 }}
//                 class="btn btn-secondary btn-sm"
//                 required
//               >
//                 Submit
//               </button>
//             </div>
//             &nbsp;&nbsp;&nbsp;
//             <button type="primary" onClick={sendEmail}>
//               Send
//             </button>
//           </section4>

//           <div id="table">
//             <div
//               style={{
//                 marginBottom: 16,
//               }}
//             >
//               {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
//           Reload
//         </Button> */}

//               <span
//                 style={{
//                   marginLeft: 8,
//                 }}
//               >
//                 {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
//               </span>
//             </div>
//             {/* <Table rowSelection={rowSelection} columns={columns} dataSource={data} /> */}
//             <Table
//               rowSelection={{
//                 type: "checkbox",

//                 onChange: (record, r1) => {
//                   list.pop();
//                   for (var k = 0; k < r1.length; k++) {
//                     list.push(r1[k].email);
//                     select(list.length);
//                   }
//                   //list.push(r1[0].email);
//                   console.log(list);
//                 },
//               }}
//               columns={columns}
//               dataSource={data}
//               sticky
//               scroll={{
//                 y: 340,
//               }}
//             />
//           </div>
//         </>
//       ) : (
//         <Navigate replace to="/"></Navigate>
//       )}
//       {/* //Dropdown */}
//     </>
//   );
// }

// export default ViewStudents;

import React from "react";
// import { Table } from "@nextui-org/react";
import { Button, Table, Input, Space, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Await, Navigate, useNavigate } from "react-router-dom";

const YEAR_REGEX = /^[0-9][0-9]\d{2}-([0-9][0-9]\d{2})$/;

function ViewStudents() {
  //to check whether user is logged in or not
  const loggedInUser = localStorage.getItem("auth");

  //for searching
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [emailCount, setEmailCount] = useState(0);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  //For Declaration of columns
  const columns = [
    {
      title: "ID",
      dataIndex : "id",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please Enter ID.",
                },
              ]}
            >
              <Input />
              {/* <span className="badge">{emailCount}</span> */}
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Name.",
                },
              ]}
            >
              <Input />
              {/* <span className="badge">{emailCount}</span> */}
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    // {
    //   title: "Sent",
    //   dataIndex: "sent",
    //   render:(text,record)=>{
    //    if(editingRow === record.key){
    //     return(
    //       <span className="badge">{emailCount}</span>
    //     );
    //    }
    //    else{
    //     return <p>{emailCount}</p>
    //    }
    //   }
    // },
    {
      title: "Sem",
      dataIndex: "sem",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="sem">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: "Year",
      dataIndex: "year",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="year">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="email">
                <Input />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "MobileNo",
      dataIndex : "mobileno",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="mobileno">
                <Input />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="status">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
      // ...getColumnSearchProps('status'),
      filters: [
        {
          text: "Paid",
          value: "PAID",
        },
        {
          text: "Not Paid",
          value: "NOT PAID",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  id: record.id,
                  name: record.name,
                  sem: sem,
                  year: year,
                  email: record.email,
                  mobileno : record.mobileno,
                  status: record.status,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
            <Button 
              type="link"
              
            > 
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const updatedUserData = [...userData];
    updatedUserData.splice(editingRow, 1, { ...values, key: editingRow });
    setUserdata(updatedUserData);
    console.log(updatedUserData);
    setEditingRow(null);
    const response = await axios.post("/updateData", {
      updatedUserData,
      sem,
      year,
      loggedInUser,
    });
    // console.log(response.data);
  };
  const [userData, setUserdata] = useState([]);
  const [sem, setSem] = useState("");

  const [year, setYear] = useState("");
  const [validYear, setValidYear] = useState(true);
  const [yeatFocus, setYearFocus] = useState(false);

  useEffect(() => {
    const matches = year.match(YEAR_REGEX);
    if (matches) {
      const startYear = Number(matches[0].substring(0, 4));
      const endYear = Number(matches[1]);

      if (endYear - startYear !== 4) {
        setValidYear(false);
      } else {
        setValidYear(true);
      }
    } else {
      setValidYear(false);
    }
  }, [year]);

  const handleUpload = async (e) => {
    const listData = await axios.post("/api", JSON.stringify({ sem, year,loggedInUser }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setUserdata(listData.data);

    // console.log(
    //   listData.data[0].name,
    //   listData.data[0].sem,
    //   listData.data[0].year,
    //   userData.data[0].name
    // );
  };

  console.log(sem);

  const list = [];
  const data = [];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  for (var k = 0; k < userData.length; k++) {
    data.push({
      key: k,
      id : userData[k].id,
      name: userData[k].name,
      sem: userData[k].sem,
      year: userData[k].year,
      email: userData[k].email,
      mobileno : userData[k].mobileno,
      status: userData[k].status,
    });
  }
  var hasSelected = false;
  const select = (e) => {
    if (e > 0) {
      hasSelected = true;
    } else {
      hasSelected = false;
    }
  };

  const sendEmail = async (sent) => {
    console.log(list);
    await axios
      .post("/mail", { list })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // setEmailCount(emailCount + 1);
  };

  console.log(userData);
  console.log(data);

  // const hasSelected = 0;

  return (
    <>
      {loggedInUser ? (
        <>
         {/* <header> */}
          <h1 class="display-1">View Students</h1>
          <p className="lead">
            View Student Reocords and edit them accordingly.
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          {/* </header> */}
          <section4 class="search">
            <label for="exampleInputEmail1">Semester : </label>
            &nbsp; &nbsp;
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={(e) => setSem(e.target.value)}
              value={sem}
            >
              <option selected>Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;


            {/* <div className="form-group"> */}
            <label for="academicyear" className="form-label">
              Academic Year :
              <FontAwesomeIcon
                icon={faCheck}
                className={validYear ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validYear || !year ? "hide" : "invalid"}
              />
            </label>
            {/* <br/> */}
            &nbsp; &nbsp; &nbsp; &nbsp;
            <div>
            <input
              type="text"
              class="form-control"
              id="academicyear"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              required
              aria-invalid={validYear ? "false" : "true"}
              aria-describedby="yearnote"
              onFocus={() => setYearFocus(true)}
              onBlur={() => setYearFocus(false)}
              maxLength="9"
              style={{width:"200px"}}
              />
              {/* </div>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <div> */}
            <p
              id="yearnote"
              className={yeatFocus && !validYear ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <li>
                Entered Year Should be in <b>yyyy-yyyy</b> Formate only.
              </li>
              {/* <br /> */}
              <li>And difference between both years should be exactly 4.</li>
              {/* <br/> */}
              eg.,{" "}
              <span style={{ color: "green" }}>
                2020-2024,2024-2028 etc.
              </span>{" "}
              are <span style={{ color: "green" }}>valid</span>
              <br />
              but <span style={{ color: "red" }}>
                2020-2021,2020-2025 etc.
              </span>{" "}
              are <span style={{ color: "red" }}>invalid.</span>
            </p>
            </div>
            {/* &nbsp;&nbsp;&nbsp; */}
            {/* <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="e.g. 2020-2024"
                required
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </div>
            <br /> */}
            &nbsp;&nbsp;&nbsp;
            <div className="align">
              <button
                type="submit"
                onClick={(e) => {
                  handleUpload(e);
                }}
                class="btn btn-secondary btn-sm"
                // required
              >
                Submit
              </button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="align">
              <button onClick={sendEmail} className="btn btn-warning btn-sm">
                Send
              </button>
            </div>
          </section4>

          <div id="table">
            <div
              style={{
                marginBottom: 16,
              }}
            >
              {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button> */}

              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span>
            </div>
            {/* <Table rowSelection={rowSelection} columns={columns} dataSource={data} /> */}
            <Form form={form} onFinish={onFinish}>
              <Table
                rowSelection={{
                  type: "checkbox",

                  onChange: (record, r1) => {
                    // list.pop();
                    list.splice(0, list.length);
                    for (var k = 0; k < r1.length; k++) {
                      list.push(r1[k].email);
                      select(list.length);
                    }
                    //list.push(r1[0].email);
                    console.log(list);
                  },
                }}
                columns={columns}
                dataSource={data}
                sticky
                scroll={{
                  y: 340,
                }}
              />
            </Form>
          </div>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
      {/* //Dropdown */}
    </>
  );
}

export default ViewStudents;
