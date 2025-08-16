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
  const [totalPage, setTotalPage] = useState(0);
  const [serialNo, setSerialNo] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    handleAdminfetch(currentPage, itemsPerPage);
  }, [currentPage, isUpdated]);

  const handleAdminfetch = async (currentPage, itemsPerPage) => {
    try {
      setLoading(true);
      const response = await getAllAdmins(currentPage, itemsPerPage);
      if (response.status == 200) {
        setAdmins(response?.data?.admins);
        setTotalPage(response?.data?.pagination?.totalPages);
        setSerialNo(itemsPerPage * response?.data?.pagination?.page);
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

  const handleStatusChange = async (e, id) => {
    const user = {
      userId: id,
      isBlocked: e,
    };

    try {
      const response = await handleBlockedUser(user);
      if (response.status === 200) {
        setIsUpdated(!isUpdated);
        toast.dismiss();
        toast.success(response.data.message);
      } else {
        toast.dismiss();
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <section className="border p-2 p-md-3 p-lg-4 rounded">
      <div className="table-responsive border-2">
        {admins.length > 0 ? (
          <table className="table">
            <thead>
              <tr className="font-mulish light-black-text">
                <th>Sr. no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Actions(Unblock/Blocked)</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((data, index) => (
                <tr className="font-nunito" key={index}>
                  <td className="py-3">{serialNo + 1 + index}</td>
                  <td className="py-3">{data?.name}</td>
                  <td className="py-3">{data?.email}</td>
                  <td className="py-3">{data?.createdAt}</td>
                  <td className="text-capitalize py-3">{data?.role}</td>
                  <td className="py-3">
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
          pageCount={totalPage}
          forcePage={currentPage > 0 ? currentPage - 1 : 0}
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-items"
          pageLinkClassName="page-links"
          previousClassName={`page-items ${totalPage <= 1 ? "disabled" : ""}`}
          previousLinkClassName="page-links"
          nextClassName={`page-items ${totalPage <= 1 ? "disabled" : ""}`}
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
