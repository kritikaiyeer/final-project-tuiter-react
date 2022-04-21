import React from "react";
import * as service from "../../services/auth-service";
const curentUser = async () => {
    return await service.profile();
};
export default curentUser;