import Table from "react-bootstrap/Table";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineSetting, AiOutlineCheck } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import Form from 'react-bootstrap/Form';

const AllContract = () => {
  return (
    <>
      <div className="body-main">
        <div className="title-bar dropdown-flexing">
          <h2>All Contracts</h2>
          <ul className="dropdown-listing-bar">
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  className="custom-dropbar icondropdown"
                  id="dropdown-basic"
                >
                  <BsFilter />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h6>FILTER</h6>
                  <Form >
                      <Form.Select aria-label="Default select example">
                        <option>Select Contract Type</option>
                        <option value="1">Select Contract Type 1</option>
                        <option value="2">Select Contract Type 2</option>
                        <option value="3">Select Contract Type 3</option>
                      </Form.Select>
                      <Form.Select aria-label="Default select example">
                        <option>Select Department</option>
                        <option value="1">Select Department 1</option>
                        <option value="2">Select Department 2</option>
                        <option value="3">Select Department 3</option>
                      </Form.Select>
                      <Form.Control type='date' placeholder="Enter Start Date" />
                      <Form.Control type='date' placeholder="Enter Start Date" />
                      <button className="btnblack" type='submit'>Filter</button>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle className="custom-dropbar" id="dropdown-basic">
                  Contract Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Contract Type 1
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Contract Type 2
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Contract Type 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle className="custom-dropbar" id="dropdown-basic">
                  Contract Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Contract Type 1
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Contract Type 2
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Contract Type 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle className="custom-dropbar" id="dropdown-basic">
                  Contract Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Contract Type 1
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Contract Type 2
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Contract Type 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle className="custom-dropbar" id="dropdown-basic">
                  Contract Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Contract Type 1
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Contract Type 2
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Contract Type 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  className="custom-dropbar icondropdown"
                  id="dropdown-basic"
                >
                  <AiOutlineSetting />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <h6>FILTER FIELDS</h6>
                  <ul>
                    <li>
                      <button>
                        Name
                        <AiOutlineCheck />
                      </button>
                    </li>
                    <li>
                      <button>
                        Customer/Vendor Name
                        <AiOutlineCheck />
                      </button>
                    </li>
                    <li>
                      <button>
                        Type of Contract
                        <AiOutlineCheck />
                      </button>
                    </li>
                    <li>
                      <button>
                        Contract End Date
                        <AiOutlineCheck />
                      </button>
                    </li>
                    <li>
                      <button>Email</button>
                    </li>
                    <li>
                      <button>Customer/Vendor Email</button>
                    </li>
                    <li>
                      <button>Department</button>
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="table-bar">
          <Table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>CUSTOMER/VENDOR NAME</th>
                <th>TYPE OF CONTRACT</th>
                <th>CONTRACT END DATE</th>
                <th>Inward Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default AllContract;
