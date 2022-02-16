const LIMIT_DEFAULT = 1000;
const OFFSET_DEFAULT = 0;

export default class GetUsersRequest {
    name: string;
    limit: number;
    offset: number;
    id: string;

    constructor();
    constructor(user?: any);
    constructor(user?: GetUsersRequest) {
        this.name = user.name ? user.name : null;
        this.limit = user.limit ? user.limit : LIMIT_DEFAULT;
        this.offset = user.offset ? user.offset : OFFSET_DEFAULT;
        this.id = user.id ? user.id : null;
    }
}
