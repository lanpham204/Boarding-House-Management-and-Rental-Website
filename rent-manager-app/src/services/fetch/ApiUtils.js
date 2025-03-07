import jwtDecode from 'jwt-decode';
import { API_BASE_URL, ACCESS_TOKEN } from '../../constants/Connect';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};
export function getRoleFromToken(token) {
    try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        return role;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}
export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getCurrentRentaler() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/rentaler/me",
        method: 'GET'
    });
}

export function getCurrentAdmin() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/admin/me",
        method: 'GET'
    });
}

export function forgotPassword(emailRequest) {
    return request({
        url: API_BASE_URL + "/auth/forgot-password",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    });
}

export function changeConfirmedStatus(emailRequest) {
    return request({
        url: API_BASE_URL + "/auth/confirmed",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    });
}

export function resetPassword(resetPassword) {
    return request({
        url: API_BASE_URL + "/auth/reset-password",
        method: 'POST',
        body: JSON.stringify(resetPassword)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function changePassword(changePasswordRequest) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/change-password",
        method: 'POST',
        body: JSON.stringify(changePasswordRequest)
    });
}

export function getAllRoomOfCustomer(pageNo, pageSize, title, price, categoryId, city, district, ward, deadLineContract) {
    return request({
        url: API_BASE_URL + "/customer/room?pageNo=" + pageNo + "&pageSize=" + pageSize + "&title=" + title + "&price=" + price + "&categoryId=" + categoryId
            + "&city=" + city + "&district=" + district + "&ward=" + ward + "&deadLineContract=" + deadLineContract,
        method: 'GET'
    });
}

export function getAllAccountRentalerForCustomer(pageNo, pageSize) {
    return request({
        url: API_BASE_URL + "/account/customer?pageNo=" + pageNo + "&pageSize=" + pageSize,
        method: 'GET'
    });
}

export function getAllrRoomByUserId(pageNo, pageSize, userId) {
    return request({
        url: API_BASE_URL + "/room/" + userId + "/rentaler" + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
        method: 'GET'
    });
}

export function followAgents(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/follow/"+id,
        method: 'GET',
    });
}

export function saveBlog(roomId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/blog-store/save/" + roomId,
        method: 'GET',
    });
}
export function checkBlog(roomId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/blog-store/check/" + roomId,
        method: 'GET',
    });
}
export function deleteBlog(roomId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/blog-store/delete/" + roomId,
        method: 'DELETE',
    });
}


export function getUserOfChat() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/message",
        method: 'GET'
    });
}


// ADMIN
export function getAllRoomOfAdmin(pageNo, pageSize, name) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/all?pageNo=" + pageNo + "&pageSize=" + pageSize + "&title=" + name,
        method: 'GET'
    });
}

export function getAllRoomApprovingOfAdmin(pageNo, pageSize, approve) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/all?pageNo=" + pageNo + "&pageSize=" + pageSize + "&approve=" + approve,
        method: 'GET'
    });
}

export function getAllAccpuntOfAdmin(pageNo, pageSize, name) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/account?pageNo=" + pageNo + "&pageSize=" + pageSize + "&keyword=" + name,
        method: 'GET'
    });
}


export function getAccountById(id) {


    return request({
        url: API_BASE_URL + "/account/" + id,
        method: 'GET'
    });
}

export function approveRoomOfAdmin(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/" + id + "/approve",
        method: 'POST'
    });
}

export function removeRoomOfAdmin(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/" + id,
        method: 'DELETE'
    });
}

export function lockedAccount(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/auth/" + id + "/locked",
        method: 'POST'
    });
}

export function sendEmailForRentaler(id, sendEmailRequest) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/account/send-email/" + id,
        method: 'POST',
        body: JSON.stringify(sendEmailRequest)
    });
}

export function sendEmailForContact(sendEmailRequest) {

    return request({
        url: API_BASE_URL + "/account/send-mail-rentaler",
        method: 'POST',
        body: JSON.stringify(sendEmailRequest)
    });
}

export function setAuthorization(id, roleRequest) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/account/" + id + "/authorization",
        method: 'POST',
        body: JSON.stringify(roleRequest)
    });
}

export function getAllRequireOfCustomer(pageNo, pageSize, name, phone) {

    return request({
        url: API_BASE_URL + "/request/customer?pageNo=" + pageNo + "&pageSize=" + pageSize + "&keyword=" + name + "&phone=" + phone,
        method: 'GET'
    });
}

