import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../redux-store/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import UpdateEmailModal from "../../components/UpdateEmailModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";


function Users() {
    const dispatch = useDispatch();
    const requestRef = useRef(null);

    const usersData = useSelector((state) => state.admin.users);
    const isLoading = useSelector((state) => state.admin.isLoading);

    const users = usersData?.list || [];
    const userCount = usersData?.count || 0;

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(null);

    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [filters, setFilter] = useState({
        limit: 10,
        page: 1,
        query: "",
        order: "desc",
        sort: "created_at",
    });


    const updateFilter = (key, value) => {
        setFilter((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSort = (column) => {
        setFilter((prev) => ({
            ...prev,
            sort: column,
            order:
                prev.sort === column && prev.order === "asc"
                    ? "desc"
                    : "asc",
            page: 1,
        }));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(filters.query);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters.query]);

    const mutate = useCallback(async () => {
        requestRef.current?.abort();

        const request = dispatch(
            getUsers({
                limit: filters.limit,
                page: filters.page,
                query: debouncedQuery,
                order: filters.order,
                sort: filters.sort,
            })
        );

        requestRef.current = request;

        try {
            await request.unwrap();
        } catch (error) {
            if (
                error?.name !== "AbortError" &&
                error?.code !== "ERR_CANCELED"
            ) {
                console.error("Failed to fetch users:", error);
            }
        }
    }, [
        dispatch,
        filters.limit,
        filters.page,
        filters.order,
        filters.sort,
        debouncedQuery,
    ]);

    useEffect(() => {
        mutate();

        return () => {
            requestRef.current?.abort();
        };
    }, [mutate]);

    const openUserModal = (user, type) => {
        setSelectedUser(user);
        setModalType(type);
    };

    const closeUserModal = () => {
        setSelectedUser(null);
        setModalType(null);
    };




    return (

        <div className="admin-login-container p-4 mb-80">

            <div className="container mt-4 mb-5">
                <Link
                    to="/admin/dashboard"
                    className="btn btn-sm btn-outline-dark px-4 mb-4"
                >
                    ← Back
                </Link>
                <div className=" d-flex align-items-center justify-content-between ">
                    <div>
                        <h2 className="mb-1 fw-semibold">User Management</h2>
                        <p className="text-muted mb-0">
                            Manage user accounts, roles, and access across your platform.
                        </p>
                    </div>

                    <Link to={"/admin/create-user"}
                        className="btn btn-outline-dark px-4"
                    >
                        Create new user
                    </Link>

                </div>
            </div>


            {/* Users Card */}
            <div className=" border-0 shadow-sm container"
                style={{
                    borderRadius: "18px",
                    backgroundColor: "#f8faf8",
                }}
            >
                <div className="card-body p-4">
                    {/* Search & Filter */}
                    <div className="form-div">
                        <label htmlFor="search" className="mb-2">Search</label>
                        <input
                            type="text"
                            className="form-control border"
                            placeholder="Search users..."
                            value={filters.query}
                            onChange={(e) => {
                                updateFilter("query", e.target.value);

                                setFilter((prev) => ({
                                    ...prev,
                                    page: 1,
                                    query: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    {/* Table */}
                    <div className="table-responsive rounded-3">
                        <table className="table align-middle mb-0">
                            <thead className="">
                                <tr className="">
                                    <th className="border-0  px-4 py-3 bg-light-green cursor-pointer"
                                        onClick={() => handleSort("first_name")}>
                                        User
                                        {filters.sort === "first_name" && (
                                            <span className="ms-2">
                                                {filters.order === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th className="border-0  px-4 py-3 bg-light-green cursor-pointer"
                                        onClick={() => handleSort("email")}>
                                        Email
                                        {filters.sort === "first_name" && (
                                            <span className="ms-2">
                                                {filters.order === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th className="border-0  px-4 py-3 bg-light-green cursor-pointer"
                                        onClick={() => handleSort("email")}>
                                        Created At
                                        {filters.sort === "created_at" && (
                                            <span className="ms-2">
                                                {filters.order === "asc" ? "↑" : "↓"}
                                            </span>
                                        )}
                                    </th>
                                    <th className="border-0  px-4 py-3 bg-light-green text-end">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-5"
                                        >
                                            <div className="text-muted d-flex justify-content-center align-items-center">
                                                <span
                                                    className="spinner-border spinner-green spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </div>
                                        </td>
                                    </tr>
                                    // Array.from({ length: 5 }).map((_, index) => (
                                    //     <tr key={index}>
                                    //         {/* User */}
                                    //         <td className="px-4 py-3">
                                    //             <div className="d-flex align-items-center">
                                    //                 <div
                                    //                     className="placeholder rounded-circle me-3"
                                    //                     style={{
                                    //                         width: "42px",
                                    //                         height: "42px",
                                    //                     }}
                                    //                 />

                                    //                 <div>
                                    //                     <div
                                    //                         className="placeholder-glow"
                                    //                         style={{ width: "140px" }}
                                    //                     >
                                    //                         <span className="placeholder col-12 rounded" />
                                    //                     </div>
                                    //                 </div>
                                    //             </div>
                                    //         </td>

                                    //         {/* Email */}
                                    //         <td className="px-4">
                                    //             <div
                                    //                 className="placeholder-glow"
                                    //                 style={{ width: "190px" }}
                                    //             >
                                    //                 <span className="placeholder col-12 rounded" />
                                    //             </div>
                                    //         </td>

                                    //         {/* Created */}
                                    //         <td className="px-4">
                                    //             <div
                                    //                 className="placeholder-glow"
                                    //                 style={{ width: "100px" }}
                                    //             >
                                    //                 <span className="placeholder col-12 rounded" />
                                    //             </div>
                                    //         </td>

                                    //         {/* Actions */}
                                    //         <td className="px-4">
                                    //             <div className="d-flex justify-content-end me-3">
                                    //                 <div
                                    //                     className="placeholder-glow"
                                    //                     style={{ width: "50px" }}
                                    //                 >
                                    //                     <span className="placeholder col-12 rounded" />
                                    //                 </div>
                                    //             </div>
                                    //         </td>
                                    //     </tr>
                                    // ))
                                ) : users?.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user?.id}>
                                            {/* User */}
                                            <td className="px-4">
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            backgroundColor: "#e9f5df",
                                                            color: "#5d9c2b",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {user?.first_name?.[0]?.toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <div className="text-dark fw-semibold">
                                                            {user?.first_name} {user?.last_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="text-muted px-4">
                                                {user?.email}
                                            </td>

                                            {/* Created */}
                                            <td className="text-muted px-4">
                                                {moment(user?.created_at).format("DD/MM/YYYY")}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 text-end">
                                                <div className="dropdown">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Actions
                                                    </button>

                                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="dropdown-item"
                                                                onClick={() => openUserModal(user, "email")}
                                                            >
                                                                <i className="bi bi-envelope me-2"></i>
                                                                Update Email
                                                            </button>
                                                        </li>

                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="dropdown-item"
                                                                onClick={() => openUserModal(user, "password")}
                                                            >
                                                                <i className="bi bi-key me-2"></i>
                                                                Change Password
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-5"
                                        >
                                            <div className="text-muted">
                                                No users found.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/*  Pagination */}
                    {!isLoading && userCount > 0 && (
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">

                            {/* Showing Entries */}
                            <div className="text-muted small">
                                Showing{" "}
                                {Math.min(
                                    (filters.page - 1) * filters.limit + 1,
                                    userCount
                                )}
                                –
                                {Math.min(
                                    filters.page * filters.limit,
                                    userCount
                                )}{" "}
                                of {userCount} users
                            </div>

                            {/* Entries Per Page */}
                            <div className="entries-box d-flex align-items-center gap-2">
                                <span className="text-muted small">
                                    Show
                                </span>

                                <select
                                    className="form-select form-select-sm"
                                    style={{ width: "80px" }}
                                    value={filters.limit}
                                    onChange={(e) => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            limit: Number(e.target.value),
                                            page: 1,
                                        }));
                                    }}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <span className="text-muted small">
                                    entries
                                </span>
                            </div>

                            {/* Pagination */}
                            <div className="btn-group">
                                {/* Previous */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    disabled={filters.page === 1}
                                    onClick={() => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            page: prev.page - 1,
                                        }));
                                    }}
                                >
                                    Previous
                                </button>

                                {/* Current Page */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                >
                                    {filters.page}
                                </button>

                                {/* Next */}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    disabled={
                                        filters.page >=
                                        Math.ceil(userCount / filters.limit)
                                    }
                                    onClick={() => {
                                        setFilter((prev) => ({
                                            ...prev,
                                            page: prev.page + 1,
                                        }));
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Email Modal */}
            <UpdateEmailModal
                show={modalType === "email"}
                user={selectedUser}
                onClose={closeUserModal}
                mutate={mutate}
            />

            {/* Password Modal */}
            <ChangePasswordModal
                show={modalType === "password"}
                user={selectedUser}
                onClose={closeUserModal}
                mutate={mutate}
            />
        </div>
    );
}

export default Users;