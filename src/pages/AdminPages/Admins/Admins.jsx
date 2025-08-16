import React, { useContext, useEffect, useState } from "react";
import "./Admins.css";
import {
  getAllAdmins,
  handleBlockedUser,
} from "../../../services/userServices";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../context/LoadingContext";
import ReactSwitch from "react-switch";
import ReactPaginate from "react-paginate";

const Admins = () => {
  const { setLoading } = useContext(LoadingContext);
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [serialNo, setSerialNo] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    handleAdminfetch();
  }, [isUpdated]);

  const handleAdminfetch = async () => {
    try {
      setLoading(true);
      const response = await getAllAdmins();
      if (response.status == 200) {
        setAdmins(response.data.admins);
        setCount(12);
      } else {
        toast.dismiss();
        toast.error(response?.data?.message || "Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.message || "Something went wrong!");
    }
  };
  console.log("admins", admins);

  const handleStatusChange = async (e, id) => {
    const user = {
      userId: id,
      isBlocked: e,
    };
    console.log("user", user);
    try {
      setLoading(true);
      const response = await handleBlockedUser(user);
      if (response.status === 200) {
        setIsUpdated(!isUpdated);

        toast.dismiss();
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  // pagination functionalities

  const itemsPerPage = 10;
  const pageCount = Math.ceil(count / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    setSerialNo(itemsPerPage * event.selected);
  };

  return (
    <section className="border p-4 rounded">
      <div className="table-responsive border-2">
        {admins.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Sr. no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Actions(Bloack/Unblock)</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((data, index) => (
                <tr className="filterBasisle-body-text" key={index}>
                  <td>{serialNo + 1 + index}</td>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.createdAt}</td>
                  <td className="text-capitalize">{data?.role}</td>
                  <td>
                    <ReactSwitch
                      checked={data.role === "blocked" ? true : false}
                      onChange={(e) => handleStatusChange(e, data._id)}
                      uncheckedIcon
                      checkedIcon
                      height={16}
                      width={28}
                      onColor="#0C8AE6"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="table-data-not-available-text">
              {<p>Loading...</p>}
            </div>
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="pagination-section">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          forcePage={currentPage > 0 ? currentPage - 1 : 0}
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-items"
          pageLinkClassName="page-links"
          previousClassName={`page-items ${pageCount <= 1 ? "disabled" : ""}`}
          previousLinkClassName="page-links"
          nextClassName={`page-items ${pageCount <= 1 ? "disabled" : ""}`}
          nextLinkClassName="page-links"
          breakLabel="..."
          breakClassName="page-items"
          breakLinkClassName="page-links"
          containerClassName="pagination"
          activeClassName="active-page"
          renderOnZeroPageCount={null}
          disabledClassName="disabled"
        />
      </div>
    </section>
  );
};

export default Admins;
