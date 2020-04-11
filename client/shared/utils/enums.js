const api = "api";
const apiVersion = "v1";
const GamesApiUrl = `/${api}/${apiVersion}/games`;
import * as NodeEnums from '../../../app/common/enums';

/**
* Enums For Statuses in Capitalization.
* @readonly
* @enum {string}
*/
const CapitalizedStatuses = Object.keys(NodeEnums.Statuses).reduce((acc, key) => {
    acc[NodeEnums.Statuses[key]] = key;
    return acc;
}, {});

/**
* Enums For React Consisting All Node'S Enums Too.
* @readonly
* @enum {string}
*/
export default Object.freeze({
    ...NodeEnums,
    GamesApiUrl,
    CapitalizedStatuses,
});