export function getAllRequireOfContract(pageNo, pageSize, contractId) {

    return request({
        url: API_BASE_URL + "/request/contract?pageNo=" + pageNo + "&pageSize=" + pageSize + "&contractId=" + contractId,
        method: 'GET'
    });
}


// RENTALER
export function getAllRoomOfRentaler(pageNo, pageSize, name) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room?pageNo=" + pageNo + "&pageSize=" + pageSize + "&title=" + name,
        method: 'GET'
    });
}

export function getAllContractOfRentaler(pageNo, pageSize, name, status, not = false) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/contract?pageNo=" + pageNo + "&pageSize=" + pageSize + "&name=" + name + "&status=" + status + "&not=" + not,
        method: 'GET'
    });
}

export function getAllRoomHired(pageNo, pageSize, userId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/contract/customer?pageNo=" + pageNo + "&pageSize=" + pageSize + "&userId=" + userId,
        method: 'GET'
    });
}

export function getAllFollow(pageNo, pageSize) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/follow?pageNo=" + pageNo + "&pageSize=" + pageSize,
        method: 'GET'
    });
}
export function getCountFollower() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/follow/count/follower",
        method: 'GET'
    });
}
export function getCountFollowing() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/follow/count/following",
        method: 'GET'
    });
}
export function getAllFollowOfRentaler(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/follow/rentaler/" + id,
        method: 'GET'
    });
}
export function checkFollow(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/follow/check/" + id,
        method: 'GET'
    });
}

export function deleteFollow(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/follow/" + id,
        method: 'DELETE'
    });
}

export function getAllBlogStore(pageNo, pageSize) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/blog-store/all?pageNo=" + pageNo + "&pageSize=" + pageSize,
        method: 'GET'
    });
}

export function getAllRequireOfRentaler(pageNo, pageSize, name) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/request?pageNo=" + pageNo + "&pageSize=" + pageSize + "&keyword=" + name,
        method: 'GET'
    });
}
export function getAllMaintenceOfRentaler(pageNo, pageSize, requestId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/maintenance?pageNo=" + pageNo + "&pageSize=" + pageSize + "&requestId=" + requestId,
        method: 'GET'
    });
}
export function findByPhoneNumber(phoneNumber) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/" + phoneNumber,
        method: 'GET'
    });
}

export function getRoom(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/" + id,
        method: 'GET'
    });
}

export function getRentOfHome() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/rent-home",
        method: 'GET'
    });
}

export function getNumber() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/statistical",
        method: 'GET'
    });
}

export function getNumberOfAdmin() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/statistical/admin",
        method: 'GET'
    });
}

export function getByMonth() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/statistical/get-by-month",
        method: 'GET'
    });
}

export function getByCost() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/statistical/cost",
        method: 'GET'
    });
}


export function getContract(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/contract/" + id,
        method: 'GET'
    });
}

export function checkoutRoom(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/contract/" + id + "/checkout",
        method: 'POST'
    });
}

export function sendRequestForRentaler(data) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/request",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function getRequestById(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/request/" + id,
        method: 'GET'
    });
}
export function getTotalMaintenceByRequestId(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/request/sum/" + id,
        method: 'GET'
    });
}

export function changeStatusOfRequest(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/request/" + id,
        method: 'POST'
    });
}

export function getMaintenance(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/maintenance/" + id,
        method: 'GET'
    });
}

export function exportBillRequest(nameBill, description, price, nameRoom, nameOfRent) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/export-bill" + "?nameBill=" + nameBill + "&description=" + description + "&price=" + price + "&nameRoom=" + nameRoom + "&nameOfRent=" + nameOfRent,
        method: 'GET'
    });
}


export function disableRoom(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/room/" + id,
        method: 'POST'
    });
}

export function deleteMaintenance(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/maintenance/" + id,
        method: 'DELETE'
    });
}

export function getAllCategoryOfAdmin(pageNo, pageSize) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/categories?pageNo=" + pageNo + "&pageSize=" + pageSize,
        method: 'GET'
    });
}

export function addCategory(category) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/categories",
        method: 'POST',
        body: JSON.stringify(category),
    });
}

export function updateCategory(id, category) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/categories/${id}`,
        method: 'PUT',
        body: JSON.stringify(category),
    });
}

export function deleteCategory(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/categories/${id}`,
        method: 'DELETE',
    });
}




