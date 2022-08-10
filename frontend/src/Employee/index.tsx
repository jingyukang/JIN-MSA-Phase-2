import axios from "axios";
import { Button, TextField,  Grid, Box, Table, TableRow, TableCell } from '@mui/material';
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { EmployeeModel } from "../Model/EmployeeModel"

const Employee = (): JSX.Element => {
  
  var employList = new Array<EmployeeModel>;
  const [employeeName, setEmployeeName] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState<undefined | EmployeeModel>(undefined);

  const EMPLOYEE_BASE_URL = "https://dummy.restapiexample.com/api/v1/employees";

  const search = (): void => {
    employeeName === ""
      ? alert("Please enter Employee name")
      : axios
          .get(EMPLOYEE_BASE_URL)
          .then((res) => {
            employList = (res.data).data;
            // console.log(employList);
            var employee = employList.find(item => item.employee_name == employeeName);
            setEmployeeInfo(employee);
          })
          .catch((err) => {
            // console.log("Employee not found");
            setEmployeeInfo(undefined);
          });
    
  };

  return (
    <div>
      <h1>Employee Search</h1>

      <div className="search-field">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={employeeName}
            onChange={(prop: any) => {
              setEmployeeName(prop.target.value);
            }}
            label="Enter a Name of Employee"
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            aria-label="search"
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
          </Button>
        </div>
      </div>

      {employeeInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="employee-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {employeeInfo === undefined || employeeInfo === null ? (
                    <h1> Employee not found</h1>
                  ) : (
                    <div>
                      <Table>
                        <TableRow>
                            <h1>
                            {`${employeeInfo.id.toString()}. ${employeeInfo.employee_name
                              .charAt(0)
                              .toUpperCase()}${employeeInfo.employee_name.slice(1)}`}
                          </h1>
                        </TableRow>
                        
                        
                        <TableRow>
                          <TableCell style={{ verticalAlign: "top" }}>
                            <b>Age:</b>
                          </TableCell>
                          <TableCell>
                              {employeeInfo.employee_age}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ verticalAlign: "top" }}>
                            <b>Salary:</b>
                          </TableCell>
                          <TableCell>
                            {employeeInfo.employee_salary}
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
        </div>
      )}
    </div>
  );
};

export default Employee;
