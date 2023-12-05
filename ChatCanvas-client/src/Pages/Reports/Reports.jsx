import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import useReportedComments from "../../api/Comments/useReportedComments";
import Loader from "../../Component/Loader/Loader";
import Select from "react-select";
import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import useAxios from "../../api/useAxios";
import { Helmet } from "react-helmet-async";

const Reports = () => {
  const axiosSecure = useAxios();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const { reportedComments, count, isLoading, refetch } = useReportedComments(
    currentPage,
    perPage
  );

  const options = [
    {
      value: "restricted",
      label: "Restrict Comments",
    },
    {
      value: "banned",
      label: "Ban Post",
    },
  ];

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handlePage = (e, page) => {
    setCurrentPage(page);
  };

  const numberOfPage = Math.ceil(count / perPage);

  // button function
  const handleAction = async (id, commentator) => {
    const action = selectedOption.value;
    // update user
    const {data} = await axiosSecure.patch(
      `/updateuserpermission/${commentator}`,
      { action }
    );
    console.log(data);
    if (data?.modifiedCount == 1) {
      toast.success(`User permission is set to ${action}`);
    } else if (data?.modifiedCount == 0) {
      toast.success("No action needed");
    }

    // delete report comment
    const deleteData = await axiosSecure.delete(
      `/deletereportedcomments/${id}`
    );
    refetch();
  };

  return (
    <div>
      <Helmet>
        <title>Reported Comments</title>
      </Helmet>
      <Box sx={{ minHeight: "75vh" }}>
        <TableContainer component={Paper} sx={{ bgcolor: "primary.lighter" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Commentator
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Post Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Comment
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Feedback
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Take Action
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Submit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportedComments?.map((report) => (
                <TableRow key={report?._id}>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    {report?.commentor}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    {report?.post_title}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    {report?.comment}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    {report?.feedback}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    <Select
                      className="select"
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "16px" }}
                    component="th"
                    scope="row"
                  >
                    <Tooltip title="Take Action">
                      <IconButton
                        onClick={() =>
                          handleAction(report?._id, report?.commentor)
                        }
                      >
                        <CheckCircleOutlineIcon sx={{ color: "blue" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", mt: 5 }}
        onChange={handlePage}
        page={currentPage}
        count={numberOfPage}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default Reports;
